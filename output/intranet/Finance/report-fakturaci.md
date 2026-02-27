Business popis
Tento report poskytuje komplexní přehled o procesu fakturace a jejím vztahu k pohledávkám. Slouží k monitorování objemu a počtu vystavených faktur v čase. Pomáhá sledovat efektivitu práce fakturačního oddělení a identifikovat regionální rozdíly ve fakturaci (odvozeno z názvu). Umožňuje analýzu přeplatků a nedoplatků a porovnání fakturovaných částek s aktuálními pohledávkami. Report je klíčovým nástrojem pro řízení likvidity a fakturačních procesů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Fakturace - INTRO: Úvodní stránka s navigací.
* Fakturace - Počty: Časová analýza počtu vystavených faktur.
* Fakturace - Sumy částek: Sledování celkového finančního objemu fakturace.
* Fakturace - Rozdělení ČR: Regionální pohled na fakturační aktivitu.
* Fakturace - Objem dodávky: Analýza dodaných energetických jednotek.
* Fakturace - Objem dod. ČR: Regionální pohled na objem dodávek.
* Fakturace - Vývoj přeplatků a nedoplatků: Sledování salda fakturace.
* Fakturace - Fakturanti Detail: Přehled výkonnosti jednotlivých fakturantů.
* Faktury VS Pohledávky - ŽIVÉ: Aktuální srovnání fakturace s pohledávkami.
* Faktury VS Pohledávky - HIST.: Historické srovnání fakturace a dlužné pozice.

Technický popis
Report se skládá z 10 stránek a obsahuje vysoký počet 179 vizuálních prvků, což svědčí o jeho detailnosti. Technicky využívá 11 tabulek a 16 měr pro výpočet fakturačních KPI. Zahrnuje 39 průřezů a 32 pokročilých filtrů pro precizní analýzu dat. Datové zdroje nejsou v M kódu přímo detekovány, report pravděpodobně běží nad publikovaným datasetem (pravděpodobné). Verze metadat je 1.28.

Filtry
* {Datum vystavení}: Ovlivňuje {zobrazení dat v rámci časového období}. Interpretace: {Umožňuje sledovat fakturační cykly}.
* {Dom/MO/VO}: Ovlivňuje {zobrazení podle segmentů zákazníků}. Interpretace: {Pomáhá srovnat rezidenční a firemní segmenty}.
* {Fakturant - Jméno}: Ovlivňuje {zobrazení podle konkrétního pracovníka}. Interpretace: {Sleduje pracovní výkon jednotlivých fakturantů}.
* {Saldo fakturace}: Ovlivňuje {zobrazení podle výsledku zúčtování}. Interpretace: {Rozlišuje přeplatky a nedoplatky}.

Míry
* {pocet_vystavenych_faktur}: Měří {celkový počet vygenerovaných dokladů}. Interpretace: {Kvantitativní ukazatel výkonu fakturace}. Použití: {Fakturace - Počty}.
* {sum_castka_vystavenych_faktur}: Měří {celkový finanční objem fakturace}. Interpretace: {Hlavní finanční ukazatel generovaných výnosů}. Použití: {Fakturace - Sumy částek}.
* {Množství dodávky}: Měří {energetický objem dodaných jednotek}. Interpretace: {Ukazuje fyzický rozsah dodávek}. Použití: {Fakturace - Objem dodávky}.
* {suma_pohledavek}: Měří {aktuální objem nezaplacených částek}. Interpretace: {Sleduje vztah mezi fakturací a inkasem}. Použití: {Faktury VS Pohledávky - ŽIVÉ}.
