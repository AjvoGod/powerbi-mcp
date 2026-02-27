import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { PbixParser } from '../pbix/pbixParser.js';
import { existsSync } from 'fs';
import {
    discoverDesktopModelInstances,
    extractDesktopSemanticModel,
} from '../pbix/desktopModelExtractor.js';
import { resolvePbixPath, getPbixRoot } from '../pbix/pbixPath.js';
import {
    collectPbixFiles,
    analyzePbixFile,
    summarizeBatch,
    buildMarkdownDocumentation,
    buildReportDescription,
    validateReportDescriptionOutput,
} from '../pbix/pbixAnalyzer.js';
import { safeTool, textResult } from './toolUtils.js';

const batchInputSchema = {
    filePaths: z.array(z.string()).optional()
        .describe('Paths to .pbix files (absolute, or relative to POWERBI_PBIX_ROOT)'),
    directoryPath: z.string().optional()
        .describe('Directory path to scan for .pbix files (absolute, or relative to POWERBI_PBIX_ROOT)'),
    recursive: z.boolean().default(true).describe('If true, scans subdirectories when directoryPath is provided'),
    maxFiles: z.number().int().min(1).max(500).default(50).describe('Maximum number of PBIX files to process'),
};

export function registerPbixTools(server: McpServer) {
    // ─── Report description for intranet ───
    server.tool(
        'pbix_describe_report',
        'Analyzuj PBIX soubor a vygeneruj intranetový prompt pro sekce Business popis, Technický popis, Filtry a Míry (bez tabulek).',
        {
            filePath: z.string().describe('Path to the .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)'),
            includeMCode: z.boolean().default(true).describe('Include M code excerpt in the description'),
            maxMCodeChars: z.number().int().min(500).max(50000).default(5000).describe('Maximum M code characters'),
        },
        safeTool(async ({ filePath, includeMCode, maxMCodeChars }) => {
            const { analyzePbixFile: analyze } = await import('../pbix/pbixAnalyzer.js');
            const resolved = resolvePbixPath(filePath);
            const result = analyze(resolved, {
                includeZipEntries: false,
                includeMCode,
                maxMCodeChars,
            });
            const description = buildReportDescription(result);
            const validation = validateReportDescriptionOutput(description, result);

            const lines = [description, '', '## Auto-validace výstupu', ''];
            lines.push(`- Status: ${validation.isValid ? 'OK' : 'FAIL'}`);
            lines.push(`- Kontroly: ${validation.passed}/${validation.checks} prošly`);

            for (const issue of validation.issues) {
                lines.push(`- Problém: ${issue}`);
            }

            return textResult(lines.join('\n'));
        }),
    );

    server.tool(
        'pbix_discover_desktop_models',
        'Discover running local Power BI Desktop semantic model instances (Windows).',
        {
            workspaceRoot: z.string().optional()
                .describe('Optional root path to AnalysisServicesWorkspaces. Defaults to %LOCALAPPDATA%/Microsoft/Power BI Desktop/AnalysisServicesWorkspaces'),
        },
        safeTool(async ({ workspaceRoot }) => {
            const instances = discoverDesktopModelInstances(workspaceRoot);
            if (instances.length === 0) {
                return textResult(
                    'No running Power BI Desktop local model instances found. Ensure a report is open in Power BI Desktop.',
                );
            }

            return textResult(JSON.stringify({
                count: instances.length,
                instances,
            }, null, 2));
        }),
    );

    server.tool(
        'pbix_extract_desktop_semantic_model',
        'Extract semantic model metadata (tables, columns, measures, relationships, partitions) from running Power BI Desktop local model (Windows).',
        {
            server: z.string().optional().describe('Local Analysis Services server in format localhost:PORT. If omitted, uses the newest discovered instance.'),
            database: z.string().optional().describe('Optional model database/catalog name. If omitted, the first non-system catalog is used.'),
            workspaceRoot: z.string().optional()
                .describe('Optional root path for auto-discovery fallback if server is omitted.'),
            includeColumns: z.boolean().default(true).describe('Include columns in output'),
            includeMeasures: z.boolean().default(true).describe('Include measures in output'),
            includeRelationships: z.boolean().default(true).describe('Include relationships in output'),
            includePartitions: z.boolean().default(false).describe('Include partitions and query definitions (can be verbose)'),
        },
        safeTool(async ({ server, database, workspaceRoot, includeColumns, includeMeasures, includeRelationships, includePartitions }) => {
            let resolvedServer = server?.trim();
            if (!resolvedServer) {
                const instances = discoverDesktopModelInstances(workspaceRoot);
                if (instances.length === 0) {
                    return {
                        content: [{ type: 'text', text: 'Error: No desktop model instance found. Open the report in Power BI Desktop first, then run discovery.' }],
                        isError: true,
                    };
                }
                resolvedServer = instances[0].server;
            }

            const model = extractDesktopSemanticModel(resolvedServer, database);
            const filtered = {
                server: model.server,
                database: model.database,
                tables: model.tables,
                columns: includeColumns ? model.columns : [],
                measures: includeMeasures ? model.measures : [],
                relationships: includeRelationships ? model.relationships : [],
                partitions: includePartitions ? model.partitions : [],
                summary: {
                    tableCount: model.tables.length,
                    columnCount: includeColumns ? model.columns.length : 0,
                    measureCount: includeMeasures ? model.measures.length : 0,
                    relationshipCount: includeRelationships ? model.relationships.length : 0,
                    partitionCount: includePartitions ? model.partitions.length : 0,
                },
            };

            return textResult(JSON.stringify(filtered, null, 2));
        }),
    );

    server.tool(
        'pbix_analyze',
        'Analyze a local .pbix file — shows file structure, entries, and overview info. Works without Azure credentials.',
        { filePath: z.string().describe('Path to the .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)') },
        safeTool(async ({ filePath }) => {
            const absolutePath = resolvePbixPath(filePath);
            if (!existsSync(absolutePath)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath}` }], isError: true };
            }
            const parser = new PbixParser(absolutePath);
            const info = parser.getInfo();
            const sizeMB = (info.fileSizeBytes / 1024 / 1024).toFixed(2);
            const text = [
                `📊 PBIX Analysis: ${info.fileName}`,
                `Path: ${absolutePath}`,
                `Size: ${sizeMB} MB`,
                `Version: ${info.version || 'N/A'}`,
                '',
                'Components:',
                `  • DataModel: ${info.hasDataModel ? '✅' : '❌'}`,
                `  • DataMashup (Power Query): ${info.hasDataMashup ? '✅' : '❌'}`,
                `  • Report Layout: ${info.hasLayout ? '✅' : '❌'}`,
                `  • Metadata: ${info.hasMetadata ? '✅' : '❌'}`,
                '',
                `ZIP Entries (${info.entries.length}):`,
                ...info.entries.map((e) => `  • ${e}`),
            ].join('\n');
            return textResult(text);
        }),
    );

    server.tool(
        'pbix_extract_mcode',
        'Extract Power Query (M) code from a .pbix file — shows all data transformation queries',
        { filePath: z.string().describe('Path to the .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)') },
        safeTool(async ({ filePath }) => {
            const absolutePath = resolvePbixPath(filePath);
            if (!existsSync(absolutePath)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath}` }], isError: true };
            }
            const parser = new PbixParser(absolutePath);
            const mCode = parser.extractMCode();
            return textResult(`📝 Power Query (M) Code:\n\n\`\`\`m\n${mCode}\n\`\`\``);
        }),
    );

    server.tool(
        'pbix_extract_layout',
        'Extract report layout from a .pbix file — shows pages, visual count, and visual types',
        { filePath: z.string().describe('Path to the .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)') },
        safeTool(async ({ filePath }) => {
            const absolutePath = resolvePbixPath(filePath);
            if (!existsSync(absolutePath)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath}` }], isError: true };
            }
            const parser = new PbixParser(absolutePath);
            const layout = parser.extractLayout();

            const parts: string[] = [`📐 Report Layout (${layout.pages.length} pages):`];

            if (layout.reportId) {
                parts.push(`Report ID: ${layout.reportId}`);
            }

            for (const page of layout.pages) {
                parts.push('');
                parts.push(`📄 Page: ${page.displayName} (ordinal: ${page.ordinal})`);
                parts.push(`   Visuals: ${page.visualContainers.length}`);

                const typeCounts = new Map<string, number>();
                for (const v of page.visualContainers) {
                    const type = v.type || 'unknown';
                    typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
                }
                if (typeCounts.size > 0) {
                    parts.push('   Types:');
                    for (const [type, count] of typeCounts) {
                        parts.push(`     • ${type}: ${count}`);
                    }
                }
            }

            return textResult(parts.join('\n'));
        }),
    );

    server.tool(
        'pbix_extract_metadata',
        'Extract metadata (tables, measures) from a .pbix file',
        { filePath: z.string().describe('Path to the .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)') },
        safeTool(async ({ filePath }) => {
            const absolutePath = resolvePbixPath(filePath);
            if (!existsSync(absolutePath)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath}` }], isError: true };
            }
            const parser = new PbixParser(absolutePath);
            const metadata = parser.extractMetadata();
            return textResult(JSON.stringify(metadata, null, 2));
        }),
    );

    server.tool(
        'pbix_list_datasources',
        'List data sources extracted from Power Query (M) code in a .pbix file',
        { filePath: z.string().describe('Path to the .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)') },
        safeTool(async ({ filePath }) => {
            const absolutePath = resolvePbixPath(filePath);
            if (!existsSync(absolutePath)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath}` }], isError: true };
            }
            const parser = new PbixParser(absolutePath);
            const sources = parser.listDataSources();

            if (sources.length === 0) {
                return textResult('No data sources detected in the M code.');
            }

            const formatted = sources.map((s) => {
                let line = `• ${s.kind || 'Unknown'}: ${s.name}`;
                if (s.connectionString) line += `\n  Connection: ${s.connectionString}`;
                if (s.mExpression) line += `\n  Expression: ${s.mExpression.substring(0, 200)}${s.mExpression.length > 200 ? '...' : ''}`;
                return line;
            }).join('\n\n');

            return textResult(`📊 Data Sources (${sources.length}):\n\n${formatted}`);
        }),
    );

    server.tool(
        'pbix_compare',
        'Compare two .pbix files — shows differences in structure, pages, and visuals',
        {
            filePath1: z.string().describe('Path to the first .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)'),
            filePath2: z.string().describe('Path to the second .pbix file (absolute, or relative to POWERBI_PBIX_ROOT)'),
        },
        safeTool(async ({ filePath1, filePath2 }) => {
            const absolutePath1 = resolvePbixPath(filePath1);
            const absolutePath2 = resolvePbixPath(filePath2);
            if (!existsSync(absolutePath1)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath1}` }], isError: true };
            }
            if (!existsSync(absolutePath2)) {
                return { content: [{ type: 'text', text: `Error: File not found: ${absolutePath2}` }], isError: true };
            }
            const parser = new PbixParser(absolutePath1);
            const comparison = parser.compareTo(absolutePath2);
            return textResult(`🔍 PBIX Comparison:\n\n${JSON.stringify(comparison, null, 2)}`);
        }),
    );

    server.tool(
        'pbix_batch_analyze',
        'Analyze multiple local .pbix files at once without opening Power BI Desktop. Accepts explicit file paths and/or a directory scan.',
        {
            ...batchInputSchema,
            includeZipEntries: z.boolean().default(false).describe('If true, includes ZIP entry list for each file'),
        },
        safeTool(async ({ filePaths, directoryPath, recursive, maxFiles, includeZipEntries }) => {
            if ((!filePaths || filePaths.length === 0) && !directoryPath) {
                return {
                    content: [{ type: 'text', text: 'Error: Provide filePaths or directoryPath.' }],
                    isError: true,
                };
            }

            const discovered = collectPbixFiles(filePaths, directoryPath, recursive, maxFiles);
            if (discovered.files.length === 0) {
                const warningText = discovered.warnings.length > 0
                    ? `\nWarnings:\n${discovered.warnings.map((w) => `- ${w}`).join('\n')}`
                    : '';
                return {
                    content: [{ type: 'text', text: `Error: No PBIX files found to analyze.${warningText}` }],
                    isError: true,
                };
            }

            const results = discovered.files.map((fp) => analyzePbixFile(fp, {
                includeZipEntries,
                includeMCode: false,
                maxMCodeChars: 2000,
            }));
            const summary = summarizeBatch(results);

            const response = {
                generatedAt: new Date().toISOString(),
                input: {
                    filePaths: filePaths ?? [],
                    directoryPath: directoryPath ?? null,
                    recursive,
                    maxFiles,
                    includeZipEntries,
                },
                summary,
                warnings: discovered.warnings,
                files: results,
            };

            const intro = [
                `PBIX batch analysis completed.`,
                `Processed files: ${summary.fileCount}`,
                `Success: ${summary.successCount}`,
                `Failed: ${summary.failedCount}`,
                `Totals: ${summary.totalPages} pages, ${summary.totalVisuals} visuals, ${summary.totalDataSources} data sources`,
            ].join('\n');

            return textResult(`${intro}\n\n${JSON.stringify(response, null, 2)}`);
        }),
    );

    server.tool(
        'pbix_generate_documentation',
        'Generate documentation from multiple local .pbix files without opening Power BI Desktop. Outputs markdown or JSON.',
        {
            ...batchInputSchema,
            format: z.enum(['markdown', 'json']).default('markdown').describe('Output format'),
            includeZipEntries: z.boolean().default(false).describe('Include ZIP entries per file'),
            includeMCode: z.boolean().default(false).describe('Include truncated M code excerpts per file'),
            maxMCodeChars: z.number().int().min(200).max(20000).default(2000).describe('Maximum M code characters per file'),
        },
        safeTool(async ({ filePaths, directoryPath, recursive, maxFiles, format, includeZipEntries, includeMCode, maxMCodeChars }) => {
            if ((!filePaths || filePaths.length === 0) && !directoryPath) {
                return {
                    content: [{ type: 'text', text: 'Error: Provide filePaths or directoryPath.' }],
                    isError: true,
                };
            }

            const discovered = collectPbixFiles(filePaths, directoryPath, recursive, maxFiles);
            if (discovered.files.length === 0) {
                const warningText = discovered.warnings.length > 0
                    ? `\nWarnings:\n${discovered.warnings.map((w) => `- ${w}`).join('\n')}`
                    : '';
                return {
                    content: [{ type: 'text', text: `Error: No PBIX files found to document.${warningText}` }],
                    isError: true,
                };
            }

            const results = discovered.files.map((fp) => analyzePbixFile(fp, {
                includeZipEntries,
                includeMCode,
                maxMCodeChars,
            }));
            const summary = summarizeBatch(results);

            if (format === 'json') {
                const response = {
                    generatedAt: new Date().toISOString(),
                    input: { filePaths: filePaths ?? [], directoryPath: directoryPath ?? null, recursive, maxFiles, format, includeZipEntries, includeMCode, maxMCodeChars },
                    summary,
                    warnings: discovered.warnings,
                    files: results,
                };
                return textResult(JSON.stringify(response, null, 2));
            }

            const markdown = buildMarkdownDocumentation(results, discovered.warnings, summary);
            return textResult(markdown);
        }),
    );

    // ─── Server info / health check tool ───
    server.tool(
        'server_info',
        'Get Power BI MCP Server info: version, configured capabilities, PBIX root path, and environment status.',
        {},
        safeTool(async () => {
            const pbixRoot = getPbixRoot();
            const hasAzure = !!(process.env.AZURE_TENANT_ID && process.env.AZURE_CLIENT_ID && process.env.AZURE_CLIENT_SECRET);

            const info = {
                server: 'powerbi-mcp',
                version: '1.0.0',
                capabilities: {
                    cloudTools: hasAzure,
                    pbixLocalTools: true,
                    desktopBridge: process.platform === 'win32',
                },
                environment: {
                    platform: process.platform,
                    nodeVersion: process.version,
                    pbixRoot: pbixRoot ?? 'not configured',
                    pbixRootExists: pbixRoot ? existsSync(pbixRoot) : false,
                    azureConfigured: hasAzure,
                },
            };

            return textResult(JSON.stringify(info, null, 2));
        }),
    );
}
