/**
 * Low-level helpers for extracting metadata (tables, measures) from
 * parsed PBIX JSON structures.  Extracted from PbixParser to keep the
 * main parser focused on ZIP / M-code / layout extraction.
 */

// ─── Utility helpers ───

export function asRecord(value: unknown): Record<string, unknown> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return null;
    }
    return value as Record<string, unknown>;
}

export function readString(value: unknown): string | undefined {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return String(value);
    }
    return undefined;
}

export function readArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

export function tryParseJsonObject(text: string): Record<string, unknown> | null {
    try {
        const parsed = JSON.parse(text) as unknown;
        return asRecord(parsed);
    } catch {
        return null;
    }
}

// ─── Table extraction ───

export function extractTablesFromMetadataObject(
    metadataObject: Record<string, unknown>,
): { name: string; id?: string }[] {
    const tables = new Map<string, { name: string; id?: string }>();
    const add = (name: unknown, id?: unknown): void => {
        const normalizedName = readString(name)?.trim();
        if (!normalizedName) {
            return;
        }
        const normalizedId = readString(id);
        const existing = tables.get(normalizedName);
        if (!existing || (!existing.id && normalizedId)) {
            tables.set(normalizedName, { name: normalizedName, id: normalizedId });
        }
    };

    const collectFromTablesArray = (items: unknown[]): void => {
        for (const item of items) {
            const table = asRecord(item);
            if (!table) continue;
            const tableName = readString(table.name) || readString(table.Name);
            const tableId = readString(table.id) || readString(table.ID);
            add(tableName, tableId);
        }
    };

    const collectFromTablesObject = (items: Record<string, unknown>): void => {
        for (const [name, value] of Object.entries(items)) {
            const table = asRecord(value);
            const tableId = table ? readString(table.id) || readString(table.ID) : undefined;
            add(name, tableId);
        }
    };

    const topLevelTables = metadataObject.tables ?? metadataObject.Tables;
    if (Array.isArray(topLevelTables)) {
        collectFromTablesArray(topLevelTables);
    } else {
        const tableObject = asRecord(topLevelTables);
        if (tableObject) {
            collectFromTablesObject(tableObject);
        }
    }

    const modelObject = asRecord(metadataObject.model) || asRecord(metadataObject.Model);
    if (modelObject) {
        const modelTables = modelObject.tables ?? modelObject.Tables;
        if (Array.isArray(modelTables)) {
            collectFromTablesArray(modelTables);
        } else {
            const tableObject = asRecord(modelTables);
            if (tableObject) {
                collectFromTablesObject(tableObject);
            }
        }
    }

    const entities = metadataObject.entities ?? metadataObject.Entities;
    if (Array.isArray(entities)) {
        for (const entity of entities) {
            const entityObject = asRecord(entity);
            if (!entityObject) continue;
            add(readString(entityObject.name) || readString(entityObject.Name));
        }
    } else {
        const entityObject = asRecord(entities);
        if (entityObject) {
            for (const [name] of Object.entries(entityObject)) {
                add(name);
            }
        }
    }

    return [...tables.values()];
}

// ─── Measure extraction ───

export function extractMeasuresFromMetadataObject(
    metadataObject: Record<string, unknown>,
): { name: string; tableName?: string }[] {
    const measures = new Map<string, { name: string; tableName?: string }>();
    const add = (name: unknown, tableName?: unknown): void => {
        const normalizedName = readString(name)?.trim();
        if (!normalizedName) return;
        const normalizedTable = readString(tableName)?.trim();
        const key = `${normalizedTable || ''}|${normalizedName}`;
        if (!measures.has(key)) {
            measures.set(key, { name: normalizedName, tableName: normalizedTable || undefined });
        }
    };

    const collectFromMeasureArray = (items: unknown[], defaultTableName?: string): void => {
        for (const item of items) {
            const measure = asRecord(item);
            if (!measure) continue;
            const name = readString(measure.name) || readString(measure.Name);
            const tableName = readString(measure.tableName)
                || readString(measure.table)
                || readString(measure.TableName)
                || defaultTableName;
            add(name, tableName);
        }
    };

    const collectFromMeasureObject = (items: Record<string, unknown>, defaultTableName?: string): void => {
        for (const [name, value] of Object.entries(items)) {
            const measure = asRecord(value);
            const tableName = measure
                ? readString(measure.tableName)
                || readString(measure.table)
                || readString(measure.TableName)
                || defaultTableName
                : defaultTableName;
            add(name, tableName);
        }
    };

    const topLevelMeasures = metadataObject.measures ?? metadataObject.Measures;
    if (Array.isArray(topLevelMeasures)) {
        collectFromMeasureArray(topLevelMeasures);
    } else {
        const measureObject = asRecord(topLevelMeasures);
        if (measureObject) {
            collectFromMeasureObject(measureObject);
        }
    }

    const modelObject = asRecord(metadataObject.model) || asRecord(metadataObject.Model);
    if (modelObject) {
        const modelMeasures = modelObject.measures ?? modelObject.Measures;
        if (Array.isArray(modelMeasures)) {
            collectFromMeasureArray(modelMeasures);
        } else {
            const measureObject = asRecord(modelMeasures);
            if (measureObject) {
                collectFromMeasureObject(measureObject);
            }
        }

        const modelTables = modelObject.tables ?? modelObject.Tables;
        if (Array.isArray(modelTables)) {
            for (const item of modelTables) {
                const table = asRecord(item);
                if (!table) continue;
                const tableName = readString(table.name) || readString(table.Name);
                const tableMeasures = table.measures ?? table.Measures;
                if (Array.isArray(tableMeasures)) {
                    collectFromMeasureArray(tableMeasures, tableName);
                } else {
                    const tableMeasureObject = asRecord(tableMeasures);
                    if (tableMeasureObject) {
                        collectFromMeasureObject(tableMeasureObject, tableName);
                    }
                }
            }
        }
    }

    return [...measures.values()];
}

