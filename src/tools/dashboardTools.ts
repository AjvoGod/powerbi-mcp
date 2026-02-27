import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type { ApiListResponse, Dashboard, DashboardTile } from '../api/types.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerDashboardTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_dashboards',
        'List all dashboards in a workspace',
        { workspaceId: z.string().describe('The workspace ID (GUID)') },
        safeTool(async ({ workspaceId }) => {
            const result = await client.get<ApiListResponse<Dashboard>>(
                `/groups/${workspaceId}/dashboards`,
            );
            const formatted = result.value.map((d) =>
                `• ${d.displayName} (ID: ${d.id}) — readOnly: ${d.isReadOnly}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} dashboards:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_dashboard_tiles',
        'List all tiles on a dashboard',
        {
            workspaceId: z.string().describe('The workspace ID'),
            dashboardId: z.string().describe('The dashboard ID'),
        },
        safeTool(async ({ workspaceId, dashboardId }) => {
            const result = await client.get<ApiListResponse<DashboardTile>>(
                `/groups/${workspaceId}/dashboards/${dashboardId}/tiles`,
            );
            const formatted = result.value.map((t) =>
                `• "${t.title || 'Untitled'}" (ID: ${t.id}) — report: ${t.reportId || 'N/A'}, dataset: ${t.datasetId || 'N/A'}, size: ${t.colSpan ?? '?'}x${t.rowSpan ?? '?'}`,
            ).join('\n');
            return textResult(`Tiles (${result.value.length}):\n\n${formatted}`);
        }),
    );
}
