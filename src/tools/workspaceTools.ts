import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { PowerBIClient } from '../api/powerbiClient.js';
import type { ApiListResponse, Workspace, WorkspaceUser } from '../api/types.js';
import { safeTool, textResult } from './toolUtils.js';

export function registerWorkspaceTools(server: McpServer, client: PowerBIClient) {
    server.tool(
        'list_workspaces',
        'List all Power BI workspaces accessible to the service principal',
        {},
        safeTool(async () => {
            const result = await client.get<ApiListResponse<Workspace>>('/groups');
            const formatted = result.value.map((ws) =>
                `• ${ws.name} (ID: ${ws.id}) — type: ${ws.type}, readOnly: ${ws.isReadOnly}, dedicated: ${ws.isOnDedicatedCapacity}`,
            ).join('\n');
            return textResult(`Found ${result.value.length} workspaces:\n\n${formatted}`);
        }),
    );

    server.tool(
        'get_workspace',
        'Get details of a specific workspace by ID',
        { workspaceId: z.string().describe('The workspace ID (GUID)') },
        safeTool(async ({ workspaceId }) => {
            const ws = await client.get<Workspace>(`/groups/${workspaceId}`);
            return textResult(JSON.stringify(ws, null, 2));
        }),
    );

    server.tool(
        'get_workspace_users',
        'List users and their roles in a workspace',
        { workspaceId: z.string().describe('The workspace ID (GUID)') },
        safeTool(async ({ workspaceId }) => {
            const result = await client.get<ApiListResponse<WorkspaceUser>>(
                `/groups/${workspaceId}/users`,
            );
            const formatted = result.value.map((u) =>
                `• ${u.displayName || u.identifier} (${u.emailAddress || 'N/A'}) — ${u.groupUserAccessRight} (${u.principalType})`,
            ).join('\n');
            return textResult(`Workspace users (${result.value.length}):\n\n${formatted}`);
        }),
    );
}
