Business popis
Tento report poskytuje detailní analýzu portfolia elektřiny rozdělenou podle technických typů měření (A, B, C, C1, C3, C4). Slouží k monitorování počtu aktivních odběrných míst (OPM) a jejich roční spotřeby v jednotlivých kategoriích měření (odvozeno z názvu). Pomáhá managementu pochopit technickou strukturu zákaznického kmene a vývoj jednotlivých segmentů měření v čase. Umožňuje sledovat přírůstky a úbytky zákazníků v rámci konkrétních technických parametrů odběru. Report je nezbytný pro technické plánování dodávek a analýzu chování různých typů odběratelů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Portfolio ELE - INTRO: Úvodní stránka s navigací.
* Portfolio ELE - Měření A / B / C: Specifické přehledy pro velkoodběratele (A, B) a maloodběratele (C).
* Portfolio ELE - Měření C1 / C3 / C4: Detailní pohledy na specifické podkategorie maloodběru.

Technický popis
Report se skládá ze 7 stránek a 73 vizuálních prvků, s dominantním zastoupením stuhových grafů (ribbonChart) pro vizualizaci změn v pořadí a objemu v čase. Technicky využívá 7 tabulek (pro každý typ měření samostatně) a 12 měr. Verze metadat je 1.28. Datové zdroje jsou strukturovány podle historických uzávěrek portfolia v tabulkách typu "Měření X - Zákaznický kmen".

Filtry
* {FirstDayOfMonthTable.Date}: Ovlivňuje {zobrazení stavu portfolia k prvnímu dni vybraného měsíce}. Interpretace: {Umožňuje historické srovnání technické struktury kmene}.
* {Počet všech OPM}: Ovlivňuje {zobrazení podle kvantity technických odběrných míst}. Interpretace: {Sleduje nárůst nebo pokles počtu zákazníků v dané kategorii měření}.

Míry
* {Sum(Měření X - Zákaznický kmen.Počet všech OPM)}: Měří {celkový počet aktivních OPM pro konkrétní typ měření}. Interpretace: {Ukazuje velikost segmentu (např. segment průmyslových odběrů typu A)}. Použití: {Příslušná stránka měření}.
* {Sum(Měření X - Zákaznický kmen.Součet Roční spotřeby)}: Měří {celkovou energetickou náročnost dané kategorie měření}. Interpretace: {Ukazuje energetický význam technického segmentu pro společnost}. Použití: {Příslušná stránka měření}.
