Business popis
Tento report poskytuje komplexní roční přehled o obchodní produkci rozdělené podle jednotlivých dealerských skupin a prodejních kanálů. Slouží k vyhodnocování celoročních výsledků z pohledu počtu odběrných míst (OPM) a celkové roční spotřeby (odvozeno z názvu). Pomáhá managementu porovnávat efektivitu různých prodejních struktur a sledovat jejich podíl na celkovém náběru v měsíčních cyklech. Umožňuje identifikovat nejúspěšnější obchodní skupiny v daném roce. Report slouží jako podklad pro strategické hodnocení obchodní sítě (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Roční produkce - INTRO: Úvodní stránka s navigací.
* Roční výsledky Dealerských skupin: Detailní analýza výkonu jednotlivých prodejních kanálů.
* Roční výsledky všech skupin - OPM - Tab. / Graf: Srovnání počtu získaných smluv napříč strukturou.
* Roční výsledky všech skupin - Spotřeby - Tab. / Graf: Srovnání energetického objemu produkce napříč strukturou.

Technický popis
Report obsahuje 6 stránek a 61 vizuálních prvků, především sloupcové grafy a pivotní tabulky pro meziroční a meziskupinové srovnání. Technicky využívá tabulku excel Report produkce a 4 klíčové míry pro výpočet ročních KPI. Verze metadat je 1.28. Report je zaměřen na vysokou úroveň agregace dat pro potřeby top managementu.

Filtry
* {Měsíc v roce}: Ovlivňuje {zobrazení dat v rámci kalendářního cyklu}. Interpretace: {Sleduje sezónnost a plnění obchodních plánů v průběhu roku}.
* {Dealer Skupina}: Ovlivňuje {zobrazení výsledků pro konkrétní organizační jednotku}. Interpretace: {Klíčový filtr pro srovnání výkonnosti obchodních kanálů}.

Míry
* {CountNonNull(excel Report produkce.EAN/EIC)}: Měří {celkový počet získaných odběrných míst v roce}. Interpretace: {Kvantitativní ukazatel úspěšnosti obchodní sítě}. Použití: {OPM přehledy}.
* {Sum(excel Report produkce.Roční spotřeba celkem)}: Měří {celkový energetický objem roční produkce}. Interpretace: {Ukazuje finanční potenciál nově sjednaného obchodu v roce}. Použití: {Spotřební přehledy}.
* {Nadpis roční výsledky}: Měří {dynamický text záhlaví pro aktuálně vybraný kontext}. Interpretace: {Zajišťuje přehlednost při přepínání mezi filtry}. Použití: {Záhlaví stránek}.
