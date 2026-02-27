Business popis
Tento report slouží jako centrální katalog všech dostupných Power BI reportů v rámci organizace. Poskytuje přehled o názvech reportů, jejich umístění v pracovních prostorech (Workspaces) a názvech jednotlivých stránek (odvozeno z názvu). Pomáhá uživatelům rychle najít relevantní analýzu a pochopit rozsah dostupného reportingu. Umožňuje vyhledávání konkrétních stránek a sledování celkového počtu reportovacích entit. Report je klíčový pro navigaci v BI ekosystému společnosti (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Katalog: Interaktivní stromová struktura (decomposition tree) pro procházení reportů podle workspace.
* Katalog – TAB: Detailní tabulkový seznam všech reportů a jejich stránek pro rychlé vyhledávání.

Technický popis
Report se skládá ze 2 stránek a obsahuje 8 vizuálních prvků, včetně specializovaného vizuálu Decomposition Tree pro hierarchické procházení dat. Technicky využívá 3 tabulky (Workspaces, Reports, Report Pages) a jednu hlavní míru pro sčítání stránek. Obsahuje textové filtry pro snadné vyhledávání. Verze metadat je 1.28.

Filtry
* {Workspace Name}: Ovlivňuje {zobrazení reportů patřících do konkrétního pracovního prostoru}. Interpretace: {Pomáhá filtrovat reporty podle oddělení nebo projektů}.
* {Report Name}: Ovlivňuje {zobrazení detailů o konkrétním reportu}. Interpretace: {Umožňuje najít seznam stránek dané analýzy}.

Míry
* {CountNonNull(Report Pages.Workspace ID)}: Měří {celkový počet registrovaných stránek reportů v BI prostředí}. Interpretace: {Ukazuje celkový rozsah firemního reportingu}. Použití: {Katalog - úvodní pohled}.
