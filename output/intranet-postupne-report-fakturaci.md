# Report Fakturací

## Business popis
Report slouží ke sledování výkonu fakturace a návaznosti na pohledávky v operativním i historickém pohledu. Primárně odpovídá na otázky, kolik faktur se vystavuje, v jakém finančním objemu, jak se vyvíjí objem dodávky a jaká část portfolia přechází do pohledávek po splatnosti. Důležitou částí je průběžná kontrola přeplatků a nedoplatků, která pomáhá identifikovat odchylky v toku předpisů a plateb. Report je vhodný pro finance, controlling, fakturační operativu a inkaso; díky segmentaci Dom/MO/VO je použitelný i pro obchodní řízení. Rozdělení do samostatných stránek umožňuje oddělit strategický přehled od detailní analytiky podle regionu, osoby a typu ukazatele. Z pohledu rozhodování report podporuje prioritizaci vymáhání, kontrolu kvality fakturačního procesu a sledování rizikového podílu pohledávek.

Struktura stránek (co na nich typicky je):
- Fakturace - INTRO: vstupní přehled klíčových KPI a základních filtrů pro rychlou orientaci.
- Fakturace - Počty: trend a rozpad počtu vystavených faktur v čase.
- Fakturace - Sumy částek: trend a rozpad finančního objemu fakturace.
- Fakturace - Rozdělení ČR: regionální pohled na výkon fakturace v mapovém zobrazení.
- Fakturace - Objem dodávky: vývoj dodaného objemu v čase.
- Fakturace - Objem dod. ČR: regionální pohled na objem dodávky.
- Fakturace - Vývoj přeplatků a nedoplatků: trend salda přeplatků/nedoplatků a souvisejících odchylek.
- Fakturace - Fakturanti Detail: detail výkonu podle konkrétního fakturanta.
- Faktury VS Pohledávky - ŽIVÉ: aktuální porovnání fakturace a pohledávek.
- Faktury VS Pohledávky - HIST.: historické porovnání včetně rizikové části po splatnosti.

## Technický popis
Report obsahuje 10 stránek, 179 vizuálů a 16 měr. V dostupné PBIX analýze nejsou detekované datové zdroje v M kódu, takže report pravděpodobně běží nad publikovaným datasetem/semantic modelem v Power BI Service (pravděpodobné). Logika reportu je postavená na kombinaci trendových grafů, mapových pohledů, detailních tabulkových výstupů a slicerů sdílených napříč stránkami. Klíčový technický princip je jednotný filtrační kontext nad datem vystavení, segmentací Dom/MO/VO, fakturantem a rizikovými ukazateli splatnosti. Provozní nastavení refresh a bezpečnostní model nejsou z lokální PBIX analýzy přímo určitelné, proto je potřeba je brát z konfigurace datasetu v Service (neuvedeno).

## Filtry
- Predpisy.Datum vystavení: Ovlivňuje časový kontext většiny vizuálů. Interpretace: základní filtr pro trendové porovnání období a sezónnost.
- excel Report pro obchod - budoucí.Dom/MO/VO: Ovlivňuje segmentační pohled napříč stránkami. Interpretace: porovnání výkonu mezi domovním, maloobchodním a velkoobchodním segmentem.
- Predpisy.Fakturant - Jméno: Ovlivňuje detailní personální pohled. Interpretace: hodnocení výkonu a odchylek podle odpovědné osoby.
- Predpisy.Den odkladu platby: Ovlivňuje rizikový kontext pohledávek. Interpretace: vyšší odklad typicky znamená vyšší riziko přechodu do prodlení.
- Predpisy.Saldo fakturace: Ovlivňuje vyhodnocení vyrovnanosti fakturačního toku. Interpretace: sleduj odchylku mezi předpisy a úhradami v čase.
- Sum(Predpisy.Částka přeplatku/nedoplatku): Ovlivňuje stránku vývoje přeplatků/nedoplatků a navazující interpretaci. Interpretace: identifikace systémových odchylek a nestandardních stavů.
- predpisy_objem_dodavky.Množství dodávky: Ovlivňuje objemové stránky. Interpretace: odděluje čistě fyzický výkon od hodnotového výkonu v měně.
- zis VW_Predpisy.pocet_vystavenych_faktur: Ovlivňuje stránky s počty a porovnáním faktur/pohledávek. Interpretace: hlavní volumetrický ukazatel procesního zatížení.

