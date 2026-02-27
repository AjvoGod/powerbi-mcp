Business popis
Tento report slouží administrátorům k monitorování využití Power BI platformy v rámci společnosti. Sleduje počty aktivních uživatelů, frekvenci zobrazení jednotlivých reportů a aktivitu v pracovních prostorech (odvozeno z názvu). Pomáhá identifikovat nejvyužívanější analýzy a naopak reporty, které nejsou dlouhodobě používány (neaktivní uživatelé). Umožňuje kontrolu přístupů a licencí Power BI. Report je klíčový pro optimalizaci BI obsahu a zajištění bezpečnosti dat (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Tracker - Report Usage: Statistiky sledovanosti reportů a aktivity uživatelů.
* User Access Monitoring: Přehled o přidělených rolích a přístupových právech v BI prostředí.

Technický popis
Report obsahuje 2 stránky a 21 vizuálních prvků, včetně sloupcových grafů a tabulek. Technicky využívá API logy (Activity Log) a 5 měr pro sčítání uživatelů a zobrazení. Verze metadat je 1.28. Report je postaven na kombinaci systémových metadat o workspacích a reálných aktivitách uživatelů.

Filtry
* {Počet zobrazení}: Ovlivňuje {zobrazení reportů podle jejich popularity}. Interpretace: {Identifikuje klíčové analytické nástroje firmy}.
* {selfFilterEnabled}: Ovlivňuje {možnost interaktivního filtrování podle uživatelských jmen}. Interpretace: {Umožňuje auditovat aktivitu konkrétního pracovníka}.

Míry
* {Active Users}: Měří {počet unikátních uživatelů, kteří v daném období přistoupili k BI}. Interpretace: {Ukazatel reálného využívání datové kultury ve firmě}. Použití: {Tracker - Report Usage}.
* {Počet zobrazení}: Měří {celkový počet otevření stránek reportů}. Interpretace: {Sleduje intenzitu využívání reportingu}. Použití: {Všechny stránky}.
* {Inactive user count}: Měří {počet uživatelů s licencí, kteří nevykazují žádnou aktivitu}. Interpretace: {Pomáhá optimalizovat náklady na licence}. Použití: {User Access Monitoring}.
