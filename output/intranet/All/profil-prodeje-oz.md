Business popis
Tento report slouží k detailní analýze prodejního profilu jednotlivých obchodních zástupců. Zaměřuje se na složení jejich prodejů z pohledu komodit, tarifních skupin a délky platnosti smluv (odvozeno z názvu). Pomáhá managementu pochopit strukturu nově získávané produkce a identifikovat prodejní strategii každého obchodníka. Umožňuje sledovat objemy roční spotřeby u nově uzavřených smluv v čase. Report je důležitý pro hodnocení kvality prodejů a plánování provizních systémů (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Profil prodeje - INTRO: Úvodní stránka s navigací.
* Profil prodeje OZ: Hlavní analytický pohled na strukturu prodejů konkrétního OZ.

Technický popis
Report se skládá ze 2 stránek a obsahuje 22 vizuálních prvků, včetně prstencových grafů, pokročilých průřezů a detailních tabulek. Technicky využívá 4 tabulky, včetně informací o platnosti kontraktů a tarifních skupinách. Obsahuje 5 měr pro výpočet počtu odběrných míst a objemu spotřeby. Datové zdroje nejsou v M kódu přímo detekovány. Verze metadat je 1.28.

Filtry
* {Roční spotřeba}: Ovlivňuje {zobrazení podle velikosti získaného energetického potenciálu}. Interpretace: {Pomáhá rozlišit malé a velké odběry v profilu prodeje}.
* {Datum zadání smlouvy do ZIS}: Ovlivňuje {zobrazení prodejů v určitém časovém okně}. Interpretace: {Sleduje aktuální obchodní výkon}.

Míry
* {pocet_OPM_na_dodavce}: Měří {počet odběrných míst v rámci prodejního profilu}. Interpretace: {Kvantitativní ukazatel úspěšnosti prodeje}. Použití: {Profil prodeje OZ}.
* {Sum(excel Report pro obchod - budoucí.Roční spotřeba)}: Měří {celkový energetický objem nově sjednaných smluv}. Interpretace: {Kvalitativní ukazatel bonity prodeje}. Použití: {Profil prodeje OZ}.
* {suma_spotreb}: Měří {vypočtenou celkovou spotřebu pro zobrazení v grafech}. Interpretace: {Ukazuje podíl jednotlivých segmentů na celkové produkci}. Použití: {Donut charty v profilu prodeje}.
