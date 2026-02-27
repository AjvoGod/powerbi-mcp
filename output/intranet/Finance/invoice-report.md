Business popis
Tento report poskytuje detailní analýzu fakturačních procesů a jejich vztahu k pohledávkám v anglickém jazyce. Slouží k monitorování objemů a počtů vystavených faktur v čase (odvozeno z názvu). Pomáhá sledovat regionální distribuci fakturace v ČR a analyzovat energetické objemy dodávek. Umožňuje porovnání fakturovaných sum s aktuálními pohledávkami a analýzu přeplatků či nedoplatků. Report je klíčovým nástrojem pro mezinárodní finanční kontroling a analýzu tržeb (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Invoicing - INTRO: Úvodní stránka s navigací.
* Invoice Total Counts / Amounts: Analýza počtů a finančních objemů fakturace.
* Invoice - CZ Breakdown: Regionální mapa fakturace v České republice.
* Invoice - Deliveries Amount / CZ Breakdown: Sledování objemů dodané energie (MWh).
* Invoice - Overpayments and Underpayments: Analýza salda fakturace (přeplatky/nedoplatky).
* Fakturace - Fakturanti Detail: Přehled výkonnosti fakturačního týmu.
* Invoices vs. Receivables - LIVE / HIST: Srovnání vystavených faktur s aktuální a historickou dlužnou pozicí.

Technický popis
Report se skládá z 10 stránek a obsahuje 179 vizuálních prvků, což odpovídá vysoké komplexnosti české verze "Report fakturací". Technicky využívá 12 tabulek a 16 měr. Obsahuje pokročilé průřezy (advancedSlicerVisual) a mapy (shapeMap). Verze metadat je 1.28. Datové zdroje jsou integrovány přes centrální analytické moduly (např. zis VW_Predpisy).

Filtry
* {Datum vystavení}: Ovlivňuje {časové období zobrazených faktur}. Interpretace: {Sleduje trendy ve fakturaci v měsíčních a ročních cyklech}.
* {Dom/MO/VO}: Ovlivňuje {segmentaci zákazníků (domácnosti, maloodběr, velkoodběr)}. Interpretace: {Umožňuje analýzu tržeb podle typů zákazníků}.
* {Saldo fakturace}: Ovlivňuje {zobrazení přeplatků a nedoplatků}. Interpretace: {Sleduje finanční výsledek zúčtovacích procesů}.

Míry
* {sum_castka_vystavenych_faktur}: Měří {celkovou sumu fakturovaných částek}. Interpretace: {Hlavní ukazatel generovaných tržeb}. Použití: {Invoice Total Amounts}.
* {pocet_vystavenych_faktur}: Měří {počet vygenerovaných fakturačních dokladů}. Interpretace: {Ukazuje procesní zatížení fakturačního oddělení}. Použití: {Invoice Total Counts}.
* {Množství dodávky}: Měří {energetický objem dodávek navázaných na fakturaci}. Interpretace: {Fyzický objem obchodu v energetických jednotkách}. Použití: {Invoice - Deliveries Amount}.
* {suma_pohledavek}: Měří {výši neuhrazených částek ve vztahu k fakturaci}. Interpretace: {Sleduje inkasní úspěšnost fakturovaných částek}. Použití: {Invoices vs. Receivables - LIVE}.
