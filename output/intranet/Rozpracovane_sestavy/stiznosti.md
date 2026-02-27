Business popis
Tento report slouží k monitorování a řízení stížností přijatých od zákazníků (rozpracovaná verze). Sleduje celkový počet podaných stížností a jejich rozdělení v čase. Pomáhá týmu zákaznické péče sledovat aktuální stav klientské spokojenosti a identifikovat oblasti vyžadující pozornost. Report umožňuje hloubkovou analýzu jednotlivých případů stížností a jejich historický vývoj (odvozeno z názvu). Slouží k operativnímu řízení klientských podnětů a jako podklad pro zlepšování kvality služeb (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Stránka 1: Úvodní přehled s navigací a základními statistikami.
* Stránka 2: Detailní analytický pohled na typy a stavy stížností.

Technický popis
Report se skládá ze 2 stránek a obsahuje 15 vizuálních prvků, především pro navigaci a filtraci. Technicky využívá tabulku zis VW_STIZNOSTI a míry pro sledování časového rozmezí dat. Verze metadat je 1.28. Report je v rozpracované fázi a slouží k testování nových pohledů na data o stížnostech.

Filtry
* {Měsíc/Rok}: Ovlivňuje {zobrazení dat v čase}. Interpretace: {Sleduje náběh stížností v kalendářních cyklech}.
* {Stav stížnosti}: Ovlivňuje {zobrazení otevřených a vyřešených případů}. Interpretace: {Pomáhá sledovat aktuální rozpracovanost agendy}.

Míry
* {Max(Kalendar.Date)}: Měří {datum nejaktuálnější stížnosti v reportu}. Interpretace: {Zajišťuje informaci o čerstvosti dat}. Použití: {Záhlaví reportu}.
* {Min(Kalendar.Date)}: Měří {počáteční datum sledovaného období}. Interpretace: {Definuje historický rozsah analýzy}. Použití: {Záhlaví reportu}.
