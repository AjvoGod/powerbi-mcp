Business popis
Tento report je zaměřen na sledování a vyhodnocování úspěšnosti retenčních aktivit (udržení zákazníka). Sleduje stavy retenčních případů na úrovni jednotlivých obchodních zástupců (FO - Front Office) i celých poboček. Pomáhá týmu zákaznické péče monitorovat efektivitu zpětvzetí výpovědí rozdělenou podle energetických hladin a důvodů odchodu zákazníka (odvozeno z názvu). Umožňuje analýzu "bazénů" (skupin případů) v čase a srovnání výkonnosti dealerů při zachraňování smluv. Report je klíčovým nástrojem pro řízení retenčního týmu a snižování celkové míry odchodu zákazníků (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Retence - INTRO: Úvodní stránka s navigací.
* Stav Retence FO - Tabulka / Počty v grafu: Aktuální přehled rozpracovaných a vyřešených případů.
* Stav Retence FO – počty dealerů: Analýza zapojení prodejní sítě do retenčního procesu.
* Důvod výpovědí v retencích: Detailní rozbor motivace zákazníků k odchodu.
* Retence po hladinách: Srovnání úspěšnosti retence u malých a velkých odběratelů.
* Bazény v čase: Historický vývoj objemu retenční agendy.

Technický popis
Report obsahuje 7 stránek a 77 vizuálních prvků, včetně sloupcových grafů, oblastních grafů a detailních tabulek. Technicky využívá 4 tabulky a 9 měr zaměřených na počty OPM, MWh a úspěšnost (procenta). Verze metadat je 1.28. Datové zdroje jsou integrovány přes tabulky RETENCE a VYPOVED_OD_DOD_A_ZAK. Obsahuje 17 průřezů pro precizní analýzu.

Filtry
* {Počet_OPM}: Ovlivňuje {zobrazení podle kvantity zachraňovaných míst}. Interpretace: {Sleduje objem práce retenčního oddělení}.
* {MWH}: Ovlivňuje {zobrazení podle energetického významu retence}. Interpretace: {Pomáhá prioritizovat retenci u velkoodběratelů}.
* {selfFilterEnabled}: Ovlivňuje {možnost interaktivního vyhledávání konkrétních dealerů nebo případů}. Interpretace: {Zajišťuje operativní náhled na výsledky jednotlivců}.

Míry
* {CountNonNull(RETENCE.ID)}: Měří {celkový počet otevřených nebo vyřešených retenčních případů}. Interpretace: {Hlavní kvantitativní ukazatel retenční agendy}. Použití: {Bazény v čase}.
* {MWH}: Měří {celkový objem energie vázaný v retenčním procesu}. Interpretace: {Finanční význam retenčních aktivit pro stabilitu tržeb}. Použití: {Všechny analytické stránky}.
* {Počet_OPM}: Měří {počet unikátních odběrných míst v retenčním procesu}. Interpretace: {Sleduje šíři klientské základny v riziku odchodu}. Použití: {Většina stránek reportu}.
* {POČET_IDRETENCE}: Měří {unikátní identifikátory retenčních úkolů}. Interpretace: {Sleduje administrativní náročnost procesu}. Použití: {Důvod výpovědí}.
