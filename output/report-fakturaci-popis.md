# Popis reportu: Report Fakturací.pbix

## Extrahovaná data z PBIX

- **Metadata verze:** 1.28
- **Tabulek:** 11
- **Měr:** 16
- **Stránek:** 10
- **Vizuálů celkem:** 179
- **Datové zdroje:** žádné detekované v M kódu (report pravděpodobně běží nad již publikovaným modelem/datasetem)

### Stránky reportu:

- **Fakturace - INTRO** (14 vizuálů: image, textbox, slicer)
  - Filtry/pole: filter
- **Fakturace - Počty** (20 vizuálů: areaChart, pivotTable, slicer, columnChart, textbox, image, advancedSlicerVisual)
  - Filtry/pole: Predpisy.pocet_vystavenych_faktur, Predpisy.Datum vystavení, excel Report pro obchod - budoucí.Dom/MO/VO, filter, zis VW_Predpisy.pocet_vystavenych_faktur
- **Fakturace - Sumy částek** (21 vizuálů: areaChart, pivotTable, slicer, columnChart, textbox, image, advancedSlicerVisual)
  - Filtry/pole: Predpisy.sum_castka_vystavenych_faktur, Predpisy.Datum vystavení, excel Report pro obchod - budoucí.Dom/MO/VO, filter, zis VW_Predpisy.sum_castka_vystavenych_faktur
- **Fakturace - Rozdělení ČR** (20 vizuálů: shapeMap, pivotTable, slicer, textbox, image, advancedSlicerVisual)
  - Filtry/pole: zis VW_Predpisy.pocet_vystavenych_faktur, Predpisy.Datum vystavení, excel Report pro obchod - budoucí.Dom/MO/VO, filter
- **Fakturace - Objem dodávky** (18 vizuálů: areaChart, pivotTable, slicer, columnChart, textbox, image, advancedSlicerVisual)
  - Filtry/pole: predpisy_objem_dodavky.Množství dodávky, Predpisy.Datum vystavení, excel Report pro obchod - budoucí.Dom/MO/VO, filter, zis VW_predpisy_objem_dodavky.Množství dodávky
- **Fakturace - Objem dod. ČR** (17 vizuálů: shapeMap, pivotTable, slicer, textbox, image, advancedSlicerVisual)
  - Filtry/pole: predpisy_objem_dodavky.Množství dodávky, Predpisy.Datum vystavení, excel Report pro obchod - budoucí.Dom/MO/VO, filter
- **Fakturace - Vývoj přeplatků a nedoplatků** (17 vizuálů: areaChart, slicer, columnChart, textbox, image, pivotTable, advancedSlicerVisual)
  - Filtry/pole: Sum(Predpisy.Částka přeplatku/nedoplatku), filter, excel Report pro obchod - budoucí.Dom/MO/VO, Predpisy.Den odkladu platby, Predpisy.Saldo fakturace
- **Fakturace - Fakturanti Detail** (16 vizuálů: pivotTable, slicer, textbox, image, advancedSlicerVisual)
  - Filtry/pole: Predpisy.Datum vystavení, Predpisy.Fakturant - Jméno, filter
- **Faktury VS Pohledávky - ŽIVÉ** (19 vizuálů: areaChart, tableEx, slicer, clusteredColumnChart, textbox, image, advancedSlicerVisual)
  - Filtry/pole: Predpisy.pocet_vystavenych_faktur, filter, Predpisy.pocet_pohledavek
- **Faktury VS Pohledávky - HIST.** (17 vizuálů: tableEx, slicer, clusteredColumnChart, textbox, image, advancedSlicerVisual)
  - Filtry/pole: filter, Predpisy.sum_castka_vystavenych_faktur, Sum(HistorickéZůstatky.Zůstatek)

### Míry:

- historizovany_zustatek
- Max(zis VW_Predpisy.Předpis - Vystavení)
- Min(zis VW_Predpisy.Předpis - Vystavení)
- Množství dodávky
- pocet_pohledavek
- pocet_vystavenych_faktur
- procento_historizovanych zustatku
- procento_historizovanych zustatku > 30 DPD
- Procento_pocet_faktur_vs_pohledavky
- Procento_suma_faktur_vs_pohledavky
- Procento_suma_faktur_vs_pohledavky >30 DPD
- sum_castka_vystavenych_faktur
- Sum(HistorickéZůstatky.Zůstatek)
- Sum(Predpisy.Částka přeplatku/nedoplatku)
- suma_pohledavek
- suma_pohledavek > 30 DPD

---

## Instrukce pro AI asistenta

Na základě výše uvedených technických dat vytvoř intranetový popis reportu v češtině.
Dodrž přesně formát, pravidla a self-check.

```
VSTUP:
- Název reportu: [název z podkladů]
- Stránky: [seznam stránek z podkladů]
- Filtry/pole: [seznam filtrů/polí z podkladů]
- Míry: [seznam měr z podkladů]
- Technická fakta: [metadata, zdroje, refresh, bezpečnost z podkladů]

POVOLENÝ VÝSTUP: pouze 4 sekce v tomto pořadí, bez dalších nadpisů:
Business popis
Technický popis
Filtry
Míry

TVRDÁ PRAVIDLA:
- Nikde neuváděj tabulky ani názvy tabulek.
- Ignoruj technické placeholdery (např. "filter", "unknown"), pokud nemají business význam.
- Nevymýšlej zdroje/systémy; co není ve vstupu, označ jako "neuvedeno".
- Odhad vždy označ "(odvozeno z názvu)" nebo "(pravděpodobné)".

FORMÁT:
- Business popis: 6-8 vět + podnadpis "Struktura stránek (co na nich typicky je)" + 1 odrážka na stránku.
- Technický popis: 4-6 vět.
- Filtry: každá odrážka přesně:
  - {Filtr}: Ovlivňuje {co}. Interpretace: {jak číst}.
- Míry: každá odrážka přesně:
  - {Míra}: Měří {co}. Interpretace: {jak číst}. Použití: {(pravděpodobně) stránka/kontext}.

SELF-CHECK PŘED ODEVZDÁNÍM:
1. Jsou přesně 4 sekce a ve správném pořadí?
2. Neobsahuje výstup tabulky ani názvy tabulek?
3. Jsou pokryté všechny míry ze vstupu?
4. Pokud něco chybí ve vstupu, je použito "neuvedeno"?
Pokud některý bod neplatí, oprav výstup a zkontroluj znovu.
```

## Auto-validace výstupu

- Status: OK
- Kontroly: 22/22 prošly