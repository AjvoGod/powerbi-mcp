# Report Fakturací

## Business popis
Report Fakturací slouží ke sledování výkonu fakturace a její návaznosti na pohledávky. Odpovídá na otázky, kolik faktur se vystavuje, v jakých částkách, jak se vyvíjí objem dodávky a jaké jsou přeplatky nebo nedoplatky v čase. Součástí je i porovnání faktur proti pohledávkám v aktuálním i historickém pohledu, včetně rizikové oblasti po splatnosti nad 30 dní. Report je určen primárně pro finance a controlling, dále pro operativu fakturace a inkasa, a v segmentačním pohledu také pro obchod.

Struktura stránek (co na nich typicky je):
- Fakturace - INTRO: úvodní přehled a základní filtry.
- Fakturace - Počty: trend a rozpad počtu vystavených faktur.
- Fakturace - Sumy částek: trend a rozpad částek vystavených faktur.
- Fakturace - Rozdělení ČR: regionální rozdělení fakturace v mapovém pohledu.
- Fakturace - Objem dodávky: trend a rozpad množství dodávky.
- Fakturace - Objem dod. ČR: regionální pohled na objem dodávky.
- Fakturace - Vývoj přeplatků a nedoplatků: vývoj salda a odchylek v čase.
- Fakturace - Fakturanti Detail: detail podle fakturanta a období.
- Faktury VS Pohledávky - ŽIVÉ: aktuální porovnání faktur a pohledávek.
- Faktury VS Pohledávky - HIST.: historický pohled včetně rizikového segmentu >30 DPD.

## Technický popis
Report obsahuje 10 stránek a kombinuje trendové grafy, mapové pohledy, tabulkové detaily a slicery. Datové napojení v dostupných podkladech neukazuje explicitní query vrstvu v PBIX, takže report pravděpodobně pracuje nad již publikovaným modelem v Power BI Service. Výstup je navržen pro kombinaci operativního monitoringu a analytického vyhodnocení v čase. Filtrační logika je postavená na období, segmentaci, fakturantovi, geograﬁi a ukazatelích splatnosti/rizika.

## Filtry
- Datum vystavení: ovlivňuje časový kontext trendů, porovnání a detailu napříč stránkami.
- Dom/MO/VO: segmentuje výsledky podle obchodního typu a mění interpretaci KPI mezi segmenty.
- Fakturant - Jméno: umožňuje personální rozpad výkonu fakturace.
- Den odkladu platby: přidává kontext platební kázně a rizikovosti.
- DPD (včetně >30): odděluje standardní a rizikové pohledávky po splatnosti.
- Saldo fakturace: ukazuje kontext vyrovnanosti fakturačního toku.
- Částka přeplatku/nedoplatku: slouží k analýze odchylek a korekcí.
- Geografický kontext ČR: umožňuje regionální interpretaci fakturace a objemu dodávky.

## Míry
- `pocet_vystavenych_faktur`: měří počet vystavených faktur; základní volumetrický KPI fakturace.
- `sum_castka_vystavenych_faktur`: měří součet částek vystavených faktur; hlavní hodnotový KPI fakturace.
- `pocet_pohledavek`: měří počet pohledávek; indikuje rozsah inkasní zátěže.
- `suma_pohledavek`: měří celkovou hodnotu pohledávek; klíčový ukazatel finanční expozice.
- `Procento_pocet_faktur_vs_pohledavky`: poměr počtu faktur vůči pohledávkám; ukazuje relativní zatížení podle počtu.
- `Procento_suma_faktur_vs_pohledavky`: poměr částek faktur vůči pohledávkám; ukazuje relativní zatížení podle hodnoty.
- `Procento_suma_faktur_vs_pohledavky >30 DPD`: poměr v rizikovém pásmu po splatnosti; ukazatel kreditního rizika.
- `suma_pohledavek > 30 DPD`: hodnota pohledávek po splatnosti nad 30 dní; přímý rizikový ukazatel.
- `historizovany_zustatek`: historický zůstatek; podklad pro dlouhodobé srovnání.
- `procento_historizovanych zustatku`: podíl historizovaných zůstatků; strukturální pohled na portfolio.
- `procento_historizovanych zustatku > 30 DPD`: podíl historizovaných zůstatků v rizikovém pásmu.
- `Sum(HistorickéZůstatky.Zůstatek)`: agregovaná historická hodnota zůstatku pro retrospektivní analýzu.
- `Sum(Predpisy.Částka přeplatku/nedoplatku)`: součet přeplatků a nedoplatků; měří odchylky v platebním toku.
- `Množství dodávky`: měří objem dodávky; propojuje obchodní výkon a fakturační výsledky.
- `Min(zis VW_Predpisy.Předpis - Vystavení)`: spodní časová hranice analyzovaného kontextu.
- `Max(zis VW_Predpisy.Předpis - Vystavení)`: horní časová hranice analyzovaného kontextu.
