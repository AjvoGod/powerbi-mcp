Business popis
Tento report poskytuje detailní přehled o vyplacených provizích a stavu stornofondu pro obchodní síť. Sleduje finanční toky provizí v čase a jejich rozdělení podle poboček a jednotlivých obchodních zástupců (odvozeno z názvu). Pomáhá managementu monitorovat výši rezerv ve stornofondu pro případné budoucí vratky provizí. Umožňuje hloubkovou analýzu provizních nákladů v měsíčních cyklech. Report je klíčovým nástrojem pro finanční vypořádání s obchodními partnery a řízení rizik spojených s výplatou odměn (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Přehled provizí v čase: Časová analýza objemu vyplacených provizí.
* StornoFond – Detail pobočky a OZ: Detailní pohled na stav rezerv u konkrétních obchodníků.
* StornoFond v čase + Pobočky: Analýza vývoje stornofondu a jeho regionální rozložení.

Technický popis
Report obsahuje 3 stránky a 40 vizuálních prvků, včetně plošných grafů (areaChart) a pruhových grafů. Technicky využívá 3 tabulky (včetně DATA provize NEW) a 4 klíčové míry pro výpočet provizí a stornofondu. Zahrnuje vysoký počet průřezů (11) pro detailní filtraci podle času a struktur. Verze metadat je 1.28. Datové zdroje jsou integrovány přes centrální provizní model.

Filtry
* {Provize Celkem}: Ovlivňuje {zobrazení výše vyplacených odměn}. Interpretace: {Sleduje celkové náklady na provizní systém}.
* {Celkem stornofond}: Ovlivňuje {zobrazení výše finančních rezerv}. Interpretace: {Ukazuje objem peněz zadržených pro krytí budoucích storen}.

Míry
* {Provize Celkem}: Měří {celkový objem vyplacených provizí za vybrané období}. Interpretace: {Hlavní finanční ukazatel nákladů na prodejní síť}. Použití: {Přehled provizí v čase}.
* {Celkem stornofond}: Měří {aktuální zůstatek v rezervním fondu storen}. Interpretace: {Indikuje míru zajištění proti budoucím úbytkům smluv}. Použití: {StornoFond přehledy}.
* {Nadpis provize / stornofond}: Měří {dynamické texty záhlaví podle kontextu výběru}. Interpretace: {Zajišťuje správnou orientaci v reportu při filtraci poboček}. Použití: {Záhlaví stránek}.
