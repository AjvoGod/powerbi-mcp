Business popis
Report "Scoring" slouží k hodnocení a prioritizaci potenciálních zákazníků v segmentech firem i domácností. Využívá pokročilé algoritmy skórování k určení kvality a bonity obchodních příležitostí v čase. Pomáhá obchodníkům a pobočkám zaměřit se na nejperspektivnější kontakty a optimalizovat tak výtěžnost prodejních aktivit (odvozeno z názvu). Report poskytuje denní přehled o nových skórovaných subjektech a umožňuje regionální srovnání úspěšnosti napříč Českou republikou. Slouží k efektivnímu řízení náběru nových zákazníků na základě datové analytiky (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Scoring - INTRO: Úvodní stránka s navigací.
* Denní skórování Domácností / Firem: Denní přehledy nově ohodnocených subjektů.
* Skórování Dom. / Firem nad POB: Analýza kvality příležitostí na úrovni poboček.
* Skórování Dom. / Firem nad OZ: Analýza kvality příležitostí na úrovni obchodních zástupců.
* Kontrolní board: Technický přehled pro kontrolu správnosti dat a skórovacích procesů.

Technický popis
Report se skládá z 8 stránek a obsahuje vysoký počet 109 vizuálních prvků, včetně map (shapeMap), ručičkových ukazatelů (gauge) a detailních tabulek. Technicky využívá 6 tabulek a 7 měr pro výpočet skóre (pole Score_7a2a6). Verze metadat je 1.28. Report je lokalizován jak v české, tak v anglické verzi (viz soubor AJ Version). Datové zdroje jsou pravděpodobně integrovány přes centrální analytický model.

Filtry
* {Score_7a2a6}: Ovlivňuje {zobrazení subjektů podle jejich výsledného hodnocení}. Interpretace: {Filtruje subjekty s nejvyšším obchodním potenciálem}.
* {Company.Id}: Ovlivňuje {zobrazení unikátních subjektů v reportu}. Interpretace: {Sleduje celkový objem skórované databáze}.

Míry
* {Sum(Company.Score_7a2a6)}: Měří {celkovou sumu dosaženého skóre}. Interpretace: {Ukazuje celkový kvalitativní potenciál dané skupiny subjektů}. Použití: {Všechny analytické stránky}.
* {Avg(Company.Score_7a2a6)}: Měří {průměrnou hodnotu skóre na jeden subjekt}. Interpretace: {Indikuje průměrnou kvalitu obchodních příležitostí v regionu/u OZ}. Použití: {Denní přehledy}.
* {CountNonNull(Company.Id)}: Měří {počet skórovaných subjektů}. Interpretace: {Kvantitativní ukazatel rozsahu skórovacího procesu}. Použití: {Všechny stránky}.
