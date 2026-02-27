#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from 'dotenv';
import { MsalAuth } from './auth/msalAuth.js';
import { PowerBIClient } from './api/powerbiClient.js';
import { registerWorkspaceTools } from './tools/workspaceTools.js';
import { registerDatasetTools } from './tools/datasetTools.js';
import { registerReportTools } from './tools/reportTools.js';
import { registerDashboardTools } from './tools/dashboardTools.js';
import { registerDataflowTools } from './tools/dataflowTools.js';
import { registerGatewayTools } from './tools/gatewayTools.js';
import { registerCapacityTools } from './tools/capacityTools.js';
import { registerPbixTools } from './tools/pbixTools.js';
import { registerAdminTools } from './tools/adminTools.js';
import { logger } from './logger.js';

// Load environment variables
config();

async function main() {
    // ─── Initialize MCP Server ───
    const server = new McpServer({
        name: 'powerbi-mcp',
        version: '1.0.0',
        description: 'Power BI MCP Server — workspace management, dataset operations, report export, PBIX local analysis. Supports Pro license.',
    });

    // ─── PBIX tools always work (no Azure credentials needed) ───
    registerPbixTools(server);

    // ─── Cloud tools require Azure AD credentials ───
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (tenantId && clientId && clientSecret) {
        const auth = new MsalAuth(tenantId, clientId, clientSecret);
        const client = new PowerBIClient(auth);

        registerWorkspaceTools(server, client);
        registerDatasetTools(server, client);
        registerReportTools(server, client);
        registerDashboardTools(server, client);
        registerDataflowTools(server, client);
        registerGatewayTools(server, client);
        registerCapacityTools(server, client);
        registerAdminTools(server, client);

        logger.info('Server', 'Power BI MCP Server started with full capabilities (44 tools)');
    } else {
        logger.warn('Server', 'Azure AD credentials not configured — only PBIX local analysis tools available (11 tools)');
        logger.info('Server', 'Set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET in .env to enable cloud tools.');
    }

    // ─── Start stdio transport ───
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    logger.error('Server', `Fatal error starting Power BI MCP Server: ${error}`);
    process.exit(1);
});
