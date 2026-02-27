// ─── Power BI REST API Type Definitions ───

export interface Workspace {
    id: string;
    name: string;
    isReadOnly: boolean;
    isOnDedicatedCapacity: boolean;
    type: string;
    state?: string;
    capacityId?: string;
}

export interface Dataset {
    id: string;
    name: string;
    webUrl?: string;
    addRowsAPIEnabled: boolean;
    configuredBy?: string;
    isRefreshable: boolean;
    isEffectiveIdentityRequired: boolean;
    isEffectiveIdentityRolesRequired: boolean;
    isOnPremGatewayRequired: boolean;
    targetStorageMode?: string;
    createdDate?: string;
    contentProviderType?: string;
    upstreamDatasets?: { datasetId: string; workspaceId: string }[];
}

export interface Table {
    name: string;
    columns: Column[];
    measures?: Measure[];
    rows?: unknown[];
    isHidden?: boolean;
    description?: string;
    source?: { type: string; expression: string }[];
}

export interface Column {
    name: string;
    dataType: string;
    isHidden?: boolean;
    columnType?: string;
    description?: string;
}

export interface Measure {
    name: string;
    expression: string;
    description?: string;
    isHidden?: boolean;
    formatString?: string;
}

export interface Report {
    id: string;
    name: string;
    webUrl?: string;
    embedUrl?: string;
    datasetId?: string;
    reportType?: string;
    createdDateTime?: string;
    modifiedDateTime?: string;
    modifiedBy?: string;
}

export interface ReportPage {
    name: string;
    displayName: string;
    order?: number;
}

export interface Dashboard {
    id: string;
    displayName: string;
    webUrl?: string;
    embedUrl?: string;
    isReadOnly: boolean;
}

export interface DashboardTile {
    id: string;
    title: string;
    embedUrl?: string;
    rowSpan?: number;
    colSpan?: number;
    reportId?: string;
    datasetId?: string;
}

export interface Dataflow {
    objectId: string;
    name: string;
    description?: string;
    modelUrl?: string;
    configuredBy?: string;
    modifiedBy?: string;
    modifiedDateTime?: string;
}

export interface Gateway {
    id: string;
    name: string;
    type: string;
    publicKey?: { exponent: string; modulus: string };
    gatewayAnnotation?: string;
}

export interface GatewayDatasource {
    id: string;
    gatewayId: string;
    datasourceType: string;
    connectionDetails: string;
    credentialType?: string;
    datasourceName?: string;
}

export interface Capacity {
    id: string;
    displayName: string;
    sku: string;
    state: string;
    region?: string;
    admins?: string[];
}

export interface Refresh {
    requestId?: string;
    id?: number;
    refreshType?: string;
    startTime: string;
    endTime?: string;
    status: string;
    serviceExceptionJson?: string;
}

export interface RefreshSchedule {
    days?: string[];
    times?: string[];
    localTimeZoneId?: string;
    notifyOption?: string;
    enabled: boolean;
}

export interface DatasetParameter {
    name: string;
    type: string;
    isRequired: boolean;
    currentValue?: string;
    suggestedValues?: string[];
}

export interface DataSource {
    datasourceType: string;
    connectionDetails: {
        server?: string;
        database?: string;
        url?: string;
        path?: string;
    };
    datasourceId?: string;
    gatewayId?: string;
    name?: string;
}

export interface ActivityEvent {
    id: string;
    creationTime: string;
    activity: string;
    userId?: string;
    datasetName?: string;
    reportName?: string;
    workspaceName?: string;
    artifactName?: string;
}

export interface WorkspaceUser {
    identifier: string;
    emailAddress?: string;
    displayName?: string;
    groupUserAccessRight: string;
    principalType: string;
}

export interface ExportRequest {
    format: 'PDF' | 'PPTX' | 'PNG';
    powerBIReportConfiguration?: {
        pages?: { pageName: string }[];
        defaultBookmark?: { name: string };
    };
}

export interface ExportStatus {
    id: string;
    createdDateTime: string;
    lastActionDateTime: string;
    status: string;
    percentComplete: number;
    reportName: string;
    reportId: string;
    resourceLocation?: string;
    resourceFileExtension?: string;
    expirationTime?: string;
}

// ─── PBIX local analysis types ───

export interface PbixInfo {
    fileName: string;
    fileSizeBytes: number;
    entries: string[];
    hasDataModel: boolean;
    hasDataMashup: boolean;
    hasLayout: boolean;
    hasMetadata: boolean;
    version?: string;
    contentTypes?: string;
}

export interface PbixLayout {
    reportId?: string;
    pages: PbixPage[];
    config?: Record<string, unknown>;
}

export interface PbixPage {
    name: string;
    displayName: string;
    ordinal: number;
    visualContainers: PbixVisual[];
}

export interface PbixVisual {
    x: number;
    y: number;
    width: number;
    height: number;
    type?: string;
    config?: Record<string, unknown>;
}

export interface PbixDataSource {
    name: string;
    kind?: string;
    connectionString?: string;
    mExpression?: string;
}

export interface PbixMetadata {
    version?: string;
    tables?: { name: string; id?: string }[];
    measures?: { name: string; tableName?: string }[];
}

// ─── API Response wrappers ───

export interface ApiListResponse<T> {
    value: T[];
    '@odata.context'?: string;
    '@odata.count'?: number;
}