## Míry
- historizovany_zustatek: Měří historizovaný stav zůstatku pohledávek. Interpretace: sleduj dlouhodobý trend otevřené expozice. Použití: Faktury VS Pohledávky - HIST. (pravděpodobné).
- Max(zis VW_Predpisy.Předpis - Vystavení): Měří horní hranici data v aktuálním kontextu. Interpretace: kontrola konce analyzovaného intervalu. Použití: všechny stránky s časovým filtrem (pravděpodobné).
- Min(zis VW_Predpisy.Předpis - Vystavení): Měří dolní hranici data v aktuálním kontextu. Interpretace: kontrola začátku analyzovaného intervalu. Použití: všechny stránky s časovým filtrem (pravděpodobné).
- Množství dodávky: Měří fyzický objem dodávky. Interpretace: vyhodnocení výkonu nezávisle na cenové hladině. Použití: Fakturace - Objem dodávky, Fakturace - Objem dod. ČR (pravděpodobné).
- pocet_pohledavek: Měří počet pohledávek. Interpretace: indikuje rozsah inkasního zatížení. Použití: Faktury VS Pohledávky - ŽIVÉ (pravděpodobné).
- pocet_vystavenych_faktur: Měří počet vystavených faktur. Interpretace: hlavní ukazatel procesního objemu fakturace. Použití: Fakturace - Počty, Faktury VS Pohledávky - ŽIVÉ (pravděpodobné).
- procento_historizovanych zustatku: Měří podíl historizovaných zůstatků. Interpretace: strukturální kvalita portfolia v čase. Použití: Faktury VS Pohledávky - HIST. (pravděpodobné).
- procento_historizovanych zustatku > 30 DPD: Měří podíl historizovaných zůstatků po splatnosti nad 30 dní. Interpretace: klíčový risk indikátor. Použití: Faktury VS Pohledávky - HIST. (pravděpodobné).
- Procento_pocet_faktur_vs_pohledavky: Měří poměr počtu faktur vůči počtu pohledávek. Interpretace: sleduj konverzi fakturační aktivity do otevřených pohledávek. Použití: Faktury VS Pohledávky - ŽIVÉ (pravděpodobné).
- Procento_suma_faktur_vs_pohledavky: Měří poměr částky faktur vůči částce pohledávek. Interpretace: hodnotová efektivita fakturace vůči inkasu. Použití: Faktury VS Pohledávky - ŽIVÉ/HIST. (pravděpodobné).
- Procento_suma_faktur_vs_pohledavky >30 DPD: Měří poměr v rizikovém pásmu po splatnosti nad 30 dní. Interpretace: upozornění na zhoršení kvality pohledávek. Použití: Faktury VS Pohledávky - HIST. (pravděpodobné).
- sum_castka_vystavenych_faktur: Měří součet částek vystavených faktur. Interpretace: hlavní hodnotový KPI fakturace. Použití: Fakturace - Sumy částek (pravděpodobné).
- Sum(HistorickéZůstatky.Zůstatek): Měří agregovaný historický zůstatek. Interpretace: referenční absolutní hodnota pro retrospektivní porovnání. Použití: Faktury VS Pohledávky - HIST. (pravděpodobné).
- Sum(Predpisy.Částka přeplatku/nedoplatku): Měří součet přeplatků a nedoplatků. Interpretace: detekce odchylek v platebním toku. Použití: Fakturace - Vývoj přeplatků a nedoplatků (pravděpodobné).
- suma_pohledavek: Měří celkovou částku pohledávek. Interpretace: základní ukazatel finanční expozice. Použití: Faktury VS Pohledávky - ŽIVÉ/HIST. (pravděpodobné).
- suma_pohledavek > 30 DPD: Měří částku pohledávek po splatnosti nad 30 dní. Interpretace: prioritizace rizikových případů pro inkaso. Použití: Faktury VS Pohledávky - HIST. (pravděpodobné).
