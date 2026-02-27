Business popis
Tento report slouží k monitorování a analýze reklamací přijatých od zákazníků. Sleduje počty reklamací v čase, jejich aktuální stavy a rozdělení podle různých atributů (typ reklamace, šablona). Pomáhá oddělení zákaznické péče identifikovat zpoždění v řešení reklamací (úkoly po deadlinu) a monitorovat finanční dopady reklamovaných částek na zůstatky k úhradě (odvozeno z názvu). Umožňuje detailní analýzu trendů v reklamacích a efektivitu jejich vyřizování. Report je klíčovým nástrojem pro zvyšování kvality služeb a minimalizaci chybovosti v procesech společnosti (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Reklamace - INTRO: Úvodní stránka s navigací.
* Reklamace - Hlavní přehled: Globální statistiky počtu a vývoje reklamací.
* Reklamace - Přehled dle Atributu: Analýza reklamací podle kategorií a důvodů.
* Reklamace - Přehled po termínu (historie/DNES): Sledování zpožděných reklamací.
* Reklamace - Objem zůstatků: Finanční význam reklamovaných částek ve vztahu k pohledávkám.
* Tooltipy: Detailní náhledy na hladiny, atributy a časové rozpady pro interaktivní analýzu.

Technický popis
Report obsahuje 12 stránek a 82 vizuálních prvků, včetně oblastních grafů, pivotních tabulek a detailních tabulek. Technicky využívá 4 tabulky (stěžejní je zis VW_REKLAMACE) a 8 měr pro výpočet počtů a finančních objemů. Zahrnuje 25 průřezů pro hloubkovou filtraci dat. Verze metadat je 1.28. Datové zdroje jsou napojeny na centrální modul reklamací a předpisů.

Filtry
* {pocet_reklamaci}: Ovlivňuje {zobrazení podle intenzity chybovosti}. Interpretace: {Identifikuje nejčastější typy klientských problémů}.
* {Počet úkolů po deadlinu}: Ovlivňuje {zobrazení prioritních případů k dořešení}. Interpretace: {Sleduje kvalitu servisu a dodržování lhůt}.
* {Objem fakturace reklamací}: Ovlivňuje {zobrazení podle finanční závažnosti reklamace}. Interpretace: {Sleduje objem peněz zablokovaných v reklamačním řízení}.

Míry
* {pocet_reklamaci}: Měří {celkový počet registrovaných reklamací v systému}. Interpretace: {Kvantitativní ukazatel nespokojenosti zákazníků}. Použití: {Všechny přehledové stránky}.
* {Objem fakturace reklamací}: Měří {sumu finančních částek, které jsou předmětem reklamace}. Interpretace: {Finanční dopad reklamací na cash flow společnosti}. Použití: {Reklamace - Objem zůstatků}.
* {Počet úkolů po deadlinu}: Měří {počet reklamací, které nebyly vyřízeny v zákonné nebo interní lhůtě}. Interpretace: {Indikátor procesního selhání v zákaznické péči}. Použití: {Přehled po termínu}.
