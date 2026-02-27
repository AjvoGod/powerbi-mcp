import { spawnSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

export interface DesktopModelInstance {
    workspacePath: string;
    server: string;
    port: number;
    discoveredAt: string;
}

export interface DesktopSemanticModel {
    server: string;
    database: string;
    tables: Array<Record<string, unknown>>;
    columns: Array<Record<string, unknown>>;
    measures: Array<Record<string, unknown>>;
    relationships: Array<Record<string, unknown>>;
    partitions: Array<Record<string, unknown>>;
}


function getWindowsWorkspaceRoot(customRoot?: string): string | null {
    if (customRoot) {
        return customRoot;
    }

    const localAppData = process.env.LOCALAPPDATA;
    if (!localAppData) {
        return null;
    }

    return join(localAppData, 'Microsoft', 'Power BI Desktop', 'AnalysisServicesWorkspaces');
}


function toPowerShellLiteral(value: string): string {
    return `'${value.replace(/'/g, "''")}'`;
}


function runDesktopPowerShell(script: string): string {
    if (process.platform !== 'win32') {
        throw new Error(
            'Desktop model extraction is only supported on Windows.',
        );
    }

    const result = spawnSync(
        'powershell.exe',
        ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
        { encoding: 'utf-8', maxBuffer: 20 * 1024 * 1024 },
    );

    if (result.error) {
        throw new Error(`Failed to run PowerShell: ${result.error.message}`);
    }
    if (result.status !== 0) {
        const stderr = (result.stderr || '').trim();
        const stdout = (result.stdout || '').trim();
        throw new Error(`Desktop model extraction failed: ${stderr || stdout || `exit code ${result.status}`}`);
    }

    return (result.stdout || '').trim();
}

export function discoverDesktopModelInstances(
    customRoot?: string,
): DesktopModelInstance[] {
    if (process.platform !== 'win32') {
        return [];
    }

    const root = getWindowsWorkspaceRoot(customRoot);
    if (!root || !existsSync(root)) {
        return [];
    }

    const instances: Array<{ instance: DesktopModelInstance; mtime: number }> = [];
    const entries = readdirSync(root, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }

        const workspacePath = join(root, entry.name);
        const portFilePath = join(workspacePath, 'msmdsrv.port.txt');

        if (!existsSync(portFilePath)) {
            continue;
        }

        let portText: string;
        try {
            portText = readFileSync(portFilePath, 'utf-8').trim();
        } catch {
            continue;
        }

        const port = Number(portText);
        if (!Number.isInteger(port) || port <= 0) {
            continue;
        }

        let mtime = 0;
        try {
            mtime = statSync(workspacePath).mtimeMs;
        } catch {
            mtime = 0;
        }

        instances.push({
            instance: {
                workspacePath,
                server: `localhost:${port}`,
                port,
                discoveredAt: new Date().toISOString(),
            },
            mtime,
        });
    }

    return instances
        .sort((a, b) => b.mtime - a.mtime)
        .map((item) => item.instance);
}

