Business popis
Tento report se zaměřuje na sledování leadů generovaných ze systému MERK a jejich následné zpracování v systému Raynet. Slouží k vyhodnocování plnění nároků na nové leady a monitorování stavu jejich rozpracovanosti (odvozeno z názvu). Pomáhá identifikovat důvody neúspěšného oslovení, jako je například opakované nezvedání telefonu. Report umožňuje obchodníkům i managementu sledovat efektivitu vytěžování externích databází kontaktů. Slouží k optimalizaci procesu distribuce obchodních příležitostí (pravděpodobné).

Struktura stránek (co na nich typicky je)
* MERK Leady - INTRO: Úvodní stránka s navigací.
* MERK Leady - Plnění: Přehled o čerpání nároků na nové obchodní příležitosti.
* MERK Leady - Kompletní přehled: Tabulkový rozpad leadů podle obchodníků a jejich aktuálního stavu.

Technický popis
Report se skládá ze 3 stránek a obsahuje 18 vizuálních prvků, především tabulky a pivotní tabulky. Technicky je postaven na datech ze systému Raynet (tabulka raynet VW_Nalevani_leadu) a využívá 4 míry pro výpočet limitů a stavů. Verze metadat je 1.31. Datové zdroje jsou pravděpodobně integrovány přes centrální model Power BI.

Filtry
* {Stav leadu}: Ovlivňuje {zobrazení záznamů podle aktuální fáze zpracování}. Interpretace: {Rozlišuje mezi novými, rozpracovanými a uzavřenými leady}.
* {Celé Jméno}: Ovlivňuje {zobrazení leadů konkrétního uživatele}. Interpretace: {Sleduje individuální výkon v rámci systému MERK}.

Míry
* {Celkem Nových - MAX 20}: Měří {počet nově přidělených leadů s limitem}. Interpretace: {Sleduje dodržování distribučních pravidel}. Použití: {MERK Leady - Plnění}.
* {Celkem Nezvedá - MAX 20}: Měří {počet leadů v neúspěšném stavu "nezvedá"}. Interpretace: {Identifikuje nekvalitní nebo obtížně kontaktovatelné leady}. Použití: {MERK Leady - Plnění}.
* {Nárok na nové leady}: Měří {vypočtený limit pro přidělení dalších kontaktů}. Interpretace: {Určuje kapacitu pro další obchodní aktivitu}. Použití: {MERK Leady - Plnění}.
