Business popis
Tento report poskytuje detailní analýzu portfolia plynu rozdělenou podle technických typů měření (A, B, C, CM, C4). Slouží k monitorování počtu aktivních odběrných míst (OPM) a jejich roční spotřeby v rámci těchto kategorií (odvozeno z názvu). Pomáhá managementu sledovat vývoj klientského kmene plynu a identifikovat trendy v jednotlivých technických segmentech odběru v čase. Umožňuje porovnání historického vývoje počtu zákazníků a energetických objemů pro různé typy plynových instalací. Report je klíčový pro strategické plánování v segmentu plynu (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Portfolio PLYN - Měření A / B / C: Specifické přehledy pro velké, střední a malé odběratele plynu.
* Portfolio PLYN - Měření CM / C4: Detailní pohledy na specifické kategorie měření plynu.

Technický popis
Report se skládá ze 6 stránek a obsahuje 62 vizuálních prvků, především stuhové grafy (ribbonChart) pro zobrazení vývoje v čase. Technicky využívá 6 tabulek odpovídajících typům měření a 10 měr pro výpočet počtů a spotřeb. Verze metadat je 1.28. Struktura je analogická k reportu pro elektřinu, což zajišťuje konzistentní pohled na obě komodity.

Filtry
* {FirstDayOfMonthTable.Date}: Ovlivňuje {zobrazení stavu portfolia plynu k určitému měsíci}. Interpretace: {Umožňuje sledovat sezónnost a meziroční nárůsty v segmentu plynu}.
* {Počet všech OPM}: Ovlivňuje {zobrazení podle kvantity plynových přípojek}. Interpretace: {Sleduje rozšiřování zákaznické základny v segmentu plynu}.

Míry
* {Sum(Měření X - Zákaznický kmen.Počet všech OPM)}: Měří {celkový počet aktivních OPM pro daný typ měření plynu}. Interpretace: {Kvantitativní ukazatel velikosti segmentu (např. velké průmyslové kotelny v typu A)}. Použití: {Příslušná stránka měření}.
* {Sum(Měření X - Zákaznický kmen.Součet Roční spotřeby)}: Měří {celkovou energetickou spotřebu plynu v dané kategorii}. Interpretace: {Ukazuje celkovou expozici společnosti v daném technickém segmentu plynu}. Použití: {Příslušná stránka měření}.
