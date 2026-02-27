import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerAdminTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'get_activity_events',
        'Get Power BI activity events (audit log) for a specific date. Requires admin permissions.',
        {
            startDateTime: z.string().describe("Start date-time in ISO format, e.g. '2024-01-15T00:00:00Z'"),
            endDateTime: z.string().describe("End date-time in ISO format, e.g. '2024-01-15T23:59:59Z'"),
            filter: z.string().optional().describe("Optional OData filter, e.g. \"Activity eq 'ViewReport'\""),
        },
        safeTool(async ({ startDateTime, endDateTime, filter }) => {
            let path = `/admin/activityevents?startDateTime='${startDateTime}'&endDateTime='${endDateTime}'`;
            if (filter) {
                path += `&$filter=${encodeURIComponent(filter)}`;
            }
            const result = await client.get<{
                activityEventEntities: Record<string, unknown>[];
                continuationUri?: string;
                continuationToken?: string;
            }>(path);

            const events = result.activityEventEntities || [];
            const formatted = events.slice(0, 50).map((e) =>
                `• [${e.CreationTime || 'N/A'}] ${e.Activity || 'N/A'} — user: ${e.UserId || 'N/A'} — artifact: ${e.ArtifactName || e.DatasetName || e.ReportName || 'N/A'}`,
            ).join('\n');

            let text = `Activity events (showing ${Math.min(events.length, 50)} of ${events.length}):\n\n${formatted}`;
            if (result.continuationUri) {
                text += '\n\n⚠️ More events available. Use continuationToken for pagination.';
            }

            return textResult(text);
        }),
    );

    server.tool(
        'scan_workspaces',
        'Admin API: scan workspace metadata (datasets, reports, dashboards). Requires admin permissions.',
        {
            workspaceId: z.string().describe('The workspace ID to scan'),
        },
        safeTool(async ({ workspaceId }) => {
            // Initiate workspace scan
            const scanResult = await client.post<{ id: string }>(
                '/admin/workspaces/getInfo',
                { workspaces: [workspaceId] },
            );

            // Get scan result
            const scanId = scanResult.id;
            const result = await client.get<Record<string, unknown>>(
                `/admin/workspaces/scanResult/${scanId}`,
            );

            return textResult(`Workspace scan result:\n\n${JSON.stringify(result, null, 2)}`);
        }),
    );

    server.tool(
        'list_apps',
        'List all published Power BI apps',
        {},
        safeTool(async () => {
            const result = await client.get<{
                value: { id: string; name: string; description?: string; publishedBy?: string }[];
            }>('/apps');
            const formatted = result.value.map((app) =>
                `• ${app.name} (ID: ${app.id}) — published by: ${app.publishedBy || 'N/A'}`,
            ).join('\n');
            return textResult(`Apps (${result.value.length}):\n\n${formatted}`);
        }),
    );
}
