Business popis
Tento report poskytuje detailní analýzu stornovaných odběrných míst a smluv. Sleduje počty storen v čase, jejich energetický význam v MWh a rozdělení podle produktových řad a typů stornování (odvozeno z názvu). Pomáhá oddělení zákaznické péče a managementu identifikovat příčiny úbytku zákazníků na úrovni jednotlivých obchodníků i naddealerů. Umožňuje kontrolu technických chyb v procesu stornování a analýzu finančních ztrát plynoucích z neuskutečněných dodávek. Report je nezbytným podkladem pro optimalizaci procesů ukončování smluv a pro hodnocení kvality prodejní sítě (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Storna - INTRO: Úvodní stránka s navigací.
* STORNA - Rozklad v čase (kusy/MWh): Časové trendy úbytku portfolia.
* STORNA - počet storen po produktech: Analýza stornovanosti u konkrétních tarifů.
* STORNA - Přehled podle jejich typu: Kategorizace důvodů ukončení smluv.
* STORNA - Souhrny MWh dealer/naddealer: Výkonnostní pohled na stabilitu partnerských sítí.
* Chyby storen: Technická kontrola nesprávně provedených stornovacích procesů.

Technický popis
Report se skládá ze 7 stránek a obsahuje 68 vizuálních prvků, především sloupcové grafy pro srovnání kategorií a tabulky pro kontrolu dat. Technicky využívá 3 tabulky (stěžejní je STORNO) a 3 hlavní míry. Zahrnuje 20 průřezů pro detailní filtraci podle času a struktur. Verze metadat je 1.28. Datové zdroje jsou integrovány přes tabulku STORNO.

Filtry
* {ID smlouvy}: Ovlivňuje {zobrazení počtu stornovaných případů}. Interpretace: {Ukazuje kvantitu procesních úkonů ukončení}.
* {Spotřeba MWh}: Ovlivňuje {zobrazení podle energetického objemu ztráty}. Interpretace: {Identifikuje nejbolestivější úbytky v portfoliu}.

Míry
* {Sum(STORNO.ID smlouvy)}: Měří {celkový počet stornovaných smluv}. Interpretace: {Kvantitativní ukazatel úmrtnosti portfolia}. Použití: {Časové a produktové přehledy}.
* {Sum(STORNO.Spotřeba MWh)}: Měří {celkovou roční spotřebu navázanou na stornovaná OPM}. Interpretace: {Finanční a energetický rozměr úbytku zákazníků}. Použití: {MWh přehledy}.
* {Min(OPM_se_spat_skon.ČÍSLO SMLOUVY)}: Měří {indikátor pro vyhledávání chyb v procesu}. Interpretace: {Pomáhá identifikovat konkrétní vadné záznamy}. Použití: {Chyby storen}.
