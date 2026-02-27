Business popis
Tento report poskytuje přehled o odběrných místech, která fungují v bezzálohovém režimu. Sleduje počet těchto OPM a jejich podíl na celkové spotřebě portfolia. Pomáhá managementu a obchodním zástupcům monitorovat vývoj těchto režimů podle komodit, lokalit a produktových řad (odvozeno z názvu). Umožňuje analýzu finančních částek fakturovaných v bezzálohovém režimu a predikci náběhu nových OPM v budoucnosti. Report je klíčový pro řízení rizik a likvidity spojené s tímto specifickým způsobem platby (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Bezzálohové režimy - INTRO: Úvodní stránka s navigací.
* Hlavní přehled: Globální ukazatele počtu a spotřeby bezzálohových OPM.
* Rozpad - OZ a lokalita: Analýza bezzálohových režimů podle obchodníků a regionů.
* Rozpad - Produkt a Nadprodukt: Sledování bezzálohových plateb u jednotlivých tarifů.
* Přehled dle Produkce: Časový vývoj náběhu bezzálohových režimů.
* Naběhnutí OPM - Budoucnost: Predikce budoucích bezzálohových odběrných míst.
* Hlavní přehled – Částky: Finanční objem fakturace bez záloh.

Technický popis
Report obsahuje 9 stránek a 71 vizuálních prvků, včetně map (shapeMap), prstencových grafů (donutChart) a ručičkových ukazatelů (gauge). Technicky využívá 4 tabulky a 11 měr zaměřených na spotřeby a fakturované částky. Verze metadat je 1.28. Datové zdroje zahrnují tabulky bezzalohove_rezimy_OPM a bezzalohove_rezimy_OPM_budouci.

Filtry
* {Komodita}: Ovlivňuje {zobrazení podle typu energie}. Interpretace: {Umožňuje sledovat bezzálohový režim odděleně pro elektřinu a plyn}.
* {JmenoDealera}: Ovlivňuje {zobrazení výsledků konkrétního obchodníka}. Interpretace: {Sleduje obchodní strategii jednotlivých OZ v oblasti záloh}.
* {soucet_bezzaloh_spotreb}: Ovlivňuje {zobrazení podle energetického významu bez záloh}. Interpretace: {Pomáhá identifikovat největší rizika v portfoliu}.

Míry
* {soucet_bezzaloh_spotreb}: Měří {celkovou roční spotřebu OPM bez záloh}. Interpretace: {Energetický objem nechráněný zálohovým kalendářem}. Použití: {Hlavní přehled}.
* {pomer_bezzalohovych spotreb}: Měří {procentuální podíl bezzálohové spotřeby na celku}. Interpretace: {Ukazatel rizikovosti portfolia z pohledu cash flow}. Použití: {Hlavní přehled (gauge)}.
* {Suma faktur bezzáloh}: Měří {finanční objem vystavených faktur bez předchozích záloh}. Interpretace: {Reálný dopad do likvidity společnosti}. Použití: {Rozpad částek}.
* {Sum(bezzalohove_rezimy_OPM_budouci.RocniSpotreba)}: Měří {očekávanou spotřebu budoucích bezzálohových OPM}. Interpretace: {Predikce budoucího vývoje rizikového portfolia}. Použití: {Naběhnutí OPM - Budoucnost}.
