Business popis
Tento report poskytuje komplexní přehled o procesu upomínání dlužníků v českém jazyce. Sleduje efektivitu vymáhání pohledávek prostřednictvím zasílaných upomínek a monitoruje platební morálku zákazníků po obdržení výzvy (odvozeno z názvu). Pomáhá oddělení pohledávek sledovat objem upomenutých částek a porovnávat je se skutečně zaplacenými dluhy. Report umožňuje analýzu aktivních a neaktivních upomínek v čase. Slouží k optimalizaci komunikační strategie s dlužníky a ke snižování celkové dlužné částky společnosti (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Upomínání - INTRO: Úvodní stránka s navigací.
* Upomínání - Počty a stavy zůstatků: Přehled o kvantitě upomínek a finančních zůstatcích.
* Upomínání - Zaplacené vs Nezaplacené: Sledování úspěšnosti inkasa upomínek v čase.
* Upomínání - Upomínky aktiv. vs neaktiv.: Analýza stavu upomínacího procesu.

Technický popis
Report se skládá ze 4 stránek a obsahuje 38 vizuálních prvků, včetně 100% skládaných pruhových grafů, sloupcových grafů a pivotních tabulek. Technicky využívá 2 tabulky a 8 vypočtených měr. Je funkčně identický s verzí "Reminders Report", ale lokalizován pro české uživatele. Verze metadat je 1.28. Datové zdroje jsou integrovány přes tabulku zis VW_Upominky.

Filtry
* {Zaplacená/Nezaplacená}: Ovlivňuje {zobrazení úspěšnosti úhrad}. Interpretace: {Pomáhá identifikovat dlužníky, kteří nereagují na upomínky}.
* {Upomínky - Příznak aktivní upomínka}: Ovlivňuje {zobrazení aktuálně probíhajících procesů}. Interpretace: {Sleduje živou agendu vymáhání}.
* {EndOfTheMonth}: Ovlivňuje {zobrazení statistik k měsíčním uzávěrkám}. Interpretace: {Umožňuje historické srovnání efektivity upomínání}.

Míry
* {Sum(stage_zis upominky.Upomínky - Upomenutá částka)}: Měří {celkový finanční objem vystavených výzev}. Interpretace: {Ukazuje celkovou sumu nárokovanou v rámci upomínacího procesu}. Použití: {Počty a stavy zůstatků}.
* {CountNonNull(stage_zis upominky.Upomínky - ID)}: Měří {počet vygenerovaných upomínek}. Interpretace: {Kvantitativní ukazatel administrativní zátěže vymáhání}. Použití: {Zaplacené vs Nezaplacené}.
* {% zůstatku}: Měří {procentuální podíl neuhrazené části dluhu}. Interpretace: {Ukazuje relativní úspěšnost vymáhání konkrétních upomínek}. Použití: {Počty a stavy zůstatků}.
