Business popis
Tento report poskytuje aktuální přehled o vývoji cen klíčových energetických komodit na burze (především elektřiny a plynu). Slouží obchodnímu oddělení a nákupčím k monitorování tržních trendů a včasné reakci na cenové výkyvy (odvozeno z názvu). Pomáhá sledovat historii cenových settlementů a predikovat budoucí vývoj nákladů na pořízení komodit. Report je nezbytným podkladem pro cenotvorbu a strategické rozhodování o nákupu energií. Umožňuje rychlou orientaci v aktuální tržní situaci díky vizualizaci časových řad (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Vývoj ceny na burze: Jednostránkový přehled s časovými grafy a tabulkami burzovních cen.

Technický popis
Report je jednostránkový a obsahuje 10 vizuálních prvků, včetně oblastního grafu pro zobrazení vývoje v čase a pivotní tabulky pro detailní hodnoty. Technicky využívá 3 tabulky, přičemž klíčová data pocházejí z tabulky eex eex_settlements. Obsahuje specializovaný průřez pro časovou osu (BasedOnTimelineSlicer). Verze metadat je 1.28. Datové zdroje zahrnují pravděpodobně exporty z burzy EEX.

Filtry
* {Komodita}: Ovlivňuje {zobrazení cen pro konkrétní typ energie (např. elektřina, plyn)}. Interpretace: {Umožňuje separátní analýzu různých energetických trhů}.
* {Settlement price}: Ovlivňuje {zobrazení dat podle výše burzovní ceny}. Interpretace: {Pomáhá identifikovat extrémní cenové hladiny}.
* {Date}: Ovlivňuje {zobrazení historie cen v určitém časovém rozmezí}. Interpretace: {Sleduje krátkodobé i dlouhodobé trendy na trhu}.

Míry
* {Settlement price}: Měří {uzavírací cenu komodity na burze pro daný den}. Interpretace: {Základní hodnota pro ocenění energetických kontraktů}. Použití: {Vývoj ceny na burze}.
* {Nadpis}: Měří {dynamicky generovaný text nadpisu podle vybrané komodity}. Interpretace: {Zajišťuje přehlednost reportu při přepínání mezi komoditami}. Použití: {Záhlaví stránky}.
