Business popis
Tento report poskytuje komplexní analýzu stornovanosti a odchodů zákazníků (Churn Rate) v české verzi. Sleduje počty stornovaných OPM, objem spotřeb a úspěšnost retenčních aktivit v různých fázích. Pomáhá identifikovat příčiny odchodů zákazníků a vyhodnocovat výkonnost obchodních zástupců z pohledu stability jejich prodejů (odvozeno z názvu). Umožňuje geografické srovnání odchodů podle krajů a analýzu největších zákazníků, kteří podali výpověď. Report je zásadní pro řízení oddělení retence a pro dlouhodobé plánování stability portfolia (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Churn - Odběrná místa / Spotřeby: Hlavní ukazatele odchodů v kusech a v MWh.
* Churn - Přijaté výpovědi / Zájem o výpověď: Sledování náběhu klientské nespokojenosti.
* Rozpad Storen - OZ / TOP 10 KL: Detailní pohled na viníky a největší ztráty.
* StornaVsProdukce: Srovnání nově sjednané produkce s odpisy stornovaných smluv.
* Churn OPM - Kraje: Regionální mapa odchodů.
* První / Následná retence - OPM / MWh: Detailní rozbor úspěšnosti udržení zákazníka.

Technický popis
Report se skládá z 15 stránek a obsahuje vysoký počet 205 vizuálních prvků, což z něj dělá jeden z nejrobustnějších reportů v systému. Technicky využívá 11 tabulek a 67 měr pro výpočet složitých KPI stornovanosti a retence. Obsahuje integraci s Power Automate pro automatizaci následných akcí. Verze metadat je 1.31. Datové zdroje zahrnují tabulku RETENCE_CHURN_RATE a zis VW_Report_Stornované_OPM_data_view.

Filtry
* {Churn - OPM}: Ovlivňuje {zobrazení počtu odchozích zákazníků}. Interpretace: {Sleduje kvantitu ztracených příležitostí}.
* {Úspěšnost retence (%)}: Ovlivňuje {zobrazení míry zachráněných smluv}. Interpretace: {Klíčový ukazatel pro hodnocení retenčního týmu}.
* {Podíl stornovanosti OZ}: Ovlivňuje {zobrazení kvality prodejů jednotlivých obchodníků}. Interpretace: {Identifikuje rizikové partnery s vysokou fluktuací prodejů}.

Míry
* {Finální Cancellation Rate}: Měří {celkovou míru odchodu zákazníků po započtení všech vlivů}. Interpretace: {Nejpřesnější ukazatel úbytku klientské základny}. Použití: {Churn - Odběrná místa}.
* {Úspěšná retence OPM_míra}: Měří {procento zachráněných odběrných míst}. Interpretace: {Efektivita retenčního procesu v kusech}. Použití: {Retenční stránky}.
* {Sjednáno nových / Storna - MWh}: Měří {poměr mezi novou produkcí a ztrátou stornem}. Interpretace: {Ukazuje, zda je nárůst firmy zdravý a převyšuje storna}. Použití: {StornaVsProdukce}.
* {Zájmů o výpověď (OPM)}: Měří {počet kontaktů indikujících nespokojenost před podáním výpovědi}. Interpretace: {Včasné varování před budoucím odchodem}. Použití: {Churn - Zájem o výpověď}.
