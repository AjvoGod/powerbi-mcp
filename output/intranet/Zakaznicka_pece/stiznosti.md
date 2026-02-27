Business popis
Tento report slouží k monitorování a řízení stížností přijatých od zákazníků. Sleduje celkový počet stížností, jejich aktuální stav (otevřené/uzavřené) a průměrnou dobu řešení (odvozeno z názvu). Pomáhá managementu zákaznické péče identifikovat problematické oblasti v servisu a sledovat výkonnost konkrétních obchodních zástupců, na které jsou stížnosti směřovány. Umožňuje detailní náhled na jednotlivé případy pro kontrolu kvality vyřízení. Report je klíčovým nástrojem pro CX (Customer Experience) strategii a zlepšování image společnosti v očích zákazníků (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Stížnosti - INTRO: Úvodní stránka s navigací.
* Stížnosti - Hlavní přehled: Globální statistiky vývoje a stavu stížností.
* Stížnosti - Detail na OZ: Analýza stížností vztažená ke konkrétním obchodním zástupcům.
* Stížnosti - Tooltip: Interaktivní detailní pohled pro grafické prvky.

Technický popis
Report obsahuje 4 stránky a 39 vizuálních prvků, včetně sloupcových grafů, oblastních grafů a karet s KPI. Technicky využívá 4 tabulky (stěžejní je zis VW_STIZNOSTI) a 5 měr pro výpočet počtů a procent otevřených případů. Verze metadat je 1.28. Datové zdroje jsou integrovány přes systém evidence úkolů.

Filtry
* {pocet_stiznosti_celkem}: Ovlivňuje {zobrazení podle intenzity klientské nespokojenosti}. Interpretace: {Sleduje celkový náběh stížností v čase}.
* {TASK_date_start}: Ovlivňuje {zobrazení dat v určitém časovém okně}. Interpretace: {Sleduje aktuální a historické vlny stížností}.

Míry
* {pocet_stiznosti_celkem}: Měří {celkový počet registrovaných stížností bez ohledu na stav}. Interpretace: {Základní ukazatel nekvality v procesech nebo komunikaci}. Použití: {Hlavní přehled}.
* {pocet_otevrenych_stiznosti}: Měří {počet stížností, které jsou aktuálně v procesu řešení}. Interpretace: {Ukazuje živou agendu ke zpracování}. Použití: {KPI karty}.
* {procento_otevrenych_stiznosti}: Měří {podíl nevyřízených stížností na celku}. Interpretace: {Sleduje efektivitu a rychlost vyřizování klientských podnětů}. Použití: {Hlavní přehled}.