function buildDesktopExtractionScript(server: string, database?: string): string {
    const serverLiteral = toPowerShellLiteral(server);
    const databaseLiteral = toPowerShellLiteral(database ?? '');

    return `
$ErrorActionPreference = 'Stop'
$server = ${serverLiteral}
$database = ${databaseLiteral}

try {
    Add-Type -AssemblyName 'Microsoft.AnalysisServices.AdomdClient'
} catch {
    $dllCandidates = @(
        "$env:ProgramFiles\\Microsoft.NET\\ADOMD.NET\\160\\Microsoft.AnalysisServices.AdomdClient.dll",
        "$env:ProgramFiles\\Microsoft.NET\\ADOMD.NET\\150\\Microsoft.AnalysisServices.AdomdClient.dll",
        "$env:ProgramFiles(x86)\\Microsoft.NET\\ADOMD.NET\\160\\Microsoft.AnalysisServices.AdomdClient.dll",
        "$env:ProgramFiles(x86)\\Microsoft.NET\\ADOMD.NET\\150\\Microsoft.AnalysisServices.AdomdClient.dll"
    )
    $loaded = $false
    foreach ($dll in $dllCandidates) {
        if (Test-Path $dll) {
            Add-Type -Path $dll
            $loaded = $true
            break
        }
    }
    if (-not $loaded) {
        throw 'Cannot load Microsoft.AnalysisServices.AdomdClient. Install ADOMD.NET or SQL Server feature pack.'
    }
}

$connection = New-Object Microsoft.AnalysisServices.AdomdClient.AdomdConnection("Data Source=$server")
$connection.Open()

try {
    if (-not $database) {
        $catalogCmd = $connection.CreateCommand()
        $catalogCmd.CommandText = 'SELECT [CATALOG_NAME] FROM $SYSTEM.DBSCHEMA_CATALOGS'
        $adapterType = [type]::GetType('Microsoft.AnalysisServices.AdomdClient.AdomdDataAdapter, Microsoft.AnalysisServices.AdomdClient')
        $catalogAdapter = [Activator]::CreateInstance($adapterType, $catalogCmd)
        $catalogTable = New-Object System.Data.DataTable
        [void]$catalogAdapter.Fill($catalogTable)
        $database = ($catalogTable.Rows | ForEach-Object { $_['CATALOG_NAME'] } | Where-Object { $_ -and ($_ -notlike '$*') } | Select-Object -First 1)
    }

    if (-not $database) {
        throw 'No database/catalog found in local Analysis Services instance.'
    }

    $connection.ChangeDatabase($database)

    function Invoke-Dmv([Microsoft.AnalysisServices.AdomdClient.AdomdConnection]$conn, [string]$query) {
        $cmd = $conn.CreateCommand()
        $cmd.CommandText = $query
        $adapterType = [type]::GetType('Microsoft.AnalysisServices.AdomdClient.AdomdDataAdapter, Microsoft.AnalysisServices.AdomdClient')
        $adapter = [Activator]::CreateInstance($adapterType, $cmd)
        $table = New-Object System.Data.DataTable
        [void]$adapter.Fill($table)
        $rows = @()
        foreach ($row in $table.Rows) {
            $obj = @{}
            foreach ($col in $table.Columns) {
                $obj[$col.ColumnName] = $row[$col.ColumnName]
            }
            $rows += [pscustomobject]$obj
        }
        return $rows
    }

    $result = [ordered]@{
        server = $server
        database = $database
        tables = Invoke-Dmv $connection 'SELECT [ID], [Name], [Description], [IsHidden] FROM $SYSTEM.TMSCHEMA_TABLES'
        columns = Invoke-Dmv $connection 'SELECT [ID], [TableID], [Name], [DataType], [Type], [IsHidden], [Description] FROM $SYSTEM.TMSCHEMA_COLUMNS'
        measures = Invoke-Dmv $connection 'SELECT [ID], [TableID], [Name], [Expression], [FormatString], [IsHidden], [Description] FROM $SYSTEM.TMSCHEMA_MEASURES'
        relationships = Invoke-Dmv $connection 'SELECT [ID], [Name], [FromTableID], [FromColumnID], [ToTableID], [ToColumnID], [IsActive], [CrossFilteringBehavior] FROM $SYSTEM.TMSCHEMA_RELATIONSHIPS'
        partitions = Invoke-Dmv $connection 'SELECT [ID], [TableID], [Name], [SourceType], [QueryDefinition] FROM $SYSTEM.TMSCHEMA_PARTITIONS'
    }

    $result | ConvertTo-Json -Depth 12
} finally {
    $connection.Close()
}
`;
}

export function extractDesktopSemanticModel(
    server: string,
    database?: string,
): DesktopSemanticModel {
    const script = buildDesktopExtractionScript(server, database);
    const output = runDesktopPowerShell(script);
    if (!output) {
        throw new Error('Desktop model extraction returned empty output.');
    }

    try {
        return JSON.parse(output) as DesktopSemanticModel;
    } catch (error) {
        throw new Error(`Failed to parse desktop model JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
}
