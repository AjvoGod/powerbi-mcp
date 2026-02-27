Business popis
Report "Reminders" slouží k monitorování procesu upomínání dlužníků a efektivitě zasílaných výzev k platbě. Sleduje počty a finanční objemy upomínek v různých stavech – od nově vytvořených až po zaplacené či stornované (odvozeno z názvu). Pomáhá identifikovat úspěšnost inkasa po zaslání upomínky a podíl aktivních upomínek v portfoliu. Umožňuje rozlišit mezi částkou, která byla upomenuta, a aktuálním zbývajícím dluhem. Report je zásadní pro vyhodnocování práce oddělení pohledávek a nastavení procesu vymáhání (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Reminders INTRO: Úvodní stránka s navigací.
* Counts and balances: Přehled o počtech upomínek a výši upomínaných částek.
* Paid vs Unpaid Reminders: Analýza úspěšnosti úhrad po obdržení upomínky.
* Active vs Inactive Reminders: Sledování podílu aktuálně řešených upomínek.

Technický popis
Report se skládá ze 4 stránek a obsahuje 38 vizuálních prvků, především 100% skládané pruhové grafy pro srovnání poměrů a tabulky. Technicky využívá 3 tabulky (včetně zis VW_Upominky) a 8 měr pro výpočet stavů a sum. Verze metadat je 1.28. Report je lokalizován v anglické verzi (viz česká verze Upomínání - Report).

Filtry
* {Paid/Unpaid}: Ovlivňuje {zobrazení upomínek podle stavu úhrady}. Interpretace: {Klíčový filtr pro sledování efektivity procesu upomínání}.
* {Active/Inactive}: Ovlivňuje {zobrazení aktuálně platných upomínek}. Interpretace: {Rozlišuje mezi živými případy a historicky uzavřenými upomínkami}.
* {EndOfTheMonth}: Ovlivňuje {zobrazení stavu upomínek k poslednímu dni měsíce}. Interpretace: {Umožňuje měsíční reportování úspěšnosti vymáhání}.

Míry
* {Sum(stage_zis upominky.Upomínky - Upomenutá částka)}: Měří {celkový finanční objem, na který byly vystaveny upomínky}. Interpretace: {Ukazuje celkovou sumu, o kterou se společnost aktivně přihlásila}. Použití: {Counts and balances}.
* {Sum(stage_zis upominky.Upomínky - Aktuální zůstatek upomínky)}: Měří {zbývající neuhrazenou část dluhu z upomínek}. Interpretace: {Sleduje reálnou dlužnou částku po částečných úhradách}. Použití: {Counts and balances}.
* {CountNonNull(stage_zis upominky.Upomínky - ID)}: Měří {celkový počet vystavených upomínkových dokladů}. Interpretace: {Kvantitativní ukazatel intenzity upomínacího procesu}. Použití: {Paid vs Unpaid Reminders}.
