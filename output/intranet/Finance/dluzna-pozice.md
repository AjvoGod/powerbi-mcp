Business popis
Tento report poskytuje komplexní přehled o stavu a dlužné pozici pohledávek za zákazníky. Slouží k monitorování finančního rizika a identifikaci pohledávek po splatnosti (DPD). Pomáhá sledovat historický vývoj zůstatků k úhradě a efektivitu vymáhání pohledávek (odvozeno z názvu). Umožňuje detailní analýzu podle důvodu vystavení předpisů a právního řešení. Report slouží jako klíčový podklad pro finanční řízení a správu dlužníků (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Dlužná pozice - INTRO: Úvodní stránka s navigací.
* Dlužná pozice zákaznických pohledávek: Celkový přehled aktuálních pohledávek po splatnosti.
* Účetní opravné položky: Analýza rezerv a opravných položek k pohledávkám.
* Historizace dlužné pozice: Vývoj dlužné pozice v čase.
* Historizace dlužné pozice > 15 DPD: Sledování starších pohledávek v čase.
* Stav pohledávek k hodnotám zůstatku k úhradě: Distribuce pohledávek podle jejich stavu.
* Detailní pohled na důvod vystavení předpisu: Analýza původu dluhu.
* Stav pohledávek a jejich počty: Kvantitativní přehled pohledávek podle jejich typu.

Technický popis
Report se skládá z 8 stránek a obsahuje celkem 59 vizuálních prvků, včetně sloupcových a kruhových grafů a tabulek. Technicky využívá 5 tabulek a 12 měr pro výpočet finančních KPI. Zahrnuje 7 akčních tlačítek pro navigaci a detailní průřezy pro filtraci dat. Datové zdroje nejsou v M kódu přímo detekovány, report pravděpodobně běží nad publikovaným datasetem (pravděpodobné). Verze metadat je 1.28.

Filtry
* {Zůstatek k úhradě}: Ovlivňuje {zobrazení finančního objemu dluhu}. Interpretace: {Sleduje celkovou dlužnou částku}.
* {Opravná položka}: Ovlivňuje {zobrazení rezerv k rizikovým dluhům}. Interpretace: {Ukazuje účetní krytí pohledávek}.
* {Právní řešení}: Ovlivňuje {zobrazení pohledávek v procesu vymáhání}. Interpretace: {Pomáhá sledovat efektivitu právních kroků}.
* {Stav}: Ovlivňuje {zobrazení aktuálního statusu pohledávky}. Interpretace: {Rozlišuje aktivní a vyřešené případy}.

Míry
* {Sum(stage_zis Predpisy.Předpis - Zůstatek k úhradě)}: Měří {celkovou dlužnou částku}. Interpretace: {Hlavní ukazatel dlužné pozice}. Použití: {Dlužná pozice zákaznických pohledávek}.
* {Sum(stage_zis Predpisy.Opravná položka)}: Měří {výši účetních opravných položek}. Interpretace: {Ukazuje objem rizikových pohledávek}. Použití: {Účetní opravné položky}.
* {Sum(HistorickéZůstatky.Zůstatek)}: Měří {výši pohledávek v historii}. Interpretace: {Umožňuje srovnání aktuálního stavu s minulostí}. Použití: {Historizace dlužné pozice}.
* {CountNonNull(stage_zis Predpisy.Předpis - Stav)}: Měří {počet pohledávek v daném stavu}. Interpretace: {Ukazuje kvantitu případů ke zpracování}. Použití: {Stav pohledávek a jejich počty}.
