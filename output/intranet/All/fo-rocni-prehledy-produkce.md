Business popis
Tento report poskytuje komplexní přehled o roční produkci obchodních zástupců a skupin. Slouží k vyhodnocování celoročních výsledků z pohledu počtu odběrných míst (OPM) a celkové spotřeby (odvozeno z názvu). Pomáhá managementu porovnávat výkonnost různých skupin a poboček v rámci ročních cyklů. Umožňuje identifikovat trendy v získávání nových zákazníků v průběhu roku. Report slouží k dlouhodobému plánování a hodnocení obchodní strategie (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Roční přehledy - INTRO: Úvodní stránka s navigací.
* Roční výsledky FO: Celkový pohled na roční výsledky obchodních zástupců.
* Roční výsledky FO dle Pob. - OPM - Tab.: Tabulkový rozpad počtu odběrných míst podle poboček.
* Roční výsledky všech skupin - OPM - Graf: Grafické srovnání počtu odběrných míst napříč skupinami.
* Roční výsledky FO dle Pob. - Spotřeby - Tab.: Tabulkový rozpad spotřeby podle poboček.
* Roční výsledky všech skupin - OPM - Graf (2): Alternativní grafický pohled na roční výsledky.

Technický popis
Report se skládá z 6 stránek a obsahuje celkem 63 vizuálních prvků, včetně pivotních tabulek, kombinovaných grafů a koláčových grafů. Technicky využívá 2 hlavní tabulky a 4 míry pro výpočet ročních KPI. Zahrnuje 13 průřezů pro detailní filtraci dat. Datové zdroje nejsou v M kódu přímo detekovány, report pravděpodobně běží nad publikovaným datasetem (pravděpodobné). Verze metadat je 1.28.

Filtry
* {Měsíc v roce}: Ovlivňuje {zobrazení dat v rámci kalendářního cyklu}. Interpretace: {Umožňuje sledovat sezónnost v produkci}.
* {EAN/EIC}: Ovlivňuje {zobrazení počtu unikátních odběrných míst}. Interpretace: {Ukazuje celkovou kvantitu získaných smluv}.
* {Roční spotřeba celkem}: Ovlivňuje {zobrazení podle energetického objemu}. Interpretace: {Pomáhá identifikovat bonitu získané produkce}.

Míry
* {CountNonNull(excel Report produkce.EAN/EIC)}: Měří {počet unikátních odběrných míst}. Interpretace: {Kvantitativní ukazatel roční produkce}. Použití: {Stránky zaměřené na OPM}.
* {Sum(excel Report produkce.Roční spotřeba celkem)}: Měří {celkový objem roční spotřeby}. Interpretace: {Ukazuje energetický potenciál roční produkce}. Použití: {Stránky zaměřené na spotřebu}.
