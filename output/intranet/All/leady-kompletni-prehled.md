Business popis
Tento report poskytuje kompletní přehled o generování a stavu leadů (obchodních příležitostí). Slouží k monitorování úspěšnosti oslovování potenciálních zákazníků a jejich postupu obchodním trychtýřem. Pomáhá identifikovat geografické rozložení leadů podle krajů a okresů (odvozeno z názvu). Umožňuje analýzu efektivity práce s leady v jednotlivých fázích jejich životního cyklu. Report je klíčový pro plánování prodejních kapacit a vyhodnocování marketingových kampaní (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Leady - INTRO: Úvodní stránka s navigací.
* Leady - Kompletní přehled – GRAF: Vizuální analýza počtu a stavu leadů.
* Leady - Kompletní přehled - TAB: Detailní tabulkový výpis leadů podle obchodníků.
* Leady - Přehled kraje: Mapové zobrazení hustoty leadů v krajích ČR.
* Leady - Přehled okresy: Mapové zobrazení hustoty leadů v okresech ČR.

Technický popis
Report obsahuje 5 stránek a celkem 49 vizuálních prvků, včetně map (shapeMap), sloupcových grafů a pivotních tabulek. Technicky využívá 3 hlavní tabulky a 3 klíčové míry pro sledování objemu a času vzniku leadů. Zahrnuje 12 průřezů pro detailní filtraci podle času a regionu. Datové zdroje nejsou v M kódu přímo detekovány, report pravděpodobně běží nad publikovaným datasetem (pravděpodobné). Verze metadat je 1.28.

Filtry
* {CreatedAt}: Ovlivňuje {zobrazení leadů podle data jejich vzniku}. Interpretace: {Umožňuje sledovat čerstvost a historii náběru obchodních příležitostí}.
* {LeadPhaseCode01}: Ovlivňuje {zobrazení leadů v konkrétní fázi procesu}. Interpretace: {Pomáhá identifikovat úzká hrdla v obchodním procesu}.
* {Celé Jméno}: Ovlivňuje {zobrazení leadů přiřazených konkrétnímu obchodníkovi}. Interpretace: {Sleduje vytížení jednotlivých členů týmu}.

Míry
* {CountNonNull(Lead.Id)}: Měří {celkový počet unikátních leadů}. Interpretace: {Základní kvantitativní ukazatel náběru příležitostí}. Použití: {Většina stránek reportu}.
* {Max(Lead.CreatedAt)}: Měří {datum posledního vytvořeného leadu}. Interpretace: {Indikuje aktuálnost dat v reportu}. Použití: {Leady - INTRO}.
