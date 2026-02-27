Business popis
Tento report poskytuje přehled o produkci a výkonnosti obchodních zástupců (OZ) z pohledu získaných bodů a odběrných míst (OM). Slouží k vyhodnocování úspěšnosti jednotlivců i celých poboček v čase. Pomáhá monitorovat kvalitu produkce a objem spotřeb u nově získaných zákazníků (odvozeno z názvu). Report umožňuje identifikovat nejúspěšnější obchodníky v měsíčních a kvartálních cyklech. Slouží jako klíčový nástroj pro řízení prodejních výsledků a motivaci obchodního týmu (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Aktivní body - INTRO: Úvodní stránka s navigací.
* Počet aktivních bodů a OM obchodníků: Aktuální přehled získaných bodů a odběrných míst.
* Vývoj získávání bodů a OM v čase: Analýza časových trendů v produkci.
* Pobočky - Přehledy produkce: Porovnání výkonnosti jednotlivých poboček.
* TOP 15 Obchodníků - Měsíc: Žebříček nejlepších obchodníků za měsíc.
* TOP 15 Obchodníků - Měsíc – Rozpad projekt: Detailní pohled na projekty u nejlepších obchodníků.
* TOP 15 Obchodníků - Kvartál: Žebříček nejlepších obchodníků za čtvrtletí.
* Spotřeby: Analýza objemu spotřeb u získaných odběrných míst.

Technický popis
Report se skládá z 8 stránek a obsahuje celkem 92 vizuálních prvků, což z něj činí vysoce detailní analytický nástroj. Technicky využívá 2 hlavní tabulky a 13 vypočtených měr pro sledování KPI. Zahrnuje širokou škálu vizuálů včetně kombinovaných grafů, pivotních tabulek a karet. Datové zdroje nejsou v M kódu přímo detekovány, report pravděpodobně běží nad sdíleným datovým modelem (pravděpodobné). Verze metadat je 1.28.

Filtry
* {BODY_Přinesené}: Ovlivňuje {zobrazení hrubého objemu bodů}. Interpretace: {Sleduje celkový náběh obchodních příležitostí}.
* {BODY_OK}: Ovlivňuje {zobrazení schválených a uznaných bodů}. Interpretace: {Zobrazuje reálnou, validovanou produkci}.
* {OM Přinesené}: Ovlivňuje {zobrazení počtu nově získaných odběrných míst}. Interpretace: {Ukazuje kvantitativní nárůst portfolia}.
* {OM_OK}: Ovlivňuje {zobrazení potvrzených odběrných míst}. Interpretace: {Klíčový ukazatel finálně získaných zákazníků}.
* {Kvalita}: Ovlivňuje {zobrazení dat podle kvalitativních parametrů}. Interpretace: {Umožňuje odlišit standardní a prémiovou produkci}.
* {Celková Spotřeba}: Ovlivňuje {zobrazení podle objemu spotřebované energie}. Interpretace: {Pomáhá identifikovat bonitnější zákazníky}.

Míry
* {sum_body}: Měří {celkový součet bodů}. Interpretace: {Základní ukazatel objemu produkce}. Použití: {Stránka "Vývoj získávání bodů a OM v čase"}.
* {sum_OPM}: Měří {celkový počet odběrných míst}. Interpretace: {Ukazuje počet nově uzavřených smluv}. Použití: {Stránka "Vývoj získávání bodů a OM v čase"}.
* {Sum(DATA_DR.BODY_OK)}: Měří {součet uznaných bodů}. Interpretace: {Reálný výkon obchodníka po validaci}. Použití: {Stránky TOP obchodníků}.
* {Sum(DATA_DR.Celková Spotřeba)}: Měří {sumu spotřeb u získaných bodů}. Interpretace: {Ukazuje energetický potenciál produkce}. Použití: {Stránka "Spotřeby"}.
