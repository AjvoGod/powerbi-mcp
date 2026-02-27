# Power BI MCP Server

MCP server pro Power BI — lokální analýza PBIX souborů, cloud API operace, export reportů, a extrakce sémantických modelů z Power BI Desktop.

**45 nástrojů** • TypeScript • Cross-platform • Optimalizováno pro Pro licenci

---

## ⚡ Rychlý start (npx)

Žádné klonování, žádné buildování. Stačí přidat do konfigurace tvého MCP klienta:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/cesta/k/tvým/pbix/souborům"
      }
    }
  }
}
```

> **PBIX lokální analýza funguje hned** — nepotřebuješ žádné Azure credentials.  
> Pro cloud operace (workspaces, refresh, export) přidej do `env` ještě `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`.

---

## 📋 Konfigurace pro jednotlivé klienty

### VS Code / Codex (`.vscode/mcp.json`)

```json
{
  "servers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/cesta/k/pbix"
      }
    }
  }
}
```

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/cesta/k/pbix"
      }
    }
  }
}
```

### Cursor

Settings → MCP Servers → Add:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/cesta/k/pbix"
      }
    }
  }
}
```

### Codex CLI (OpenAI)

`~/.codex/config.json`:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/cesta/k/pbix"
      }
    }
  }
}
```

### Gemini CLI (Google)

`~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "powerbi": {
      "command": "npx",
      "args": ["-y", "powerbi-mcp"],
      "env": {
        "POWERBI_PBIX_ROOT": "/cesta/k/pbix"
      }
    }
  }
}
```

---

## 🔧 Konfigurace environment proměnných

| Proměnná | Povinná | Popis |
|---|---|---|
| `POWERBI_PBIX_ROOT` | Ne | Kořenová složka s `.pbix` soubory |
| `AZURE_TENANT_ID` | Pro cloud | Azure AD tenant |
| `AZURE_CLIENT_ID` | Pro cloud | Azure AD app client ID |
| `AZURE_CLIENT_SECRET` | Pro cloud | Azure AD app secret |
| `LOG_LEVEL` | Ne | Úroveň logování: `debug`, `info`, `warn`, `error` |

S cloud credentials (volitelné):

```json
{
  "env": {
    "POWERBI_PBIX_ROOT": "/cesta/k/pbix",
    "AZURE_TENANT_ID": "xxxx",
    "AZURE_CLIENT_ID": "xxxx",
    "AZURE_CLIENT_SECRET": "xxxx"
  }
}
```

---

## 🛠 Nástroje (45)

| Kategorie | Nástrojů | Popis |
|---|---|---|
| 📁 PBIX Local | 11 | Analýza, M kód, layout, metadata, datasources, porovnání, batch, dokumentace, desktop discovery, semantic model, server info |
| 📊 Dataset | 9 | List, detail, tabulky, zdroje, parametry, refresh |
| 📄 Report | 9 | List, detail, stránky, export PDF/PNG/PPTX, clone, rebind, export & download |
| 🏢 Workspace | 3 | List, detail, uživatelé |
| 🔄 Dataflow | 4 | List, detail, zdroje, refresh |
| 🔐 Admin | 3 | Activity log, workspace scan, apps |
| 📋 Dashboard | 2 | List, dlaždice |
| 🌐 Gateway | 2 | List, datasources |
| ⚡ Capacity | 2 | List, workloads |

---

## 💬 Příklady použití

### Bez Azure credentials (PBIX analýza)

```
"Analyzuj PBIX soubor Finance/Invoice Report.pbix"
"Ukaž mi Power Query (M) kód z tohoto PBIX"
"Vygeneruj markdown dokumentaci ze všech PBIX ve složce"
"Porovnej tyto dva PBIX soubory"
"Popiš report pro intranet (sekce Business popis, Technický popis, Filtry, Míry; bez tabulek)"
"Najdi běžící lokální modely z Power BI Desktop"
"Vytáhni tabulky a measures z otevřeného reportu v Desktopu"
```

#### `pbix_describe_report` (intranetový prompt)

- Výstup je navržený pro 4 sekce: `Business popis`, `Technický popis`, `Filtry`, `Míry`.
- Instrukce výslovně zakazují uvádět tabulky nebo seznamy tabulek.
- Pokud část podkladů chybí, prompt vede asistenta k použití hodnoty `neuvedeno`.

### S Azure credentials (Cloud operace)

```
"Vypiš všechny workspaces"
"Spusť refresh datasetu Y"
"Exportuj report Z do PDF a stáhni ho"
"Ukaž historii refreshů datasetu"
```

---

## 🔨 Vývoj (pro přispěvatele)

```bash
git clone https://github.com/ivoschwarz/powerbi-mcp.git
cd powerbi-mcp
npm install
cp .env.example .env    # vyplň POWERBI_PBIX_ROOT
npm run build
npm test                # 37 testů
npm run lint
```

### Architektura

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
└── __tests__/                  # Vitest unit tests (37 tests)
```

---

## ⚠️ Omezení (Pro licence)

| Feature | Pro | Premium/PPU |
|---|---|---|
| REST API (list, refresh, export) | ✅ | ✅ |
| XMLA endpoint (DAX dotazy) | ❌ | ✅ |
| Enhanced refresh | ❌ | ✅ |
| Refresh limit | 8/den | dle kapacity |
| PBIX lokální analýza | ✅ | ✅ |

## Licence

MIT
