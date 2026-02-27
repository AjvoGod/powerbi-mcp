import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type {
    ApiListResponse, Dataset, Table, DataSource, DatasetParameter,
    Refresh, RefreshSchedule,
} from '../api/types.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerDatasetTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_datasets',
        'List all datasets in a workspace',
        { workspaceId: z.string().describe('The workspace ID (GUID)') },
        safeTool(async ({ workspaceId }) => {
            const result = await client.get<ApiListResponse<Dataset>>(
                `/groups/${workspaceId}/datasets`,
            );
            const formatted = result.value.map((ds) =>
                `• ${ds.name} (ID: ${ds.id}) — refreshable: ${ds.isRefreshable}, configuredBy: ${ds.configuredBy || 'N/A'}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} datasets:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_dataset',
        'Get details of a specific dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
        },
        safeTool(async ({ workspaceId, datasetId }) => {
            const ds = await client.get<Dataset>(
                `/groups/${workspaceId}/datasets/${datasetId}`,
            );
            return textResult(JSON.stringify(ds, null, 2));
        }),
    );

    server.tool(
        'get_dataset_tables',
        'Get tables in a Power BI push dataset (shows table schema and column definitions)',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
        },
        safeTool(async ({ workspaceId, datasetId }) => {
            const result = await client.get<ApiListResponse<Table>>(
                `/groups/${workspaceId}/datasets/${datasetId}/tables`,
            );
            const formatted = result.value.map((t) => {
                const cols = t.columns.map((c) => `    - ${c.name} (${c.dataType})`).join('\n');
                return `📋 ${t.name}\n${cols}`;
            }).join('\n\n');
            return textResult(`Tables (${result.value.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_dataset_datasources',
        'Get data sources used by a dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
        },
        safeTool(async ({ workspaceId, datasetId }) => {
            const result = await client.get<ApiListResponse<DataSource>>(
                `/groups/${workspaceId}/datasets/${datasetId}/datasources`,
            );
            const formatted = result.value.map((ds) => {
                const details = ds.connectionDetails;
                return `• ${ds.datasourceType}: ${details.server || details.url || details.path || 'N/A'} ${details.database ? `/ ${details.database}` : ''}`;
            }).join('\n');
            return textResult(`Data sources (${result.value.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_dataset_parameters',
        'Get parameters of a dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
        },
        safeTool(async ({ workspaceId, datasetId }) => {
            const result = await client.get<ApiListResponse<DatasetParameter>>(
                `/groups/${workspaceId}/datasets/${datasetId}/parameters`,
            );
            const formatted = result.value.map((p) =>
                `• ${p.name} (${p.type}) = "${p.currentValue || 'N/A'}" ${p.isRequired ? '[REQUIRED]' : ''}`,
            ).join('\n');
            return textResult(`Parameters (${result.value.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'update_dataset_parameters',
        'Update parameter values of a dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
            parameters: z.array(z.object({
                name: z.string().describe('Parameter name'),
                newValue: z.string().describe('New parameter value'),
            })).describe('Array of parameter updates'),
        },
        safeTool(async ({ workspaceId, datasetId, parameters }) => {
            await client.post(
                `/groups/${workspaceId}/datasets/${datasetId}/Default.UpdateParameters`,
                {
                    updateDetails: parameters.map((p) => ({
                        name: p.name,
                        newValue: p.newValue,
                    })),
                },
            );
            return textResult(`✅ Updated ${parameters.length} parameter(s) successfully.`);
        }),
    );

    server.tool(
        'get_dataset_refresh_history',
        'Get refresh history of a dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
            top: z.number().optional().describe('Number of recent refreshes to return (default 10)'),
        },
        safeTool(async ({ workspaceId, datasetId, top }) => {
            const limit = top ?? 10;
            const result = await client.get<ApiListResponse<Refresh>>(
                `/groups/${workspaceId}/datasets/${datasetId}/refreshes?$top=${limit}`,
            );
            const formatted = result.value.map((r) => {
                const duration = r.endTime
                    ? `${Math.round((new Date(r.endTime).getTime() - new Date(r.startTime).getTime()) / 1000)}s`
                    : 'in progress';
                return `• ${r.status} — ${r.refreshType || 'N/A'} — started: ${r.startTime} (${duration})`;
            }).join('\n');
            return textResult(`Recent refreshes (${result.value.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'trigger_dataset_refresh',
        'Trigger an on-demand refresh of a dataset (Pro: max 8/day on shared capacity)',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
            notifyOption: z.enum(['NoNotification', 'MailOnCompletion', 'MailOnFailure']).optional()
                .describe('Email notification option (default: NoNotification)'),
        },
        safeTool(async ({ workspaceId, datasetId, notifyOption }) => {
            await client.post(
                `/groups/${workspaceId}/datasets/${datasetId}/refreshes`,
                { notifyOption: notifyOption || 'NoNotification' },
            );
            return textResult('✅ Dataset refresh triggered successfully. Check refresh history for status.');
        }),
    );

    server.tool(
        'get_dataset_refresh_schedule',
        'Get the refresh schedule for a dataset',
        {
            workspaceId: z.string().describe('The workspace ID'),
            datasetId: z.string().describe('The dataset ID'),
        },
        safeTool(async ({ workspaceId, datasetId }) => {
            const schedule = await client.get<RefreshSchedule>(
                `/groups/${workspaceId}/datasets/${datasetId}/refreshSchedule`,
            );
            return textResult(JSON.stringify(schedule, null, 2));
        }),
    );
}
