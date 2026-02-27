# Power BI MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)

MCP server for Power BI — local PBIX file analysis, cloud API operations, report export, and semantic model extraction from Power BI Desktop.

**45 tools** • TypeScript • Cross-platform • Optimized for Pro license

---

## ⚡ Quick Start

No cloning, no building. Just add to your MCP client config:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/path/to/your/pbix/files"
      }
    }
  }
}
```

> **PBIX local analysis works immediately** — no Azure credentials needed.
> For cloud operations (workspaces, refresh, export) add `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` to `env`.

---

## 📋 Client Configuration

### Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/path/to/pbix"
      }
    }
  }
}
```

---

### Gemini CLI (Google)

`~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/path/to/pbix"
      }
    }
  }
}
```

---

### Codex CLI (OpenAI)

`~/.codex/config.json`:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/path/to/pbix"
      }
    }
  }
}
```

---

### VS Code / Codex IDE / GitHub Copilot

Add to your project's `.vscode/mcp.json` or user settings:

```json
{
  "servers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "${workspaceFolder}"
      }
    }
  }
}
```

> **Tip:** VS Code extensions like Codex IDE, Cline, Roo Code, and GitHub Copilot all support MCP servers through this same `.vscode/mcp.json` configuration.

---

### Cursor

Settings → MCP Servers → Add:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/path/to/pbix"
      }
    }
  }
}
```

---

### Windsurf

Settings → MCP → Add Server:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "github:AjvoGod/powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/path/to/pbix"
      }
    }
  }
}
```

---

## 🔑 Access Requirements

This server is installed directly from GitHub. Users need:

1. **Node.js 20+** installed
2. **Git** installed
3. **GitHub access** to the `AjvoGod/powerbi-mcp` repository (if private, users must have read access and be authenticated via `gh auth login` or SSH keys)

---

## 🔧 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `POWERBI_PBIX_ROOT` | No | Root folder containing `.pbix` files |
| `AZURE_TENANT_ID` | For cloud | Azure AD tenant ID |
| `AZURE_CLIENT_ID` | For cloud | Azure AD app client ID |
| `AZURE_CLIENT_SECRET` | For cloud | Azure AD app secret |
| `LOG_LEVEL` | No | Logging level: `debug`, `info`, `warn`, `error` |

With cloud credentials (optional):

```json
{
  "env": {
    "POWERBI_PBIX_ROOT": "/path/to/pbix",
    "AZURE_TENANT_ID": "xxxx",
    "AZURE_CLIENT_ID": "xxxx",
    "AZURE_CLIENT_SECRET": "xxxx"
  }
}
```

---

## 🛠 Tools (45)

| Category | Count | Description |
|---|---|---|
| 📁 PBIX Local | 11 | Analysis, M code, layout, metadata, datasources, comparison, batch, documentation, desktop discovery, semantic model, server info |
| 📊 Dataset | 9 | List, detail, tables, sources, parameters, refresh |
| 📄 Report | 9 | List, detail, pages, export PDF/PNG/PPTX, clone, rebind, export & download |
| 🏢 Workspace | 3 | List, detail, users |
| 🔄 Dataflow | 4 | List, detail, sources, refresh |
| 🔐 Admin | 3 | Activity log, workspace scan, apps |
| 📋 Dashboard | 2 | List, tiles |
| 🌐 Gateway | 2 | List, datasources |
| ⚡ Capacity | 2 | List, workloads |

---

## 💬 Usage Examples

### Without Azure credentials (PBIX analysis)

```
"Analyze the PBIX file Finance/Invoice Report.pbix"
"Show me the Power Query (M) code from this PBIX"
"Generate markdown documentation from all PBIX files in a folder"
"Compare these two PBIX files"
"Describe the report for intranet (Business description, Technical description, Filters, Measures sections; no tables)"
"Find running local models from Power BI Desktop"
"Extract tables and measures from the open Desktop report"
```

### With Azure credentials (Cloud operations)

```
"List all workspaces"
"Trigger a refresh for dataset Y"
"Export report Z to PDF and download it"
"Show the refresh history for a dataset"
```

---

## 🔨 Development (for contributors)

```bash
git clone https://github.com/AjvoGod/powerbi-mcp.git
cd powerbi-mcp
npm install
cp .env.example .env    # fill in POWERBI_PBIX_ROOT
npm run build
npm test                # 39 tests
npm run lint
```

### Architecture

```
src/
├── index.ts                    # MCP server entry point
├── logger.ts                   # Structured logging → stderr
├── auth/msalAuth.ts            # Azure AD OAuth2 (MSAL)
├── api/
│   ├── powerbiClient.ts        # REST API client
│   └── types.ts                # TypeScript interfaces
├── pbix/
│   ├── pbixParser.ts           # PBIX ZIP parsing
│   ├── pbixAnalyzer.ts         # Batch analysis & documentation
│   ├── metadataExtractor.ts    # Table/measure extraction helpers
│   ├── desktopModelExtractor.ts # Desktop model discovery + DMV
│   └── pbixPath.ts             # Path resolution
├── tools/
│   ├── toolUtils.ts            # safeTool wrapper, helpers
│   ├── pbixTools.ts            # 11 PBIX local tools
│   ├── reportTools.ts          # 9 report tools
│   ├── datasetTools.ts         # 9 dataset tools
│   ├── workspaceTools.ts       # 3 workspace tools
│   ├── dataflowTools.ts        # 4 dataflow tools
│   ├── adminTools.ts           # 3 admin tools
│   ├── dashboardTools.ts       # 2 dashboard tools
│   ├── gatewayTools.ts         # 2 gateway tools
│   └── capacityTools.ts        # 2 capacity tools
└── __tests__/                  # Vitest unit tests (39 tests)
```

---

## ⚠️ Limitations (Pro license)

| Feature | Pro | Premium/PPU |
|---|---|---|
| REST API (list, refresh, export) | ✅ | ✅ |
| XMLA endpoint (DAX queries) | ❌ | ✅ |
| Enhanced refresh | ❌ | ✅ |
| Refresh limit | 8/day | Per capacity |
| PBIX local analysis | ✅ | ✅ |

## License

MIT
