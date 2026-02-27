Business popis
Tento report poskytuje komplexní přehled o vývoji hodnot skladových zásob v rámci logistiky. Sleduje finanční hodnotu zásob v čase a jejich rozdělení podle skupin skladů, lokalit (Sites) a účetních skupin (odvozeno z názvu). Pomáhá managementu logistiky identifikovat trendy v zásobování prostřednictvím týdenních srovnání (Week-over-Week) a monitorovat změny v počtech položek na skladě. Report umožňuje detailní náhled na úroveň konkrétních skladových karet pro analýzu obrátkovosti a hodnoty zboží. Slouží k efektivnímu řízení cash flow vázaného v zásobách a optimalizaci skladových kapacit (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Inventory Development - INTRO: Úvodní stránka s navigací.
* Development Overview by Week: Časová osa vývoje celkové hodnoty skladu v týdenních krocích.
* Development by Warehouse Groups / Sites / Accounting Groups: Analýza hodnoty zásob v různých organizačních a účetních pohledech.
* Item Development Detail: Detailní tabulkový přehled o vývoji konkrétních položek.

Technický popis
Report obsahuje 6 stránek a 96 vizuálních prvků, včetně oblastních grafů a pruhových grafů s trendovými indikátory. Technicky využívá 4 tabulky (stěžejní je Energie VW_Logistika_Development) a 8 měr zaměřených na výpočet hodnoty a trendů (WoW Trend Icon). Zahrnuje vysoký počet průřezů (37) pro extrémně detailní filtraci položek. Verze metadat je 1.28.

Filtry
* {Inventory Value}: Ovlivňuje {zobrazení podle finančního významu zásob}. Interpretace: {Pomáhá identifikovat nejdražší položky na skladě}.
* {selfFilterEnabled}: Ovlivňuje {možnost vyhledávání konkrétních kódů zboží nebo skladů}. Interpretace: {Zajišťuje operativní kontrolu konkrétních logistických toků}.

Míry
* {Inventory Value}: Měří {celkovou finanční hodnotu zásob k danému datu}. Interpretace: {Hlavní ukazatel objemu kapitálu vázaného ve skladech}. Použití: {Všechny analytické stránky}.
* {Item WoW Difference}: Měří {změnu v hodnotě položky oproti předchozímu týdnu}. Interpretace: {Indikuje nárůst nebo pokles skladových zásob}. Použití: {Development přehledy}.
* {WoW Trend Icon}: Měří {vizuální indikátor směru vývoje hodnoty (šipky)}. Interpretace: {Umožňuje rychlou orientaci v trendech zásobování}. Použití: {Overview stránky}.
* {ItemCount}: Měří {počet unikátních položek na skladě}. Interpretace: {Kvantitativní ukazatel šíře sortimentu}. Použití: {Item Development Detail}.
