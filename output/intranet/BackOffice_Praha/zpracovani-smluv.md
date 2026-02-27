Business popis
Tento report slouží k monitorování a řízení procesu zpracování smluv a úkolů v backoffice týmu. Poskytuje přehled o stavu rozpracovanosti smluvních dokumentů a výkonnosti jednotlivých řešitelů (odvozeno z názvu). Pomáhá identifikovat zpoždění v procesu zpracování (úkoly ve zpoždění) a průměrnou dobu potřebnou k vyřízení jednoho úkolu. Umožňuje vyhledání konkrétních obchodních případů pro kontrolu jejich statusu. Report je nezbytným nástrojem pro optimalizaci kapacity backoffice a zajištění včasného navedení smluv do systémů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Zpracování smluv - INTRO: Úvodní stránka s navigací.
* Tabulka pro vyhledání a kontrolu: Detailní vyhledávací nástroj pro konkrétní smlouvy a jejich stavy.
* Přehled výkonnosti řešitelů: Analýza efektivity týmu, počty zpracovaných úkolů a časová náročnost.

Technický popis
Report obsahuje 3 stránky a 29 vizuálních prvků, včetně sloupcových a prstencových grafů pro srovnání výkonu. Technicky využívá tabulku Zpracovani_smluv a 4 míry zaměřené na počítání případů a měření času. Zahrnuje průřezy pro filtraci podle řešitelů a stavů úkolů. Verze metadat je 1.28. Datové zdroje jsou integrovány přes tabulku BusinesCaseID.

Filtry
* {Úkoly ve zpoždění}: Ovlivňuje {zobrazení prioritních případů k řešení}. Interpretace: {Identifikuje úzká hrdla v procesu zpracování}.
* {Průměrná délka úkolu (min)}: Ovlivňuje {zobrazení podle časové náročnosti}. Interpretace: {Pomáhá rozlišit jednoduché operace od složitých případů}.

Míry
* {CountNonNull(Zpracovani_smluv.BusinesCaseID)}: Měří {celkový počet zpracovávaných nebo uzavřených úkolů}. Interpretace: {Kvantitativní ukazatel zátěže backoffice týmu}. Použití: {Přehled výkonnosti řešitelů}.
* {Úkoly ve zpoždění}: Měří {počet úkolů, které překročily stanovený časový limit pro zpracování}. Interpretace: {Hlavní ukazatel kvality a rychlosti servisu}. Použití: {Přehled výkonnosti řešitelů}.
* {Průměrná délka úkolu (min)}: Měří {průměrný čas strávený nad jedním úkolem}. Interpretace: {Ukazatel efektivity a náročnosti agendy}. Použití: {Přehled výkonnosti řešitelů}.
