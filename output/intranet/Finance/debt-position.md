Business popis
Tento report poskytuje komplexní přehled o stavu pohledávek a dlužné pozici v anglickém jazyce. Slouží k monitorování finančních rizik a identifikaci plateb po splatnosti (DPD). Pomáhá sledovat historický vývoj měsíčních uzávěrek a dlužných částek nad 15 dní po splatnosti (odvozeno z názvu). Umožňuje detailní rozpad podle důvodů vystavení faktur a právních statusů pohledávek. Report je určen pro mezinárodní reporting a finanční řízení skupiny (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Debt position - INTRO: Úvodní stránka s navigací.
* Debt position - DPD: Přehled pohledávek po splatnosti.
* Customer receivables - DPD: Rozpad klientských pohledávek podle závažnosti prodlení.
* History of the month closing values: Historický vývoj zůstatků k uzávěrkám.
* History of the month closing values > 15 DPD: Historie starších dluhů.
* Detail view of receivables - SUMS: Finanční souhrny pohledávek v detailech.
* Detail - Reason for issuing the statement: Analýza původu pohledávek.
* Detail view of receivables - COUNTS: Kvantitativní přehledy pohledávek (počty případů).

Technický popis
Report obsahuje 8 stránek a 67 vizuálních prvků, včetně sloupcových grafů, tabulek a karet. Technicky využívá 7 tabulek a 18 měr. Je anglickou verzí reportu "Dlužná pozice", obsahuje lokalizované nadpisy (např. celkova_castka_nadpis_AJ). Verze metadat je 1.28. Datové zdroje nejsou v M kódu přímo detekovány.

Filtry
* {Předpis - Zůstatek k úhradě}: Ovlivňuje {finanční objem zobrazených dluhů}. Interpretace: {Sleduje celkovou dlužnou částku k zaplacení}.
* {Předpis - Stav}: Ovlivňuje {zobrazení podle aktuálního statusu (např. v reklamaci, splátkový kalendář)}. Interpretace: {Pomáhá segmentovat dluhy podle procesu řešení}.
* {Opravná položka}: Ovlivňuje {výši účetních opravných položek}. Interpretace: {Ukazuje úroveň krytí rizikových pohledávek}.

Míry
* {Sum(stage_zis Predpisy.Předpis - Zůstatek k úhradě)}: Měří {celkovou výši neuhrazených pohledávek}. Interpretace: {Hlavní finanční ukazatel dluhu}. Použití: {Debt position - DPD}.
* {Sum(HistorickéZůstatky.Zůstatek)}: Měří {historickou výši dluhu v čase}. Interpretace: {Sleduje trendy v dlužné pozici k uzávěrkám}. Použití: {History of the month closing values}.
* {Sum(stage_zis Predpisy.Opravná položka)}: Měří {výši vytvořených opravných položek}. Interpretace: {Ukazuje rizikovost portfolia pro účetní účely}. Použití: {Customer receivables - DPD}.
