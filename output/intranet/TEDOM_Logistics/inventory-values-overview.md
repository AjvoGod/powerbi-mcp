Business popis
Tento report poskytuje aktuální statický přehled o celkové hodnotě skladových zásob rozdělený podle klíčových kategorií. Sleduje hodnotu zásob v českých korunách napříč skupinami skladů, jednotlivými lokalitami a účetními skupinami (odvozeno z názvu). Pomáhá managementu rychle identifikovat, kde je aktuálně vázán největší finanční objem majetku společnosti. Umožňuje přehlednou segmentaci zásob pro potřeby inventarizace a finančního výkaznictví. Report slouží jako okamžitý podklad pro kontrolu stavu skladu k aktuálnímu dni (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Logistics - INTRO: Úvodní stránka s navigací.
* Warehouse Groups: Přehled hodnoty zásob podle logistických celků.
* Sites: Přehled hodnoty zásob podle geografických lokalit/provozoven.
* Accounting Groups: Přehled hodnoty zásob podle účetních kategorií materiálu.

Technický popis
Report se skládá ze 4 stránek a 41 vizuálních prvků, především pruhových grafů a tabulek pro srovnání hodnot. Technicky je postaven na datech z tabulky Energie VW_Logistika_Overview a využívá míru pro přepočet celkové hodnoty v CZK. Obsahuje pokročilé průřezy pro filtraci dat. Verze metadat je 1.28. Report je doplňkem k dynamickému sledování vývoje zásob.

Filtry
* {Total CZK value}: Ovlivňuje {zobrazení záznamů podle jejich celkové ceny}. Interpretace: {Pomáhá filtrovat významné a zanedbatelné skladové položky}.
* {Warehouse Group}: Ovlivňuje {výběr konkrétního logistického úseku}. Interpretace: {Sleduje distribuci majetku v rámci firmy}.

Míry
* {Total CZK value}: Měří {aktuální součet finančních hodnot všech vybraných skladových položek}. Interpretace: {Základní finanční ukazatel hodnoty skladových zásob}. Použití: {Všechny přehledové stránky}.
