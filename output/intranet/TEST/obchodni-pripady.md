Business popis
Tento report poskytuje přehled o obchodních případech a úspěšnosti převodu leadů na reálné zakázky. Sleduje výkonnost jednotlivých poboček a obchodních zástupců v rámci celého prodejního procesu (odvozeno z názvu). Pomáhá managementu identifikovat konverzní poměry z leadu na obchodní případ (Conversion Rate) a monitorovat geografické rozložení klientů na mapě ČR. Umožňuje analýzu stavů jednotlivých obchodních případů a sledování náběhu nových klientů v čase. Report slouží k vyhodnocování efektivity obchodní sítě a k plánování akvizičních strategií (pravděpodobné).

Struktura stránek (co na nich typicky je)
* OP - Pobočky / OZ: Výkonnostní přehledy obchodních struktur.
* Stavy jednotlivých OP: Analýza rozpracovanosti obchodních případů.
* Počet vzniklých OP x Leady: Sledování efektivity prodejního trychtýře a konverze.
* Mapa klientů / Kraje a Okresy: Geografická analýza klientské základny.

Technický popis
Report obsahuje 8 stránek a 61 vizuálních prvků, včetně map (shapeMap), kombinovaných grafů a karet s KPI. Technicky využívá 6 tabulek (Klienti, Leady, Obchodní případy) a 10 měr. Verze metadat je 1.28. Report je v testovací fázi (umístěn ve složce TEST) a slouží k ověřování nových analytických modelů prodeje.

Filtry
* {ID OP}: Ovlivňuje {zobrazení počtu obchodních případů}. Interpretace: {Sleduje celkovou kvantitu rozjednaných obchodů}.
* {ID Klienta}: Ovlivňuje {zobrazení počtu unikátních zákazníků}. Interpretace: {Sleduje velikost a růst klientského kmene}.
* {Conversion Rate}: Ovlivňuje {zobrazení efektivity převodu příležitostí na obchod}. Interpretace: {Klíčové KPI pro hodnocení kvality obchodního procesu}.

Míry
* {Sum(Obchodní případy.ID OP)}: Měří {celkový počet registrovaných obchodních případů}. Interpretace: {Kvantitativní ukazatel aktivity obchodní sítě}. Použití: {Všechny analytické stránky}.
* {Sum(Klienti.ID Klienta)}: Měří {celkový počet klientů v systému}. Interpretace: {Ukazatel velikosti spravované klientské základny}. Použití: {Mapa klientů}.
* {Úspěšnost}: Měří {procentuální míru konverze leadů na uzavřené obchody}. Interpretace: {Základní ukazatel efektivity prodejního týmu}. Použití: {Počet vzniklých OP x Leady}.
* {CountNonNull(Leady.ID)}: Měří {celkový počet vstupních obchodních příležitostí}. Interpretace: {Sleduje náběh leadů do systému}. Použití: {Leady}.
