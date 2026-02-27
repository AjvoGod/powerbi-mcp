Business popis
Tento report poskytuje detailní analýzu finančních toků spojených s pohledávkami společnosti v čase. Zaměřuje se na věkovou strukturu dluhů a jejich rozdělení do kategorií podle počtu dní po splatnosti (DPD buckets). Pomáhá finančnímu oddělení predikovat inkaso a identifikovat rizika v klientském portfoliu (odvozeno z názvu). Umožňuje segmentaci dlužníků na domácnosti a firmy a sledování historie vývoje dluhů v měsíčních cyklech. Report je klíčový pro řízení cash flow a nastavení opravných položek (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Receivables INTRO: Úvodní stránka s navigací.
* Age Groups - Graphs: Grafické znázornění vývoje pohledávek podle jejich stáří.
* Age Groups - TAB: Tabulkový rozpad věkové struktury dluhů.
* Households/Companies: Srovnání dlužné pozice mezi segmentem domácností a firem.
* DPD buckets - Graphs: Analýza dluhů rozdělených do časových košů (např. 1-30 dní, 31-60 dní po splatnosti).

Technický popis
Report obsahuje 6 stránek a 84 vizuálních prvků, včetně vrstvených plošných grafů (stackedAreaChart), pivotních tabulek a pokročilých průřezů. Technicky využívá 4 tabulky, z nichž nejdůležitější je stage_zis Pohledavky_Historizace. Obsahuje 6 měr pro výpočet sumy zůstatků a rozsahu období. Verze metadat je 1.28. Datové zdroje nejsou v M kódu přímo detekovány.

Filtry
* {Skupina Věk}: Ovlivňuje {zobrazení pohledávek podle jejich historického stáří}. Interpretace: {Pomáhá sledovat kvalitu portfolia z dlouhodobého hlediska}.
* {DPD skup.}: Ovlivňuje {zobrazení dluhů podle závažnosti prodlení}. Interpretace: {Kategorizuje pohledávky od mírného po kritické zpoždění}.
* {Households/Companies}: Ovlivňuje {zobrazení dat pro konkrétní klientský segment}. Interpretace: {Umožňuje porovnat platební morálku firem a domácností}.

Míry
* {Sum(stage_zis Pohledavky_Historizace.Zůstatek)}: Měří {celkovou výši historických pohledávek}. Interpretace: {Sleduje objem peněz vázaných v dlužných částkách v čase}. Použití: {Všechny analytické stránky}.
* {Max(stage_zis Pohledavky_Historizace.DPD)}: Měří {nejvyšší počet dní po splatnosti v daném výběru}. Interpretace: {Indikuje nejstarší neuhrazené pohledávky}. Použití: {Technické přehledy}.
