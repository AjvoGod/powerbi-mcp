Business popis
Tento report poskytuje detailní analýzu vývoje klientských pohledávek v čase. Zaměřuje se na věkovou strukturu dluhů a jejich rozdělení do kategorií podle počtu dní po splatnosti (DPD skupiny). Pomáhá finančnímu oddělení a managementu sledovat platební morálku zákazníků a identifikovat rizika v portfoliu (odvozeno z názvu). Umožňuje segmentaci dlužníků na firmy a domácnosti a poskytuje nezbytné podklady pro bankovní uzávěrky. Report je klíčový pro dlouhodobé řízení likvidity a sledování trendů v dlužné pozici společnosti (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Vývoj pohledávek - INTRO: Úvodní stránka s navigací.
* Věkové přihrádky - GRAF: Časový vývoj dluhů podle jejich stáří.
* Věkové přihrádky - TAB: Tabulkový rozpad věkové struktury pohledávek.
* Dom/Fir: Srovnání dlužné pozice domácností a firem.
* DPD skupiny - GRAF: Analýza prodlení podle časových košů (DPD).
* DPD skupiny – TAB: Tabulkový rozpad DPD skupin pro detailní kontrolu.
* Uzávěrky pro banku: Specializovaný přehled pro potřeby bankovního reportingu.

Technický popis
Report se skládá ze 7 stránek a obsahuje 95 vizuálních prvků, což z něj činí robustní analytický nástroj. Využívá vrstvené plošné grafy, pivotní tabulky a pokročilé průřezy (advancedSlicerVisual). Technicky je postaven na 4 tabulkách (stěžejní je stage_zis Pohledavky_Historizace) a 6 měrách. Verze metadat je 1.28. Report je českou variantou analýzy "Receivables flow".

Filtry
* {Skupina věk}: Ovlivňuje {zobrazení pohledávek podle doby jejich existence}. Interpretace: {Sleduje historické „stárnutí“ dluhu v portfoliu}.
* {DPD}: Ovlivňuje {zobrazení podle počtu dní po splatnosti}. Interpretace: {Kategorizuje pohledávky od mírného prodlení po kritické stavy}.
* {Firma/Domácnost}: Ovlivňuje {zobrazení dat pro konkrétní typ zákazníka}. Interpretace: {Pomáhá odlišit platební chování firemní klientely od rezidentů}.
* {DatumUzávěrky}: Ovlivňuje {zobrazení stavu pohledávek k fixnímu datu uzávěrky}. Interpretace: {Zajišťuje konzistentní data pro reportování externím institucím}.

Míry
* {Sum(stage_zis Pohledavky_Historizace.Zůstatek)}: Měří {celkovou výši pohledávek k danému datu}. Interpretace: {Hlavní ukazatel objemu peněz mimo společnost}. Použití: {Všechny analytické stránky}.
* {Max(stage_zis Pohledavky_Historizace.DPD)}: Měří {maximální prodlení v dnech}. Interpretace: {Identifikuje nejrizikovější pohledávky v portfoliu}. Použití: {DPD přehledy}.
* {RozmeziObdobi}: Měří {časový rozsah vybraný uživatelem v reportu}. Interpretace: {Zajišťuje správný kontext pro výpočet trendů}. Použití: {Časové grafy}.
