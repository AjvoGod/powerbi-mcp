Business popis
Report je určen pro oddělení následné péče a slouží k monitorování úkolů, které jsou po termínu splatnosti (po DEADLINE). Pomáhá identifikovat problematické oblasti v řešení klientských požadavků na úrovni poboček i jednotlivých obchodních zástupců (odvozeno z názvu). Umožňuje sledovat efektivitu vyřešených úkolů v rámci systému CLK. Slouží k zajištění včasné reakce na potřeby stávajících zákazníků a minimalizaci zpoždění v servisních procesech. Report je klíčovým nástrojem pro řízení kvality zákaznického servisu (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Následná péče - INTRO: Úvodní stránka s navigací.
* Rozpad úkolů a jejich řešení po POB: Analýza zpoždění na úrovni jednotlivých poboček.
* Rozpad úkolů a jejich řešení po OZ: Analýza zpoždění na úrovni jednotlivých obchodních zástupců.
* Přehled úkolů po DEADLINE - OZ: Detailní výpis konkrétních úkolů k řešení pro OZ.

Technický popis
Report se skládá ze 4 stránek a obsahuje 45 vizuálních prvků, včetně sloupcových grafů a detailních tabulek. Technicky využívá 2 hlavní tabulky a 6 měr zaměřených na počítání a kategorizaci úkolů. Zahrnuje akční tlačítka pro navigaci mezi přehledy. Datové zdroje nejsou v M kódu přímo detekovány, report běží nad publikovaným datasetem (pravděpodobné). Verze metadat je 1.28.

Filtry
* {Po DEADLINE z CLK}: Ovlivňuje {zobrazení úkolů, u kterých vypršel termín v systému CLK}. Interpretace: {Zvýrazňuje prioritní případy k řešení}.
* {Vyřešených z CLK}: Ovlivňuje {zobrazení úspěšně uzavřených úkolů}. Interpretace: {Sleduje produktivitu následné péče}.
* {Celkem úkolů po termínu}: Ovlivňuje {zobrazení celkového objemu restů}. Interpretace: {Ukazuje celkovou zátěž oddělení zpožděnými úkoly}.

Míry
* {Celkem úkolů po termínu}: Měří {počet úkolů s prošlým datem splatnosti}. Interpretace: {Hlavní KPI pro sledování kvality servisu}. Použití: {Přehled úkolů po DEADLINE}.
* {Úkolů násl. péče celkem}: Měří {celkový objem úkolů v agendě následné péče}. Interpretace: {Definuje celkový rozsah servisní agendy}. Použití: {Rozpad úkolů po POB/OZ}.
* {Vyřešených z CLK}: Měří {počet úkolů označených jako vyřízené}. Interpretace: {Ukazuje efektivitu práce s klientskými požadavky}. Použití: {Rozpad úkolů po POB/OZ}.
