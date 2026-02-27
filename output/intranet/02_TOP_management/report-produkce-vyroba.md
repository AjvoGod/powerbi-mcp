Business popis
Tento report poskytuje přehled o nově přinesené produkci v segmentu výroben energie. Slouží k monitorování počtu aktivních odběrných míst (OPM) výroben a jejich celkové roční výroby v MWh (odvozeno z názvu). Pomáhá managementu sledovat vývoj portfolia podle typu zdroje (např. fotovoltaika, bioplyn) a tarifních skupin. Umožňuje geografické zobrazení výroben na mapě a analýzu výkonnosti jednotlivých obchodních zástupců a naddealerů při získávání nových výroben. Report je klíčový pro strategické řízení segmentu decentralizované výroby energie (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Report produkce výroben - INTRO: Úvodní stránka s navigací.
* Přinesné OPM a MWh: Hlavní ukazatele náběru nových výroben.
* Spotřeby výroben na dodávce: Mapa a tabulka výroben, které jsou již v procesu dodávky.
* Přinesné OPM a MWh dle tarifu / typu zdroje: Segmentace produkce podle parametrů instalace.
* Obchodník/Pobočka / Naddealer - Produkce výroben: Výkonnostní žebříčky obchodních struktur.

Technický popis
Report obsahuje 7 stránek a 79 vizuálních prvků, včetně map (azureMap), sloupcových grafů a pivotních tabulek. Technicky využívá 4 tabulky a 5 měr zaměřených na výrobu v MWh a počty OPM. Verze metadat je 1.28. Datové zdroje jsou integrovány přes tabulku zis VW_Report_produkce_vyrobny. Obsahuje akční tlačítka pro rychlou navigaci.

Filtry
* {Segment}: Ovlivňuje {zobrazení podle typu výroby nebo zákaznické kategorie}. Interpretace: {Umožňuje sledovat specifika různých energetických zdrojů}.
* {Roční výroba MWh celkem}: Ovlivňuje {zobrazení podle výkonnosti výrobny}. Interpretace: {Identifikuje nejvýznamnější energetické zdroje v portfoliu}.
* {Naddealer}: Ovlivňuje {zobrazení produkce konkrétní partnerské sítě}. Interpretace: {Sleduje úspěšnost externích obchodních kanálů v segmentu výroben}.

Míry
* {Roční výroba MWh celkem}: Měří {celkový očekávaný objem vyrobené energie}. Interpretace: {Hlavní ukazatel energetického významu segmentu výroben}. Použití: {Všechny analytické stránky}.
* {Počet OPM}: Měří {počet unikátních odběrných míst s instalovanou výrobnou}. Interpretace: {Kvantitativní ukazatel růstu segmentu decentralizované energetiky}. Použití: {Většina stránek reportu}.
* {spotreb_na_dodavce}: Měří {objem spotřeby výroben v režimu dodávky}. Interpretace: {Sleduje duální roli výroben jako spotřebitelů i producentů}. Použití: {Spotřeby výroben na dodávce}.
