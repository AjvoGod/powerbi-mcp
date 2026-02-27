import { PbixParser } from './pbixParser.js';
import { existsSync, readdirSync, statSync } from 'fs';
import { basename, extname, join } from 'path';
import { resolvePbixPath } from './pbixPath.js';

// ─── Types ───

export interface BatchFileDiscoveryResult {
    files: string[];
    warnings: string[];
}

export interface PbixAnalysisDataSource {
    kind: string;
    name: string;
    connectionString?: string;
}

export interface PbixAnalysisResult {
    filePath: string;
    fileName: string;
    sizeMB?: number;
    version?: string;
    components?: {
        hasDataModel: boolean;
        hasDataMashup: boolean;
        hasLayout: boolean;
        hasMetadata: boolean;
    };
    zipEntryCount?: number;
    zipEntries?: string[];
    pageCount?: number;
    pageNames?: string[];
    pageDetails?: PbixPageDetail[];
    visualCount?: number;
    visualTypes?: Record<string, number>;
    dataSources?: PbixAnalysisDataSource[];
    tableCount?: number;
    measureCount?: number;
    tableNames?: string[];
    measureNames?: string[];
    mCodeExcerpt?: string;
    error?: string;
}

export interface PbixPageDetail {
    name: string;
    visualCount: number;
    visualTypes: string[];
    filters: string[];
}

export interface BatchSummary {
    fileCount: number;
    successCount: number;
    failedCount: number;
    totalSizeMB: number;
    totalPages: number;
    totalVisuals: number;
    totalDataSources: number;
    totalTables: number;
    totalMeasures: number;
}

export interface AnalyzeOptions {
    includeZipEntries: boolean;
    includeMCode: boolean;
    maxMCodeChars: number;
}

export interface ReportDescriptionValidation {
    isValid: boolean;
    checks: number;
    passed: number;
    issues: string[];
}

// ─── Helpers ───

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export function truncateText(text: string, maxChars: number): string {
    if (text.length <= maxChars) {
        return text;
    }
    return `${text.slice(0, maxChars)}\n\n// ... truncated (${text.length - maxChars} chars omitted)`;
}

// ─── File Discovery ───

export function collectPbixFiles(
    filePaths: string[] | undefined,
    directoryPath: string | undefined,
    recursive: boolean,
    maxFiles: number,
): BatchFileDiscoveryResult {
    const files: string[] = [];
    const seen = new Set<string>();
    const warnings: string[] = [];

    const addFile = (candidatePath: string, source: string): void => {
        if (files.length >= maxFiles) {
            return;
        }

        const absolutePath = resolvePbixPath(candidatePath);
        if (!existsSync(absolutePath)) {
            warnings.push(`Path not found (${source}): ${candidatePath}`);
            return;
        }

        let stats;
        try {
            stats = statSync(absolutePath);
        } catch (error) {
            warnings.push(`Cannot access path (${source}): ${candidatePath} (${getErrorMessage(error)})`);
            return;
        }

        if (!stats.isFile()) {
            warnings.push(`Not a file (${source}): ${candidatePath}`);
            return;
        }

        if (extname(absolutePath).toLowerCase() !== '.pbix') {
            warnings.push(`Skipped non-PBIX file (${source}): ${candidatePath}`);
            return;
        }

        if (!seen.has(absolutePath)) {
            seen.add(absolutePath);
            files.push(absolutePath);
        }
    };

    const scanDirectory = (absoluteDirectoryPath: string): void => {
        if (files.length >= maxFiles) {
            return;
        }

        let entries;
        try {
            entries = readdirSync(absoluteDirectoryPath, { withFileTypes: true });
        } catch (error) {
            warnings.push(`Cannot read directory: ${absoluteDirectoryPath} (${getErrorMessage(error)})`);
            return;
        }

        for (const entry of entries) {
            if (files.length >= maxFiles) {
                break;
            }

            const entryPath = join(absoluteDirectoryPath, entry.name);
            if (entry.isDirectory()) {
                if (recursive) {
                    scanDirectory(entryPath);
                }
                continue;
            }

            if (!entry.isFile()) {
                continue;
            }

            if (extname(entry.name).toLowerCase() !== '.pbix') {
                continue;
            }

            if (!seen.has(entryPath)) {
                seen.add(entryPath);
                files.push(entryPath);
            }
        }
    };

    for (const path of filePaths ?? []) {
        addFile(path, 'filePaths');
    }

    if (directoryPath) {
        const absoluteDirectoryPath = resolvePbixPath(directoryPath);
        if (!existsSync(absoluteDirectoryPath)) {
            warnings.push(`Directory not found: ${directoryPath}`);
        } else {
            let directoryStats;
            try {
                directoryStats = statSync(absoluteDirectoryPath);
            } catch (error) {
                warnings.push(`Cannot access directory: ${directoryPath} (${getErrorMessage(error)})`);
                directoryStats = null;
            }

            if (directoryStats?.isDirectory()) {
                scanDirectory(absoluteDirectoryPath);
            } else if (directoryStats) {
                warnings.push(`Not a directory: ${directoryPath}`);
            }
        }
    }

    if (files.length >= maxFiles) {
        warnings.push(`File limit reached (${maxFiles}). Increase maxFiles to process more PBIX files.`);
    }

    files.sort((a, b) => a.localeCompare(b));
    return { files, warnings };
}