// ─── Semantic query extraction (from report layout visuals) ───

export function extractSourceNameFromExpression(expression: unknown): string | undefined {
    const expressionObject = asRecord(expression);
    if (!expressionObject) return undefined;

    const sourceRef = asRecord(expressionObject.SourceRef);
    if (sourceRef) {
        return readString(sourceRef.Source) || readString(sourceRef.Entity);
    }

    const column = asRecord(expressionObject.Column);
    if (column) return extractSourceNameFromExpression(column.Expression);

    const measure = asRecord(expressionObject.Measure);
    if (measure) return extractSourceNameFromExpression(measure.Expression);

    const aggregation = asRecord(expressionObject.Aggregation);
    if (aggregation) return extractSourceNameFromExpression(aggregation.Expression);

    return undefined;
}

export function collectFromSemanticQuery(
    queryLike: unknown,
    sourceToEntity: Map<string, string>,
    addTable: (name: string | undefined) => void,
    addMeasure: (name: string | undefined, tableName?: string) => void,
): void {
    const queryObject = asRecord(queryLike);
    if (!queryObject) return;

    const fromEntries = readArray(queryObject.From);
    for (const fromEntry of fromEntries) {
        const fromObject = asRecord(fromEntry);
        if (!fromObject) continue;
        const sourceName = readString(fromObject.Name);
        const entityName = readString(fromObject.Entity);
        if (sourceName && entityName) {
            sourceToEntity.set(sourceName, entityName);
            addTable(entityName);
        } else if (entityName) {
            addTable(entityName);
        }
    }

    const selectEntries = readArray(queryObject.Select);
    for (const selectEntry of selectEntries) {
        const selectObject = asRecord(selectEntry);
        if (!selectObject) continue;

        const explicitMeasure = asRecord(selectObject.Measure);
        if (explicitMeasure) {
            const measureName = readString(explicitMeasure.Property) || readString(selectObject.Name);
            const sourceName = extractSourceNameFromExpression(explicitMeasure.Expression);
            const tableName = sourceName ? (sourceToEntity.get(sourceName) || sourceName) : undefined;
            addTable(tableName);
            addMeasure(measureName, tableName);
            continue;
        }

        const aggregation = asRecord(selectObject.Aggregation);
        if (aggregation) {
            const metricName = readString(selectObject.Name);
            const sourceName = extractSourceNameFromExpression(aggregation.Expression);
            const tableName = sourceName ? (sourceToEntity.get(sourceName) || sourceName) : undefined;
            addTable(tableName);
            addMeasure(metricName, tableName);
            continue;
        }

        const column = asRecord(selectObject.Column);
        if (column) {
            const sourceName = extractSourceNameFromExpression(column.Expression);
            const tableName = sourceName ? (sourceToEntity.get(sourceName) || sourceName) : undefined;
            addTable(tableName);
        }
    }
}

// ─── Diagram layout extraction ───

export function extractTablesFromDiagramLayout(
    diagramObject: Record<string, unknown>,
): { name: string; id?: string }[] {
    const diagrams = readArray(diagramObject.diagrams);
    const tableNames = new Set<string>();
    for (const diagram of diagrams) {
        const diagramRecord = asRecord(diagram);
        if (!diagramRecord) continue;
        const nodes = readArray(diagramRecord.nodes);
        for (const node of nodes) {
            const nodeRecord = asRecord(node);
            if (!nodeRecord) continue;
            const nodeName = readString(nodeRecord.nodeIndex);
            const normalized = nodeName?.trim();
            if (normalized) tableNames.add(normalized);
        }
    }
    return [...tableNames].sort((a, b) => a.localeCompare(b)).map((name) => ({ name }));
}
