import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type { ApiListResponse, Dataflow, DataSource } from '../api/types.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerDataflowTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_dataflows',
        'List all dataflows in a workspace',
        { workspaceId: z.string().describe('The workspace ID (GUID)') },
        safeTool(async ({ workspaceId }) => {
            const result = await client.get<ApiListResponse<Dataflow>>(
                `/groups/${workspaceId}/dataflows`,
            );
            const formatted = result.value.map((df) =>
                `• ${df.name} (ID: ${df.objectId}) — configured by: ${df.configuredBy || 'N/A'}, modified: ${df.modifiedDateTime || 'N/A'}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} dataflows:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_dataflow',
        'Get details of a specific dataflow',
        {
            workspaceId: z.string().describe('The workspace ID'),
            dataflowId: z.string().describe('The dataflow ID'),
        },
        safeTool(async ({ workspaceId, dataflowId }) => {
            const df = await client.get<Dataflow>(
                `/groups/${workspaceId}/dataflows/${dataflowId}`,
            );
            return textResult(JSON.stringify(df, null, 2));
        }),
    );

    server.tool(
        'get_dataflow_datasources',
        'Get data sources used by a dataflow',
        {
            workspaceId: z.string().describe('The workspace ID'),
            dataflowId: z.string().describe('The dataflow ID'),
        },
        safeTool(async ({ workspaceId, dataflowId }) => {
            const result = await client.get<ApiListResponse<DataSource>>(
                `/groups/${workspaceId}/dataflows/${dataflowId}/datasources`,
            );
            const formatted = result.value.map((ds) =>
                `• ${ds.datasourceType}: ${ds.connectionDetails.server || ds.connectionDetails.url || 'N/A'}`,
            ).join('\n');
            return textResult(`Data sources (${result.value.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'trigger_dataflow_refresh',
        'Trigger an on-demand refresh of a dataflow',
        {
            workspaceId: z.string().describe('The workspace ID'),
            dataflowId: z.string().describe('The dataflow ID'),
            notifyOption: z.enum(['NoNotification', 'MailOnCompletion', 'MailOnFailure']).optional()
                .describe('Email notification option'),
        },
        safeTool(async ({ workspaceId, dataflowId, notifyOption }) => {
            await client.post(
                `/groups/${workspaceId}/dataflows/${dataflowId}/refreshes`,
                { notifyOption: notifyOption || 'NoNotification' },
            );
            return textResult('✅ Dataflow refresh triggered successfully.');
        }),
    );
}
