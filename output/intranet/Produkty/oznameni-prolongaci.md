Business popis
Tento report slouží k automatizovanému sledování a přípravě oznámení o prodloužení smluv (prolongací). Poskytuje přehled o smlouvách, u kterých se blíží termín obnovení, a generuje podklady pro komunikaci se zákazníky (odvozeno z názvu). Pomáhá produktovému oddělení monitorovat náběhy kampaní jako "Jistota na zimu 2025" a sledovat termíny pro odeslání zákonných oznámení o změně ceny. Report umožňuje včasnou identifikaci zákazníků, kteří budou prolongováni, a slouží k prevenci odchodů před koncem fixace (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Oznámení prolongací: Seznam smluv s blížícím se termínem vypršení a datem pro oznámení.
* Jistota na zimu 2025: Specifický přehled pro kampaň zaměřenou na budoucí topnou sezónu.

Technický popis
Report se skládá ze 2 stránek a obsahuje 8 vizuálních prvků, především detailní tabulky určené pro procesní zpracování. Technicky využívá tabulky napojené na automatizační toky (pa oznameni_dodatku_za2m) a jednu hlavní míru pro výpočet cílového data. Verze metadat je 1.28. Report je navržen pro operativní podporu oddělení produktů.

Filtry
* {DatumZaDvaMesice}: Ovlivňuje {zobrazení smluv končících v definovaném časovém horizontu}. Interpretace: {Umožňuje plánovat komunikační kampaně s předstihem}.

Míry
* {DatumZaDvaMesice}: Měří {vypočtený termín pro odeslání oznámení}. Interpretace: {Klíčové procesní datum pro dodržení legislativních lhůt}. Použití: {Oznámení prolongací}.
