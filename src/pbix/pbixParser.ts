import AdmZip from 'adm-zip';
import { statSync } from 'fs';
import { basename } from 'path';
import type {
    PbixInfo,
    PbixLayout,
    PbixPage,
    PbixVisual,
    PbixDataSource,
    PbixMetadata,
} from '../api/types.js';
import {
    asRecord,
    readString,
    readArray,
    tryParseJsonObject,
    extractTablesFromMetadataObject,
    extractMeasuresFromMetadataObject,
    extractTablesFromDiagramLayout,
    collectFromSemanticQuery,
} from './metadataExtractor.js';

export class PbixParser {
    private zip: AdmZip;
    private filePath: string;
    private fileSizeBytes: number;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.fileSizeBytes = statSync(filePath).size;
        this.zip = new AdmZip(filePath);
    }

    /** Get overview info about the PBIX file */
    getInfo(): PbixInfo {
        const entries = this.zip.getEntries().map((e) => e.entryName);

        let version: string | undefined;
        try {
            const versionEntry = this.zip.getEntry('Version');
            if (versionEntry) {
                version = versionEntry.getData().toString('utf-8').trim();
            }
        } catch { /* ignore */ }

        let contentTypes: string | undefined;
        try {
            const ctEntry = this.zip.getEntry('[Content_Types].xml');
            if (ctEntry) {
                contentTypes = ctEntry.getData().toString('utf-8');
            }
        } catch { /* ignore */ }

        return {
            fileName: basename(this.filePath),
            fileSizeBytes: this.fileSizeBytes,
            entries,
            hasDataModel: entries.some((e) => e === 'DataModel'),
            hasDataMashup: entries.some((e) => e === 'DataMashup'),
            hasLayout: entries.some((e) => e.includes('Layout') || e.includes('Report/Layout')),
            hasMetadata: entries.some((e) => e === 'Metadata'),
            version,
            contentTypes,
        };
    }

    /** Extract Power Query (M) code from DataMashup */
    extractMCode(): string {
        const mashupEntry = this.zip.getEntry('DataMashup');
        if (!mashupEntry) {
            return 'No DataMashup found in this PBIX file.';
        }

        const data = mashupEntry.getData();

        // DataMashup is itself a ZIP-like structure
        try {
            const innerZip = new AdmZip(data);
            const section = innerZip.getEntry('Formulas/Section1.m');
            if (section) {
                return section.getData().toString('utf-8');
            }

            for (const entry of innerZip.getEntries()) {
                if (entry.entryName.endsWith('.m')) {
                    return `// File: ${entry.entryName}\n${entry.getData().toString('utf-8')}`;
                }
            }
        } catch {
            const text = data.toString('utf-8');
            const mCodeMatch = text.match(/section Section1;[\s\S]*$/m);
            if (mCodeMatch) {
                return mCodeMatch[0];
            }
            const sharedMatch = text.match(/shared\s+[\s\S]*$/m);
            if (sharedMatch) {
                return sharedMatch[0];
            }
        }

        return 'DataMashup found but could not extract M code. The format may not be supported.';
    }

    /** Extract report layout (pages, visuals) */
    extractLayout(): PbixLayout {
        const layoutPaths = ['Report/Layout', 'ReportLayout', 'Layout'];
        let layoutData: string | null = null;

        for (const path of layoutPaths) {
            const entry = this.zip.getEntry(path);
            if (entry) {
                const rawData = entry.getData();
                layoutData = this.decodeLayoutBuffer(rawData);
                break;
            }
        }

        if (!layoutData) {
            return { pages: [] };
        }

        try {
            const layout = JSON.parse(layoutData);
            const pages: PbixPage[] = [];

            if (layout.sections && Array.isArray(layout.sections)) {
                for (const section of layout.sections) {
                    const visuals: PbixVisual[] = [];

                    if (section.visualContainers && Array.isArray(section.visualContainers)) {
                        for (const vc of section.visualContainers) {
                            let visualConfig: Record<string, unknown> | undefined;
                            let visualType: string | undefined;

                            if (vc.config) {
                                try {
                                    const config = JSON.parse(vc.config);
                                    visualConfig = config;
                                    visualType = config?.singleVisual?.visualType;
                                } catch { /* ignore */ }
                            }

                            visuals.push({
                                x: vc.x ?? 0,
                                y: vc.y ?? 0,
                                width: vc.width ?? 0,
                                height: vc.height ?? 0,
                                type: visualType,
                                config: visualConfig,
                            });
                        }
                    }

                    pages.push({
                        name: section.name ?? '',
                        displayName: section.displayName ?? section.name ?? '',
                        ordinal: section.ordinal ?? 0,
                        visualContainers: visuals,
                    });
                }
            }

            return {
                reportId: layout.id,
                pages,
                config: layout.config ? (() => {
                    try { return JSON.parse(layout.config); } catch { return undefined; }
                })() : undefined,
            };
        } catch {
            return { pages: [] };
        }
    }

    /** Extract metadata (tables, measures mapping) */
    extractMetadata(): PbixMetadata {
        const tablesByName = new Map<string, { name: string; id?: string }>();
        const measuresByKey = new Map<string, { name: string; tableName?: string }>();
        let version: string | undefined;

        const mergeTables = (tables: { name: string; id?: string }[]): void => {
            for (const table of tables) {
                const name = table.name.trim();
                if (!name) continue;
                const existing = tablesByName.get(name);
                if (!existing || (!existing.id && table.id)) {
                    tablesByName.set(name, { name, id: table.id });
                }
            }
        };

        const mergeMeasures = (measures: { name: string; tableName?: string }[]): void => {
            for (const measure of measures) {
                const name = measure.name.trim();
                if (!name) continue;
                const tableName = measure.tableName?.trim();
                const key = `${tableName || ''}|${name}`;
                if (!measuresByKey.has(key)) {
                    measuresByKey.set(key, { name, tableName: tableName || undefined });
                }
            }
        };

        const metadataEntry = this.zip.getEntry('Metadata');
        if (metadataEntry) {
            try {
                const metadataText = this.decodeLayoutBuffer(metadataEntry.getData());
                const metadataObject = tryParseJsonObject(metadataText);
                if (metadataObject) {
                    mergeTables(extractTablesFromMetadataObject(metadataObject));
                    mergeMeasures(extractMeasuresFromMetadataObject(metadataObject));

                    const rawVersion = readString(metadataObject.Version) || readString(metadataObject.version);
                    if (rawVersion) {
                        version = rawVersion;
                    }
                }
            } catch {
                // Keep graceful fallback behavior for malformed/unsupported metadata payloads.
            }
        }

        // Cloud-created PBIX files often keep semantic references in report layout metadata.
        if (tablesByName.size === 0 || measuresByKey.size === 0) {
            const layoutMetadata = this.extractMetadataFromReportLayout();
            mergeTables(layoutMetadata.tables);
            mergeMeasures(layoutMetadata.measures);
        }

        // Diagram layout provides additional table labels useful when model metadata is sparse.
        if (tablesByName.size === 0) {
            const diagramEntry = this.zip.getEntry('DiagramLayout');
            if (diagramEntry) {
                const diagramObject = tryParseJsonObject(this.decodeLayoutBuffer(diagramEntry.getData()));
                if (diagramObject) {
                    mergeTables(extractTablesFromDiagramLayout(diagramObject));
                }
            }
        }

        return {
            version,
            tables: [...tablesByName.values()].sort((a, b) => a.name.localeCompare(b.name)),
            measures: [...measuresByKey.values()].sort((a, b) => {
                const left = `${a.tableName || ''}.${a.name}`;
                const right = `${b.tableName || ''}.${b.name}`;
                return left.localeCompare(right);
            }),
        };
    }

    /** List data sources extracted from M code */
    listDataSources(): PbixDataSource[] {
        const mCode = this.extractMCode();
        const sources: PbixDataSource[] = [];

        if (!mCode || mCode.includes('could not extract')) {
            return sources;
        }

        const patterns = [
            /Sql\.Database\s*\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g,
            /Web\.Contents\s*\(\s*"([^"]+)"/g,
            /Excel\.Workbook\s*\(\s*File\.Contents\s*\(\s*"([^"]+)"/g,
            /SharePoint\.\w+\s*\(\s*"([^"]+)"/g,
            /OData\.Feed\s*\(\s*"([^"]+)"/g,
            /Csv\.Document\s*\(\s*File\.Contents\s*\(\s*"([^"]+)"/g,
            /Oracle\.Database\s*\(\s*"([^"]+)"/g,
            /PostgreSQL\.Database\s*\(\s*"([^"]+)"/g,
            /MySQL\.Database\s*\(\s*"([^"]+)"/g,
        ];

        const kindNames = [
            'SQL Server', 'Web', 'Excel', 'SharePoint', 'OData', 'CSV', 'Oracle', 'PostgreSQL', 'MySQL',
        ];

        for (let i = 0; i < patterns.length; i++) {
            let match;
            while ((match = patterns[i].exec(mCode)) !== null) {
                sources.push({
                    name: match[0].substring(0, 80) + '...',
                    kind: kindNames[i],
                    connectionString: match[1] + (match[2] ? ` / ${match[2]}` : ''),
                });
            }
        }

        const sharedPattern = /shared\s+(?:#"([^"]+)"|(\w+))\s*=/g;
        let sharedMatch;
        while ((sharedMatch = sharedPattern.exec(mCode)) !== null) {
            const queryName = sharedMatch[1] || sharedMatch[2];
            sources.push({
                name: queryName,
                kind: 'Query',
                mExpression: this.extractQueryExpression(mCode, queryName),
            });
        }

        return sources;
    }

    /** Compare with another PBIX file */
    compareTo(otherPath: string): object {
        const other = new PbixParser(otherPath);
        const thisInfo = this.getInfo();
        const otherInfo = other.getInfo();
        const thisLayout = this.extractLayout();
        const otherLayout = other.extractLayout();

        const thisEntries = new Set(thisInfo.entries);
        const otherEntries = new Set(otherInfo.entries);

        return {
            file1: { name: thisInfo.fileName, size: thisInfo.fileSizeBytes },
            file2: { name: otherInfo.fileName, size: otherInfo.fileSizeBytes },
            entriesOnlyInFile1: thisInfo.entries.filter((e) => !otherEntries.has(e)),
            entriesOnlyInFile2: otherInfo.entries.filter((e) => !thisEntries.has(e)),
            pages: {
                file1: thisLayout.pages.map((p) => ({
                    name: p.displayName,
                    visuals: p.visualContainers.length,
                })),
                file2: otherLayout.pages.map((p) => ({
                    name: p.displayName,
                    visuals: p.visualContainers.length,
                })),
            },
            pageCountDiff: thisLayout.pages.length - otherLayout.pages.length,
        };
    }

    // ─── Private helpers ───

    private decodeLayoutBuffer(buffer: Buffer): string {
        if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
            return buffer.toString('utf16le').substring(1);
        }
        if (buffer.length >= 2 && buffer[1] === 0x00) {
            return buffer.toString('utf16le');
        }
        return buffer.toString('utf-8');
    }

    private extractMetadataFromReportLayout(): {
        tables: { name: string; id?: string }[];
        measures: { name: string; tableName?: string }[];
    } {
        const layoutPaths = ['Report/Layout', 'ReportLayout', 'Layout'];
        const tableNames = new Set<string>();
        const measures = new Map<string, { name: string; tableName?: string }>();

        const addTable = (name: string | undefined): void => {
            const normalized = name?.trim();
            if (normalized) tableNames.add(normalized);
        };
        const addMeasure = (name: string | undefined, tableName?: string): void => {
            const normalized = name?.trim();
            if (!normalized) return;
            const normalizedTable = tableName?.trim();
            const key = `${normalizedTable || ''}|${normalized}`;
            if (!measures.has(key)) {
                measures.set(key, { name: normalized, tableName: normalizedTable || undefined });
            }
        };

        for (const path of layoutPaths) {
            const entry = this.zip.getEntry(path);
            if (!entry) continue;

            const layoutObject = tryParseJsonObject(this.decodeLayoutBuffer(entry.getData()));
            if (!layoutObject) continue;

            const sections = readArray(layoutObject.sections);
            for (const section of sections) {
                const sectionObject = asRecord(section);
                if (!sectionObject) continue;

                const visualContainers = readArray(sectionObject.visualContainers);
                for (const visualContainer of visualContainers) {
                    const visualObject = asRecord(visualContainer);
                    if (!visualObject) continue;

                    const sourceToEntity = new Map<string, string>();

                    const configText = readString(visualObject.config);
                    if (configText) {
                        const configObject = tryParseJsonObject(configText);
                        const singleVisual = configObject
                            ? asRecord(configObject.singleVisual) || asRecord(configObject.singleVisualGroup)
                            : null;
                        const prototypeQuery = singleVisual ? singleVisual.prototypeQuery : null;
                        if (prototypeQuery) {
                            collectFromSemanticQuery(prototypeQuery, sourceToEntity, addTable, addMeasure);
                        }
                    }

                    const queryText = readString(visualObject.query);
                    if (queryText) {
                        const queryObject = tryParseJsonObject(queryText);
                        const commands = queryObject ? readArray(queryObject.Commands) : [];
                        for (const command of commands) {
                            const commandObject = asRecord(command);
                            const dataShape = commandObject
                                ? asRecord(commandObject.SemanticQueryDataShapeCommand)
                                : null;
                            const semanticQuery = dataShape ? dataShape.Query : null;
                            if (semanticQuery) {
                                collectFromSemanticQuery(semanticQuery, sourceToEntity, addTable, addMeasure);
                            }
                        }
                    }
                }
            }

            break;
        }

        return {
            tables: [...tableNames].sort((a, b) => a.localeCompare(b)).map((name) => ({ name })),
            measures: [...measures.values()].sort((a, b) => {
                const left = `${a.tableName || ''}.${a.name}`;
                const right = `${b.tableName || ''}.${b.name}`;
                return left.localeCompare(right);
            }),
        };
    }

    private extractQueryExpression(mCode: string, queryName: string): string {
        const escapedName = queryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(
            `shared\\s+(?:#"${escapedName}"|${escapedName})\\s*=\\s*([\\s\\S]*?)(?=\\nshared\\s|$)`,
        );
        const match = pattern.exec(mCode);
        if (match) {
            return match[1].trim().replace(/;\s*$/, '');
        }
        return '';
    }
}
