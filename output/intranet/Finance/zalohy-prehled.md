Business popis
Tento report poskytuje komplexní přehled o stavu a plnění záloh od zákazníků. Sleduje proces předepisování záloh a jejich následné úhrady v čase (odvozeno z názvu). Pomáhá finančnímu oddělení monitorovat procento splacení zálohových předpisů a identifikovat částky před a po splatnosti. Umožňuje detailní analýzu záloh podle typu energie a segmentu zákazníků. Report je klíčový pro predikci příjmů a kontrolu platební disciplíny v rámci zálohových kalendářů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Zálohy - INTRO: Úvodní stránka s navigací.
* Kompletní přehled záloh: Detailní tabulkový výpis všech klientských záloh.
* Přehled předpisů záloh: Analýza stavu úhrad oproti vystaveným předpisům.

Technický popis
Report se skládá ze 3 stránek a obsahuje 32 vizuálních prvků, včetně plošných grafů, sloupcových grafů a tabulek. Technicky využívá 4 tabulky, přičemž klíčová data pocházejí z tabulek zis VW_Zalohy a zis VW_Prehled_Predpisu_Zaloh. Obsahuje 10 měr pro výpočet finančních zůstatků a úspěšnosti inkasa. Verze metadat je 1.28. Datové zdroje jsou integrovány přes centrální model ZIS.

Filtry
* {celkem v predpisech}: Ovlivňuje {zobrazení podle výše vystavených zálohových nároků}. Interpretace: {Sleduje celkovou očekávanou částku záloh}.
* {celkem zustatek}: Ovlivňuje {zobrazení neuhrazené části záloh}. Interpretace: {Identifikuje chybějící příjmy v zálohovém systému}.
* {% splacení}: Ovlivňuje {zobrazení podle míry úhrady předpisů}. Interpretace: {Pomáhá najít zákazníky s nízkou platební disciplínou}.

Míry
* {Celková částka záloh}: Měří {sumu všech vystavených zálohových dokladů}. Interpretace: {Celkový nárok na platby od zákazníků v daném období}. Použití: {Kompletní přehled záloh}.
* {% splacení}: Měří {poměr uhrazených záloh vůči předepsaným}. Interpretace: {Klíčové KPI pro úspěšnost inkasa záloh}. Použití: {Přehled předpisů záloh}.
* {zůstatek k úhradě po splatnosti}: Měří {výši dlužných záloh po termínu splatnosti}. Interpretace: {Zobrazuje okamžité riziko v příjmech ze záloh}. Použití: {Přehled předpisů záloh}.
* {celkem v predpisech}: Měří {sumu všech předepsaných záloh v analytickém pohledu}. Interpretace: {Základna pro výpočet úspěšnosti úhrad}. Použití: {Přehled předpisů záloh}.
