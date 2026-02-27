import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type { ApiListResponse, Gateway, GatewayDatasource } from '../api/types.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerGatewayTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_gateways',
        'List all on-premises data gateways accessible to the user',
        {},
        safeTool(async () => {
            const result = await client.get<ApiListResponse<Gateway>>('/gateways');
            const formatted = result.value.map((g) =>
                `• ${g.name} (ID: ${g.id}) — type: ${g.type}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} gateways:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_gateway_datasources',
        'List data sources configured on a gateway',
        { gatewayId: z.string().describe('The gateway ID') },
        safeTool(async ({ gatewayId }) => {
            const result = await client.get<ApiListResponse<GatewayDatasource>>(
                `/gateways/${gatewayId}/datasources`,
            );
            const formatted = result.value.map((ds) =>
                `• ${ds.datasourceName || ds.id} — type: ${ds.datasourceType}, credential: ${ds.credentialType || 'N/A'}`,
            ).join('\n');
            return textResult(`Gateway data sources (${result.value.length}):\n\n${formatted}`);
        }),
    );
}