// ─── Analysis ───

export function analyzePbixFile(filePath: string, options: AnalyzeOptions): PbixAnalysisResult {
    try {
        const parser = new PbixParser(filePath);
        const info = parser.getInfo();
        const layout = parser.extractLayout();
        const metadata = parser.extractMetadata();
        const dataSources = parser.listDataSources();

        const visualTypeCounts = new Map<string, number>();
        let visualCount = 0;
        const pageNames: string[] = [];
        const pageDetails: PbixPageDetail[] = [];

        for (const page of layout.pages) {
            const pageName = page.displayName || page.name || 'Unnamed';
            pageNames.push(pageName);

            const pageVisualTypes: string[] = [];
            const pageFilters = new Set<string>();

            for (const visual of page.visualContainers) {
                visualCount += 1;
                const type = visual.type || 'unknown';
                visualTypeCounts.set(type, (visualTypeCounts.get(type) || 0) + 1);
                if (visual.type && !pageVisualTypes.includes(visual.type)) {
                    pageVisualTypes.push(visual.type);
                }

                // Extract filter fields from visual config
                if (visual.config) {
                    try {
                        const config = typeof visual.config === 'string' ? JSON.parse(visual.config as string) : visual.config;
                        const sv = config?.singleVisual;
                        if (sv?.projections) {
                            for (const [role, bindings] of Object.entries(sv.projections)) {
                                if (role.toLowerCase().includes('filter') || role === 'Values' || role === 'Category') {
                                    continue;
                                }
                                if (Array.isArray(bindings)) {
                                    for (const b of bindings as Array<Record<string, unknown>>) {
                                        const name = (b as { queryRef?: string })?.queryRef;
                                        if (name) pageFilters.add(name);
                                    }
                                }
                            }
                        }
                        // Also extract from filter entries
                        if (sv?.objects?.general) {
                            for (const obj of Array.isArray(sv.objects.general) ? sv.objects.general : []) {
                                const filterObj = (obj as Record<string, unknown>)?.properties;
                                if (filterObj && typeof filterObj === 'object') {
                                    for (const key of Object.keys(filterObj as Record<string, unknown>)) {
                                        if (key.toLowerCase().includes('filter')) {
                                            pageFilters.add(key);
                                        }
                                    }
                                }
                            }
                        }
                    } catch { /* ignore unparseable configs */ }
                }
            }

            pageDetails.push({
                name: pageName,
                visualCount: page.visualContainers.length,
                visualTypes: pageVisualTypes,
                filters: [...pageFilters],
            });
        }

        const normalizedDataSources: PbixAnalysisDataSource[] = [];
        const seenDataSources = new Set<string>();
        for (const source of dataSources) {
            const normalized = {
                kind: source.kind || 'Unknown',
                name: source.name,
                connectionString: source.connectionString,
            };
            const key = `${normalized.kind}|${normalized.name}|${normalized.connectionString || ''}`;
            if (!seenDataSources.has(key)) {
                seenDataSources.add(key);
                normalizedDataSources.push(normalized);
            }
        }
        normalizedDataSources.sort((a, b) => `${a.kind}:${a.name}`.localeCompare(`${b.kind}:${b.name}`));

        const tableNames = (metadata.tables ?? []).map((table) => table.name).sort((a, b) => a.localeCompare(b));
        const measureNames = (metadata.measures ?? []).map((measure) => measure.name).sort((a, b) => a.localeCompare(b));

        const visualTypes: Record<string, number> = {};
        for (const [type, count] of [...visualTypeCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
            visualTypes[type] = count;
        }

        let mCodeExcerpt: string | undefined;
        if (options.includeMCode) {
            mCodeExcerpt = truncateText(parser.extractMCode(), options.maxMCodeChars);
        }

        return {
            filePath,
            fileName: info.fileName,
            sizeMB: Number((info.fileSizeBytes / 1024 / 1024).toFixed(2)),
            version: info.version,
            components: {
                hasDataModel: info.hasDataModel,
                hasDataMashup: info.hasDataMashup,
                hasLayout: info.hasLayout,
                hasMetadata: info.hasMetadata,
            },
            zipEntryCount: info.entries.length,
            zipEntries: options.includeZipEntries ? info.entries : undefined,
            pageCount: layout.pages.length,
            pageNames,
            pageDetails,
            visualCount,
            visualTypes,
            dataSources: normalizedDataSources,
            tableCount: tableNames.length,
            measureCount: measureNames.length,
            tableNames,
            measureNames,
            mCodeExcerpt,
        };
    } catch (error) {
        return {
            filePath,
            fileName: basename(filePath),
            error: getErrorMessage(error),
        };
    }
}

// ─── Batch Summary ───

export function summarizeBatch(results: PbixAnalysisResult[]): BatchSummary {
    const summary: BatchSummary = {
        fileCount: results.length,
        successCount: 0,
        failedCount: 0,
        totalSizeMB: 0,
        totalPages: 0,
        totalVisuals: 0,
        totalDataSources: 0,
        totalTables: 0,
        totalMeasures: 0,
    };

    for (const result of results) {
        if (result.error) {
            summary.failedCount += 1;
            continue;
        }

        summary.successCount += 1;
        summary.totalSizeMB += result.sizeMB ?? 0;
        summary.totalPages += result.pageCount ?? 0;
        summary.totalVisuals += result.visualCount ?? 0;
        summary.totalDataSources += result.dataSources?.length ?? 0;
        summary.totalTables += result.tableCount ?? 0;
        summary.totalMeasures += result.measureCount ?? 0;
    }

    summary.totalSizeMB = Number(summary.totalSizeMB.toFixed(2));
    return summary;
}

// ─── Markdown Documentation ───

function markdownCell(value: string): string {
    return value.replace(/\|/g, '\\|');
}

export function buildMarkdownDocumentation(
    results: PbixAnalysisResult[],
    warnings: string[],
    summary: BatchSummary,
): string {
    const lines: string[] = [];

    lines.push('# PBIX Documentation');
    lines.push('');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push(`Files analyzed: ${summary.fileCount} (success: ${summary.successCount}, failed: ${summary.failedCount})`);
    lines.push(`Totals: ${summary.totalPages} pages, ${summary.totalVisuals} visuals, ${summary.totalDataSources} data sources`);
    lines.push('');

    if (warnings.length > 0) {
        lines.push('## Warnings');
        lines.push('');
        for (const warning of warnings) {
            lines.push(`- ${warning}`);
        }
        lines.push('');
    }

    lines.push('## Summary');
    lines.push('');
    lines.push('| File | Size (MB) | Pages | Visuals | Data Sources | Tables | Measures | Status |');
    lines.push('|---|---:|---:|---:|---:|---:|---:|---|');
    for (const result of results) {
        const sizeText = result.sizeMB !== undefined ? result.sizeMB.toFixed(2) : '-';
        const pageText = result.pageCount !== undefined ? String(result.pageCount) : '-';
        const visualText = result.visualCount !== undefined ? String(result.visualCount) : '-';
        const sourceText = result.dataSources !== undefined ? String(result.dataSources.length) : '-';
        const tableText = result.tableCount !== undefined ? String(result.tableCount) : '-';
        const measureText = result.measureCount !== undefined ? String(result.measureCount) : '-';
        const status = result.error ? `Error: ${result.error}` : 'OK';
        lines.push(
            `| ${markdownCell(result.fileName)} | ${sizeText} | ${pageText} | ${visualText} | ${sourceText} | ${tableText} | ${measureText} | ${markdownCell(status)} |`,
        );
    }
    lines.push('');

    lines.push('## Details');
    lines.push('');
    for (const result of results) {
        lines.push(`### ${result.fileName}`);
        lines.push('');
        lines.push(`- Path: \`${result.filePath}\``);

        if (result.error) {
            lines.push(`- Error: ${result.error}`);
            lines.push('');
            continue;
        }

        lines.push(`- Size (MB): ${result.sizeMB?.toFixed(2) ?? 'N/A'}`);
        lines.push(`- Version: ${result.version || 'N/A'}`);
        lines.push(`- ZIP entries: ${result.zipEntryCount ?? 0}`);
        lines.push(
            `- Components: DataModel=${result.components?.hasDataModel ? 'yes' : 'no'}, DataMashup=${result.components?.hasDataMashup ? 'yes' : 'no'}, Layout=${result.components?.hasLayout ? 'yes' : 'no'}, Metadata=${result.components?.hasMetadata ? 'yes' : 'no'}`,
        );
        lines.push(`- Pages: ${result.pageCount ?? 0}`);
        lines.push(`- Visuals: ${result.visualCount ?? 0}`);

        if (result.visualTypes && Object.keys(result.visualTypes).length > 0) {
            lines.push('- Visual types:');
            for (const [type, count] of Object.entries(result.visualTypes)) {
                lines.push(`  - ${type}: ${count}`);
            }
        }

        if (result.dataSources && result.dataSources.length > 0) {
            lines.push('- Data sources:');
            for (const source of result.dataSources) {
                let line = `  - ${source.kind}: ${source.name}`;
                if (source.connectionString) {
                    line += ` (${source.connectionString})`;
                }
                lines.push(line);
            }
        } else {
            lines.push('- Data sources: none detected');
        }

        lines.push(`- Tables (${result.tableCount ?? 0}): ${(result.tableNames ?? []).join(', ') || 'none'}`);
        lines.push(`- Measures (${result.measureCount ?? 0}): ${(result.measureNames ?? []).join(', ') || 'none'}`);

        if (result.zipEntries && result.zipEntries.length > 0) {
            lines.push('- ZIP entries:');
            for (const entry of result.zipEntries) {
                lines.push(`  - ${entry}`);
            }
        }

        if (result.mCodeExcerpt) {
            lines.push('- M code excerpt:');
            lines.push('```m');
            lines.push(result.mCodeExcerpt);
            lines.push('```');
        }

        lines.push('');
    }

    return lines.join('\n');
}

// ─── Report Description (Prompt for AI) ───

export function buildReportDescription(result: PbixAnalysisResult): string {
    if (result.error) {
        return `Chyba při analýze ${result.fileName}: ${result.error}`;
    }

    const lines: string[] = [];

    // ─── Header ───
    lines.push(`# Popis reportu: ${result.fileName}`);
    lines.push('');

    // ─── Extracted data for AI context ───
    lines.push('## Extrahovaná data z PBIX');
    lines.push('');
    lines.push(`- **Metadata verze:** ${result.version || 'N/A'}`);
    lines.push(`- **Tabulek:** ${result.tableCount ?? 0}`);
    lines.push(`- **Měr:** ${result.measureCount ?? 0}`);
    lines.push(`- **Stránek:** ${result.pageCount ?? 0}`);
    lines.push(`- **Vizuálů celkem:** ${result.visualCount ?? 0}`);

    // Data sources
    if (result.dataSources && result.dataSources.length > 0) {
        const sourceKinds = [...new Set(result.dataSources.map((s) => s.kind))];
        lines.push(`- **Datové zdroje:** ${sourceKinds.join(', ')}`);
        for (const source of result.dataSources) {
            lines.push(`  - ${source.kind}: ${source.name}${source.connectionString ? ` (${source.connectionString})` : ''}`);
        }
    } else {
        lines.push('- **Datové zdroje:** žádné detekované v M kódu (report pravděpodobně běží nad již publikovaným modelem/datasetem)');
    }
    lines.push('');

    // Pages with details
    if (result.pageNames && result.pageNames.length > 0) {
        lines.push('### Stránky reportu:');
        lines.push('');
        if (result.pageDetails) {
            for (const page of result.pageDetails) {
                let pageInfo = `- **${page.name}** (${page.visualCount} vizuálů`;
                if (page.visualTypes.length > 0) {
                    pageInfo += `: ${page.visualTypes.join(', ')}`;
                }
                pageInfo += ')';
                lines.push(pageInfo);
                if (page.filters.length > 0) {
                    lines.push(`  - Filtry/pole: ${page.filters.join(', ')}`);
                }
            }
        } else {
            lines.push(result.pageNames.join(', '));
        }
        lines.push('');
    }

    // Measures
    if (result.measureNames && result.measureNames.length > 0) {
        lines.push('### Míry:');
        lines.push('');
        for (const measure of result.measureNames) {
            lines.push(`- ${measure}`);
        }
        lines.push('');
    }

    // M code
    if (result.mCodeExcerpt && !result.mCodeExcerpt.includes('No DataMashup found')) {
        lines.push('### M kód (excerpt):');
        lines.push('```m');
        lines.push(result.mCodeExcerpt);
        lines.push('```');
        lines.push('');
    }

    // ─── AI prompt ───
    lines.push('---');
    lines.push('');
    lines.push('## Instrukce pro AI asistenta');
    lines.push('');
    lines.push('Na základě výše uvedených technických dat vytvoř intranetový popis reportu v češtině.');
    lines.push('Dodrž přesně formát, pravidla a self-check.');
    lines.push('');
    lines.push('```');
    lines.push('VSTUP:');
    lines.push('- Název reportu: [název z podkladů]');
    lines.push('- Stránky: [seznam stránek z podkladů]');
    lines.push('- Filtry/pole: [seznam filtrů/polí z podkladů]');
    lines.push('- Míry: [seznam měr z podkladů]');
    lines.push('- Technická fakta: [metadata, zdroje, refresh, bezpečnost z podkladů]');
    lines.push('');
    lines.push('POVOLENÝ VÝSTUP: pouze 4 sekce v tomto pořadí, bez dalších nadpisů:');
    lines.push('Business popis');
    lines.push('Technický popis');
    lines.push('Filtry');
    lines.push('Míry');
    lines.push('');
    lines.push('TVRDÁ PRAVIDLA:');
    lines.push('- Nikde neuváděj tabulky ani názvy tabulek.');
    lines.push('- Ignoruj technické placeholdery (např. "filter", "unknown"), pokud nemají business význam.');
    lines.push('- Nevymýšlej zdroje/systémy; co není ve vstupu, označ jako "neuvedeno".');
    lines.push('- Odhad vždy označ "(odvozeno z názvu)" nebo "(pravděpodobné)".');
    lines.push('');
    lines.push('FORMÁT:');
    lines.push('- Business popis: 6-8 vět + podnadpis "Struktura stránek (co na nich typicky je)" + 1 odrážka na stránku.');
    lines.push('- Technický popis: 4-6 vět.');
    lines.push('- Filtry: každá odrážka přesně:');
    lines.push('  - {Filtr}: Ovlivňuje {co}. Interpretace: {jak číst}.');
    lines.push('- Míry: každá odrážka přesně:');
    lines.push('  - {Míra}: Měří {co}. Interpretace: {jak číst}. Použití: {(pravděpodobně) stránka/kontext}.');
    lines.push('');
    lines.push('SELF-CHECK PŘED ODEVZDÁNÍM:');
    lines.push('1. Jsou přesně 4 sekce a ve správném pořadí?');
    lines.push('2. Neobsahuje výstup tabulky ani názvy tabulek?');
    lines.push('3. Jsou pokryté všechny míry ze vstupu?');
    lines.push('4. Pokud něco chybí ve vstupu, je použito "neuvedeno"?');
    lines.push('Pokud některý bod neplatí, oprav výstup a zkontroluj znovu.');
    lines.push('```');

    return lines.join('\n');
}

export function validateReportDescriptionOutput(
    description: string,
    analysis: PbixAnalysisResult,
): ReportDescriptionValidation {
    const issues: string[] = [];
    let checks = 0;
    let passed = 0;

    const requireContains = (needle: string, issue: string): void => {
        checks += 1;
        if (description.includes(needle)) {
            passed += 1;
        } else {
            issues.push(issue);
        }
    };

    requireContains('## Instrukce pro AI asistenta', 'Chybí sekce "Instrukce pro AI asistenta".');
    requireContains(
        'POVOLENÝ VÝSTUP: pouze 4 sekce v tomto pořadí, bez dalších nadpisů:',
        'Chybí pravidlo pro povolený výstup se 4 sekcemi.',
    );
    requireContains('TVRDÁ PRAVIDLA:', 'Chybí sekce "TVRDÁ PRAVIDLA".');
    requireContains(
        '- Nikde neuváděj tabulky ani názvy tabulek.',
        'Chybí zákaz uvádění tabulek v promptu.',
    );
    requireContains('SELF-CHECK PŘED ODEVZDÁNÍM:', 'Chybí sekce "SELF-CHECK PŘED ODEVZDÁNÍM".');

    checks += 1;
    const outputOrderPattern = /POVOLENÝ VÝSTUP:[^\n]*\nBusiness popis\nTechnický popis\nFiltry\nMíry/;
    if (outputOrderPattern.test(description)) {
        passed += 1;
    } else {
        issues.push('Sekce Business popis/Technický popis/Filtry/Míry nejsou v požadovaném pořadí.');
    }

    const measures = analysis.measureNames ?? [];
    for (const measure of measures) {
        checks += 1;
        if (description.includes(`- ${measure}`)) {
            passed += 1;
        } else {
            issues.push(`V části podkladů chybí míra: ${measure}`);
        }
    }

    return {
        isValid: issues.length === 0,
        checks,
        passed,
        issues,
    };
}
