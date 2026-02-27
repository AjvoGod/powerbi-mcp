Business popis
Tento report poskytuje detailní pohled na vývoj a strukturu zákaznického portfolia rozděleného podle nadřazených produktů. Slouží k monitorování počtu aktivních odběrných míst (OPM) a jejich změn v čase (odvozeno z názvu). Pomáhá managementu sledovat konkrétní vývoj v rámci jednotlivých produktových kategorií a identifikovat trendy v oblibě konkrétních produktů. Umožňuje rozpad portfolia pro hloubkovou analýzu změn v klientském kmeni v měsíčních intervalech. Report je klíčový pro strategické plánování produktového mixu a sledování retence u konkrétních nadproduktů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Portfolio - INTRO: Úvodní stránka s navigací.
* Portolio - Konkrétní vývoj: Časová analýza změn počtu OPM pro vybrané produkty.
* Portfolio - Rozpad: Detailní tabulkový pohled na strukturu portfolia podle nadproduktů a měsíců.

Technický popis
Report se skládá ze 3 stránek a obsahuje 35 vizuálních prvků, včetně plošných grafů (areaChart) pro zobrazení trendů a pivotních tabulek pro rozpad dat. Technicky využívá 3 tabulky, přičemž stěžejní jsou zis VW_ROZPAD_NADPRODUKTY a portfolio_nadprodukty. Obsahuje 3 míry pro výpočet stavů a časového rozmezí. Verze metadat je 1.28.

Filtry
* {Nadprodukt}: Ovlivňuje {zobrazení pro konkrétní hlavní produktovou skupinu}. Interpretace: {Umožňuje sledovat stabilitu a růst jednotlivých částí nabídky}.
* {Mesic}: Ovlivňuje {zobrazení stavu portfolia k určitému časovému bodu}. Interpretace: {Sleduje vývoj v měsíčních krocích}.

Míry
* {Počet OPM}: Měří {aktuální počet odběrných míst v rámci vybrané produktové kategorie}. Interpretace: {Hlavní ukazatel velikosti a síly konkrétního produktu na trhu}. Použití: {Všechny analytické stránky}.
* {Max(zis VW_ROZPAD_NADPRODUKTY.Mesic)}: Měří {datum nejaktuálnějšího stavu portfolia}. Interpretace: {Potvrzuje aktuálnost reportovaných dat}. Použití: {Konkrétní vývoj}.
