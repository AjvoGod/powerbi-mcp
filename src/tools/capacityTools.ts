import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type { ApiListResponse, Capacity } from '../api/types.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerCapacityTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_capacities',
        'List all available Power BI capacities',
        {},
        safeTool(async () => {
            const result = await client.get<ApiListResponse<Capacity>>('/capacities');
            const formatted = result.value.map((c) =>
                `• ${c.displayName} (ID: ${c.id}) — SKU: ${c.sku}, state: ${c.state}, region: ${c.region || 'N/A'}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} capacities:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_capacity_workloads',
        'Get workloads configured on a capacity (typically admin-only)',
        { capacityId: z.string().describe('The capacity ID') },
        safeTool(async ({ capacityId }) => {
            const result = await client.get<ApiListResponse<Record<string, unknown>>>(
                `/capacities/${capacityId}/Workloads`,
            );
            return textResult(JSON.stringify(result.value, null, 2));
        }),
    );
}
