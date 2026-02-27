Business popis
Tento report slouží jako technický kontrolní nástroj pro identifikaci a opravu chyb v systému ZIS. Sleduje různé typy anomálií, jako jsou odběrná místa bez přiřazeného obchodníka, chybně zadané měny, neexistující IČO s aktivním odběrem nebo chyby v cenových hladinách (odvozeno z názvu). Pomáhá datovému oddělení a administrativě udržovat čistotu dat a integritu systému. Umožňuje rychlou identifikaci smluv, které měly naběhnout do dodávky, ale proces se zastavil. Report je nezbytný pro správné fungování fakturace a provizních systémů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* CHYBY ZIS - Intro: Úvodní stránka s přehledem chybových kategorií.
* OPM bez Dealera / Chybně zadané měny: Technické seznamy chyb v kmenových datech.
* Otevřené INDIV / T-FIX Extra: Kontrola specifických produktových a cenových nastavení.
* Provize pro OZ / Hladiny cen: Kontrola nastavení ovlivňujících výpočet odměn a cen.
* Neexistující IČO / Plátce DPH: Verifikace klientských údajů vůči externím registrům.
* Smlouvy co měly naběhnout: Seznam zablokovaných procesů zahájení dodávky.

Technický popis
Report se skládá ze 13 stránek a obsahuje 92 vizuálních prvků, především detailní tabulky pro export a opravu dat. Technicky využívá 12 specializovaných SQL pohledů (usys VW_...) zaměřených na konkrétní typy chyb. Obsahuje 18 měr, které počítají počty chyb v jednotlivých kategoriích (např. pocet_chyb_mena). Verze metadat je 1.31. Report je navržen pro operativní čištění dat v denních cyklech.

Filtry
* {Hladiny cen}: Ovlivňuje {zobrazení smluv s potenciálně chybným ceníkem}. Interpretace: {Pomáhá předcházet chybám ve fakturaci}.
* {Forma účtování}: Ovlivňuje {zobrazení nesouladu v nastavení plateb u výkupů}. Interpretace: {Zajišťuje správné finanční vypořádání výrobců}.

Míry
* {pocet_chyb_opm}: Měří {celkový počet odběrných míst s technickou vadou v nastavení}. Interpretace: {Základní ukazatel nekvality dat v systému}. Použití: {Technické přehledy}.
* {pocet_chyb_mena}: Měří {počet smluv s chybně uvedenou měnou (např. záměna CZK/EUR)}. Interpretace: {Kritická chyba pro fakturační proces}. Použití: {Chybně zadané měny}.
* {pocet_smlouvy_co_nenabehly}: Měří {počet případů, kde selhal automatický start dodávky}. Interpretace: {Identifikuje ušlý zisk a nespokojenost zákazníků}. Použití: {Smlouvy co měly naběhnout}.
* {pocet_vysoke_provize}: Měří {anomálně vysoké vypočtené provize pro kontrolu}. Interpretace: {Předchází chybné výplatě nadměrných odměn}. Použití: {Provize pro OZ}.
