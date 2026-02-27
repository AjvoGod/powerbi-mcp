import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type { ApiListResponse, Report, ReportPage, ExportStatus } from '../api/types.js';
import { writeFileSync } from 'fs';
import { safeTool, textResult } from './toolUtils.js';

export function registerReportTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_reports',
        'List all reports in a workspace',
        { workspaceId: z.string().describe('The workspace ID (GUID)') },
        safeTool(async ({ workspaceId }) => {
            const result = await client.get<ApiListResponse<Report>>(
                `/groups/${workspaceId}/reports`,
            );
            const formatted = result.value.map((r) =>
                `• ${r.name} (ID: ${r.id}) — dataset: ${r.datasetId || 'N/A'}, type: ${r.reportType || 'PowerBIReport'}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} reports:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_report',
        'Get details of a specific report',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
        },
        safeTool(async ({ workspaceId, reportId }) => {
            const report = await client.get<Report>(
                `/groups/${workspaceId}/reports/${reportId}`,
            );
            return textResult(JSON.stringify(report, null, 2));
        }),
    );

    server.tool(
        'get_report_pages',
        'List all pages of a report',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
        },
        safeTool(async ({ workspaceId, reportId }) => {
            const result = await client.get<ApiListResponse<ReportPage>>(
                `/groups/${workspaceId}/reports/${reportId}/pages`,
            );
            const formatted = result.value.map((p) =>
                `• ${p.displayName} (name: ${p.name}) — order: ${p.order ?? 'N/A'}`,
            ).join('\n');
            return textResult(`Report pages (${result.value.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'export_report',
        'Export a report to PDF, PPTX, or PNG. Initiates async export and returns export ID. Use get_export_status to check progress.',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
            format: z.enum(['PDF', 'PPTX', 'PNG']).describe('Export format'),
            pages: z.array(z.string()).optional().describe('Optional: specific page names to export'),
        },
        safeTool(async ({ workspaceId, reportId, format, pages }) => {
            const body: Record<string, unknown> = { format };
            if (pages && pages.length > 0) {
                body.powerBIReportConfiguration = {
                    pages: pages.map((p) => ({ pageName: p })),
                };
            }

            const result = await client.post<ExportStatus>(
                `/groups/${workspaceId}/reports/${reportId}/ExportTo`,
                body,
            );
            return textResult(
                `📤 Export initiated!\nExport ID: ${result.id}\nStatus: ${result.status}\nPercent: ${result.percentComplete}%\n\nUse get_export_status to check progress, then download_export to get the file.`,
            );
        }),
    );

    server.tool(
        'get_export_status',
        'Check the status of a report export',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
            exportId: z.string().describe('The export ID returned from export_report'),
        },
        safeTool(async ({ workspaceId, reportId, exportId }) => {
            const status = await client.get<ExportStatus>(
                `/groups/${workspaceId}/reports/${reportId}/exports/${exportId}`,
            );
            let text = `Export Status:\n• Status: ${status.status}\n• Percent: ${status.percentComplete}%\n• Report: ${status.reportName}`;
            if (status.resourceFileExtension) {
                text += `\n• File extension: ${status.resourceFileExtension}`;
            }
            if (status.resourceLocation) {
                text += `\n• Ready for download ✅`;
            }
            return textResult(text);
        }),
    );

    server.tool(
        'download_export',
        'Download a completed report export to a local file',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
            exportId: z.string().describe('The export ID'),
            outputPath: z.string().describe('Local file path to save the export (e.g., /tmp/report.pdf)'),
        },
        safeTool(async ({ workspaceId, reportId, exportId, outputPath }) => {
            const buffer = await client.getFile(
                `/groups/${workspaceId}/reports/${reportId}/exports/${exportId}/file`,
            );
            writeFileSync(outputPath, Buffer.from(buffer));
            return textResult(`✅ Export downloaded to: ${outputPath} (${Buffer.from(buffer).length} bytes)`);
        }),
    );

    server.tool(
        'clone_report',
        'Clone a report (optionally to a different workspace/dataset)',
        {
            workspaceId: z.string().describe('Source workspace ID'),
            reportId: z.string().describe('Report ID to clone'),
            name: z.string().describe('Name for the cloned report'),
            targetWorkspaceId: z.string().optional().describe('Target workspace ID (default: same workspace)'),
            targetModelId: z.string().optional().describe('Target dataset ID to rebind to'),
        },
        safeTool(async ({ workspaceId, reportId, name, targetWorkspaceId, targetModelId }) => {
            const body: Record<string, string> = { name };
            if (targetWorkspaceId) body.targetWorkspaceId = targetWorkspaceId;
            if (targetModelId) body.targetModelId = targetModelId;

            const result = await client.post<Report>(
                `/groups/${workspaceId}/reports/${reportId}/Clone`,
                body,
            );
            return textResult(`✅ Report cloned!\nNew report: ${result.name} (ID: ${result.id})`);
        }),
    );

    server.tool(
        'rebind_report',
        'Rebind a report to a different dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
            datasetId: z.string().describe('The new dataset ID to bind to'),
        },
        safeTool(async ({ workspaceId, reportId, datasetId }) => {
            await client.post(
                `/groups/${workspaceId}/reports/${reportId}/Rebind`,
                { datasetId },
            );
            return textResult(`✅ Report rebound to dataset ${datasetId} successfully.`);
        }),
    );

    // ─── Compound: export + poll + download in one step ───
    server.tool(
        'export_report_and_download',
        'Export a report to file (PDF/PNG/PPTX) and download it in a single step. Handles the full export lifecycle: trigger → poll → download.',
        {
            workspaceId: z.string().describe('The workspace ID'),
            reportId: z.string().describe('The report ID'),
            format: z.enum(['PDF', 'PNG', 'PPTX']).describe('Export format'),
            outputPath: z.string().describe('Local file path to save the exported file'),
            pollIntervalMs: z.number().int().min(1000).max(30000).default(3000).describe('Polling interval in ms (default 3000)'),
            maxWaitMs: z.number().int().min(10000).max(600000).default(120000).describe('Maximum wait time in ms (default 120000)'),
        },
        safeTool(async ({ workspaceId, reportId, format, outputPath, pollIntervalMs, maxWaitMs }) => {
            // 1 — Trigger export
            const exportRequest = await client.post<{ id: string }>(
                `/groups/${workspaceId}/reports/${reportId}/ExportTo`,
                { format },
            );
            const exportId = exportRequest.id;

            // 2 — Poll for completion
            const startTime = Date.now();
            let status: ExportStatus | undefined;

            while (Date.now() - startTime < maxWaitMs) {
                status = await client.get<ExportStatus>(
                    `/groups/${workspaceId}/reports/${reportId}/exports/${exportId}`,
                );

                if (status.status === 'Succeeded') break;

                if (status.status === 'Failed') {
                    return {
                        content: [{ type: 'text' as const, text: `Export failed: ${JSON.stringify(status)}` }],
                        isError: true,
                    };
                }

                await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
            }

            if (!status || status.status !== 'Succeeded') {
                return {
                    content: [{ type: 'text' as const, text: `Export timed out after ${maxWaitMs / 1000}s. Last status: ${status?.status || 'unknown'}. Export ID: ${exportId}` }],
                    isError: true,
                };
            }

            // 3 — Download
            const fileUrl = status.resourceLocation;
            if (!fileUrl) {
                return {
                    content: [{ type: 'text' as const, text: `Export succeeded but no download URL found. Export ID: ${exportId}` }],
                    isError: true,
                };
            }

            const fileData = await client.getFile(fileUrl);
            const buffer = Buffer.from(fileData);
            writeFileSync(outputPath, buffer);

            return textResult(
                `✅ Report exported and downloaded!\n` +
                `Format: ${format}\n` +
                `Export ID: ${exportId}\n` +
                `Saved to: ${outputPath}\n` +
                `Size: ${(buffer.length / 1024).toFixed(1)} KB`,
            );
        }),
    );
}
