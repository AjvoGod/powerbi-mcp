Business popis
Tento report poskytuje detailní analýzu nově přinesené produkce z pohledu roční spotřeby (MWh) a počtu odběrných míst. Slouží k monitorování obchodního výkonu rozděleného podle segmentů (domácnosti/firmy), produktových řad a věku zákazníků (odvozeno z názvu). Pomáhá managementu vyhodnocovat kvalitu nově získávané produkce a predikovat budoucí dodávky na základě termínů jejich zahájení. Umožňuje analýzu úspěšnosti prodeje jednotlivých tarifů a nadřazených produktů. Report je klíčovým nástrojem pro řízení obchodní sítě a vyhodnocování marketingových strategií (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Report Produkce - INTRO: Úvodní stránka s navigací.
* Přinesených OPM a MWh: Globální přehled nově uzavřených smluv a jejich energetického objemu.
* Přehled dle Nadř. produktu / FINAL produktu / Produktové řady: Detailní analýzy úspěšnosti jednotlivých částí ceníku.
* Přehled - Dom./Fir.: Srovnání prodejů do rezidenčního a firemního segmentu.
* Přehled - Zahájení dod.: Analýza termínů, kdy začne fyzická dodávka u nových smluv.
* Přehled - Komodity: Srovnání produkce elektřiny a plynu.
* Přehled - Věk. Z.: Analýza demografické struktury nových zákazníků.

Technický popis
Report obsahuje 10 stránek a 127 vizuálních prvků, včetně 100% skládaných pruhových grafů, sloupcových grafů a pokročilých průřezů (advancedSlicerVisual). Technicky využívá 2 tabulky a 8 měr pro výpočet produkčních KPI. Verze metadat je 1.31. Datové zdroje jsou integrovány přes tabulku excel Report produkce. Obsahuje integraci s Power Automate.

Filtry
* {Dealer Skupina}: Ovlivňuje {zobrazení výsledků konkrétního prodejního kanálu}. Interpretace: {Sleduje výkonnost různých obchodních struktur}.
* {Roční spotřeba celkem}: Ovlivňuje {zobrazení podle energetické velikosti smluv}. Interpretace: {Pomáhá identifikovat bonitní produkci}.
* {Firma/domácnost}: Ovlivňuje {zobrazení podle typu zákazníka}. Interpretace: {Sleduje segmentaci nového náběru}.
* {Roku do dodávky}: Ovlivňuje {zobrazení podle času zbývajícího do startu dodávky}. Interpretace: {Identifikuje budoucí nárůst portfolia}.

Míry
* {CountNonNull(excel Report produkce.EAN/EIC)}: Měří {počet nově získaných unikátních odběrných míst}. Interpretace: {Základní kvantitativní ukazatel obchodního úspěchu}. Použití: {Většina stránek reportu}.
* {Sum(excel Report produkce.Součet spotřeb (MWh))}: Měří {celkový roční energetický objem nové produkce}. Interpretace: {Hlavní ukazatel budoucích výnosů z nové produkce}. Použití: {Většina stránek reportu}.
* {Max(excel Report produkce.Datum zápisu)}: Měří {datum posledního zpracovaného záznamu}. Interpretace: {Potvrzuje aktuálnost reportovaných dat}. Použití: {Záhlaví reportu}.
