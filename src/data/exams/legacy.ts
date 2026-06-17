import type { PracticeExam } from "@/types";

// Exam-uri scrise de mână (variante 2024 & 2022 Restanță), păstrate ca atare.
export const LEGACY_EXAMS: PracticeExam[] = [
  {
    id: "2023-2024",
    year: "2023-2024",
    title: "Restanță 2024",
    totalPoints: 50,
    problems: [
      {
        id: "2024-1",
        number: "1",
        points: 10,
        topic: "kmp",
        statement: `**[KMP — 10 puncte]**

Se dă textul \`T = HIABABXABABXABABY\` și pattern-ul \`P = ABABXABABY\`.

**(a)** Calculați funcția eșec \`f[]\` pentru pattern-ul P (indexat de la 0).

**(b)** Simulați algoritmul KMP pe textul T cu pattern-ul P. Pornind din starea \`(i=2, k=9)\`, determinați:
- Overlap-ul curent (ce s-a potrivit până acum)
- Bordura overlap-ului (din funcția eșec)
- Starea nouă \`(i', k')\` după mismatch

**(c)** Continuați simularea din starea nouă până la primul match sau sfârșitul textului. Arătați fiecare stare.`,
        hints: [
          "f[0]=0 întotdeauna. Pentru f[i], folosiți k = f[i-1] și extindeți bordura.",
          "La nepotrivire cu k=9: f[8]=? → nou i = 2 + 9 - f[8], nou k = f[8]",
          "Overlap = primele k caractere din pattern. Bordura = prefix = sufix al overlap-ului.",
        ],
        solution: `**(a) Funcția eșec pentru P = ABABXABABY:**

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| P[i] | A | B | A | B | X | A | B | A | B | Y |
| f[i] | 0 | 0 | 1 | 2 | 0 | 1 | 2 | 3 | 4 | 0 |

**Calcul:** f[0]=0, f[1]=0 (B≠A), f[2]=1 (A=A), f[3]=2 (B=B), f[4]=0 (X≠A, f[1]=0, X≠A), f[5]=1 (A=A), f[6]=2 (B=B), f[7]=3 (A=A), f[8]=4 (B=B), f[9]=0 (Y≠A, f[3]=2→Y≠A, f[1]=0→Y≠A).

**(b) Starea i=2, k=9:**

Overlap = primele 9 caractere: "ABABXABAB"
f[k-1] = f[8] = **4** → bordura = "ABAB"

**Nou i** = 2 + 9 - 4 = **7**
**Nou k** = f[8] = **4**

**(c) Continuare din (i=7, k=4):**

Din T[7..] = ABABXABABY cu k=4 (deja potrivit "ABAB"):
- Compară T[7+4]='X' cu P[4]='X' → **match** → k=5
- Compară T[12]='A' cu P[5]='A' → **match** → k=6
- Compară T[13]='B' cu P[6]='B' → **match** → k=7
- Compară T[14]='A' cu P[7]='A' → **match** → k=8
- Compară T[15]='B' cu P[8]='B' → **match** → k=9
- Compară T[16]='Y' cu P[9]='Y' → **match** → k=10 = m

**Apariție găsită la poziția i=7!**`,
      },

      {
        id: "2024-2",
        number: "2",
        points: 12,
        topic: "dp1",
        statement: `**[Programare Dinamică — 12 puncte]**

Se dă matricea A (3×4):

\`\`\`
    1   3   2   5
    2   4   6   3
    3   5   7   8
\`\`\`

**(a)** Formulați formal problema celui mai lung drum crescător de la (1,1) la (N,M), specificând:
- Input-ul (cu tipuri și constrângeri)
- Output-ul (cu notații matematice)

**(b)** Definiți subproblema dp[i][j], cazurile de bază, recurența, ordinea și locația răspunsului.

**(c)** Calculați matricea dp[][] pentru A de mai sus. Arătați toate valorile.

**(d)** Demonstrați substructura optimă a problemei.`,
        hints: [
          "Un drum e crescător dacă fiecare element e strict mai mare decât precedentul.",
          "dp[1][1] = 1. dp[1][j] = j dacă A[1][1]<A[1][2]<...<A[1][j], altfel 0.",
          "dp[i][j] = i+j-1 dacă cel puțin un vecin (sus sau stânga) e valid și mai mic, altfel 0.",
        ],
        solution: `**(a) Formulare formală:**

**Input:** N, M ∈ ℕ, matrice A[1..N][1..M] de numere întregi
**Output:** cel mai mare k ∈ ℕ astfel încât ∃ i, j cu dp[i][j] = k, unde k este lungimea celui mai lung drum de la (1,1) la (i,j) cu elemente strict crescătoare.

**(b) Subproblema:**

dp[i][j] = lungimea celui mai lung drum strict crescător din (1,1) la (i,j), deplasându-ne doar jos sau la dreapta.

**Cazuri de bază:**
- dp[1][1] = 1
- dp[1][j] = j dacă A[1][j-1] < A[1][j] și dp[1][j-1] > 0, altfel 0
- dp[i][1] = i dacă A[i-1][1] < A[i][1] și dp[i-1][1] > 0, altfel 0

**Recurență (i>1, j>1):**
- Fie sus_ok = (A[i-1][j] < A[i][j] și dp[i-1][j] > 0)
- Fie st_ok = (A[i][j-1] < A[i][j] și dp[i][j-1] > 0)
- dp[i][j] = i+j-1 dacă sus_ok SAU st_ok, altfel 0

**Ordinea:** linie cu linie, stânga → dreapta.
**Răspuns:** max(dp[i][j]) pe toată matricea.

**(c) Matricea dp pentru A:**

\`\`\`
A:          dp:
1  3  2  5   1  2  0  3
2  4  6  3   2  3  4  0
3  5  7  8   3  4  5  6
\`\`\`

Verificare dp[2][3]=4: A[1][3]=2 < A[2][3]=6 și dp[1][3]=0 (blocat). A[2][2]=4 < A[2][3]=6 și dp[2][2]=3 > 0 ✓ → dp[2][3] = 2+3-1 = 4.
dp[3][4]=6: A[2][4]=3 < A[3][4]=8 și dp[2][4]=0. A[3][3]=7 < A[3][4]=8 și dp[3][3]=5 > 0 ✓ → dp[3][4] = 3+4-1 = 6.

**Răspuns:** max = 6, la (3,4).

**(d) Substructura optimă:**

Fie D* un drum optim de la (1,1) la (i,j) de lungime dp[i][j]. Fie (i',j') predecesorul lui (i,j) pe D*. Atunci sub-drumul D*[1..k-1] (de la (1,1) la (i',j')) trebuie să fie și el optim pentru sub-problema (i',j').

**Demonstrație prin contradicție:** Dacă ar exista un drum mai lung de la (1,1) la (i',j'), l-am putea folosi ca prefix pentru D*, obținând un drum mai lung la (i,j), contradicție cu optimalitatea lui D*.`,
      },

      {
        id: "2024-3",
        number: "3",
        points: 14,
        topic: "greedy",
        statement: `**[Greedy — 14 puncte]**

Sunt \`n\` studenți cu punctajele \`x[1..n]\` la examen. Profesorul vrea să îi împartă în grupe astfel încât diferența dintre cel mai mare și cel mai mic punctaj dintr-o grupă să fie cel mult \`k\`.

**(a)** Formulați formal problema minimizării numărului de grupe.

**(b)** Propuneți o strategie greedy **incorectă** și dați un contraexemplu care o infirmă.

**(c)** Descrieți strategia greedy corectă și demonstrați-i corectitudinea (exchange argument).

**(d)** Implementați algoritmul corect în ALK și precizați complexitatea.`,
        hints: [
          "O strategie greșită: alege elemente cu valori apropiate de medie pentru fiecare grupă.",
          "O altă strategie greșită: formează grupe de câte k+1 elemente.",
          "Strategia corectă: sortează și scanează liniar.",
          "Exchange argument: presupune că OPT deschide o grupă mai târziu decât greedy.",
        ],
        solution: `**(a) Formulare formală:**

**Input:** n ∈ ℕ, x[1..n] ∈ ℤ vectorul de punctaje, k ∈ ℕ lățimea maximă a grupei
**Output:** cel mai mic număr g ∈ ℕ de grupe G₁, G₂, ..., Gₘ cu:
- ∪ᵢ Gᵢ = {1,..,n}, Gᵢ ∩ Gⱼ = ∅ pentru i≠j
- max(Gᵢ) - min(Gᵢ) ≤ k pentru orice i

**(b) Strategie greșită + Contraexemplu:**

**Strategie:** formează grupe de exact k+1 elemente consecutive (ignorând valorile).

**Contraexemplu:** n=4, k=2, x=[1, 2, 10, 11].
- Strategia formează: {1,2} și {10,11} → 2 grupe. Aceasta e CORECTĂ în acest caz.

Alt contraexemplu: n=4, k=3, x=[1, 2, 3, 100].
- Strategia greșită "grupă de 2 elemente": {1,2},{3,100} → 2 grupe, dar {3,100} invalide (100-3 > 3). **Eșec.**
- Optim: {1,2,3},{100} = 2 grupe cu grupe valide.

**(c) Strategie corectă + Demonstrație:**

**Strategie:** Sortează x. La fiecare pas, deschide o grupă nouă la cel mai mic element neacoperit. Continuă cât timp elementele cad în [start, start+k].

**Demonstrație (exchange argument):**

Fie G o soluție produsă de greedy și OPT o soluție optimă. Presupune că greedy deschide prima grupă la start₁ = x[1]. Dacă OPT deschide prima grupă la start₁' ≥ x[1], și start₁ = x[1] e cel mai mic, atunci prima grupă a lui greedy acoperă cel puțin la fel de mult. Prin inducție, fiecare grupă a lui greedy acoperă cel puțin atât cât OPT → greedy folosește ≤ grupe ca OPT.

**(d) Implementare ALK:**

\`\`\`
grupe_greedy(n, x[1..n], k):
  sortează x crescător   // O(n log n)
  count = 1
  start = x[1]
  pentru i de la 2 la n:   // O(n)
    dacă x[i] > start + k:
      count = count + 1
      start = x[i]
  returnează count
\`\`\`

**Complexitate:** O(n log n) — dominat de sortare. Scanarea e O(n).`,
      },

      {
        id: "2024-4",
        number: "4",
        points: 8,
        topic: "bm",
        statement: `**[Boyer-Moore — 8 puncte]**

Se dă textul \`T = BABC ABCABCABC\` și pattern-ul \`P = ABCAB\`.

**(a)** Calculați funcția salt pentru caracterul rău (bad character) pentru P.

**(b)** Simulați primii 3 pași ai algoritmului Boyer-Moore (arătând ce regulă se aplică și cât se deplasează).

**(c)** Care este complexitatea Boyer-Moore în cazul cel mai bun și cel mai rău?`,
        hints: [
          "salt[c] = distanța de la ultima apariție a lui c în pattern până la capătul patternului.",
          "BM compară de la dreapta la stânga. Primul caracter comparat e P[m-1].",
          "Cazul cel mai bun: text și pattern nu au caractere comune.",
        ],
        solution: `**(a) Funcția salt pentru P = ABCAB (m=5):**

salt[c] = m dacă c nu apare în P, altfel m-1-lastPos(c):
- salt['A'] = 5-1-3 = 1 (ultima apariție la poziția 3)
- salt['B'] = 5-1-4 = 0 (ultima apariție la poziția 4)
- salt['C'] = 5-1-2 = 2 (ultima apariție la poziția 2)
- salt[orice altceva] = 5

**(b) Simulare (T = BABCABCABCABC, P = ABCAB):**

**Aliniere 1 (i=0):** Compară de la dreapta:
- T[4]='A' vs P[4]='B' → mismatch. Caracter rău = 'A'. salt['A']=1.
- Shift = max(1, salt['A']) = max(1,1) = 1. Deplasare: i → 1.

**Aliniere 2 (i=1):**
- T[5]='B' vs P[4]='B' → match
- T[4]='A' vs P[3]='A' → match
- T[3]='C' vs P[2]='C' → match
- T[2]='B' vs P[1]='B' → match
- T[1]='A' vs P[0]='A' → match! **Potrivire la i=1.**
- Shift cu goodSuffix[0] = m = 5. i → 6.

**Aliniere 3 (i=6):**
- T[10]='C' vs P[4]='B' → mismatch. Caracter rău='C'. salt['C']=2. Shift=max(1,2)=2. i → 8.

**(c) Complexitate:**

- **Cazul cel mai bun:** O(n/m) — când fiecare comparație sare cu m poziții (text și pattern nu au caractere comune).
- **Cazul cel mai rău:** O(n·m) — când toate caracterele sunt identice (ex: T='AAA...A', P='AAAB').`,
      },

      {
        id: "2024-5",
        number: "5",
        points: 6,
        topic: "bkt",
        statement: `**[NP-Completitudine — 6 puncte]**

Problema SUBSET-SUM: dat un multiset S de numere întregi și o țintă t, există un subset T ⊆ S cu suma elementelor din T egală cu t?

**(a)** Arătați că SUBSET-SUM ∈ NP, descriind algoritmul nondeterminist de verificare.

**(b)** Descrie pe scurt cum ai demonstra că SUBSET-SUM este NP-completă (ce reducere ai folosi și de la ce problemă).`,
        hints: [
          "NP: dat un certificat (un subset T), poți verifica în timp polinomial că suma e t.",
          "SUBSET-SUM e NP-completă prin reducere de la 3-SAT sau direct din PARTITION.",
          "Algoritmul nondeterminist: ghicire + verificare.",
        ],
        solution: `**(a) SUBSET-SUM ∈ NP:**

**Algoritm nondeterminist:**
\`\`\`
ndet_subset_sum(S, t):
  // Faza 1: Ghicire nondeterministă O(n) pași
  T = ghiceste_subset(S)

  // Faza 2: Verificare deterministă O(n)
  suma = 0
  pentru fiecare x ∈ T:
    suma = suma + x
  dacă suma == t: ACCEPT
  altfel: REJECT
\`\`\`

Verificarea se face în O(n) — liniar în dimensiunea input-ului. Certificatul (subsetul T) are dimensiunea polinomială. Deci **SUBSET-SUM ∈ NP**.

**(b) NP-completitudine:**

**Reducere:** Se reduce **PARTITION** la SUBSET-SUM (sau direct 3-SAT prin construcție mai complexă).

**PARTITION ≤ₚ SUBSET-SUM:** Dat un set S cu suma totală 2M, PARTITION întreabă dacă există T ⊆ S cu suma(T) = M. Aceasta este exact o instanță a SUBSET-SUM cu t = M. Reducerea e identitatea — O(1).

Deoarece PARTITION e NP-completă (se arată prin reducere din 3-SAT sau din KNAPSACK), și PARTITION ≤ₚ SUBSET-SUM, rezultă că **SUBSET-SUM este NP-completă**.`,
      },
    ],
  },

  {
    id: "2021-2022",
    year: "2021-2022",
    title: "Restanță 2022",
    totalPoints: 50,
    problems: [
      {
        id: "2022-1",
        number: "1",
        points: 8,
        topic: "kmp",
        statement: `**[Proprietăți de Probleme — 8 puncte]**

Se consideră un vector \`A[1..n]\` de numere întregi. Definim o subsecvență **bună** ca o subsecvență \`A[i..j]\` unde elementele sunt ordonate crescător și fiecare element este divizibil cu primul element al subsecvenței.

**(a)** Formulați formal problema găsirii celei mai lungi subsecvențe bune. Specificați input-ul, output-ul și proprietățile ce trebuie satisfăcute.

**(b)** Demonstrați că dacă A[i..j] e o subsecvență bună, atunci A[i..j-1] e și ea o subsecvență bună.

**(c)** Propuneți o abordare eficientă (DP sau greedy) și justificați alegerea.`,
        hints: [
          "O subsecvență e o porțiune contiguă a vectorului.",
          "Proprietatea (b) e substructura optimă — necesară pentru DP.",
          "DP cu dp[i] = lungimea celei mai lungi subsecvențe bune care se termină la A[i].",
        ],
        solution: `**(a) Formulare formală:**

**Input:** n ∈ ℕ, A[1..n] ∈ ℤ vector de numere întregi

**Output:** cel mai mare k ∈ ℕ și indicii i*, j* astfel încât:
- A[i*..j*] este o subsecvență bună
- j* - i* + 1 = k
- k este maximal

**Condiții pentru A[i..j] bună:**
1. A[p] < A[p+1] pentru orice p ∈ {i,..,j-1} (strict crescătoare)
2. A[i] | A[p] pentru orice p ∈ {i,..,j} (fiecare element divizibil cu primul)

**(b) Substructura optimă:**

**Teoremă:** Dacă A[i..j] este o subsecvență bună, atunci A[i..j-1] este și ea bună.

**Demonstrație:**
- A[i..j] crescătoare ⟹ A[i..j-1] crescătoare (sub-șirul unui șir crescător e crescător)
- A[i] | A[p] pentru orice p ∈ {i,..,j} ⟹ A[i] | A[p] pentru orice p ∈ {i,..,j-1} (subset)
- Deci A[i..j-1] satisface ambele condiții. □

**(c) Abordare DP:**

Folosim DP deoarece există substructura optimă (demonstrată la (b)).

**dp[j]** = lungimea celei mai lungi subsecvențe bune ce se termină la A[j].

\`\`\`
dp[i] = 1 pentru orice i (subsecvența cu un singur element e bună)
pentru j de la 2 la n:
  dp[j] = 1
  pentru i de la 1 la j-1:
    dacă A[i] < A[j] și A[i] | A[j] și dp[i] > 0:
      // A[i] e primul element al subsecvenței → verificăm divizibilitate
      // Trebuie să știm primul element → dp[j] = max(dp[j], dp[i] + 1)
  dp[j] = 1 + max(dp[i] pentru i < j cu A[i]<A[j] și primul element | A[j])

răspuns = max(dp[j])
\`\`\`

**Complexitate:** O(n²) — două bucle imbricate.`,
      },

      {
        id: "2022-2",
        number: "2",
        points: 5,
        topic: "bkt",
        statement: `**[Algoritm Nondeterminist — 5 puncte]**

Problema HAMILTONIAN-PATH: dat un graf neorientat G = (V, E), există un drum hamiltonian (care vizitează fiecare nod exact o dată)?

**(a)** Scrieți un algoritm nondeterminist pentru HAMILTONIAN-PATH care funcționează în timp polinomial.

**(b)** Explicați de ce algoritmul vostru este corect.

**(c)** Ce puteți concluziona despre apartenența lui HAMILTONIAN-PATH la clasa NP?`,
        hints: [
          "Un algoritm nondeterminist are o fază de ghicire și o fază de verificare.",
          "Faza de ghicire: ghicești o permutare a nodurilor.",
          "Faza de verificare: verifici că permutarea formează un drum valid.",
        ],
        solution: `**(a) Algoritm nondeterminist:**

\`\`\`
ndet_hamiltonian_path(G=(V,E)):
  n = |V|

  // Faza 1: Ghicire nondeterministă — O(n) pași
  π = ghiceste_permutare(V)  // o permutare a tuturor nodurilor

  // Faza 2: Verificare deterministă — O(n)
  pentru i de la 1 la n-1:
    dacă (π[i], π[i+1]) ∉ E: REJECT
  ACCEPT
\`\`\`

**(b) Corectitudine:**

- **Corectitudine (←):** Dacă G are un drum hamiltonian P = v₁v₂...vₙ, există o ramură de calcul unde faza de ghicire produce π = P. Faza de verificare acceptă.
- **Corectitudine (→):** Dacă algoritmul acceptă pe o ramură, atunci π[1]π[2]...π[n] este o permutare cu (π[i],π[i+1]) ∈ E pentru toți i, deci un drum hamiltonian valid.

**(c) Concluzie:**

Algoritmul nondeterminist rulează în O(n) pentru verificare (polinomial). Certificatul (permutarea π) are dimensiunea |V| = polinomială.

**HAMILTONIAN-PATH ∈ NP.** (Se știe și că e NP-completă, prin reducere din HAMILTONIAN-CYCLE sau 3-SAT.)`,
      },

      {
        id: "2022-3",
        number: "3",
        points: 14,
        topic: "bm",
        statement: `**[Rabin-Karp Rolling Hash — 14 puncte]**

Se dă un text T și un pattern P, ambele de lungime m, și textul este rotit ciclic pe parcurs.

**(a)** Calculați hash-ul patternului P = "abc" folosind d=26, q=101. Arătați calculul pas cu pas.

**(b)** Pentru textul T = "abcabcabc", calculați hash-urile ferestrelor de lungime 3 și identificați cel puțin 2 false positives (dacă există), folosind aceeași funcție hash.

**(c)** Construiți un exemplu de text T și pattern P (de aceeași lungime m) unde apar cel puțin 3 false positives. Justificați de ce apar.`,
        hints: [
          "H(s) = (s[0]·d^(m-1) + s[1]·d^(m-2) + ... + s[m-1]) mod q",
          "Rolling: H_nou = (d·(H - T[i]·d^(m-1)) + T[i+m]) mod q",
          "False positive: hash coincide dar șirurile sunt diferite.",
        ],
        solution: `**(a) Hash pentru P = "abc" (d=26, q=101):**

Codificăm a=1, b=2, c=3.

H(P) = (1·26² + 2·26¹ + 3·26⁰) mod 101
     = (676 + 52 + 3) mod 101
     = 731 mod 101
     = 731 - 7·101
     = 731 - 707
     = **24**

**(b) Ferestre din T = "abcabcabc" (m=3):**

Fereastra 0 = "abc": H = 24 (calculat mai sus) → H == H(P), verificăm: abc == abc ✓ **potrivire reală**

Rolling hash pentru fereastra 1 = "bca":
H_1 = (26·(24 - 1·676) + 1) mod 101 ← în mod 101
    = (26·(24 - 676 mod 101) + 1) mod 101
    = (26·(24 - 70) + 1) mod 101  (676 mod 101 = 70)
    = (26·(-46) + 1) mod 101
    = (-1196 + 1) mod 101 = -1195 mod 101
    = -1195 + 12·101 = -1195 + 1212 = 17

H(bca) ≠ 24, nu e false positive.

Fereastra 3 = "abc" → H=24 ✓ **potrivire reală** (nu false positive).

**(c) Exemplu cu false positives:**

Alege q mic (q=7): P = "abc" (a=1,b=2,c=3), d=26, m=3.

H("abc") = (1·676 + 2·26 + 3) mod 7 = (676+52+3) mod 7 = 731 mod 7 = 731 - 104·7 = 3.

Orice fereastră cu H = 3 (mod 7) e un candidat. Deoarece q=7 e mic, coliziunile sunt frecvente.

**De ce apar false positives?** Hash-ul este o funcție de la șiruri → {0,..,q-1}. Prin principiul cutiei, dacă numărul de ferestre > q, inevitabil apar coliziuni. Cu q mic (q=7, mai puțin de 10 valori posibile), șanse mari de false positive.`,
      },

      {
        id: "2022-4",
        number: "4",
        points: 15,
        topic: "dp2",
        statement: `**[Programare Dinamică pe Șiruri — 15 puncte]**

Se dă un șir de caractere \`S[0..n-1]\`.

**(a)** Formulați problema găsirii celui mai lung subșir al lui S care apare atât ca **prefix** (de la stânga) cât și ca **sufix** (de la dreapta, invers).

**(b)** Definiți subproblema DP, cazurile de bază, recurența și ordinea de parcurgere.

**(c)** Calculați dp[][] pentru S = "ABACABA".

**(d)** Implementați algoritmul în ALK și precizați complexitatea.

**(e)** Demonstrați substructura optimă.

**(f)** Propuneți o strategie greedy pentru această problemă și dați un contraexemplu care o infirmă.`,
        hints: [
          "Subproblema: d(i,j) = lungimea șirului comun care apare ca prefix începând la i și sufix terminând la j.",
          "d(i,j) = 1 + d(i+1,j-1) dacă S[i]==S[j], altfel 0.",
          "Ordinea: i descrescător, j crescător.",
          "Greedy greșit: la fiecare pas adaugă caracterul care apare de mai multe ori.",
        ],
        solution: `**(a) Formulare:**

**Input:** n ∈ ℕ, S[0..n-1] șir de caractere
**Output:** cel mai mare k ∈ ℕ și indicii i*, j* cu i* < j* astfel încât:
S[i*..i*+k-1] = reverse(S[j*-k+1..j*]), și k este maximal.

**(b) Subproblema DP:**

d(i, j) = lungimea celui mai lung șir care apare ca prefix începând la i (= S[i..i+d-1]) și ca sufix terminând la j (= S[j-d+1..j] invers).

**Cazuri de bază:**
- d(n-1, j) = 1 dacă S[n-1] == S[j], altfel 0
- d(i, 0) = 1 dacă S[0] == S[i], altfel 0

**Recurență:** d(i, j) = 0 dacă S[i] ≠ S[j]; 1 + d(i+1, j-1) dacă S[i] == S[j].

**Ordinea:** i descrescător (de la n-2 la 0), j crescător (de la 1 la n-1).
**Răspuns:** max(d(i,j)) pentru i < j.

**(c) d[][] pentru S = "ABACABA" (n=7):**

Tabelul d (i=linie, j=coloană), calculat:
- d(6,j): S[6]='A'. d(6,0)=1(A=A), d(6,1)=0(A≠B), d(6,2)=1(A=A), d(6,3)=0(A≠C), d(6,4)=1(A=A), d(6,5)=0, d(6,6)=0
- d(5,j): S[5]='B'. d(5,0)=0, d(5,1)=1(B=B), d(5,2)=0, d(5,3)=0, d(5,4)=0, ...
- ...
- d(0,6): S[0]='A'==S[6]='A' → d(0,6) = 1 + d(1,5). S[1]='B'==S[5]='B' → d(1,5) = 1 + d(2,4). S[2]='A'==S[4]='A' → d(2,4) = 1 + d(3,3). i<j condiție: 3<3 fals → d(3,3)=0. Deci d(2,4)=1, d(1,5)=2, d(0,6)=**3**.

Răspuns: **3**, corespunzând "ABA".

**(d) Implementare ALK:**
\`\`\`
prefix_sufix(S[0..n-1]):
  pentru j de la 0 la n-1:
    d[n-1][j] = (S[n-1]==S[j] ? 1 : 0)
  pentru i de la 0 la n-1:
    d[i][0] = (S[0]==S[i] ? 1 : 0)
  pentru i de la n-2 la 1 descrescător:
    pentru j de la 1 la n-1:
      dacă S[i] == S[j] și i < j:
        d[i][j] = 1 + d[i+1][j-1]
      altfel: d[i][j] = 0
  returnează max(d[i][j] pentru i<j)
\`\`\`
**Complexitate:** O(n²) timp, O(n²) spațiu.

**(e) Substructura optimă:** Dacă d(i,j) = k este optim, atunci d(i+1,j-1) = k-1 este optim pentru sub-problema (i+1,j-1). (Prin contradicție: dacă d(i+1,j-1) > k-1, atunci d(i,j) > k, contradicție.)

**(f) Greedy greșit + Contraexemplu:**

**Strategie:** la fiecare pas, alege caracterul cel mai frecvent care se potrivește simultan la prefixul curent și sufixul curent.

**Contraexemplu:** S = "AABBA". Prefix direct, sufix invers = "ABBAA". Greedy: 'A' apare de 4 ori → adaugă 'A'. Dar sufixul nu începe cu 'A' (sufixul invers = ABBAA[0]='A'). Pare că merge dar...

S = "ABBA". Greedy ar alege 'B' (2 apariții) → verifică prefix "B..." și sufix "...B" invers = "ABB". Nu se aliniază. Optim: "AB" cu d(0,3)=1+d(1,2), S[0]='A'=S[3]='A' → 1+d(1,2), S[1]='B'=S[2]='B' → 1+1=2. Greedy dacă alege 'B' primul nu poate construi "AB" → greedy greșit cu răspuns 1 vs. optim 2.`,
      },

      {
        id: "2022-5",
        number: "5",
        points: 8,
        topic: "greedy",
        statement: `**[Greedy Contraexemplu & Corectitudine — 8 puncte]**

Se consideră activitățile: {[1,4], [3,5], [0,6], [5,7], [3,9], [5,9], [6,10], [8,11], [8,12], [2,14]}.

**(a)** Aplicați strategia "alege activitatea cu durata minimă" și arătați rezultatul.

**(b)** Aplicați strategia corectă "alege activitatea care se termină prima" și arătați rezultatul.

**(c)** Comparați cele două rezultate și explicați de ce strategia (b) e optimă.`,
        hints: [
          "Durata = f[i] - s[i]. Sortează după durată pentru (a), după f[i] pentru (b).",
          "La ambele: activitățile selectate nu trebuie să se suprapună.",
          "Exchange argument pentru (c): dacă OPT nu conține early-finish, potem înlocui.",
        ],
        solution: `**(a) Strategie 'durată minimă':**

Sortare după durată: [1,4]=3, [3,5]=2, [5,7]=2, [8,11]=3, [8,12]=4, [0,6]=6, [3,9]=6, [5,9]=4, [6,10]=4, [2,14]=12.

Ordine: [3,5]=2, [5,7]=2, [1,4]=3, [8,11]=3, [5,9]=4, [8,12]=4, [6,10]=4, [0,6]=6, [3,9]=6, [2,14]=12.

Selectare greedy:
1. [3,5] → selectat. last=5
2. [5,7] → start=5 ≥ 5 ✓ → selectat. last=7
3. [1,4] → 1 < 7 ✗
4. [8,11] → 8 ≥ 7 ✓ → selectat. last=11
5. Restul: [5,9]→5<11✗, [8,12]→8<11✗, [6,10]→6<11✗, [0,6]→0<11✗, [3,9]→3<11✗, [2,14]→2<11✗

**Rezultat (a): 3 activități** {[3,5], [5,7], [8,11]}

**(b) Strategie 'se termină prima':**

Sortare după f[i]: [1,4]=4, [3,5]=5, [0,6]=6, [5,7]=7, [3,9]=9, [5,9]=9, [6,10]=10, [8,11]=11, [8,12]=12, [2,14]=14.

Selectare greedy:
1. [1,4] → selectat. last=4
2. [3,5] → 3 < 4 ✗
3. [0,6] → 0 < 4 ✗
4. [5,7] → 5 ≥ 4 ✓ → selectat. last=7
5. [3,9] → 3 < 7 ✗
6. [5,9] → 5 < 7 ✗
7. [6,10] → 6 < 7 ✗
8. [8,11] → 8 ≥ 7 ✓ → selectat. last=11
9. [8,12] → 8 < 11 ✗
10. [2,14] → 2 < 11 ✗

**Rezultat (b): 3 activități** {[1,4], [5,7], [8,11]}

**(c) Comparație și corectitudine:**

Ambele dau 3 activități în acest caz, dar strategia (a) nu e întotdeauna optimă.

**Contraexemplu clasic pentru (a):** {[1,3],[2,4],[3,5],[4,6],[5,7]}. Durate minime: toate durata 2. Greedy durată minimă poate alege [1,3],[3,5],[5,7] = 3 activități. Dar greedy finish-first alege [1,3],[3,5],[5,7] = la fel 3. Alt contraexemplu mai clar: {[0,5],[4,6],[1,2],[3,4],[5,7]}: durata minimă alege [1,2](1), [3,4](1), [5,7](2) = 3. Finish-first: [1,2](f=2),[3,4](f=4),[5,7](f=7) = 3.

**Demonstrație exchange argument (b):**
Fie early = activitatea cu cel mai mic timp de terminare. Presupune că OPT nu conține early, ci conține o activitate a cu f(a) ≥ f(early). Înlocuiește a cu early în OPT: early ∩ restul OPT = ∅ (deoarece f(early) ≤ f(a) < s(activitate_urmatoare) în OPT). Deci OPT' cu early e la fel de bun. Prin inducție, optim = greedy. □`,
      },
    ],
  },
];
