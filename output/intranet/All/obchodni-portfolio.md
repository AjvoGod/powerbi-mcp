Business popis
Tento report poskytuje detailní pohled na aktuální stav obchodního portfolia společnosti. Sleduje počet aktivních klientů (KL) a odběrných míst (OPM) rozdělených podle komodit a regionů. Pomáhá monitorovat vývoj portfolia v čase a identifikovat geografické oblasti s nejvyšší koncentrací zákazníků (odvozeno z názvu). Umožňuje analýzu spotřeb u stávajících zákazníků a srovnání výkonnosti jednotlivých obchodních zástupců a poboček při správě svěřeného kmene. Report slouží k dlouhodobému hodnocení stability a růstu klientské základny (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Obchodní portfolio - INTRO: Úvodní stránka s navigací.
* Aktivní KL a OPM - OZ - TAB: Tabulkový přehled portfolia podle obchodníků.
* Aktivní KL a OPM - OZ – GRAF: Vizuální srovnání počtu zákazníků u obchodníků.
* Aktivní KL a OPM - POB - TAB: Tabulkový přehled portfolia podle poboček.
* Aktivní KL a OPM - POB– GRAF: Vizuální srovnání velikosti portfolia poboček.
* Aktivní OPM - OZ - MAPA: Geografické rozložení portfolia na mapě ČR.
* Aktivní KL a OPM - OZ - V Čase: Historický vývoj počtu klientů a odběrných míst.

Technický popis
Report obsahuje 7 stránek a 54 vizuálních prvků, včetně map (shapeMap), pivotních tabulek a pokročilých průřezů (advancedSlicerVisual). Technicky využívá 4 tabulky a 6 měr pro výpočet stavů a spotřeb. Report kombinuje aktuální data s historickým rozpadem portfolia (tabulka zis VW_ROZPAD_PORTFOLIA_OZ). Datové zdroje nejsou v M kódu přímo detekovány. Verze metadat je 1.28.

Filtry
* {Komodita}: Ovlivňuje {zobrazení dat podle typu energie (např. plyn, elektřina)}. Interpretace: {Umožňuje segmentovat portfolio podle produktů}.
* {Pobočka}: Ovlivňuje {zobrazení dat pro konkrétní organizační jednotku}. Interpretace: {Sleduje regionální sílu obchodní sítě}.
* {pocet_KL_na_dodavce}: Ovlivňuje {zobrazení podle počtu klientů v aktivním odběru}. Interpretace: {Filtruje pouze skutečně aktivní část portfolia}.
* {suma_spotreb}: Ovlivňuje {zobrazení podle objemu spotřebované energie}. Interpretace: {Pomáhá identifikovat klíčové zákazníky portfolia}.

Míry
* {pocet_KL_na_dodavce}: Měří {aktuální počet klientů v odběru}. Interpretace: {Ukazuje velikost klientské základny}. Použití: {Všechny přehledové stránky}.
* {pocet_OPM_na_dodavce}: Měří {aktuální počet aktivních odběrných míst}. Interpretace: {Základní jednotka pro výpočet tržního podílu}. Použití: {Všechny přehledové stránky}.
* {suma_spotreb}: Měří {celkový objem spotřeby v portfoliu}. Interpretace: {Energetický rozměr spravovaného portfolia}. Použití: {Aktivní OPM - OZ - MAPA}.
* {pocet_Kl_v_case}: Měří {historický vývoj počtu klientů}. Interpretace: {Ukazuje trendy růstu nebo úbytku zákazníků}. Použití: {Aktivní KL a OPM - OZ - V Čase}.
