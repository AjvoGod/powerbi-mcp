Business popis
Tento report poskytuje detailní pohled na úroveň stornovanosti uzavřených smluv a odběrných míst. Sleduje podíl stornovaných OM na celkové produkci a analyzuje finanční dopady těchto storen prostřednictvím ztracené spotřeby. Pomáhá managementu identifikovat příčiny a trendy ve stornování smluv na úrovni poboček i jednotlivých obchodníků (odvozeno z názvu). Umožňuje rozlišit mezi stornovaností podle počtu smluv a podle jejich energetického významu. Report je klíčový pro hodnocení reálné výtěžnosti prodejní sítě a úpravu akvizičních strategií (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Rozpad storen - INTRO: Úvodní stránka s navigací.
* Rozpad Storen - Pobočky: Srovnání stornovanosti mezi jednotlivými pobočkami.
* Rozpad Storen - Obchodníci: Detailní pohled na míru storen u konkrétních obchodních zástupců.

Technický popis
Report se skládá ze 3 stránek a obsahuje 30 vizuálních prvků, včetně pruhových grafů a tabulek. Technicky využívá 3 tabulky (včetně zis VW_Report_Stornované_OPM_data_view) a 4 klíčové míry pro výpočet procentuální stornovanosti. Obsahuje pokročilé průřezy (advancedSlicerVisual) pro filtraci podle obchodních struktur. Verze metadat je 1.31. Datové zdroje jsou pravděpodobně napojeny na centrální datový sklad.

Filtry
* {Podíl stornovanosti OZ na spotřebách}: Ovlivňuje {zobrazení obchodníků s vysokou mírou storen}. Interpretace: {Identifikuje rizikové prodejní profily z pohledu energetického objemu}.
* {Pobočka}: Ovlivňuje {zobrazení dat pro konkrétní regionální tým}. Interpretace: {Pomáhá sledovat lokální trendy ve stabilitě portfolia}.

Míry
* {Počet Storen}: Měří {celkový počet zrušených nebo stornovaných odběrných míst}. Interpretace: {Kvantitativní ukazatel úbytku produkce}. Použití: {Všechny přehledy storen}.
* {Celková Spotřeba Storen}: Měří {objem energetické spotřeby navázaný na stornovaná OM}. Interpretace: {Finanční rozměr ztracené příležitosti}. Použití: {Analýza dopadů storen}.
* {Podíl stornovanosti OZ na stornovaných OM}: Měří {procentuální míru storen vůči celkové produkci}. Interpretace: {Klíčové KPI pro hodnocení kvality práce obchodníka}. Použití: {Rozpad Storen - Obchodníci}.
