import type { QuizSet } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// DP1 — Programare Dinamică I: Drumuri în Matrice
// ─────────────────────────────────────────────────────────────────────────────

export const DP1_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question:
          "Ce este programarea dinamică (DP) în contextul algoritmilor?",
        options: [
          "O tehnică de sortare a datelor în funcție de o proprietate dinamică",
          "O metodă de rezolvare a problemelor prin descompunere în subprobleme și reutilizarea rezultatelor acestora",
          "Un algoritm care alege mereu varianta local optimă la fiecare pas",
          "O tehnică de randomizare a intrărilor pentru a evita cazurile defavorabile",
        ],
        correctIndex: 1,
        explanation:
          "Programarea dinamică este o tehnică de proiectare a algoritmilor care descompune o problemă în subprobleme mai mici, rezolvă fiecare subproblemă o singură dată și stochează rezultatul pentru reutilizare. Aceasta evită recalcularea acelorași subprobleme și reduce complexitatea.",
      },
      {
        question:
          "În problema drumurilor crescătoare într-o matrice, ce reprezintă dp[i][j]?",
        options: [
          "Valoarea minimă dintre A[1][1] și A[i][j]",
          "Lungimea celui mai lung drum strict crescător de la (1,1) la (i,j)",
          "Numărul total de celule de la (1,1) la (i,j)",
          "Suma elementelor de pe traseul de la (1,1) la (i,j)",
        ],
        correctIndex: 1,
        explanation:
          "dp[i][j] reține lungimea celui mai lung drum strict crescător care pornește din (1,1) și ajunge în (i,j), deplasându-ne doar în dreapta sau în jos. Dacă nu există un astfel de drum, dp[i][j] = 0.",
      },
      {
        question:
          "Care este valoarea bazei dp[1][1] în problema drumurilor crescătoare?",
        options: ["0", "1", "A[1][1]", "N + M"],
        correctIndex: 1,
        explanation:
          "dp[1][1] = 1, reprezentând drumul format doar din celula de start (1,1). Lungimea acestui drum este 1, deoarece conține o singură celulă.",
      },
      {
        question:
          "Sub ce condiție se poate calcula dp[1][j] (prima linie, coloana j > 1)?",
        options: [
          "Dacă toate elementele de pe prima linie sunt strict crescătoare",
          "Dacă A[1][j] > A[1][j-1] ȘI dp[1][j-1] > 0",
          "Dacă j ≤ N, indiferent de valorile din matrice",
          "Dacă A[1][j] > A[1][j+1]",
        ],
        correctIndex: 1,
        explanation:
          "Pe prima linie, singurul vecin posibil este cel din stânga (1, j-1). Condiția e ca A[1][j] > A[1][j-1] (creștere) și dp[1][j-1] > 0 (să existe un drum valid până la vecin). Dacă ambele sunt adevărate, dp[1][j] = dp[1][j-1] + 1.",
      },
      {
        question:
          "Sub ce condiție se poate calcula dp[i][1] (prima coloană, linia i > 1)?",
        options: [
          "Dacă A[i][1] > A[i-1][1] ȘI dp[i-1][1] > 0",
          "Dacă A[i][1] > 0",
          "Dacă i este număr par",
          "Dacă A[i][1] > A[i][2]",
        ],
        correctIndex: 0,
        explanation:
          "Pe prima coloană, singurul vecin posibil este cel de sus (i-1, 1). Trebuie ca A[i][1] > A[i-1][1] (creștere) și dp[i-1][1] > 0 (drum valid până la vecin).",
      },
      {
        question:
          "Ce problemă rezolvă algoritmul DP pentru drumuri în matrice?",
        options: [
          "Găsirea celui mai lung drum strict crescător de la (1,1) la orice celulă (i,j), deplasându-ne doar la dreapta sau în jos",
          "Găsirea drumului de cost minim între (1,1) și (N,M)",
          "Sortarea elementelor matricei în ordine crescătoare",
          "Găsirea elementului maxim din matrice",
        ],
        correctIndex: 0,
        explanation:
          "Problema cere găsirea celui mai lung drum strict crescător de la colțul stânga-sus (1,1) la orice altă celulă (i,j), cu deplasări permise doar la dreapta sau în jos. Condiția de creștere strictă înseamnă A[vecin] < A[i][j].",
      },
      {
        question:
          "Ce înseamnă dp[i][j] = 0 în această problemă?",
        options: [
          "Celula (i,j) se află la marginea matricei",
          "Nu există niciun drum strict crescător valid de la (1,1) la (i,j)",
          "Valoarea A[i][j] este mai mică decât toate valorile vecinilor",
          "Drumul până la (i,j) are lungimea 0",
        ],
        correctIndex: 1,
        explanation:
          "dp[i][j] = 0 indică faptul că nu există niciun drum valid de la (1,1) la (i,j) care să respecte condiția de creștere strictă. Acest lucru se poate întâmpla dacă niciun vecin nu are valoare mai mică sau dacă niciun vecin nu e accesibil.",
      },
      {
        question:
          "Ce reprezintă matricea A în contextul problemei?",
        options: [
          "Matricea de distanțe între celule",
          "Matricea de valori prin care ne deplasăm, iar drumul trebuie să fie strict crescător pe aceste valori",
          "Matricea de costuri a fiecărei celule",
          "Matricea de adiacență a grafului",
        ],
        correctIndex: 1,
        explanation:
          "Matricea A conține valorile numerice ale fiecărei celule. Un drum valid de la (1,1) la (i,j) trebuie să parcurgă celule cu valori strict crescătoare: fiecare pas (la dreapta sau în jos) trebuie să ducă la o celulă cu valoare mai mare decât cea curentă.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question:
          "Care este recurența de bază pentru dp[i][j] când ambii vecini (sus și stânga) sunt valizi?",
        options: [
          "dp[i][j] = i + j - 1",
          "dp[i][j] = max(dp[i-1][j], dp[i][j-1]) + 1",
          "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
          "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
        ],
        correctIndex: 1,
        explanation:
          "Când ambii vecini sunt valizi (A[vecin] < A[i][j] și dp[vecin] > 0), alegem varianta care oferă drumul cel mai lung: max(dp[i-1][j], dp[i][j-1]). Adăugăm +1 pentru a include celula curentă (i,j) în drum.",
      },
      {
        question: "Când avem dp[i][j] = i + j - 1?",
        options: [
          "Când A[i][j] este mai mare decât ambii vecini și cel puțin un drum valid ajunge la ei",
          "Mereu când i = 1 sau j = 1",
          "Când A[i][j] > max(A[i-1][j], A[i][j-1])",
          "Când toate elementele de pe traseu sunt strict crescătoare",
        ],
        correctIndex: 0,
        explanation:
          "dp[i][j] = i + j - 1 este lungimea maximă teoretică a unui drum de la (1,1) la (i,j) (toate celulele de pe traseu). Se atinge când A[i][j] > A[i-1][j] și A[i][j] > A[i][j-1] și cel puțin un vecin e accesibil.",
      },
      {
        question:
          "Ce semnificație are dp[i][j] = i + j - 1?",
        options: [
          "Drumul trece prin toate celulele posibile de la (1,1) la (i,j)",
          "Lungimea drumului este maximă posibilă — fiecare celulă de pe traseu a contribuit la creșterea lungimii",
          "Matricea este sortată crescător în totalitate",
          "Nu există obstacole în matrice",
        ],
        correctIndex: 1,
        explanation:
          "i + j - 1 reprezintă numărul maxim de celule pe care le poate avea un drum de la (1,1) la (i,j) (mergând doar dreapta sau jos). Când dp[i][j] atinge această valoare, înseamnă că s-a putut forma un drum care include fiecare celulă intermediară.",
      },
      {
        question:
          "Ce se întâmplă dacă niciun vecin (sus sau stânga) nu îndeplinește condiția A[vecin] < A[i][j]?",
        options: [
          "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
          "dp[i][j] = 0",
          "dp[i][j] = i + j - 1",
          "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
        ],
        correctIndex: 1,
        explanation:
          "Dacă ambii vecini au valori mai mari sau egale cu A[i][j], atunci nu putem continua niciun drum prin (i,j). În acest caz, dp[i][j] = 0, semnificând că (i,j) este inaccesibil printr-un drum strict crescător.",
      },
      {
        question:
          "Care este condiția completă pentru a considera vecinul de sus (i-1, j) în calculul dp[i][j]?",
        options: [
          "A[i-1][j] < A[i][j] ȘI dp[i-1][j] > 0",
          "A[i-1][j] ≥ A[i][j]",
          "dp[i-1][j] > dp[i][j-1]",
          "Doar i > 1, indiferent de valorile din matrice",
        ],
        correctIndex: 0,
        explanation:
          "Condiția ca vecinul de sus să fie valid este dublă: (1) A[i-1][j] < A[i][j] — creștere strictă, și (2) dp[i-1][j] > 0 — să existe un drum valid până la vecin. Dacă una e falsă, vecinul nu contribuie.",
      },
      {
        question:
          "Dacă doar vecinul din stânga e valid (A[i][j-1] < A[i][j] și dp[i][j-1] > 0), iar cel de sus nu, ce valoare are dp[i][j]?",
        options: [
          "dp[i][j] = 0",
          "dp[i][j] = dp[i][j-1] + 1",
          "dp[i][j] = i + j - 1",
          "dp[i][j] = dp[i][j-1]",
        ],
        correctIndex: 1,
        explanation:
          "Când doar vecinul din stânga este valid, singura variantă de continuare este prin acesta. Lungimea drumului devine dp[i][j-1] + 1 (drumul până la vecin plus celula curentă).",
      },
      {
        question:
          "De ce se adună +1 la max(dp[i-1][j], dp[i][j-1]) în recurență?",
        options: [
          "Pentru a contoriza și celula curentă (i,j) în lungimea drumului",
          "Pentru că lungimea minimă a oricărui drum este 1",
          "Pentru că e o convenție matematică de indexare",
          "Pentru a evita valoarea 0",
        ],
        correctIndex: 0,
        explanation:
          "Adunarea +1 contorizează chiar celula (i,j) în lungimea totală a drumului. Fără +1, am ignora ultima celulă adăugată. Dacă niciun vecin nu contribuie, dp[i][j] rămâne 0 și nu se adună nimic.",
      },
      {
        question:
          "De ce este necesar să verificăm ambii vecini (sus și stânga) și nu doar unul singur?",
        options: [
          "Pentru că drumul poate veni din oricare direcție și alegem varianta mai lungă",
          "Pentru că trebuie să validăm simetria matricei",
          "Pentru că dp[i-1][j] și dp[i][j-1] trebuie să aibă valori egale",
          "Pentru că altfel nu putem calcula numărul de drumuri",
        ],
        correctIndex: 0,
        explanation:
          "Există două moduri de a ajunge în (i,j): de sus (i-1,j) sau din stânga (i,j-1). Pentru a găsi drumul optim, trebuie să evaluăm ambele posibilități și să o alegem pe cea mai lungă. Verificarea ambilor vecini garantează corectitudinea.",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question:
          "Care este ordinea corectă de parcurgere a matricei pentru a calcula dp[i][j]?",
        options: [
          "Pe coloane, de sus în jos și de la dreapta la stânga",
          "Linie cu linie, de la (1,1) la (N,M), fiecare linie parcursă de la stânga la dreapta",
          "Pe diagonale secundare, de la colț la colț",
          "Orice ordine funcționează, DP nu impune o ordine anume",
        ],
        correctIndex: 1,
        explanation:
          "DP pentru drumuri necesită ca dp[i-1][j] (sus) și dp[i][j-1] (stânga) să fie calculate înaintea lui dp[i][j]. Parcurgerea linie cu linie, de sus în jos și de la stânga la dreapta, asigură acest lucru.",
      },
      {
        question:
          "De ce trebuie să parcurgem liniile în ordine crescătoare și coloanele în ordine crescătoare?",
        options: [
          "Pentru că dp[i][j] depinde de dp[i-1][j] (sus) și dp[i][j-1] (stânga), care sunt calculate înainte doar în această ordine",
          "Pentru că matricea este dată sortată crescător",
          "Pentru că este singura ordine acceptată de convenția problemei",
          "Pentru a minimiza memoria utilizată",
        ],
        correctIndex: 0,
        explanation:
          "Dependențele dp[i][j] → dp[i-1][j] (sus) și dp[i][j-1] (stânga) impun o ordine topologică: linii de la 1 la N, iar pe fiecare linie coloane de la 1 la M. Astfel, orice subproblemă e rezolvată înainte de a fi folosită.",
      },
      {
        question:
          "Ce înseamnă substructura optimă în contextul problemei drumurilor crescătoare?",
        options: [
          "Soluția optimă globală conține soluțiile optime ale subproblemelor (drumurile parțiale până la vecini)",
          "Toate subproblemele au aceeași soluție",
          "Matricea poate fi împărțită în submatrice independente",
          "Drumul optim este unic și poate fi găsit prin căutare binară",
        ],
        correctIndex: 0,
        explanation:
          "Substructura optimă: cel mai lung drum până la (i,j) conține cel mai lung drum până la un vecin (sus sau stânga). Dacă un sub-drum n-ar fi optimal, l-am putea înlocui și am obține un drum mai lung, ceea ce ar contrazice optimalitatea.",
      },
      {
        question:
          "Cum se demonstrează substructura optimă prin contradicție?",
        options: [
          "Se presupune că subproblema n-are soluție optimă, se arată că soluția globală poate fi îmbunătățită, ceea ce contrazice optimalitatea",
          "Se calculează direct prin formula de recurență",
          "Se aplică inducție pe numărul de linii",
          "Se folosește principiul sortării topologice",
        ],
        correctIndex: 0,
        explanation:
          "Demonstrația prin contradicție: Presupunem că avem un drum optim D de la (1,1) la (i,j). Fie (k,l) ultimul vecin înainte de (i,j) pe D. Dacă drumul de la (1,1) la (k,l) n-ar fi optim, l-am înlocui cu unul mai lung, obținând un drum mai lung la (i,j) — contradicție.",
      },
      {
        question:
          "Cum aflăm lungimea maximă a unui drum crescător din întreaga matrice?",
        options: [
          "Citim direct dp[N][M]",
          "Calculăm maximul din întreaga matrice dp",
          "Citim dp[1][1]",
          "Calculăm N + M - 1",
        ],
        correctIndex: 1,
        explanation:
          "Răspunsul este max(dp[i][j]) pentru 1 ≤ i ≤ N, 1 ≤ j ≤ M. Nu este neapărat dp[N][M], deoarece cel mai lung drum se poate termina în orice celulă a matricei, nu neapărat în colțul din dreapta-jos.",
      },
      {
        question:
          "De ce răspunsul nu este neapărat dp[N][M]?",
        options: [
          "Pentru că (N,M) poate fi inaccesibil (dp[N][M] = 0) sau un drum mai lung se termină în altă celulă",
          "Pentru că dp[N][M] este întotdeauna valoarea maximă",
          "Pentru că N și M sunt dimensiunile matricei și ultima celulă e întotdeauna accesibilă",
          "Pentru că dp[N][M] include doar drumuri care trec prin toate celulele",
        ],
        correctIndex: 0,
        explanation:
          "Un drum mai lung se poate termina în interiorul matricei, nu neapărat în (N,M). De exemplu, dacă ultimele linii au valori mici, cel mai lung drum s-ar putea opri mai devreme. De aceea, căutăm maximul global.",
      },
      {
        question:
          "Ce condiție trebuie să îndeplinească o celulă (i,j) pentru ca dp[i][j] să contribuie la răspunsul final?",
        options: [
          "dp[i][j] > 0 — să existe cel puțin un drum valid până la ea",
          "i = N și j = M — doar ultima celulă contează",
          "A[i][j] = maximul din matrice",
          "dp[i][j] > dp[i-1][j] — să fie mai lungă decât vecinul de sus",
        ],
        correctIndex: 0,
        explanation:
          "Orice celulă cu dp[i][j] > 0 este capătul unui drum valid. Căutăm maximum dintre toate aceste valori pentru a găsi cel mai lung drum din întreaga matrice.",
      },
      {
        question:
          "De ce trebuie să verificăm dp[vecin] > 0 și nu doar A[vecin] < A[i][j]?",
        options: [
          "Pentru a ne asigura că există un drum valid până la vecin, nu doar o valoare mai mică",
          "Pentru a evita overflow la numere mari în matrice",
          "Pentru că dp[vecin] poate fi negativ",
          "Pentru a reduce timpul de execuție",
        ],
        correctIndex: 0,
        explanation:
          "Chiar dacă A[vecin] < A[i][j], vecinul poate fi inaccesibil (dp[vecin] = 0). De exemplu, dacă toți vecinii lui au valori mai mari, niciun drum nu ajunge la el. Verificăm dp[vecin] > 0 pentru a confirma că există o cale validă.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question:
          "Ce reprezintă cnt[i][j] în problema numărării drumurilor optime?",
        options: [
          "Numărul de drumuri distincte de lungime maximă dp[i][j] care ajung la (i,j)",
          "Numărul total de vizite ale celulei (i,j) în timpul algoritmului",
          "Lungimea celui mai scurt drum până la (i,j)",
          "Numărul de vecini valizi ai celulei (i,j)",
        ],
        correctIndex: 0,
        explanation:
          "cnt[i][j] numără câte drumuri distincte de lungime exact dp[i][j] (lungimea maximă) ajung la celula (i,j). Pentru (1,1), cnt[1][1] = 1. Pentru celelalte celule, cnt[i][j] se calculează pe baza cnt al vecinilor care contribuie cu lungimea maximă.",
      },
      {
        question:
          "Cum se calculează cnt[i][j] când ambii vecini contribuie cu aceeași lungime maximă?",
        options: [
          "cnt[i][j] = cnt[i-1][j] + cnt[i][j-1]",
          "cnt[i][j] = max(cnt[i-1][j], cnt[i][j-1])",
          "cnt[i][j] = cnt[i-1][j] * cnt[i][j-1]",
          "cnt[i][j] = cnt[i-1][j] + cnt[i][j-1] + 1",
        ],
        correctIndex: 0,
        explanation:
          "Dacă ambii vecini au dp[vecin] + 1 == dp[i][j] (amândoi duc la drumuri de aceeași lungime maximă), atunci cnt[i][j] = cnt[i-1][j] + cnt[i][j-1]. Se adună numărul de drumuri distincte de la fiecare vecin valid.",
      },
      {
        question:
          "Ce valoare are cnt[1][1] și de ce?",
        options: ["0", "1", "A[1][1]", "N + M"],
        correctIndex: 1,
        explanation:
          "cnt[1][1] = 1, deoarece există un singur drum de lungime 1 care începe și se termină în (1,1) — drumul format doar din celula de start.",
      },
      {
        question:
          "Când doar vecinul de sus contribuie la lungimea maximă (dp[i-1][j] + 1 == dp[i][j]), iar cel din stânga nu, cum se calculează cnt[i][j]?",
        options: [
          "cnt[i][j] = cnt[i-1][j]",
          "cnt[i][j] = cnt[i][j-1]",
          "cnt[i][j] = cnt[i-1][j] + 1",
          "cnt[i][j] = 0",
        ],
        correctIndex: 0,
        explanation:
          "Dacă doar vecinul de sus contribuie la lungimea maximă, numărul de drumuri care ajung la (i,j) prin sus este exact cnt[i-1][j]. Drumurile din stânga nu sunt luate în calcul.",
      },
      {
        question:
          "Ce se întâmplă cu cnt[i][j] dacă dp[i-1][j] > dp[i][j-1] (vecinul de sus are un drum mai lung)?",
        options: [
          "cnt[i][j] = cnt[i-1][j]",
          "cnt[i][j] = cnt[i-1][j] + cnt[i][j-1]",
          "cnt[i][j] = cnt[i][j-1]",
          "cnt[i][j] = 0",
        ],
        correctIndex: 0,
        explanation:
          "Când dp[i-1][j] > dp[i][j-1], singura contribuție la lungimea maximă vine de sus. Doar cnt[i-1][j] se moștenește, deoarece drumurile prin stânga ar fi mai scurte și nu contribuie la optim.",
      },
      {
        question:
          "Ce se întâmplă dacă dp[i-1][j] == dp[i][j-1] dar doar un vecin e valid (A[vecin] < A[i][j])?",
        options: [
          "cnt[i][j] = cnt[vecinul valid] (se adună doar contribuția vecinului valid)",
          "cnt[i][j] = 0",
          "cnt[i][j] = cnt[i-1][j] + cnt[i][j-1]",
          "cnt[i][j] = cnt[i-1][j]",
        ],
        correctIndex: 0,
        explanation:
          "Chiar dacă dp are aceeași valoare, trebuie verificată condiția A[vecin] < A[i][j]. Dacă un vecin nu îndeplinește această condiție, el nu contribuie la cnt, indiferent de valoarea dp a acestuia.",
      },
      {
        question:
          "Care este complexitatea algoritmului DP pentru drumuri într-o matrice N×M?",
        options: ["O(N + M)", "O(N × M)", "O(N² × M)", "O(2^{N+M})"],
        correctIndex: 1,
        explanation:
          "Algoritmul vizitează fiecare celulă o singură dată, iar pentru fiecare celulă face O(1) operații (verifică doi vecini). Complexitatea totală este O(N × M), liniară în numărul de celule ale matricei.",
      },
      {
        question:
          "Cum s-ar modifica cnt[i][j] dacă ambele drumuri (sus și stânga) sunt valide și au aceeași lungime?",
        options: [
          "Se adună cnt[i-1][j] + cnt[i][j-1]",
          "Se înmulțesc cnt[i-1][j] * cnt[i][j-1]",
          "Se alege maximul dintre cnt[i-1][j] și cnt[i][j-1]",
          "Se pune cnt[i][j] = cnt[i-1][j] (prioritate sus)",
        ],
        correctIndex: 0,
        explanation:
          "Când ambele direcții oferă lungimea maximă și îndeplinesc condiția de creștere, cnt[i][j] = cnt[i-1][j] + cnt[i][j-1]. Se numără toate drumurile distincte prin oricare dintre vecini.",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question:
          "Cum s-ar modifica algoritmul dacă am permite deplasarea în sus și la stânga (nu doar dreapta și jos)?",
        options: [
          "Nu s-ar putea aplica DP clasic, deoarece ar apărea cicluri și dependența circulară",
          "S-ar adăuga doi vecini suplimentari în recurență",
          "S-ar inversa ordinea de parcurgere",
          "S-ar folosi BFS în loc de DP",
        ],
        correctIndex: 0,
        explanation:
          "Dacă am permite mișcarea în toate direcțiile, graful ar conține cicluri, iar DP-ul clasic (cu ordonare topologică) nu s-ar mai putea aplica. Am avea nevoie de altă abordare, precum drumuri maxime într-un DAG sau relaxări succesive.",
      },
      {
        question:
          "Cum s-ar modifica problema dacă unele celule ar fi blocate (obstacole)?",
        options: [
          "Se inițializează dp[i][j] = 0 pentru celulele blocate și se sare peste ele în parcurgere",
          "Se elimină liniile și coloanele cu obstacole din matrice",
          "Se schimbă recurența la dp[i][j] = dp[i-1][j] + dp[i][j-1]",
          "Nu se poate rezolva cu DP dacă există obstacole",
        ],
        correctIndex: 0,
        explanation:
          "Pentru matrice cu obstacole, fiecare celulă blocată primește dp[i][j] = 0 și nu contribuie la vecinii săi. Restul algoritmului rămâne neschimbat. Complexitatea rămâne O(N × M).",
      },
      {
        question:
          "Cum s-ar putea optimiza memoria algoritmului DP de la O(N×M) la O(M)?",
        options: [
          "Stocând doar linia curentă și linia anterioară în loc de întreaga matrice",
          "Stocând doar o singură valoare la un moment dat",
          "Folosind un vector 1D și suprascriind de la stânga la dreapta",
          "Nu se poate optimiza memoria pentru această problemă",
        ],
        correctIndex: 0,
        explanation:
          "dp[i][j] depinde doar de dp[i-1][j] (linia anterioară) și dp[i][j-1] (aceeași linie, coloana anterioară). Putem reține doar linia curentă și precedenta, reducând memoria la O(M).",
      },
      {
        question:
          "În ce situație am folosi BFS în loc de DP pentru găsirea drumurilor într-o matrice?",
        options: [
          "Când toate muchiile au costuri egale și căutăm drumul minim (nu maxim) între două puncte",
          "Când matricea are valori negative",
          "Când matricea este foarte mare și DP nu încape în memorie",
          "Când căutăm drumul maxim, BFS e mai rapid",
        ],
        correctIndex: 0,
        explanation:
          "BFS (sau Dijkstra) se folosește pentru drumuri de cost minim când costurile muchiilor sunt uniforme sau arbitrare. DP-ul de față găsește drumul maxim respectând o proprietate locală (creștere), nu cost minim.",
      },
      {
        question:
          "Care dintre următoarele probleme are o structură similară cu problema drumurilor crescătoare?",
        options: [
          "Determinarea celei mai lungi subsecvențe comune (LCS)",
          "Găsirea drumului de sumă maximă de la (1,1) la (N,M)",
          "Problema colorării hărților cu 4 culori",
          "Sortarea topologică a unui graf orientat aciclic",
        ],
        correctIndex: 1,
        explanation:
          "Găsirea drumului de sumă maximă (sau cost minim) de la (1,1) la (N,M) cu deplasări dreapta/jos are aceeași structură de dependențe. Diferența e criteriul: sumă vs. lungime maximă cu condiție de creștere.",
      },
      {
        question:
          "Ce se întâmplă cu complexitatea dacă permitem deplasarea în diagonală (dreapta-jos) în plus față de dreapta și jos?",
        options: [
          "Complexitatea rămâne O(N×M), dar recurența include și vecinul (i-1, j-1)",
          "Complexitatea devine O(N²×M²)",
          "Complexitatea rămâne O(N×M) fără nicio modificare",
          "Problema devine NP-completă",
        ],
        correctIndex: 0,
        explanation:
          "Adăugarea diagonalei introduce un singur termen suplimentar în recurență. Numărul de operații pe celulă crește de la 2 la 3, dar complexitatea rămâne O(N×M).",
      },
      {
        question:
          "Cum s-ar schimba problema dacă condiția ar fi A[vecin] ≤ A[i][j] (crescător nescris) în loc de strict crescător?",
        options: [
          "S-ar permite valori egale, iar drumul ar putea fi mai lung; dp[vecin] > 0 rămâne necesar",
          "Nu s-ar schimba nimic, deoarece drumul tot crește",
          "S-ar interzice valorile egale",
          "Ar apărea cicluri infinite în matrice",
        ],
        correctIndex: 0,
        explanation:
          "Cu condiția ≤, putem include și celule cu valori egale. Lungimile drumurilor pot fi mai mari sau egale. Algoritmul rămâne același, cu singura diferență că A[vecin] < A[i][j] devine A[vecin] ≤ A[i][j].",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DP2 — Programare Dinamică II: Subșiruri
// ─────────────────────────────────────────────────────────────────────────────

export const DP2_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question:
          "În problema prefix-sufix, ce reprezintă d(i, j)?",
        options: [
          "Lungimea LCS a subșirurilor S[0..i] și S[0..j]",
          "Lungimea celui mai lung subșir care apare ca prefix începând la i și ca sufix terminând la j în șirul S",
          "Numărul de caractere comune între pozițiile i și j",
          "Distanța de editare între prefixul și sufixul șirului",
        ],
        correctIndex: 1,
        explanation:
          "d(i, j) = lungimea celui mai lung subșir care apare atât ca prefix (începând la poziția i) cât și ca sufix (terminând la poziția j) în șirul S. Dacă S[i] == S[j], atunci d(i, j) = 1 + d(i+1, j-1).",
      },
      {
        question: "Ce reprezintă LCS (Longest Common Subsequence)?",
        options: [
          "Cel mai lung șir de caractere care apare în ambele șiruri, nu neapărat pe poziții consecutive",
          "Cel mai lung șir care apare în ambele șiruri pe poziții consecutive (substring)",
          "Cel mai scurt șir care conține ambele șiruri ca subșiruri",
          "Numărul de caractere identice pe aceleași poziții în două șiruri",
        ],
        correctIndex: 0,
        explanation:
          "LCS = cel mai lung subșir (subsequence) comun a două șiruri. Subșirul nu trebuie să fie format din caractere consecutive, ci doar să păstreze ordinea relativă a caracterelor.",
      },
      {
        question:
          "Care este diferența dintre un subșir (subsequence) și o subsecvență (substring)?",
        options: [
          "Subșirul păstrează ordinea dar nu necesită caractere consecutive; subsecvența necesită caractere consecutive",
          "Subsecvența e mai lungă decât subșirul",
          "Subșirul se aplică doar la numere, subsecvența la caractere",
          "Nu există diferență, sunt sinonime",
        ],
        correctIndex: 0,
        explanation:
          "Un subșir (subsequence) permite omiterea unor caractere, păstrând ordinea relativă. O subsecvență (substring) necesită caractere consecutive. De exemplu, 'AC' este subșir (dar nu substring) al lui 'ABC'.",
      },
      {
        question:
          "Care este valoarea bazei d(i, i) în problema prefix-sufix?",
        options: ["0", "1", "i", "Depinde de S[i]"],
        correctIndex: 1,
        explanation:
          "d(i, i) = 1, deoarece un caracter este întotdeauna un prefix și sufix de lungime 1 pentru el însuși. Orice caracter formează un subșir trivial de lungime 1.",
      },
      {
        question:
          "Care sunt valorile de bază pentru LCS (lcs[i][0] și lcs[0][j])?",
        options: [
          "lcs[i][0] = i, lcs[0][j] = j",
          "lcs[i][0] = 0, lcs[0][j] = 0",
          "lcs[i][0] = 1, lcs[0][j] = 1",
          "lcs[i][0] = A[i], lcs[0][j] = B[j]",
        ],
        correctIndex: 1,
        explanation:
          "LCS al unui șir cu șirul vid este întotdeauna 0. Deci lcs[i][0] = 0 și lcs[0][j] = 0. Acestea sunt cazurile de bază ale recurenței.",
      },
      {
        question:
          "În problema prefix-sufix, ce înseamnă 'prefix începând la i'?",
        options: [
          "Un subșir care începe la poziția i și se termină la sfârșitul șirului S (S[i..n-1])",
          "Un subșir care începe la poziția 0 și se termină la poziția i-1",
          "Un subșir care începe la poziția i și are lungime fixă",
          "Un subșir care începe la poziția 0 indiferent de i",
        ],
        correctIndex: 0,
        explanation:
          "Un 'prefix începând la i' înseamnă subșirul S[i..n-1], adică porțiunea șirului de la poziția i până la capăt. Similar, 'sufix terminând la j' înseamnă S[0..j].",
      },
      {
        question:
          "Ce problemă rezolvă d(i, j) pentru prefix-sufix în șirul S?",
        options: [
          "Găsirea celei mai lungi subsecvențe palindromice din S",
          "Găsirea lungimii maxime a unui subșir care apare și ca prefix și ca sufix în diferite părți ale lui S",
          "Găsirea numărului de apariții ale unui caracter în S",
          "Găsirea distanței de editare între prefix și sufix",
        ],
        correctIndex: 1,
        explanation:
          "Problema prefix-sufix găsește cel mai lung subșir care apare simultan ca prefix (pornind de la o poziție i) și ca sufix (terminând la o poziție j), cu i < j.",
      },
      {
        question:
          "Cum se citește răspunsul LCS dintr-o tabelă LCS completată?",
        options: [
          "Se citește lcs[n][m] (colțul din dreapta-jos)",
          "Se citește lcs[0][0]",
          "Se calculează media pe linii",
          "Se citește maximul din ultima coloană",
        ],
        correctIndex: 0,
        explanation:
          "După completarea tabelei LCS, răspunsul se află în lcs[n][m], unde n = lungimea primului șir, m = lungimea celui de-al doilea. Aceasta reține LCS-ul șirurilor complete.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question:
          "Care este recurența pentru d(i, j) în problema prefix-sufix când S[i] == S[j]?",
        options: [
          "d(i, j) = 1 + d(i+1, j-1)",
          "d(i, j) = max(d(i+1, j), d(i, j-1))",
          "d(i, j) = 0",
          "d(i, j) = d(i+1, j-1)",
        ],
        correctIndex: 0,
        explanation:
          "Când S[i] == S[j], putem extinde subșirul comun: S[i] se potrivește cu S[j] și adăugăm 1 la rezultatul subproblemei interioare d(i+1, j-1).",
      },
      {
        question:
          "Care este recurența pentru d(i, j) când S[i] != S[j]?",
        options: [
          "d(i, j) = 1 + d(i+1, j-1)",
          "d(i, j) = max(d(i+1, j), d(i, j-1))",
          "d(i, j) = 0",
          "d(i, j) = d(i-1, j) + d(i, j-1)",
        ],
        correctIndex: 2,
        explanation:
          "Când S[i] != S[j], nu putem extinde subșirul comun, deoarece prefixul începe cu i, sufixul se termină cu j, și caracterele nu se potrivesc. Prin urmare, d(i, j) = 0.",
      },
      {
        question:
          "Care este recurența LCS când A[i] == B[j]?",
        options: [
          "lcs[i][j] = lcs[i-1][j-1] + 1",
          "lcs[i][j] = max(lcs[i-1][j], lcs[i][j-1])",
          "lcs[i][j] = lcs[i-1][j-1]",
          "lcs[i][j] = lcs[i-1][j] + lcs[i][j-1]",
        ],
        correctIndex: 0,
        explanation:
          "Când A[i] == B[j], putem include acest caracter în LCS. Lungimea devine LCS(A[1..i-1], B[1..j-1]) + 1, adică lcs[i-1][j-1] + 1.",
      },
      {
        question:
          "Care este recurența LCS când A[i] != B[j]?",
        options: [
          "lcs[i][j] = lcs[i-1][j-1]",
          "lcs[i][j] = max(lcs[i-1][j], lcs[i][j-1])",
          "lcs[i][j] = lcs[i-1][j] + lcs[i][j-1]",
          "lcs[i][j] = 0",
        ],
        correctIndex: 1,
        explanation:
          "Când A[i] != B[j], nu putem include ambele caractere. Alegem maximul dintre omiterea lui A[i] (lcs[i-1][j]) și omiterea lui B[j] (lcs[i][j-1]).",
      },
      {
        question:
          "Ce înseamnă d(i, j) = 1 + d(i+1, j-1) în problema prefix-sufix?",
        options: [
          "Că S[i] == S[j] și subșirul comun se extinde spre interior cu un caracter la fiecare capăt",
          "Că se adună 1 la suma indicilor",
          "Că d(i+1, j-1) e întotdeauna 0",
          "Că subșirul are lungimea i - j + 1",
        ],
        correctIndex: 0,
        explanation:
          "d(i, j) = 1 + d(i+1, j-1) înseamnă că am găsit o potrivire: S[i] (caracterul de start al prefixului) == S[j] (caracterul de final al sufixului). Adăugăm 1 la lungime și continuăm cu interiorul (i+1, j-1).",
      },
      {
        question:
          "Ce reprezintă max(lcs[i-1][j], lcs[i][j-1]) în cuvinte?",
        options: [
          "Maximul dintre LCS ignorând caracterul A[i] și LCS ignorând caracterul B[j]",
          "Maximul dintre primele i-1 caractere din A și primele j-1 caractere din B",
          "Suma LCS-urilor parțiale",
          "Minimul dintre cele două opțiuni",
        ],
        correctIndex: 0,
        explanation:
          "max(lcs[i-1][j], lcs[i][j-1]) alege cea mai bună variantă când A[i] != B[j]: fie ignorăm A[i] și lucrăm cu A[1..i-1] și B[1..j], fie ignorăm B[j] și lucrăm cu A[1..i] și B[1..j-1].",
      },
      {
        question:
          "Dacă avem A = 'ABC', B = 'AC', care e valoarea lcs[3][2]?",
        options: ["2", "1", "3", "0"],
        correctIndex: 0,
        explanation:
          "LCS('ABC', 'AC') = 'AC', lungimea este 2. lcs[3][2] = 2: se potrivesc A cu A, apoi C cu C, iar B se omite.",
      },
      {
        question:
          "Dacă S = 'ABBA' și i=0, j=3 (S[0]='A', S[3]='A'), cât este d(0,3)?",
        options: ["4", "2", "1", "3"],
        correctIndex: 1,
        explanation:
          "S[0] = 'A' == S[3] = 'A'. d(0,3) = 1 + d(1,2). S[1]='B' == S[2]='B', deci d(1,2) = 1 + d(2,1) = 1 + 0 = 1. Deci d(0,3) = 1 + 1 = 2.",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question:
          "Care este ordinea corectă de parcurgere pentru d(i, j) în problema prefix-sufix?",
        options: [
          "i crescător (0 → n-1), j crescător (0 → n-1)",
          "i descrescător (n-2 → 0), j crescător (1 → n-1)",
          "j descrescător, i crescător",
          "Pe diagonale principale, de la centru spre margini",
        ],
        correctIndex: 1,
        explanation:
          "d(i, j) depinde de d(i+1, j-1). De aceea i se parcurge descrescător (de la n-2 la 0), iar j crescător (de la 1 la n-1). Astfel, d(i+1, j-1) e calculat înaintea lui d(i, j).",
      },
      {
        question:
          "De ce trebuie ca i să fie parcurs descrescător și j crescător la d(i, j)?",
        options: [
          "Pentru că d(i, j) depinde de d(i+1, j-1), cu i mai mare și j mai mic — trebuie calculate mai întâi",
          "Pentru că așa e mai ușor de implementat",
          "Pentru că datele de intrare sunt în ordine inversă",
          "Pentru că d(i, j) e simetric",
        ],
        correctIndex: 0,
        explanation:
          "Recurența d(i, j) = 1 + d(i+1, j-1) (când S[i]==S[j]) face ca d(i+1, j-1) să fie subproblema. (i+1, j-1) are i mai mare și j mai mic față de (i, j). Deci i se parcurge invers, iar j direct.",
      },
      {
        question:
          "Care este ordinea de parcurgere pentru completarea tabelei LCS?",
        options: [
          "i crescător (1 → n), j crescător (1 → m)",
          "i descrescător, j crescător",
          "Pe diagonale, de sus stânga spre dreapta jos",
          "În orice ordine, LCS nu necesită ordine anume",
        ],
        correctIndex: 0,
        explanation:
          "LCS se calculează cu i de la 1 la n și j de la 1 la m, deoarece lcs[i][j] depinde de lcs[i-1][j-1], lcs[i-1][j] și lcs[i][j-1] — toate cu indici mai mici sau egali.",
      },
      {
        question:
          "Cum se reconstituie LCS-ul efectiv (șirul rezultat) din tabela LCS?",
        options: [
          "Se pornește din lcs[n][m] și se merge în diagonala stânga-sus când A[i]==B[j], altfel se merge în direcția cu valoarea maximă",
          "Se citesc toate diagonalele",
          "Se pornește din lcs[0][0] și se merge la dreapta-jos",
          "Se aleg caracterele comune pe aceleași poziții",
        ],
        correctIndex: 0,
        explanation:
          "Reconstituirea pornește din (n, m). Când A[i]==B[j], adăugăm caracterul și mergem în (i-1, j-1). Altfel, mergem în (i-1, j) sau (i, j-1) — alegem direcția cu valoarea mai mare.",
      },
      {
        question:
          "De ce reconstituirea LCS se face de la sfârșit (din dreapta-jos) și nu de la început?",
        options: [
          "Pentru că lcs[n][m] conține rezultatul final, iar deplasarea înapoi dezvăluie deciziile care au dus la soluția optimă",
          "Pentru că e mai eficient ca timp",
          "Pentru că de la început nu se poate",
          "Pentru că algoritmul funcționează doar invers",
        ],
        correctIndex: 0,
        explanation:
          "lcs[n][m] este soluția problemei complete. Reconstituirea inversă de la (n,m) la (0,0) urmărește alegerile făcute în recurență, dezvăluind LCS-ul caracter cu caracter.",
      },
      {
        question:
          "Dacă d(i, j) = 0 pentru S[i] != S[j], ce se întâmplă în problema prefix-sufix dacă niciun caracter nu se potrivește?",
        options: [
          "Toate d(i, j) = 0, deci răspunsul e 0 (nu există niciun subșir care să fie și prefix și sufix)",
          "d(i, j) = j - i + 1 (se ignoră condiția)",
          "d(i, j) = max(d(i+1, j), d(i, j-1)) ca la LCS",
          "d(i, j) = 1 pentru orice (i, j)",
        ],
        correctIndex: 0,
        explanation:
          "Dacă pentru orice i < j avem S[i] != S[j], atunci d(i, j) = 0 pentru toate perechile. Singurele valori non-zero sunt d(i, i) = 1. Răspunsul e 0, pentru că nu există niciun subșir netrivial.",
      },
      {
        question:
          "Care dintre următoarele tabele se completează corect pentru LCS('AB', 'BA')?",
        options: [
          "lcs[1][1]=1, lcs[2][1]=1, lcs[1][2]=1, lcs[2][2]=1 (LCS='A' sau 'B', lungime 1)",
          "lcs[1][1]=0, lcs[2][1]=1, lcs[1][2]=1, lcs[2][2]=2",
          "lcs[1][1]=0, lcs[2][1]=1, lcs[1][2]=1, lcs[2][2]=0",
          "lcs[1][1]=1, lcs[2][1]=2, lcs[1][2]=2, lcs[2][2]=4",
        ],
        correctIndex: 0,
        explanation:
          "LCS('AB', 'BA') = 1 ('A' sau 'B'). Tabela: lcs[1][1] = 1 (A==B), lcs[2][1] = 1 (max(lcs[1][1], 0)), lcs[1][2] = 1, lcs[2][2] = max(1, 1) = 1.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question:
          "Ce înseamnă substructura optimă la problema LCS?",
        options: [
          "Că LCS al șirurilor A[1..i] și B[1..j] conține LCS-ul subproblemelor (A[1..i-1], B[1..j-1] etc.)",
          "Că LCS e întotdeauna mai lung decât orice substring comun",
          "Că se poate rezolva prin programare liniară",
          "Că există o singură soluție optimă",
        ],
        correctIndex: 0,
        explanation:
          "Substructura optimă: dacă A[i]==B[j], atunci LCS(A[1..i], B[1..j]) = LCS(A[1..i-1], B[1..j-1]) + 1. Altfel, LCS = max(LCS(A[1..i-1], B[1..j]), LCS(A[1..i], B[1..j-1])).",
      },
      {
        question:
          "Cum se demonstrează substructura optimă prin contradicție la LCS?",
        options: [
          "Se presupune că există o soluție mai bună pentru o subproblemă, se arată că ar îmbunătăți soluția globală, contrazicând optimalitatea",
          "Se aplică inducție pe lungimea șirurilor",
          "Se verifică toate cazurile posibile prin forță brută",
          "Se folosește proprietatea de monotonie a LCS",
        ],
        correctIndex: 0,
        explanation:
          "Fie Z = LCS(X, Y). Pentru cazul x_m == y_n, Z_k = x_m = y_n și Z[1..k-1] trebuie să fie LCS(X[1..m-1], Y[1..n-1]). Dacă n-ar fi, am găsi un subșir comun mai lung, care + x_m ar da un LCS mai lung — contradicție.",
      },
      {
        question:
          "De ce LCS are substructură optimă, dar căutarea unui substring comun nu se rezolvă cu aceeași recurență?",
        options: [
          "Pentru că substring-ul necesită caractere consecutive; recurența LCS permite omiterea caracterelor, ceea ce nu e valid pentru substring",
          "Pentru că substring-ul e mai ușor și nu are nevoie de DP",
          "Pentru că substructura optimă nu există pentru substring",
          "Pentru că substring-ul se rezolvă cu aceeași recurență",
        ],
        correctIndex: 0,
        explanation:
          "Substring-ul necesită caractere consecutive. Dacă omitem un caracter din mijloc, ruperea caracterelor consecutive face ca soluția să nu mai fie validă. Substring-ul comun se rezolvă diferit (de obicei cu o matrice de lungimi curente).",
      },
      {
        question:
          "Care este complexitatea algoritmului LCS clasic pentru două șiruri de lungimi n și m?",
        options: ["O(n + m)", "O(n × m)", "O(n² × m)", "O(2^n)"],
        correctIndex: 1,
        explanation:
          "Completarea tabelei LCS de dimensiune (n+1) × (m+1) necesită O(n × m) operații, fiecare celulă făcând O(1) calcule. Aceasta e complexitatea optimă pentru LCS în cazul general.",
      },
      {
        question:
          "De ce LCS pentru mai mult de două șiruri este NP-hard?",
        options: [
          "Pentru că numărul de comparații crește exponențial cu numărul de șiruri",
          "Pentru că nu există substructură optimă pentru trei șiruri",
          "Pentru că orice problemă NP se poate reduce la LCS cu mai multe șiruri",
          "Pentru că memoria necesară e prea mare",
        ],
        correctIndex: 0,
        explanation:
          "Pentru k șiruri, tabela DP ar avea k dimensiuni, fiecare de dimensiune n, deci O(n^k). Pentru k variabil, aceasta devine exponențială. LCS generalizată la k șiruri (k>2) este NP-hard.",
      },
      {
        question:
          "Ce proprietate matematică importantă are funcția LCS?",
        options: [
          "Monotonie: dacă i ≤ i' și j ≤ j', atunci lcs[i][j] ≤ lcs[i'][j']",
          "Simetrie: lcs[i][j] = lcs[j][i] doar dacă șirurile sunt egale",
          "Aditivitate: LCS(A, B) + LCS(B, C) = LCS(A, C)",
          "Idempotență: LCS(A, A) = 2|A|",
        ],
        correctIndex: 0,
        explanation:
          "LCS este monotonă: dacă adăugăm mai multe caractere la șiruri, LCS-ul nu poate scădea. Formal, pentru i ≤ i' și j ≤ j', lcs[i][j] ≤ lcs[i'][j'].",
      },
      {
        question:
          "Cum s-ar putea reduce memoria pentru LCS de la O(n×m) la O(min(n, m))?",
        options: [
          "Stocând doar două rânduri (sau coloane) simultan, deoarece lcs[i][j] depinde doar de rândurile i-1 și i",
          "Stocând doar o singură valoare la un moment dat și recalculând",
          "Folosind un algoritm recursiv fără memoizare",
          "Nu se poate reduce memoria pentru LCS",
        ],
        correctIndex: 0,
        explanation:
          "La calculul LCS, lcs[i][j] depinde doar de lcs[i-1][j-1], lcs[i-1][j] (rândul anterior) și lcs[i][j-1] (același rând). Putem păstra doar rândul curent și precedent, reducând memoria la O(m).",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question:
          "Care este diferența fundamentală între problema prefix-sufix și LCS?",
        options: [
          "Prefix-sufix lucrează pe un singur șir, LCS pe două șiruri; prefix-sufix e un caz particular de LCS pe același șir cu restricții de poziționare",
          "Sunt aceeași problemă, doar notată diferit",
          "LCS e mai ușoară decât prefix-sufix",
          "Prefix-sufix se rezolvă cu BFS, LCS cu DP",
        ],
        correctIndex: 0,
        explanation:
          "Prefix-sufix e o problemă pe un singur șir: găsește cel mai lung subșir care apare și ca prefix (începând la i) și ca sufix (terminând la j). LCS e pe două șiruri distincte.",
      },
      {
        question:
          "Ce relație există între distanța de editare (Levenshtein) și LCS?",
        options: [
          "Distanța de editare = n + m - 2 × LCS(n, m) (când costurile de inserare/ștergere sunt 1)",
          "Distanța de editare = LCS(n, m) / (n + m)",
          "Distanța de editare = n + m - LCS(n, m)",
          "Nu există nicio relație între ele",
        ],
        correctIndex: 0,
        explanation:
          "Distanța Levenshtein (cu inserare/ștergere cost 1, fără substituție) se poate exprima prin LCS: editDist = n + m - 2 × LCS. Caracterele din LCS rămân, restul se inserează sau șterg.",
      },
      {
        question:
          "În ce situație am folosi prefix-sufix în loc de LCS?",
        options: [
          "Când avem un singur șir și căutăm un subșir care îmbină o parte de început și una de sfârșit (ex: problema palindromului)",
          "Când avem două șiruri și vrem potrivire exactă",
          "Când șirurile sunt foarte lungi și memoria e limitată",
          "Când vrem să calculăm distanța de editare",
        ],
        correctIndex: 0,
        explanation:
          "Prefix-sufix e util când căutăm relații între începutul și sfârșitul aceluiași șir. De exemplu, la găsirea celui mai lung palindrom sau la probleme de tip 'wrap-around'.",
      },
      {
        question:
          "Cum s-ar modifica LCS dacă caracterele egale consecutive sunt permise doar dacă sunt pe aceeași poziție relativă?",
        options: [
          "Aceasta e definiția standard a LCS, nu s-ar schimba nimic",
          "S-ar transforma în problema substring-ului comun și s-ar schimba recurența",
          "S-ar elimina posibilitatea de a sări caractere",
          "Ar necesita un al treilea șir de referință",
        ],
        correctIndex: 0,
        explanation:
          "LCS păstrează ordinea relativă: caracterele din subșir apar în aceeași ordine în ambele șiruri. Nu se cere aceeași poziție, ci doar aceeași ordine relativă.",
      },
      {
        question:
          "Cum s-ar modifica recurența LCS pentru a permite potriviri cu 'wildcard' (caracterul '?' care se potrivește cu orice)?",
        options: [
          "Dacă A[i] == '?' sau B[j] == '?' sau A[i] == B[j], atunci lcs[i][j] = lcs[i-1][j-1] + 1; altfel, max(lcs[i-1][j], lcs[i][j-1])",
          "S-ar ignora wildcard-urile complet",
          "S-ar trata wildcard-ul ca nepotrivire mereu",
          "Nu se poate integra wildcard în LCS",
        ],
        correctIndex: 0,
        explanation:
          "Putem extinde LCS adăugând condiția: A[i] == '?' sau B[j] == '?' înseamnă potrivire (wildcard). Recurența devine: dacă A[i]==B[j] sau wildcard, atunci +1, altfel max.",
      },
      {
        question:
          "Ce aplicație practică importantă are LCS în afară de text matching?",
        options: [
          "Bioinformatică — alinierea secvențelor de ADN/ARN/proteine pentru a identifica similarități evolutive",
          "Compresia fișierelor audio",
          "Criptografia cu chei simetrice",
          "Rutarea în rețele de calculatoare",
        ],
        correctIndex: 0,
        explanation:
          "LCS e fundamental în bioinformatică pentru alinierea secvențelor genetice. Similaritățile între secvențe de ADN sau proteine, detectate prin LCS, indică relații evolutive sau funcționale comune.",
      },
      {
        question:
          "Cum diferă complexitatea LCS (polinomială) de cea a problemei substring-ului comun (lineară)?",
        options: [
          "LCS e O(n×m) și permite omiterea caracterelor; substring-ul comun e O(n+m) cu arbori de sufixe sau DP simplu",
          "LCS e mai rapidă decât substring-ul comun",
          "Ambele au aceeași complexitate O(n×m)",
          "Substring-ul comun e NP-complet, LCS e polinomial",
        ],
        correctIndex: 0,
        explanation:
          "Substring-ul comun (caractere consecutive) se poate rezolva în O(n+m) cu arbori de sufixe. LCS e în mod natural O(n×m) și nu poate fi mai rapid în cazul general, deoarece permite omiterea caracterelor.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Greedy — Algoritmi Greedy
// ─────────────────────────────────────────────────────────────────────────────

export const GREEDY_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question:
          "Ce este un algoritm greedy?",
        options: [
          "Un algoritm care alege soluția optimă globală printr-o căutare exhaustivă",
          "Un algoritm care face alegerea local optimă la fiecare pas, sperând că va duce la optimul global",
          "Un algoritm care sortează datele și le procesează aleator",
          "Un algoritm care împarte problema în subprobleme independente",
        ],
        correctIndex: 1,
        explanation:
          "Un algoritm greedy ia decizia care pare cea mai bună în momentul curent (alegere local optimă), fără a reconsidera deciziile anterioare. Nu face backtracking și nu explorează alternative.",
      },
      {
        question:
          "Ce reprezintă 'alegerea local optimă' într-un algoritm greedy?",
        options: [
          "Alegerea care maximizează sau minimizează o funcție doar în contextul pasului curent, ignorând efectele viitoare",
          "Alegerea care garantează optimul global din start",
          "Alegerea care necesită cel mai puțin timp de calcul",
          "Alegerea care sortează toate opțiunile posibile",
        ],
        correctIndex: 0,
        explanation:
          "Alegerea local optimă e decizia care pare optimă în starea curentă, pe baza informațiilor disponibile acum. De exemplu, la rucsacul fracționar, alegem obiectul cu cel mai bun raport valoare/greutate acum.",
      },
      {
        question:
          "Ce înseamnă că un algoritm greedy duce la optim global?",
        options: [
          "Că alegerea local optimă la fiecare pas produce soluția optimă a întregii probleme",
          "Că algoritmul găsește mereu soluția, dar nu neapărat optimă",
          "Că algoritmul optimizează memoria utilizată",
          "Că toate soluțiile locale sunt globale",
        ],
        correctIndex: 0,
        explanation:
          "Un algoritm greedy are succes când alegerea local optimă la fiecare pas duce inevitabil la soluția optimă globală. Nu toate problemele au această proprietate.",
      },
      {
        question:
          "Ce este un exchange argument?",
        options: [
          "O metodă de demonstrare că un algoritm greedy e corect, prin înlocuirea unor elemente dintr-o soluție optimă cu alegerea greedy",
          "Un argument că doi algoritmi sunt echivalenți",
          "O metodă de sortare a elementelor",
          "O tehnică de optimizare a memoriei",
        ],
        correctIndex: 0,
        explanation:
          "Exchange argument e tehnica standard de demonstrare a corectitudinii greedy: presupunem o soluție optimă OPT, arătăm că putem înlocui un element din OPT cu alegerea greedy fără a înrăutăți soluția.",
      },
      {
        question:
          "Când este potrivit să folosim un algoritm greedy?",
        options: [
          "Când problema are proprietatea alegerii greedy și substructură optimă, iar alegerea locală duce la soluția optimă globală",
          "Când problema e NP-completă",
          "Când datele de intrare sunt sortate",
          "Când problema nu poate fi rezolvată cu programare dinamică",
        ],
        correctIndex: 0,
        explanation:
          "Greedy e potrivit când: (1) alegerea local optimă face parte din soluția optimă globală (greedy choice property), și (2) problema are substructură optimă.",
      },
      {
        question:
          "Care dintre următoarele probleme se rezolvă corect cu un algoritm greedy?",
        options: [
          "Selectarea activităților (sortate după timpul de finalizare)",
          "Rucsacul 0/1 (knapsack)",
          "Găsirea celui mai scurt drum într-un graf cu muchii negative",
          "Problema comis-voiajorului (TSP)",
        ],
        correctIndex: 0,
        explanation:
          "Selectarea activităților (Activity Selection) se rezolvă greedy: sortează după timpul de finalizare și alege activități care nu se suprapun. Rucsacul 0/1, TSP și drumurile cu muchii negative nu pot fi rezolvate corect cu greedy.",
      },
      {
        question:
          "Care e diferența principală între un algoritm greedy și unul de programare dinamică?",
        options: [
          "Greedy face o alegere irevocabilă la fiecare pas; DP explorează mai multe opțiuni și alege optimul pe baza subproblemelor",
          "Greedy e mai lent decât DP",
          "DP nu poate rezolva probleme de optimizare",
          "Greedy nu folosește memorie",
        ],
        correctIndex: 0,
        explanation:
          "Greedy alege la fiecare pas cea mai bună opțiune locală și continuă fără a reconsidera. DP împarte problema în subprobleme, le rezolvă pe toate și combină rezultatele.",
      },
      {
        question:
          "Ce este proprietatea alegerii greedy (greedy choice property)?",
        options: [
          "Faptul că alegerea local optimă la un pas face parte din soluția optimă globală",
          "Faptul că toate alegerile locale sunt independente",
          "Faptul că orice alegere duce la optim global",
          "Faptul că algoritmul se termină întotdeauna",
        ],
        correctIndex: 0,
        explanation:
          "Proprietatea alegerii greedy spune că putem construi o soluție optimă globală făcând alegerea local optimă la fiecare pas, fără a reconsidera. Ea trebuie demonstrată (de obicei prin exchange argument).",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question:
          "În problema selectării activităților, după ce criteriu se sortează activitățile?",
        options: [
          "După timpul de început (crescător)",
          "După timpul de finalizare (crescător)",
          "După durată (crescător)",
          "După raportul durată/număr de suprapuneri",
        ],
        correctIndex: 1,
        explanation:
          "Sortarea după timpul de finalizare crescător este criteriul greedy corect. Alegem întotdeauna activitatea care se termină cel mai devreme, lăsând cât mai mult timp pentru activitățile rămase.",
      },
      {
        question:
          "De ce funcționează sortarea după timpul de finalizare la activități?",
        options: [
          "Pentru că activitatea care se termină cel mai devreme lasă maximum de timp pentru restul activităților",
          "Pentru că activitățile sunt deja sortate",
          "Pentru că timpul de finalizare e mai ușor de calculat",
          "Pentru că toate activitățile au aceeași durată",
        ],
        correctIndex: 0,
        explanation:
          "Alegând activitatea cu cel mai devreme finalizare, maximizăm timpul rămas pentru celelalte activități. Orice soluție optimă poate fi transformată (prin exchange argument) să includă această alegere.",
      },
      {
        question:
          "La problema grupării cu lățime k, cum decidem când să deschidem o grupă nouă?",
        options: [
          "Când grupa curentă are deja k elemente",
          "Când următorul element depășește start + k (diferența față de primul element al grupei > k)",
          "Când suma elementelor din grupă depășește k",
          "La fiecare k elemente, automat",
        ],
        correctIndex: 1,
        explanation:
          "Sortăm elementele și menținem start = primul element din grupa curentă. Deschidem o grupă nouă când x[i] > start + k, adică elementul curent nu mai poate fi în aceeași grupă cu primul element.",
      },
      {
        question:
          "Ce se întâmplă la grouping dacă sortăm elementele descrescător în loc de crescător?",
        options: [
          "Algoritmul nu mai funcționează corect, deoarece condiția de grupare nu mai e satisfăcută optim",
          "Funcționează la fel, sortarea nu contează",
          "Se deschid mai puține grupe",
          "Se deschid mai multe grupe, dar sunt mai mici",
        ],
        correctIndex: 0,
        explanation:
          "Sortarea descrescătoare inversează logica: start ar fi cel mai mare element, iar condiția x[i] ≤ start + k e mereu adevărată. Algoritmul n-ar mai deschide grupe noi corect.",
      },
      {
        question:
          "În problema 'minimum number of platforms' (gări), care e strategia greedy?",
        options: [
          "Se sortează sosirile și plecările, se parcurg cronologic și se menține un contor de trenuri în gară",
          "Se sortează trenurile după durata staționării",
          "Se atribuie fiecare tren unui peron liber aleator",
          "Se sortează trenurile după numărul de călători",
        ],
        correctIndex: 0,
        explanation:
          "Se sortează toate evenimentele (sosiri și plecări) în ordine cronologică. La sosire, creștem contorul, la plecare, scădem. Maximul atins de contor e numărul minim de peroane necesare.",
      },
      {
        question:
          "De ce nu funcționează sortarea după durată (cea mai scurtă activitate prima) la Activity Selection?",
        options: [
          "O activitate scurtă poate bloca două activități mai lungi care nu se suprapun între ele, reducând numărul total",
          "Pentru că durata nu se poate calcula",
          "Pentru că activitățile scurte sunt mai puține",
          "Pentru că toate activitățile au aceeași durată",
        ],
        correctIndex: 0,
        explanation:
          "Contraexemplu: activități [1,5], [2,3], [4,6]. 'Durată minimă' alege [2,3], dar blochează [1,5]. Soluția e [2,3] și [4,6] — 2 activități.",
      },
      {
        question:
          "De ce nu funcționează sortarea după timpul de început la Activity Selection?",
        options: [
          "O activitate care începe devreme poate avea o durată mare și bloca multe activități ulterioare",
          "Pentru că timpul de început e irelevant",
          "Pentru că toate activitățile încep la același timp",
          "Pentru că funcționează la fel ca sortarea după finalizare",
        ],
        correctIndex: 0,
        explanation:
          "Contraexemplu: [1,10], [2,3], [4,5]. Sortarea după start alege [1,10], dar blochează tot. Optim e [2,3] și [4,5].",
      },
      {
        question:
          "În problema rucsacului fracționar (Fractional Knapsack), care e criteriul greedy?",
        options: [
          "Raportul valoare/greutate descrescător",
          "Valoarea descrescătoare",
          "Greutatea crescătoare",
          "Raportul greutate/valoare descrescător",
        ],
        correctIndex: 0,
        explanation:
          "La rucsacul fracționar, sortăm obiectele după raportul valoare/greutate (descrescător) și luăm cât putem din fiecare. Deoarece putem lua fracțiuni, această strategie e optimă.",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question:
          "Construiți un contraexemplu pentru strategia 'alege evenimentul cu durata minimă' la Activity Selection.",
        options: [
          "Activități: [1,5], [2,3], [4,6] — durata minimă alege [2,3], apoi nu mai poate alege nimic compatibil, dar soluția optimă e [2,3] și [4,6]",
          "Activități: [1,2], [3,4] — durata minimă nu alege nimic",
          "Activități: [1,10] — durata minimă e optimă",
          "Nu există contraexemplu, funcționează întotdeauna",
        ],
        correctIndex: 0,
        explanation:
          "Pentru [1,5], [2,3], [4,6]: durata minimă alege [2,3] (durata 1). Apoi nici [1,5] nici [4,6] nu sunt compatibile. Rezultat: 1 activitate. Optim: [2,3] și [4,6] = 2 activități.",
      },
      {
        question:
          "La problema parității, avem un vector cu n elemente. Câte swap-uri sunt necesare pentru a plasa elementele pare pe poziții pare și impare pe poziții impare?",
        options: [
          "min(nrParePeImpare, nrImparePePare)",
          "nrParePeImpare + nrImparePePare",
          "max(nrParePeImpare, nrImparePePare)",
          "n / 2",
        ],
        correctIndex: 0,
        explanation:
          "Un swap schimbă un element par aflat pe poziție impară cu un element impar aflat pe poziție pară. Numărul de swap-uri e min(nrParePeImpare, nrImparePePare). Dacă sunt diferite, problema nu are soluție.",
      },
      {
        question:
          "Când funcționează un algoritm greedy (condiții suficiente)?",
        options: [
          "Când problema are proprietatea alegerii greedy și substructură optimă (demonstrabile formal)",
          "Când datele de intrare sunt mici",
          "Când problema nu are soluție cunoscută",
          "Când algoritmul e mai rapid decât alternativele",
        ],
        correctIndex: 0,
        explanation:
          "Greedy funcționează corect când: (1) alegerea local optimă poate fi extinsă la o soluție optimă globală (greedy choice property), și (2) soluția optimă conține soluții optime ale subproblemelor (optimal substructure).",
      },
      {
        question:
          "De ce rucsacul 0/1 NU poate fi rezolvat cu greedy, deși rucsacul fracționar poate?",
        options: [
          "Pentru că la 0/1 obiectele nu pot fi fracționate, iar alegerea locală poate bloca obiecte mai bune în ansamblu",
          "Pentru că 0/1 e mai ușoară decât fracționară",
          "Pentru că greutățile sunt numere întregi",
          "Pentru că valoarea totală e limitată",
        ],
        correctIndex: 0,
        explanation:
          "Contraexemplu: capacitate 50, obiecte: A (50, 100, raport 2), B și C (30, 90, raport 3). Greedy alege A (50, 100) — total 100. Optim: B + C (60, 180). La fracționar, am fi luat din A după B și C.",
      },
      {
        question:
          "La problema 'schimb de monede' cu sistemul 1, 3, 4, care e contraexemplul pentru greedy?",
        options: [
          "Suma 6: greedy alege 4+1+1 (3 monede), dar optim e 3+3 (2 monede)",
          "Suma 10: greedy e optim",
          "Suma 12: greedy alege 4+4+4 (3 monede), optim e 3+3+3+3 (4 monede)",
          "Suma 3: greedy alege 3 (1 monedă)",
        ],
        correctIndex: 0,
        explanation:
          "Pentru suma 6 cu monede 1, 3, 4: greedy alege 4 (rămâne 2), apoi 1 (rămâne 1), apoi 1 — 3 monede. Optim: 3+3 — 2 monede. Sistemul 1, 3, 4 nu e canonic.",
      },
      {
        question:
          "Care dintre următoarele probleme NU poate fi rezolvată corect cu un algoritm greedy?",
        options: [
          "Problema comis-voiajorului (TSP)",
          "Selectarea activităților",
          "Rucsacul fracționar",
          "Plata cu monede în sistem canonic",
        ],
        correctIndex: 0,
        explanation:
          "TSP nu poate fi rezolvată corect cu greedy (deși există euristici). Greedy poate da o soluție, dar nu garantează optimalitatea. Celelalte probleme au algoritmi greedy corecți.",
      },
      {
        question:
          "La problema parității, dacă nrParePeImpare = 3 și nrImparePePare = 3, câte swap-uri sunt necesare?",
        options: ["3", "6", "0", "1"],
        correctIndex: 0,
        explanation:
          "Fiecare swap corectează o pereche (par pe impar, impar pe par). Cu 3 elemente pare pe poziții impare și 3 impare pe poziții pare, avem nevoie de exact 3 swap-uri.",
      },
      {
        question:
          "Care e diferența de abordare între 'minimum platforms' și 'activity selection'?",
        options: [
          "Platforms numără suprapunerile maxime simultane; activity selection maximizează numărul de activități ne-suprapuse",
          "Sunt aceeași problemă",
          "Platforms se rezolvă cu forță brută",
          "Activity selection se rezolvă cu DP, nu greedy",
        ],
        correctIndex: 0,
        explanation:
          "'Minimum platforms' află câte resurse sunt necesare simultan, numărând suprapunerile maxime. 'Activity selection' alege un set maximal de activități care nu se suprapun.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question:
          "Care sunt pașii unui exchange argument pentru demonstrarea corectitudinii greedy?",
        options: [
          "Se presupune o soluție optimă OPT, se identifică primul element diferit de alegerea greedy, se înlocuiește cu alegerea greedy și se arată că soluția nu se înrăutățește",
          "Se sortează datele și se aplică forța brută",
          "Se calculează toate soluțiile posibile și se compară",
          "Se aplică inducție pe numărul de pași fără altă justificare",
        ],
        correctIndex: 0,
        explanation:
          "Exchange argument: (1) Fie OPT o soluție optimă. (2) Fie g alegerea greedy. (3) Dacă g ∉ OPT, găsim primul element x ∈ OPT diferit. (4) Înlocuim x cu g. (5) Arătăm că noua soluție e cel puțin la fel de bună.",
      },
      {
        question:
          "În exchange argument, ce înseamnă 'a arăta că soluția nu se înrăutățește'?",
        options: [
          "Că noua soluție, obținută prin înlocuirea unui element cu alegerea greedy, are o valoare a funcției obiectiv cel puțin egală cu cea originală",
          "Că soluția rămâne aceeași",
          "Că soluția devine identică cu cea greedy",
          "Că soluția e mai proastă dar acceptabilă",
        ],
        correctIndex: 0,
        explanation:
          "Trebuie demonstrat că înlocuirea menține sau îmbunătățește valoarea funcției obiectiv. La activități: înlocuim prima activitate din OPT cu cea greedy (se termină mai devreme), restul rămân valide și cardinalul e același.",
      },
      {
        question:
          "Ce este metoda 'greedy stays ahead' (greedy rămâne în față)?",
        options: [
          "O metodă de demonstrare care arată că, la fiecare pas, soluția greedy e cel puțin la fel de bună ca orice soluție optimă până la acel pas",
          "O metodă de sortare",
          "O variantă a algoritmului greedy care rulează mai repede",
          "O metodă de generare a contraexemplelor",
        ],
        correctIndex: 0,
        explanation:
          "Metoda 'greedy stays ahead' demonstrează optimalitatea arătând că, după fiecare pas, soluția parțială greedy e cel puțin la fel de avansată ca orice soluție optimă până în acel punct.",
      },
      {
        question:
          "Cum se aplică exchange argument pentru problema selectării activităților?",
        options: [
          "Fie OPT soluția optimă, g activitatea greedy. Dacă g ∉ OPT, înlocuim prima activitate din OPT cu g; g se termină mai devreme, restul activităților rămân valide",
          "Se demonstrează prin inducție pe numărul de activități",
          "Se sortează activitățile după start și se iau consecutiv",
          "Nu se poate demonstra formal",
        ],
        correctIndex: 0,
        explanation:
          "Fie OPT optim, g alegerea greedy. Dacă g ∉ OPT, fie a prima activitate din OPT. finish(g) ≤ finish(a). g nu se suprapune cu activitățile care încep după finish(a). Înlocuim a cu g, soluție la fel de bună care include g.",
      },
      {
        question:
          "Cum diferă exchange argument de demonstrația prin inducție?",
        options: [
          "Exchange argument transformă o soluție optimă existentă; inducția construiește soluția greedy pas cu pas pe baza ipotezei inductive",
          "Sunt același lucru",
          "Inducția e mai slabă decât exchange argument",
          "Exchange argument nu e o demonstrație validă",
        ],
        correctIndex: 0,
        explanation:
          "Exchange argument: avem OPT, o transformăm în soluția greedy fără a pierde optimalitatea. Inducția: demonstrăm că soluția greedy e corectă presupunând că e corectă pentru subproblema rămasă.",
      },
      {
        question:
          "În exchange argument, de ce e suficient să arătăm că prima alegere greedy poate fi inclusă într-un optim?",
        options: [
          "Pentru că dacă prima alegere e în optim, problema se reduce la aceeași problemă pe un input mai mic, iar prin inducție toate alegerile greedy sunt în optim",
          "Pentru că prima alegere e cea mai importantă",
          "Pentru că celelalte alegeri nu contează",
          "Pentru că orice soluție care include prima alegere e optimă",
        ],
        correctIndex: 0,
        explanation:
          "După ce arătăm că există un optim care include prima alegere greedy, problema se reduce la aceeași problemă pe inputul rămas. Prin inducție pe dimensiunea problemei, toate alegerile greedy sunt incluse în optim.",
      },
      {
        question:
          "Ce rol joacă optimal substructure în demonstrația greedy?",
        options: [
          "Asigură că după alegerea greedy, subproblema rămasă poate fi rezolvată independent și optim cu greedy",
          "Asigură că alegerea greedy e corectă",
          "Nu e necesară pentru greedy",
          "Asigură că toate subproblemele sunt independente",
        ],
        correctIndex: 0,
        explanation:
          "După alegerea greedy, rămâne o subproblemă mai mică. Optimal substructure garantează că soluția optimă a subproblemei, combinată cu alegerea greedy, dă soluția optimă globală.",
      },
      {
        question:
          "Care e structura completă a demonstrației pentru un algoritm greedy?",
        options: [
          "(1) Greedy choice property (exchange argument), (2) Optimal substructure (inducție)",
          "(1) Demonstrarea complexității, (2) Demonstrarea corectitudinii",
          "(1) Implementarea, (2) Testarea pe exemple",
          "(1) Sortarea datelor, (2) Aplicarea alegerii",
        ],
        correctIndex: 0,
        explanation:
          "Demonstrația completă: (1) Proprietatea alegerii greedy — există un optim care include alegerea locală (exchange argument). (2) Substructura optimă — după alegere, problema se reduce la o subproblemă de același tip.",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question:
          "Când alegem între greedy și programare dinamică pentru o problemă de optimizare?",
        options: [
          "Dacă problema are proprietatea alegerii greedy, greedy e mai eficient (O(n log n)); altfel, încercăm DP (polinomial) sau altă metodă",
          "Mereu alegem greedy pentru că e mai rapid",
          "Mereu alegem DP pentru că e mai corect",
          "Alegerea depinde de dimensiunea datelor de intrare",
        ],
        correctIndex: 0,
        explanation:
          "Greedy e preferat când proprietatea alegerii greedy și substructura optimă sunt demonstrate. DP e mai general, dar mai costisitor ca timp și memorie.",
      },
      {
        question:
          "Ce este un matroid și ce legătură are cu algoritmii greedy?",
        options: [
          "Un matroid (S, I) e o structură pe care greedy găsește întotdeauna soluția optimă pentru problema ponderată",
          "Un matroid e un tip de graf pe care greedy nu funcționează",
          "Un matroid e o matrice utilizată în DP",
          "Un matroid e un contraexemplu pentru greedy",
        ],
        correctIndex: 0,
        explanation:
          "Un matroid e o structură (S, I) cu proprietățile: (1) Ø ∈ I, (2) A ⊆ B ∈ I ⇒ A ∈ I (ereditate), (3) A, B ∈ I, |A| < |B| ⇒ ∃ x ∈ B\\A a.î. A ∪ {x} ∈ I (schimb). Greedy pe matroizi (sortare, adăugare dacă menține independența) e corect.",
      },
      {
        question:
          "Ce proprietate a matroizilor face ca algoritmul greedy să fie corect?",
        options: [
          "Proprietatea de schimb (exchange): permite înlocuirea și demonstrarea optimalității prin exchange argument",
          "Proprietatea de ereditate: submulțimile mulțimilor independente sunt independente",
          "Proprietatea de comutativitate",
          "Proprietatea de distributivitate",
        ],
        correctIndex: 0,
        explanation:
          "Proprietatea de schimb (exchange) e esențială: dacă avem o mulțime independentă mai mică și una mai mare, putem adăuga un element din cea mare la cea mică păstrând independența. Aceasta permite exchange argument.",
      },
      {
        question:
          "Care dintre următoarele structuri este un matroid?",
        options: [
          "Matroidul grafic: muchiile unui graf, unde o mulțime e independentă dacă nu conține cicluri (formează o pădure)",
          "Orice submulțime a unui graf",
          "Mulțimea tuturor drumurilor dintr-un graf",
          "Mulțimea nodurilor unui graf"
        ],
        correctIndex: 0,
        explanation:
          "Matroidul grafic (graphic matroid) e exemplul clasic: mulțimea S = muchiile unui graf, mulțimile independente = pădurile (subgrafuri fără cicluri). Algoritmul lui Kruskal (MST) e un greedy pe acest matroid.",
      },
      {
        question:
          "Ce condiție trebuie să îndeplinească o problemă pentru ca greedy să fie corect (în afara matroizilor)?",
        options: [
          "Problema trebuie să aibă substructură optimă și proprietatea alegerii greedy (nu orice problemă cu substructură optimă e greedy-corectă)",
          "Doar substructura optimă e suficientă",
          "Doar proprietatea alegerii greedy e suficientă",
          "Greedy e corect doar pe matroizi",
        ],
        correctIndex: 0,
        explanation:
          "Ambele proprietăți sunt necesare. Substructura optimă apare și în DP, dar greedy necesită și proprietatea alegerii greedy. Nu orice problemă cu substructură optimă (ex: rucsac 0/1) poate fi rezolvată greedy.",
      },
      {
        question:
          "Când NU funcționează greedy chiar dacă problema pare să aibă substructură optimă?",
        options: [
          "Când alegerea local optimă poate duce la o subproblemă care nu mai poate fi rezolvată optim (ex: rucsac 0/1, cu monede non-canonice)",
          "Când datele sunt prea mari",
          "Când există mai multe soluții optime",
          "Greedy funcționează întotdeauna când există substructură optimă",
        ],
        correctIndex: 0,
        explanation:
          "Rucsacul 0/1 are substructură optimă (se rezolvă cu DP), dar alegerea greedy (cel mai bun raport) nu garantează optimul global. Proprietatea alegerii greedy e cea care lipsește.",
      },
      {
        question:
          "Algoritmul lui Dijkstra pentru drumuri minime e un algoritm greedy?",
        options: [
          "Da, alege nodul cu distanța minimă curentă (alegere greedy) și funcționează corect doar pentru muchii cu costuri nenegative",
          "Nu, e un algoritm de programare dinamică",
          "Da, dar nu e considerat greedy în literatură",
          "Nu, e un algoritm de căutare binară",
        ],
        correctIndex: 0,
        explanation:
          "Dijkstra e un algoritm greedy: la fiecare pas alege nodul nedeplorat cu distanța minimă (alegere greedy locală). E corect doar pentru grafuri cu muchii nenegative, unde proprietatea alegerii greedy e satisfăcută.",
      },
      {
        question:
          "Care e relația dintre matroizi și algoritmul lui Kruskal pentru MST?",
        options: [
          "Kruskal e greedy pe matroidul grafic: sortează muchiile, adaugă dacă nu creează ciclu — exact criteriul de independență al matroidului",
          "Kruskal e un algoritm DP, nu greedy",
          "Kruskal nu are legătură cu matroizii",
          "Kruskal e un contraexemplu pentru greedy pe matroizi",
        ],
        correctIndex: 0,
        explanation:
          "Kruskal sortează muchiile crescător după cost și adaugă o muchie dacă nu formează ciclu cu cele deja alese. Aceasta e exact strategia greedy pe matroidul grafic, unde independent = fără cicluri.",
      },
    ],
  },
];
