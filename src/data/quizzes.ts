import type { QuizQuestion } from "@/types";

export const QUIZZES: Record<string, QuizQuestion[]> = {
  kmp: [
    {
      question:
        'Care este valoarea f[4] pentru pattern-ul "ABABACABA" (indexat de la 0)?',
      options: ["0", "1", "3", "2"],
      correctIndex: 2,
      explanation:
        'f[4]: pattern[0..4] = "ABABA". Cel mai lung prefix propriu care e și sufix = "ABA" (lungime 3). Deci f[4] = 3.',
    },
    {
      question:
        "La o nepotrivire KMP în starea (i=5, k=3) cu f[2]=1, care este noua stare?",
      options: ["(i=7, k=1)", "(i=6, k=0)", "(i=7, k=0)", "(i=6, k=1)"],
      correctIndex: 0,
      explanation:
        "La nepotrivire cu k=3: f[k-1] = f[2] = 1. Noul i = i + k - f[k-1] = 5 + 3 - 1 = 7. Noul k = f[2] = 1. Starea nouă: (7, 1).",
    },
    {
      question: "Care este complexitatea totală a algoritmului KMP?",
      options: ["O(n·m)", "O(n + m)", "O(n log m)", "O(m²)"],
      correctIndex: 1,
      explanation:
        "KMP are două faze: O(m) pentru calculul funcției eșec și O(n) pentru căutare. Total: O(n + m), liniar în lungimile textului și patternului.",
    },
    {
      question:
        'Ce se întâmplă la KMP când k=0 și text[i] ≠ pattern[0] (nepotrivire cu 0 caractere potrivite)?',
      options: [
        "i rămâne, k devine f[0]",
        "i crește cu 1, k rămâne 0",
        "i rămâne, k devine 0",
        "i crește cu m, k devine 0",
      ],
      correctIndex: 1,
      explanation:
        "Dacă k=0 la nepotrivire, nu există bordură de exploatat. Se avansează pur și simplu: i++ și k rămâne 0. Este singurul caz când algoritmul avansează cu 1 pas.",
    },
  ],

  bm: [
    {
      question:
        'Pentru pattern "XAXAB", dacă caracterul rău la nepotrivire este "A" la poziția k=3 din pattern (indexat de la 0), ce deplasament dă regula bad character?',
      options: ["1", "2", "3", "0"],
      correctIndex: 1,
      explanation:
        "Ultima apariție a 'A' în pattern este la poziția 2. Deplasament bad char = k - lastOcc('A') = 3 - 2 = 1. Dar BM compară de la dreapta, k=3 înseamnă s-au potrivit 2 caractere din dreapta. Deplasament = 3 - 2 = 1... hmm, recalcul: lastOcc('A')=2 (poz. 2 și 0). Cele mai din dreapta = 2. Shift = k - 2 = 3 - 2 = 1. Avansăm cu max(1, shift_bc, shift_gs).",
    },
    {
      question: "Boyer-Moore compară caracterele patternului cu textul în ce ordine?",
      options: [
        "De la stânga la dreapta",
        "De la dreapta la stânga",
        "Alternând stânga-dreapta",
        "În ordine aleatorie",
      ],
      correctIndex: 1,
      explanation:
        "Boyer-Moore compară de la dreapta la stânga (de la ultimul caracter al patternului spre primul). Aceasta permite salturi mai mari atunci când apar nepotriviri.",
    },
    {
      question: "Ce returnează Rabin-Karp când hash-ul ferestrei coincide cu hash-ul patternului?",
      options: [
        "Imediat raportează o potrivire",
        "Verifică caracter cu caracter (poate fi false positive)",
        "Sare la următoarea fereastră",
        "Recalculează hash-ul de la zero",
      ],
      correctIndex: 1,
      explanation:
        "Rabin-Karp verifică caracter cu caracter după o coliziune de hash, pentru a elimina false positives. Coliziunile de hash nu implică potrivire reală.",
    },
    {
      question: "Care e complexitatea Boyer-Moore în cazul cel mai rău?",
      options: ["O(n/m)", "O(n + m)", "O(n·m)", "O(n log m)"],
      correctIndex: 2,
      explanation:
        "În cazul cel mai rău (ex. text 'AAAA...A' și pattern 'AAAB'), BM face O(n·m) comparații. În cazul mediu pe text random, BM este subliniar: O(n/m).",
    },
  ],

  dp1: [
    {
      question:
        "Într-un DP pentru drumuri crescătoare în matrice N×M, care este ordinea de parcurgere?",
      options: [
        "De la (N,M) la (1,1)",
        "De la (1,1) la (N,M), linie cu linie",
        "Pe diagonale",
        "Nu contează ordinea",
      ],
      correctIndex: 1,
      explanation:
        "dp[i][j] depinde de dp[i-1][j] (sus) și dp[i][j-1] (stânga). Deci trebuie să calculăm linie cu linie, de la stânga la dreapta, pornind din (1,1).",
    },
    {
      question:
        "Dacă dp[i][j] = 0, ce înseamnă în contextul drumurilor crescătoare în matrice?",
      options: [
        "Celula (i,j) nu a fost vizitată încă",
        "Nu există niciun drum crescător valid de la (1,1) la (i,j)",
        "A[i][j] = 0",
        "Celula (i,j) este pe marginea matricei",
      ],
      correctIndex: 1,
      explanation:
        "dp[i][j] = 0 înseamnă că nu există niciun drum crescător valid (respectând condiția A[i-1][j] < A[i][j] sau A[i][j-1] < A[i][j]) de la (1,1) la (i,j).",
    },
    {
      question: "Ce condiție trebuie să satisfacă dp[i][j] pentru a fi i+j-1 (și nu 0)?",
      options: [
        "A[i][j] > 0",
        "Cel puțin un vecin valid (sus sau stânga) cu valoare mai mică",
        "A[i][j] > A[i-1][j] AND A[i][j] > A[i][j-1]",
        "dp[i-1][j] > 0 AND dp[i][j-1] > 0",
      ],
      correctIndex: 1,
      explanation:
        "dp[i][j] = i+j-1 dacă (A[i-1][j] < A[i][j] ȘI dp[i-1][j] > 0) SAU (A[i][j-1] < A[i][j] ȘI dp[i][j-1] > 0). Cel puțin un vecin trebuie să contribuie valid.",
    },
    {
      question:
        "Pentru a număra drumurile optime, ce se calculează în plus față de dp[i][j]?",
      options: [
        "Un vector paths[] care numără câte drumuri ajung la fiecare celulă cu lungimea maximă",
        "Matricea A inversată",
        "Funcția eșec KMP aplicată pe linii",
        "Numărul de zerouri din dp[][]",
      ],
      correctIndex: 0,
      explanation:
        "Adăugăm cnt[i][j] = numărul de drumuri distincte care ajung la (i,j) cu lungimea dp[i][j]. Se sumează cnt[i-1][j] și cnt[i][j-1] dacă ambele contribuie, sau doar unul dacă numai acela e valid.",
    },
  ],

  dp2: [
    {
      question:
        "În problema prefix-sufix: ce reprezintă d(i, j)?",
      options: [
        "Lungimea LCS a subșirurilor S[0..i] și S[0..j]",
        "Lungimea subșirului comun care apare ca prefix începând la i și sufix terminând la j",
        "Numărul de caractere comune între S[i] și S[j]",
        "Lungimea palindromului centrat la (i+j)/2",
      ],
      correctIndex: 1,
      explanation:
        "d(i, j) = lungimea celui mai lung subșir care apare atât ca prefix (începând la indexul i) cât și ca sufix (terminând la indexul j) în S. Dacă S[i]==S[j], atunci d(i,j) = 1 + d(i+1, j-1).",
    },
    {
      question: "Care este recurența pentru LCS când A[i] ≠ B[j]?",
      options: [
        "lcs[i][j] = lcs[i-1][j-1]",
        "lcs[i][j] = max(lcs[i-1][j], lcs[i][j-1])",
        "lcs[i][j] = lcs[i-1][j] + lcs[i][j-1]",
        "lcs[i][j] = 0",
      ],
      correctIndex: 1,
      explanation:
        "Când A[i] ≠ B[j], cel mai lung subșir comun al lui A[1..i] și B[1..j] este maximul dintre LCS(A[1..i-1], B[1..j]) și LCS(A[1..i], B[1..j-1]).",
    },
    {
      question: "Care este ordinea de parcurgere pentru d(i, j) în problema prefix-sufix?",
      options: [
        "i crescător, j crescător",
        "i descrescător (de la n-2 la 0), j crescător",
        "j descrescător, i crescător",
        "Pe diagonale principale",
      ],
      correctIndex: 1,
      explanation:
        "d(i,j) depinde de d(i+1, j-1), deci i trebuie calculat în ordine descrescătoare (de la n-2 la 0), iar j în ordine crescătoare (de la 1 la n-1).",
    },
    {
      question: "Ce înseamnă substructura optimă în DP?",
      options: [
        "Că soluția optimă a problemei mari conține soluțiile optime ale subproblemelor",
        "Că algoritmul rulează în timp polinomial",
        "Că toate subproblemele au aceeași dimensiune",
        "Că recursivitatea are adâncime logaritmică",
      ],
      correctIndex: 0,
      explanation:
        "Substructura optimă: soluția optimă a problemei mari conține soluțiile optime ale subproblemelor. Aceasta permite calculul bottom-up. Se demonstrează prin contradicție: dacă o subproblemă ar putea fi rezolvată mai bine, am îmbunătăți și soluția globală.",
    },
  ],

  greedy: [
    {
      question:
        "De ce strategia 'alege activitatea cu durata minimă' este greșită pentru activity selection?",
      options: [
        "Nu sortează activitățile",
        "Poate alege o activitate care blochează două activități mai scurte non-suprapuse",
        "Nu funcționează pentru intervale continue",
        "Are complexitate O(n²)",
      ],
      correctIndex: 1,
      explanation:
        "Exemplu contraexemplu: activități [1,5], [2,3], [4,6]. 'Durată minimă' alege [2,3] (2 unit.), dar blochează [1,5]. Strategia corectă (cel mai devreme finish) dă [2,3] și [4,6] = 2 activități, ceea ce e optim.",
    },
    {
      question: "Care este tehnica standard de demonstrație pentru corectitudinea greedy?",
      options: [
        "Inducție matematică",
        "Exchange argument (argument de schimb)",
        "Reducere la problemă NP-completă",
        "Programare dinamică",
      ],
      correctIndex: 1,
      explanation:
        "Exchange argument: presupui că există o soluție optimă OPT fără alegerea greedy, apoi arăți că poți înlocui un element din OPT cu alegerea greedy fără a înrăutăți soluția. Deci există mereu un optim care folosește alegerea greedy.",
    },
    {
      question:
        "La problema parității: avem 2 elemente pare pe poziții impare și 3 elemente impare pe poziții pare. Ce returnezi?",
      options: ["2", "3", "-1", "5"],
      correctIndex: 2,
      explanation:
        "nrPare = 2, nrImpare = 3. Deoarece 2 ≠ 3, răspunsul este -1 (imposibil). Fiecare swap schimbă un element din fiecare categorie, deci trebuie să fie egale.",
    },
    {
      question: "La problema grupării cu lățime k, cum decizi când să deschizi o grupă nouă?",
      options: [
        "Când grupa curentă are deja k elemente",
        "Când următorul element depășește start + k",
        "Când suma elementelor din grupă > k",
        "La fiecare k elemente, automat",
      ],
      correctIndex: 1,
      explanation:
        "Sortăm elementele și menținem start-ul grupei curente. Deschidem grupă nouă când x[i] > start + k (elementul curent nu mai poate fi în grupă cu cel mai mic element al grupei curente).",
    },
  ],

  bkt: [
    {
      question: "Ce este 'pruning' în contextul backtracking-ului?",
      options: [
        "Sortarea candidaților înainte de explorare",
        "Tăierea ramurilor care nu pot duce la soluții valide",
        "Memoizarea rezultatelor subproblemelor",
        "Transformarea problemei în una de grafuri",
      ],
      correctIndex: 1,
      explanation:
        "Pruning = tăierea ramurilor din arborele de căutare care nu pot duce la soluții valide. Verifici validitatea soluției parțiale înainte de recursie, economisind timp.",
    },
    {
      question: "O problemă de decizie este în NP dacă:",
      options: [
        "Se poate rezolva în timp polinomial",
        "O soluție candidat poate fi verificată în timp polinomial",
        "Se poate reduce la SAT în timp polinomial",
        "Are un algoritm greedy corect",
      ],
      correctIndex: 1,
      explanation:
        "NP = clasa problemelor pentru care o soluție dată poate fi VERIFICATĂ în timp polinomial. Nu înseamnă că GĂSIREA soluției e polinomială (asta ar fi P). Toate problemele din P sunt și în NP.",
    },
    {
      question: "Diferența între Branch and Bound și Backtracking simplu este:",
      options: [
        "B&B funcționează doar pe grafuri",
        "B&B menține un bound superior și taie ramuri sub-optimale",
        "B&B explorează mai puțini candidați decât BKT",
        "B&B nu folosește recursivitate",
      ],
      correctIndex: 1,
      explanation:
        "Branch and Bound e o variantă a BKT pentru probleme de optimizare. Menține un bound superior (estimat sau exact) pentru fiecare sub-problemă și taie ramura dacă bound-ul e mai rău decât cel mai bun găsit. Nu taie ramuri invalide (ca BKT), ci ramuri sub-optimale.",
    },
    {
      question: "Pentru a arăta că Problema Clică este NP-completă, ce trebuie demonstrat?",
      options: [
        "Doar că verificarea e polinomială",
        "Că verificarea e polinomială (Clică ∈ NP) și că SAT se reduce polinomial la Clică",
        "Că Clică se rezolvă greedy",
        "Că Clică are substructură optimă",
      ],
      correctIndex: 1,
      explanation:
        "Pentru NP-completitudine: (1) arăți că Clică ∈ NP (dat un set S, verifici în O(k²) că e clică de dimensiune k), și (2) reduci o problemă NP-completă cunoscută (e.g., 3-SAT) la Clică în timp polinomial.",
    },
  ],

  analiza: [
    {
      question:
        "Ce reprezintă Θ(g(n)) în notația asimptotică?",
      options: [
        "Limită superioară (O mare)",
        "Limită inferioară (Omega mare)",
        "Limită strânsă (atât superioară cât și inferioară)",
        "Limită medie (average-case)",
      ],
      correctIndex: 2,
      explanation:
        "Θ(g(n)) = {f(n) | ∃ c₁, c₂, n₀ > 0 a.î. 0 ≤ c₁·g(n) ≤ f(n) ≤ c₂·g(n), ∀ n ≥ n₀}. Spunem că f(n) = Θ(g(n)) dacă f(n) = O(g(n)) și f(n) = Ω(g(n)) simultan.",
    },
    {
      question:
        "Care sunt cele 3 proprietăți ale unui invariant de buclă?",
      options: [
        "Corectitudine, Eficiență, Terminare",
        "Inițializare, Menținere, Terminare",
        "Intrare, Ieșire, Eroare",
        "Definire, Calcul, Verificare",
      ],
      correctIndex: 1,
      explanation:
        "Un invariant de buclă trebuie să satisfacă: (1) Inițializare — e adevărat înainte de prima iterație, (2) Menținere — dacă e adevărat înaintea unei iterații, rămâne adevărat și după, (3) Terminare — la terminarea buclei, oferă o proprietate utilă care demonstrează corectitudinea.",
    },
    {
      question:
        "Pentru Merge Sort, recurența T(n) = 2T(n/2) + Θ(n) are soluția:",
      options: [
        "Θ(n)",
        "Θ(n²)",
        "Θ(n log n)",
        "Θ(log n)",
      ],
      correctIndex: 2,
      explanation:
        "Arborele de recurență: log₂ n + 1 niveluri, fiecare cu cost cn. Total = cn(log₂ n + 1) = Θ(n log n).",
    },
    {
      question:
        "Ce înseamnă P ∝ Q (P se reduce polinomial la Q)?",
      options: [
        "P este mai greu decât Q",
        "P și Q sunt la fel de grele",
        "P nu este mai greu decât Q (există o transformare polinomială de la P la Q)",
        "P și Q sunt ambele NP-complete",
      ],
      correctIndex: 2,
      explanation:
        "P ∝ Q înseamnă că P se reduce polinomial la Q: putem transforma o instanță a lui P într-o instanță a lui Q în timp polinomial, apela algoritmul pentru Q, și transforma răspunsul înapoi. Astfel, P nu e mai greu decât Q (Q poate fi folosit să rezolve P).",
    },
  ],

  nedet: [
    {
      question:
        "Ce efect are instrucțiunea 'choose x from A' într-un algoritm nedeterminist?",
      options: [
        "Alege o valoare aleatoare din A și continuă pe o singură cale",
        "Iterează prin toate valorile din A secvențial",
        "Creează câte o copie a algoritmului pentru fiecare valoare din A, toate rulând simultan",
        "Sortează A și alege prima valoare",
      ],
      correctIndex: 2,
      explanation:
        "'choose x from A' creează o copie a algoritmului pentru fiecare valoare din A, toate rulând paralel și independent. Aceasta este sursa nedeterminismului.",
    },
    {
      question:
        "Când se execută 'success' într-un algoritm nedeterminist, ce se întâmplă?",
      options: [
        "Se termină doar calea curentă de execuție",
        "Se termină cu succes calea curentă și toate celelalte căi de execuție",
        "Se reia algoritmul de la început",
        "Se afișează un mesaj și se continuă execuția",
      ],
      correctIndex: 1,
      explanation:
        "'success' termină cu succes calea curentă și oprește întregul algoritm (toate celelalte căi sunt abandonate). 'failure' termină doar calea curentă, celelalte continuând.",
    },
    {
      question:
        "Un algoritm nedeterminist pentru o problemă NP are ce structură?",
      options: [
        "O singură fază: rezolvare directă",
        "Fază de ghicire (nondeterministă) + fază de verificare (deterministă)",
        "Fază de sortare + fază de căutare",
        "Fază de randomizare + fază de backtracking",
      ],
      correctIndex: 1,
      explanation:
        "Algoritmii nedeterminiști pentru probleme NP au două faze: (1) ghicirea unei soluții candidate (nondeterministă, folosind 'choose'), și (2) verificarea corectitudinii soluției (deterministă, în timp polinomial).",
    },
    {
      question:
        "Conform teoremei de determinizare, dacă un algoritm nedeterminist A rulează în TA(n), atunci algoritmul determinist echivalent B rulează în:",
      options: [
        "O(TA(n))",
        "O(TA(n)²)",
        "O(2^TA(n))",
        "O(TA(n) · log TA(n))",
      ],
      correctIndex: 2,
      explanation:
        "Teorema spune că T_B(n) = O(2^{T_A(n)}). Algoritmul determinist trebuie să simuleze toate căile de execuție posibile, al căror număr crește exponențial cu timpul algoritmului nedeterminist.",
    },
  ],

  prob: [
    {
      question:
        "Care este diferența principală între un algoritm Las Vegas și unul Monte Carlo?",
      options: [
        "Las Vegas e mai rapid decât Monte Carlo",
        "Las Vegas garantează corectitudinea, Monte Carlo garantează timpul de execuție",
        "Monte Carlo garantează corectitudinea, Las Vegas garantează timpul",
        "Nu există diferență, sunt același lucru",
      ],
      correctIndex: 1,
      explanation:
        "Las Vegas: întotdeauna corect, timp variabil (ex: Randomized QuickSort). Monte Carlo: timp garantat, corect cu probabilitate mare (ex: Miller-Rabin).",
    },
    {
      question:
        "În problema Hiring, care este numărul așteptat de angajări pentru n candidați în ordine aleatoare?",
      options: [
        "n (toți candidații)",
        "n/2",
        "H_n ≈ ln n (seria armonică)",
        "1 (doar primul)",
      ],
      correctIndex: 2,
      explanation:
        "E[X] = Σ_{i=1}^{n} 1/i = H_n ≈ ln n + γ. Folosind variabile indicator X_i = I{candidatul i e angajat} cu E[X_i] = 1/i (pentru că e cel mai bun dintre primii i doar cu probabilitatea 1/i).",
    },
    {
      question:
        "Ce este o variabilă indicator (indicator random variable)?",
      options: [
        "O variabilă care indică tipul de date al unei valori",
        "I{A} = 1 dacă evenimentul A are loc, 0 altfel; E[I{A}] = Pr{A}",
        "O variabilă care ia valoarea medie a unui set de date",
        "O variabilă care indică sfârșitul execuției",
      ],
      correctIndex: 1,
      explanation:
        "O variabilă indicator I{A} = 1 dacă A are loc, 0 altfel. Proprietatea cheie: E[I{A}] = Pr{A}. Aceasta simplifică dramatic calculul valorilor așteptate prin descompunere.",
    },
    {
      question:
        "În algoritmul Monte Carlo α-Bounded Random Search, ce se întâmplă dacă toate cele α alegeri sunt '0'?",
      options: [
        "Se reîncepe căutarea cu α dublat",
        "Algoritmul returnează 'failed', deși există un 1 în array",
        "Algoritmul garantează că nu există 1 în array",
        "Se face o alegere suplimentară automat",
      ],
      correctIndex: 1,
      explanation:
        "Algoritmul poate eșua returnând 'failed' chiar dacă există 1 în array (Monte Carlo — riscă corectitudinea). Probabilitatea de eșec e 1/2^α, pentru că fiecare alegere independentă are șansa 1/2 de a nimeri un 0.",
    },
  ],

  regex: [
    {
      question:
        'Care șiruri sunt potrivite de expresia regulată "ab*c"?',
      options: [
        '"ac", "abc", "abbc", "abbbc" (a, apoi 0+ b-uri, apoi c)',
        '"abc" doar',
        '"ab", "c"',
        '"ac" doar',
      ],
      correctIndex: 0,
      explanation:
        '"ab*c" = a, urmat de 0 sau mai multe b-uri, urmat de c. Deci potrivește "ac" (0 b-uri), "abc" (1 b), "abbc" (2 b), "abbbc" (3 b), etc.',
    },
    {
      question:
        "Care este complexitatea potrivirii unui regex fără backreferences pe un șir de lungime n?",
      options: [
        "O(n²)",
        "O(2ⁿ)",
        "O(n) cu DFA",
        "O(log n)",
      ],
      correctIndex: 2,
      explanation:
        "Orice regex fără backreferences poate fi transformat într-un NFA (construcția Thompson) și apoi într-un DFA. Simularea DFA-ului pe un șir de lungime n necesită O(n) pași (câte o tranziție per caracter).",
    },
    {
      question:
        "În construcția Thompson, cum se implementează operatorul 'R|S' (alternare)?",
      options: [
        "Se rulează R, apoi S secvențial",
        "Se creează un NFA cu două căi paralele: una pentru R, una pentru S, conectate prin ε-tranziții",
        "Se alege aleator între R și S",
        "Se aplică R peste rezultatul lui S",
      ],
      correctIndex: 1,
      explanation:
        "Construcția Thompson pentru R|S: creează un nod start cu două ε-tranziții — una către NFA(R) și una către NFA(S). Ambele NFA-uri au ε-tranziții către aceeași stare finală. Astfel, șirul e acceptat dacă e acceptat de oricare dintre cele două.",
    },
    {
      question:
        "De ce backreferences (ex: (.*)\\1) fac potrivirea regex NP-completă?",
      options: [
        "Pentru că sunt greu de implementat",
        "Pentru că necesită memorie exponențială",
        "Pentru că backreferences necesită memorarea unor grupări, ceea ce depășește puterea automatelor finite (DFA/NFA clasice)",
        "Pentru că nu pot fi compilate",
      ],
      correctIndex: 2,
      explanation:
        "Backreferences necesită memorarea șirului potrivit de un grup și verificarea că același șir apare din nou. Aceasta depășește puterea automatelor finite standard — e nevoie de un automat cu memorie (pushdown) sau mai puternic. Problema devine NP-completă.",
    },
  ],
};


