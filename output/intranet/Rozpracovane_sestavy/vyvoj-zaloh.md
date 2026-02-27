Business popis
Tento report poskytuje detailní analýzu vývoje klientských záloh v čase. Sleduje celkové předepsané částky záloh a jejich rozdělení na částky k zahrnutí, již zahrnuté a zůstatky po a před splatností (odvozeno z názvu). Pomáhá finančnímu oddělení monitorovat tok záloh a identifikovat rizika spojená s neuhrazenými zálohovými předpisy. Umožňuje časovou analýzu vývoje salda záloh v měsíčních a týdenních intervalech. Report je klíčový pro řízení cash flow a predikci budoucích příjmů z klientských záloh (pravděpodobné).

Struktura stránek (co na nich typicky je)
* Vývoj záloh - INTRO: Úvodní stránka s navigací.
* Vývoj záloh - Zůstatek po a před splatností: Sledování dlužných částek na zálohách v čase.
* Vývoj záloh - Částka k zahrnutí / již zahrnuto: Analýza stavu zúčtování záloh.
* Vývoj záloh - Celková částka: Globální pohled na objem zálohového kalendáře.

Technický popis
Report se skládá z 5 stránek a obsahuje 65 vizuálních prvků, včetně oblastních grafů (areaChart) a detailních tabulek. Technicky využívá 4 tabulky, přičemž stěžejní jsou zis TMP_Zalohy_Snapshot_Agg a _Measures. Obsahuje 12 pokročilých průřezů pro hloubkovou analýzu dat. Verze metadat je 1.28.

Filtry
* {Zůstatek po splatnosti}: Ovlivňuje {zobrazení finančního rizika v zálohách}. Interpretace: {Identifikuje neplniče zálohových kalendářů}.
* {Částka k zahrnutí}: Ovlivňuje {zobrazení potenciálu pro budoucí zúčtování}. Interpretace: {Sleduje objem záloh připravených k vypořádání ve fakturaci}.

Míry
* {Celková částka}: Měří {souhrnnou sumu všech vystavených zálohových předpisů}. Interpretace: {Celkový nárok na platby od zákazníků v systému záloh}. Použití: {Všechny analytické stránky}.
* {Zůstatek po splatnosti}: Měří {objem neuhrazených záloh po termínu splatnosti}. Interpretace: {Klíčové KPI pro sledování platební morálky u záloh}. Použití: {Vývoj záloh - Zůstatek}.
* {Částka již zahrnuto}: Měří {objem záloh, které již byly zúčtovány ve finální fakturaci}. Interpretace: {Sleduje reálné čerpání zálohových prostředků}. Použití: {Vývoj záloh - Částka již zahrnuto}.
