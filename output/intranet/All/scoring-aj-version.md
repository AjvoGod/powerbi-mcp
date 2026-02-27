Business popis
Tento report slouží k hodnocení kvality a potenciálu obchodních subjektů (domácnosti a firmy) v anglickém jazyce. Využívá analytické skórování k identifikaci nejvhodnějších prodejních cílů v rámci České republiky (odvozeno z názvu). Pomáhá mezinárodnímu managementu a obchodním týmům prioritizovat akviziční aktivity na základě bonity leadů. Report poskytuje denní přehledy o skórovaných subjektech a umožňuje regionální srovnání napříč pobočkami a obchodními zástupci. Slouží k zefektivnění prodejního procesu na základě datově podloženého hodnocení (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Scoring - INTRO: Úvodní stránka s navigací.
* Daily Household Scoring / Companies Overview: Denní přehledy skórování pro oba segmenty.
* Household / Companies Scoring by Branch: Analýza kvality leadů na úrovni poboček.
* Household / Companies Scoring by Sales Reps: Analýza kvality leadů na úrovni obchodních zástupců.
* Kontrolní board: Technický dohled nad skórovacími procesy.

Technický popis
Report obsahuje 8 stránek a 109 vizuálních prvků, včetně map ČR, ručičkových ukazatelů (gauge) a detailních tabulek. Technicky využívá 5 tabulek a 6 měr zaměřených na výpočet a agregaci skóre (Score_7a2a6). Je anglickou verzí reportu "SCORING Firem a Domácností". Verze metadat je 1.28. Datové zdroje jsou pravděpodobně napojeny na centrální skórovací model v datovém skladu.

Filtry
* {Score_7a2a6}: Ovlivňuje {zobrazení subjektů podle výsledného bodového hodnocení}. Interpretace: {Umožňuje zaměřit se na subjekty s nejvyšším skóre (top potenciál)}.
* {Company.Id}: Ovlivňuje {výběr unikátních klientských záznamů}. Interpretace: {Zajišťuje správnou identifikaci subjektů v databázi}.

Míry
* {Sum(Company.Score_7a2a6)}: Měří {celkovou sumu dosaženého skóre pro daný segment nebo region}. Interpretace: {Ukazuje celkový tržní potenciál ve vybraném pohledu}. Použití: {Všechny analytické stránky}.
* {CountNonNull(Company.Id)}: Měří {počet skórovaných subjektů}. Interpretace: {Základní kvantitativní ukazatel rozsahu skórované databáze}. Použití: {Daily Household Scoring}.
* {CountNonNull(BusinessCase.CompanyId)}: Měří {počet obchodních případů navázaných na skórované firmy}. Interpretace: {Sleduje propojení skóre s reálnou obchodní aktivitou}. Použití: {Denní přehledy firem}.
