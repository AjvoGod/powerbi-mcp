Business popis
Tento report poskytuje komplexní přehled o všech přijatých výpovědích ze strany zákazníků i jiných dodavatelů. Sleduje typy výpovědí rozdělené podle segmentů (domácnosti/firmy) a původce (zákazník/dodavatel). Pomáhá oddělení zákaznické péče analyzovat časový vývoj přijatých výpovědí a sledovat termíny ukončení dodávky (odvozeno z názvu). Umožňuje identifikovat hlavní důvody odchodů a monitorovat objem ztracené energie v MWh. Report slouží jako základní vstup pro retenční aktivity a jako podklad pro strategické hodnocení stability klientského kmene (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Výpovědi - INTRO: Úvodní stránka s navigací.
* Typy výpovědí - DOM/FIR: Srovnání výpovědní aktivity v rezidenčním a firemním segmentu.
* Typy výpovědí - Dodavatel/Zákazník: Analýza toho, kdo inicioval proces ukončení smlouvy.
* Spotřeby, OPM a ZK- Tabulky: Detailní tabulkové přehledy výpovědí pro operativní kontrolu.
* Časová osa - výpověď přijata / k datu: Analýza trendů v náběru výpovědí a jejich budoucí splatnosti.
* Výpovědí dle dodavatele: Žebříček dodavatelů, ke kterým zákazníci nejčastěji odcházejí.
* Důvod výpovědí: Analýza příčin nespokojenosti nebo odchodu.

Technický popis
Report se skládá z 8 stránek a obsahuje 82 vizuálních prvků, včetně sloupcových grafů, oblastních grafů a pivotních tabulek. Technicky využívá 2 tabulky a 10 měr zaměřených na počty ID, OPM a energetické objemy. Zahrnuje 17 průřezů pro detailní filtraci. Verze metadat je 1.28. Datové zdroje jsou integrovány přes tabulku Vypoved_od_dod_a_zak.

Filtry
* {POČET_OPM_Úkol}: Ovlivňuje {zobrazení počtu odchozích odběrných míst}. Interpretace: {Sleduje reálný úbytek v portfoliu}.
* {POČET_MWH}: Ovlivňuje {zobrazení podle energetické náročnosti odchodů}. Interpretace: {Pomáhá identifikovat ztrátu klíčových zákazníků}.
* {selfFilterEnabled}: Ovlivňuje {interaktivní filtrování podle specifických parametrů výpovědi}. Interpretace: {Umožňuje hloubkovou analýzu konkrétních tržních trendů}.

Míry
* {CountNonNull(Vypoved_od_dod_a_zak.ID)}: Měří {celkový počet přijatých výpovědí}. Interpretace: {Základní ukazatel stability portfolia}. Použití: {Časové osy}.
* {POČET_MWH}: Měří {celkovou roční spotřebu navázanou na přijaté výpovědi}. Interpretace: {Finanční vyjádření ohrožených tržeb společnosti}. Použití: {Většina stránek reportu}.
* {Počet_partnerů Míra}: Měří {počet unikátních klientů, kteří podali výpověď}. Interpretace: {Sleduje klientskou loajalitu nezávisle na počtu odběrných míst}. Použití: {Segmentové přehledy}.
* {POČET_OPM_Úkol}: Měří {počet úkolů spojených s ukončením odběru}. Interpretace: {Ukazuje administrativní zátěž spojenou s odchody}. Použití: {Všechny analytické stránky}.
