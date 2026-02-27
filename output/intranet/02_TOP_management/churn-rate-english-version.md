Business popis
Tento report poskytuje detailní pohled na mírů odchodu zákazníků (Churn Rate) a úspěšnost retenčních aktivit v anglickém jazyce. Sleduje počty přijatých výpovědí a objem ztracené spotřeby v MWh. Pomáhá managementu vyhodnocovat efektivitu první i následné retence při udržení zákazníků (odvozeno z názvu). Umožňuje analýzu důvodů odpojení a porovnání nově sjednaných smluv s odchozími. Report je klíčovým nástrojem pro mezinárodní reporting stability klientského kmene a úspěšnosti krizové komunikace se zákazníky (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Churn - INTRO: Úvodní stránka s navigací.
* Churn - Accepted Terminations: Přehled přijatých a potvrzených výpovědí.
* Churn - Connect and Disconnect MWh: Srovnání náběhu nové produkce a úbytku v MWh.
* Disconnection Details: Detailní rozbor odpojených odběrných míst v měsíci.
* First Retention - Supply Points / Consumption: Úspěšnost první vlny retenčních hovorů (počty a MWh).
* Subsequent Retention - Supply Points / Consumption: Úspěšnost následné retence po neúspěchu prvního pokusu.

Technický popis
Report se skládá z 8 stránek a obsahuje 95 vizuálních prvků, včetně kombinovaných grafů (lineStackedColumnComboChart), oblastních grafů a pokročilých průřezů. Technicky využívá 9 tabulek a 36 měr pro výpočet procentuální úspěšnosti retence a churn rate. Verze metadat je 1.28. Report je anglickou variantou reportu "Report stornovanosti".

Filtry
* {Cancellation Rate}: Ovlivňuje {zobrazení míry odchodu zákazníků}. Interpretace: {Klíčové KPI pro sledování loajality zákazníků}.
* {Úspěšnost retence (%)}: Ovlivňuje {zobrazení výsledků retenčního oddělení}. Interpretace: {Ukazuje schopnost zvrátit výpověď zákazníka}.
* {odpojenych_spotreb_v_mesici}: Ovlivňuje {zobrazení reálného úbytku energie v síti}. Interpretace: {Sleduje fyzický dopad odchodů na portfolio}.

Míry
* {Cancellation Rate}: Měří {procentuální míru odchodu zákazníků}. Interpretace: {Základní ukazatel fluktuace portfolia}. Použití: {Churn přehledy}.
* {Úspěšnost první retence (%)}: Měří {procentuální podíl zachráněných smluv při prvním kontaktu}. Interpretace: {Sleduje efektivitu retenčních specialistů}. Použití: {First Retention - Supply Points}.
* {Sum(RETENCE_CHURN_RATE.Úspěšná retence MWh)}: Měří {energetický objem zachráněný v rámci retence}. Interpretace: {Finanční význam úspěšné retence pro společnost}. Použití: {Retention - Consumption}.
* {connect_disconnect}: Měří {saldo mezi nově připojenými a odpojenými MWh}. Interpretace: {Indikuje, zda portfolio čistě roste nebo klesá}. Použití: {Churn - Connect and Disconnect MWh}.
