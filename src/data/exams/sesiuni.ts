import type { PracticeExam } from "@/types";

// Owner: Claude. Sesiuni & restante recente (2021–2024), transcrise fidel din
// PDF-urile oficiale cu soluții din folderul Restanta/.
export const SESIUNI_EXAMS: PracticeExam[] = [
  // ───────────────────────── Sesiune 2024 (Săpt. 16, 13 iunie 2024) ─────────────────────────
  {
    id: "sesiune-2024",
    year: "2023-2024",
    title: "Sesiune 2024 (13 iunie)",
    totalPoints: 35,
    problems: [
      {
        id: "s24-1",
        number: "1",
        points: 12,
        topic: "kmp",
        statement: `**[Căutare pe șiruri de caractere — 12p]**

**(a) (6p)** Execuția algoritmului **KMP** a ajuns în starea de mai jos:

\`\`\`
i=2
↓
01234567890123456
TEXT = HIABABXABABXABABY
       ========≠
pattern =  ABABXABABY
           0123456789
                   ↑
                   k=9
\`\`\`

Care este următoarea stare a algoritmului (următoarele valori ale lui \`i\` și \`k\`)? Explicați de ce.

**(b) (6p)** Execuția algoritmului **Boyer-Moore** a ajuns în starea de mai jos:

\`\`\`
i=0
↓
B A A A X A B X A A X B A X B A A A B A B B
        ≠ = =
X A X A B A B
        ↑
        k=2
\`\`\`

- Care este sufixul bun? Care este caracterul rău?
- Care este deplasamentul propus de regula caracterului rău? Explicați.
- Care este deplasamentul propus de regula sufixului bun? Explicați.`,
        hints: [
          "La KMP, overlap-ul = primele k caractere potrivite. Frontiera = cel mai lung prefix propriu care e și sufix al overlap-ului.",
          "Nou i = i + k − frontieră; nou k = lungimea frontierei. Aici overlap = ABABXABAB, frontiera = ABAB.",
          "La Boyer-Moore se compară de la dreapta. Bad char aliniază ultima apariție a caracterului rău; good suffix aliniază penultima apariție a sufixului bun.",
        ],
        solution: `**(a) KMP → i = 7, k = 4.**

Overlap-ul este \`ABABXABAB\` (cele 9 caractere potrivite), iar cea mai mare frontieră (prefix propriu = sufix) este \`ABAB\`.

Algoritmul deplasează pattern-ul astfel încât frontiera, văzută ca prefix al pattern-ului, se aliniază cu sufixul corespunzător din text → **i devine 7**. Vechea frontieră devine noul overlap → **k devine 4**.

**(b) Boyer-Moore:**

- **Sufixul bun** este \`AB\`. **Caracterul rău** este \`X\`.
- **Regula caracterului rău → i = 2:** regula aliniază ultima apariție în pattern a caracterului rău (poziția 2 în pattern) cu caracterul rău din text (poziția 4 în text).
- **Regula sufixului bun → i = 2:** regula aliniază penultima apariție în pattern a sufixului bun (începând cu poziția 3 în pattern) cu sufixul bun din text (începând cu poziția 5 în text).

Ambele reguli propun i = 2.`,
        codeTemplate: `function buildLPS(pattern) {
  // LPS[i] = lungimea celui mai lung prefix propriu
  // care este și sufix al pattern[0..i]
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}`,
        testCases: [
          {
            label: "ABAB → [0,0,1,2]",
            args: ["ABAB"],
            expected: [0, 0, 1, 2],
          },
          {
            label: "AAAA → [0,1,2,3]",
            args: ["AAAA"],
            expected: [0, 1, 2, 3],
          },
          {
            label: "ABCD → [0,0,0,0]",
            args: ["ABCD"],
            expected: [0, 0, 0, 0],
          },
          {
            label: "AABAACAABAA → [0,1,0,1,2,0,1,2,3,4,5]",
            args: ["AABAACAABAA"],
            expected: [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5],
          },
        ],
      },
      {
        id: "s24-2",
        number: "2",
        points: 23,
        topic: "greedy",
        statement: `**[swaps — 23p]**

Fie \`A[1..N]\` un vector cu N numere naturale, pozițiile numerotate de la 1 la N. Poziția \`i\` este **bună** dacă paritatea lui \`i\` și a lui \`A[i]\` coincide (ambele pare sau ambele impare). Operația \`swap(i,j)\` interschimbă \`A[i]\` cu \`A[j]\`. Problema **swaps** cere numărul minim de operații swap astfel încât toate pozițiile să devină bune; dacă este imposibil, output-ul este \`-1\`.

**(a) (5p)** Dați un exemplu cu N = 8 pentru care răspunsul este 3, specificând și operațiile.

**(b) (3p)** Dați un exemplu cu N = 4 pentru care răspunsul este −1. Justificați.

**(c) (4p)** Descrieți generic datele de intrare pentru care output-ul este −1. Justificați.

**(d) (6p)** Implementați în ALK funcția \`minSwaps\` cât mai eficient ca timp.

**(e) (5p)** Demonstrați că algoritmul determină numărul minim de operații (soluția optimă).`,
        hints: [
          "Numără pozițiile rele de două tipuri: par pe poziție impară (nrPare) și impar pe poziție pară (nrImpare).",
          "Un swap util ia un element par de pe poziție impară și unul impar de pe poziție pară → scade ambele cu 1.",
          "Soluția există ⇔ nrPare == nrImpare, caz în care răspunsul = nrPare. Complexitate O(N).",
        ],
        solution: `**(a)** \`A = [2,1,4,3,6,5,7,8]\` → \`swap(1,2)\`, \`swap(3,4)\`, \`swap(5,6)\` (3 operații).

**(b)** \`A = [1,2,3,5]\` → −1. Sunt 2 poziții impare și 2 pare, dar avem 3 elemente impare; oricâte interschimbări am face, va rămâne mereu o poziție pară \`i\` cu \`A[i]\` impar.

**(c)** Output-ul e −1 **dacă și numai dacă** numărul de elemente impare ≠ ⌈N/2⌉ (echivalent: numărul de elemente pare ≠ ⌊N/2⌋). Prin interschimbări putem aranja elementele în orice ordine; relevant pentru existența soluției e doar ca numărul de elemente impare/pare să coincidă cu numărul de poziții impare/pare.

**(d) Implementare ALK:**
\`\`\`
minSwaps(N, A) {
  nrPare = 0;    // elemente pare pe poziții impare
  nrImpare = 0;  // elemente impare pe poziții pare
  for (i = 1; i <= N; i++) {
    if (A[i] % 2 == 1 && i % 2 == 0) nrPare++;
    if (A[i] % 2 == 0 && i % 2 == 1) nrImpare++;
  }
  if (nrPare == nrImpare) return nrPare;
  return -1;
}
// Complexitate timp O(N), optimă.
\`\`\`

**(e) Corectitudine.** Orice \`swap(i,j)\` se încadrează în 4 cazuri:
1. Două poziții bune de paritate diferită → nrPare și nrImpare cresc ambele cu 1 (regres, niciodată într-un optim).
2. Două poziții bune de aceeași paritate → nimic nu se schimbă (fără progres).
3. O poziție bună cu una rea → nrPare și nrImpare rămân la fel (doar mută poziția rea, fără progres).
4. Un element par de pe poziție impară cu un impar de pe poziție pară → **ambele scad cu 1** și ambele poziții devin bune.

Diferența \`nrPare − nrImpare\` nu poate fi modificată de nicio operație; problema cere ca ambele să ajungă 0, posibil doar prin decrementări (cazul 4) pornind de la \`nrPare = nrImpare\`. O soluție optimă aplică doar operații de tip 4, deci răspunsul este \`nrPare = nrImpare\`. □`,
      },
    ],
  },

  // ───────────────────── Restanță 2024 / re-examinare (2 iulie 2024) ─────────────────────
  {
    id: "restanta-2024-real",
    year: "2023-2024",
    title: "Restanță 2024 (re-examinare, oficial)",
    totalPoints: 70,
    problems: [
      {
        id: "r24r-1",
        number: "1",
        points: 25,
        topic: "analiza",
        statement: `**[Analiza unui algoritm generat de IA — 25p]**

Un instrument IA (XT) a primit problema P: *găsește cel mai mic element care este dublul altui element dintr-o listă dată.* XT a răspuns:

\`\`\`
find_smallest_double_element(lst) {
  elements_set = { elem | elem from lst };
  smallest_element = 9999;     // float('inf')
  found = false;
  foreach elem from lst {
    if (elem * 2 in elements_set) {
      smallest_element = min(smallest_element, elem);
      found = true;
    }
  }
  if (found) return smallest_element;
  else return "None";
}
\`\`\`

**(a) (5p)** Ce returnează \`find_smallest_double_element([10,2,5,3,20,4])\`? Justificați.

**(b) (5p)** Algoritmul nu respectă toate cerințele. Care nu sunt respectate? Dați câte un contraexemplu.

**(c) (5p)** Cum trebuie modificat algoritmul pentru a rezolva corect P?

**(d) (5p)** XT spune: *"Complexitatea în cazul cel mai nefavorabil este O(n²), apare la multe coliziuni hash."* Este corect? Justificați/corectați.

**(e) (5p)** Descrieți informal o soluție mai eficientă în cazul cel mai nefavorabil.`,
        hints: [
          "Verifică ce caută algoritmul: el returnează cel mai mic element al cărui DUBLU există, nu cel mai mic element care ESTE dublul altuia.",
          "Inițializarea cu 9999 e o limită artificială; folosește cel mai mare element din listă.",
          "Pentru a rezolva corect: smallest_element = min(smallest_element, 2*elem).",
        ],
        solution: `**(a)** \`2\` — 2 există în listă și \`4 = 2×2\` există în mulțime, iar 10 este mai mare.

**(b)** Două cerințe nerespectate:
1. Returnează doar numere < 9999 (limită artificială din inițializare);
2. Returnează *cel mai mic element al cărui dublu există în listă*, în loc de *cel mai mic element care este dublul altui element*.

**(c)** Inițializare cu cel mai mare element din listă și \`smallest_element = min(smallest_element, 2*elem);\` (raportăm dublul, nu elementul).

**(d)** \`O(n²)\` este corect (în cazul cel mai nefavorabil, din cauza coliziunilor la set/hash), **dar** identificarea cazului cel mai nefavorabil ca fiind "rar / coliziuni hash" este inexactă — cazul nefavorabil ține de structura datelor, nu de un eveniment rar.

**(e)** **Sortare + căutare binară**: sortăm lista (O(n log n)) și pentru fiecare element căutăm binar dublul său → O(n log n) în cazul cel mai nefavorabil, mai bun decât O(n²).`,
      },
      {
        id: "r24r-2",
        number: "2",
        points: 20,
        topic: "nedet",
        statement: `**[NP-Completitudine & Căutare pe șiruri — 20p]**

**(a) (10p)** Definiți clasa de probleme **NPTIME**.

**(b) (10p)** Proiectați un algoritm **nedeterminist** pentru varianta de decizie a căutării unui șir în alt șir, astfel încât faza de ghicire să aibă timp O(log n) iar faza de verificare O(m):

\`\`\`
Input: T[0..n-1], P[0..m-1]
Output: ∃ i . T[i..i+m-1] == P?
\`\`\``,
        hints: [
          "NP = problemele de decizie rezolvate de un algoritm nedeterminist polinomial în cazul cel mai nefavorabil.",
          "Faza de ghicire alege nedeterminist un deplasament i din {0,…,n−m} — alegerea unui index costă O(log) (numărul de biți).",
          "Faza de verificare compară cele m caractere T[i..i+m-1] cu P.",
        ],
        solution: `**(a)** \`NP = { X | X este o problemă de decizie și există un algoritm nedeterminist, polinomial în cazul cel mai nefavorabil, pentru X }\`.

**(b)**
- **Faza de ghicire:** alegem nedeterminist un deplasament \`i ∈ {0,1,…,n−m}\`. Timp \`O(log(n−m)) = O(log n)\` (numărul de biți necesari reprezentării indexului).
- **Faza de verificare:** verificăm dacă \`T[i..i+m-1] == P\`, în timp \`O(m)\` (m comparații de simboluri în cazul cel mai nefavorabil).

Dacă există o potrivire, există o ramură de calcul care ghicește i-ul corect și acceptă; altfel toate ramurile resping. □`,
      },
      {
        id: "r24r-3",
        number: "3",
        points: 25,
        topic: "dp1",
        statement: `**[DiceSum — Programare Dinamică — 25p]**

Problema **DiceSum**: date \`N\` și \`S\`, numărul de moduri de a obține suma totală \`S\` aruncând \`N\` zaruri (fiecare zar ∈ {1..6}). Ordinea contează. Ex.: N=2, S=9 → 4 posibilități.

**(a) (6p)** Câte posibilități sunt pentru N=3, S=5 și care sunt?

**(b) (6p)** Descrieți o soluție DP: recurența, cazurile de bază, unde e rezultatul. Sugestie: \`pos[n][s]\` = în câte moduri se obține suma \`s\` aruncând \`n\` zaruri.

**(c) (7p)** Implementați soluția (cu comentarii).

**(d) (6p)** Complexitatea timp și spațiu, în funcție de N și S? Justificați.`,
        hints: [
          "Caz de bază simplu: pos[0][0] = 1, pos[0][s] = 0 pentru s ≠ 0.",
          "Recurența separă valoarea primului zar: pos[n][s] = Σ pos[n-1][s-d] pentru d de la 1 la 6 (cu s-d ≥ 0).",
          "Răspunsul final e pos[N][S]. 3 bucle imbricate → O(N·S·6).",
        ],
        solution: `**(a)** 6 posibilități: \`1+1+3\`, \`1+2+2\`, \`1+3+1\`, \`2+1+2\`, \`2+2+1\`, \`3+1+1\`.

**(b)** \`pos[n][s]\` = numărul de moduri de a obține suma \`s\` cu \`n\` zaruri.
- **Caz de bază:** \`pos[0][0] = 1\` și \`pos[0][s] = 0\` pentru orice \`s ≠ 0\`.
- **Recurența:** \`pos[n][s] = pos[n-1][s-1] + pos[n-1][s-2] + … + pos[n-1][s-6]\` (termenii cu indice negativ nu se adună). Se consideră separat valoarea primului zar; ordinea contează, deci adunăm toate posibilitățile pentru suma rămasă din celelalte n−1 zaruri.
- **Răspuns:** \`pos[N][S]\`.

**(c) Implementare ALK:**
\`\`\`
// matrice (N+1) x (S+1) cu elemente nule
pos = [ [ 0 | i from [0..S] ] | i from [0..N] ];
pos[0][0] = 1;
for (n = 1; n <= N; n++)
  for (s = 1; s <= S; s++)
    for (dice = 1; dice <= 6; dice++)   // valoarea primului zar
      if (s - dice >= 0)
        pos[n][s] += pos[n-1][s-dice];
print(pos[N][S]);
\`\`\`

**(d)** **Timp** \`O(N × S × 6) = O(N × S)\` (6 = constantă, corpul interior O(1)). **Spațiu** \`O(N × S)\` (dimensiunea tabloului); se poate reduce la \`O(S)\` deoarece o linie depinde doar de cea anterioară.`,
      },
    ],
  },

  // ───────────────────── Sesiune 2022 — Seria A (Săpt. 16) ─────────────────────
  {
    id: "sesiune-2022-A",
    year: "2021-2022",
    title: "Sesiune 2022 — Seria A",
    totalPoints: 40,
    problems: [
      {
        id: "s22A-1",
        number: "1",
        points: 15,
        topic: "kmp",
        statement: `**[Algoritmul KMP — 15p]**

**(a) (5p, AD)** Pentru \`P = ABABACABA\`, funcția eșec e calculată până la \`f[4]\` și se calculează \`f[5]\`:

\`\`\`
i    0 1 2 3 4 5 6 7 8
P[i] A B A B A C A B A
f[i] 0 0 1 2 3 ? ? ? ?
\`\`\`

Pentru a calcula \`f[5]\`, algoritmul compară, în această ordine: \`P[5]\` cu \`P[?]\`, apoi \`P[5]\` cu \`P[?]\`, apoi \`P[5]\` cu \`P[?]\`. Completați și justificați.

**(b) (5p, AA)** Pentru \`P = AAABAAA\` (\`f = 0 1 2 0 1 2 3\`) și \`T = AABAAABAAAA\`: KMP e în starea \`i=0, k=2\`, următorul caracter nu se potrivește. În ce stare avansează? Justificați.

**(c) (5p, AA)** Pentru \`P = AAABAAA\` și \`T = ABCAAABAABXXXXX\`: KMP e în starea \`i=3, k=6\`, mismatch. În ce stare avansează? Justificați.`,
        hints: [
          "f[5]: încearcă să extindă frontiera ABA (f[4]=3), apoi frontiera ei A, apoi frontiera vidă.",
          "Nou i = i + k − f[k-1]; nou k = f[k-1].",
          "(b) f[1]=1 → frontieră A → i=1, k=1. (c) f[5]=2 → frontieră AA → i=7, k=2.",
        ],
        solution: `**(a)** \`P[5]\` se compară, în ordine, cu \`P[3]\`, apoi \`P[1]\`, apoi \`P[0]\`.
Justificare: algoritmul încearcă extinderea frontierei \`ABA\` (lungime f[4]=3, deci compară cu P[3]), apoi a frontierei \`A\` (f[2]=1 → P[1]), apoi a frontierei vide (f[0]=0 → P[0]). Cum \`P[5]='C'\` nu se potrivește cu niciuna, \`f[5]=0\`.

**(b)** \`i = 1, k = 1\`. La mismatch cu k=2: \`f[k-1]=f[1]=1\`, frontiera este \`A\`. Se aliniază frontiera (prefix al pattern-ului) cu sufixul corespunzător din text → nou i = 0 + 2 − 1 = 1, nou k = 1.

**(c)** \`i = 7, k = 2\`. La mismatch cu k=6: \`f[k-1]=f[5]=2\`, frontiera este \`AA\`. Nou i = 3 + 6 − 2 = 7, nou k = 2.`,
      },
      {
        id: "s22A-2",
        number: "2",
        points: 13,
        topic: "dp1",
        statement: `**[Drum crescător maximal — Programare Dinamică — 13p]**

Pentru o matrice \`A\` de întregi de dimensiune \`N×M\`, determinați lungimea celui mai lung drum cu valori strict crescătoare. Primul element e pe (1,1); fiecare pas merge fie jos, fie la dreapta. Lungimea = numărul de elemente.

**(a) (3p, FP)** Formulați problema ca pereche (input, output).

**(b) (4p, AD/PD)** Scrieți recurența pentru \`len[i][j]\`: cazuri de bază, ordine, unde e răspunsul.

**(c) (3p, AD/PD)** Cum se modifică algoritmul pentru a număra și numărul total de drumuri crescătoare maximale (drumuri distincte = diferite pe cel puțin o poziție)?

**(d) (3p, AD)** Găsiți o matrice unde drumul maximal are 3 elemente și există exact 4 = 2² drumuri maximale.`,
        hints: [
          "len[i][j] = lungimea celui mai lung drum valid din (1,1) la (i,j), sau 0 dacă nu există.",
          "len[i][j] = i+j-1 dacă un vecin (sus/stânga) e valid și mai mic, altfel 0.",
          "Pentru numărare adaugă paths[i][j] și însumează paths acolo unde len e maxim.",
        ],
        solution: `**(a)** **Input:** N, M ∈ ℕ⁺ și A[1..N][1..M] cu numere întregi. **Output:** \`k\` astfel încât ∃ (l₁,c₁),…,(lₖ,cₖ) cu (l₁,c₁)=(1,1), (lᵢ,cᵢ) ∈ {(lᵢ₋₁+1,cᵢ₋₁),(lᵢ₋₁,cᵢ₋₁+1)}, A strict crescător de-a lungul drumului, iar k maxim.

**(b)** \`len[i][j]\` = lungimea celui mai lung drum valid din (1,1) la (i,j), sau 0 dacă nu există.
- \`len[1][j] = j\` dacă A[1][1]<…<A[1][j], altfel 0; \`len[i][1] = i\` analog (len = 0 pentru i=0 sau j=0).
- \`len[i][j] = i+j-1\` dacă \`(A[i-1][j]<A[i][j] și len[i-1][j]>0)\` sau \`(A[i][j-1]<A[i][j] și len[i][j-1]>0)\`, altfel 0, pentru 1<i≤N, 1<j≤M.
- Ordinea: linie cu linie. **Răspuns:** \`max(len[i][j])\`.

**(c)** Adăugăm \`paths[i][j]\` = numărul de drumuri distincte ce ajung în (i,j) dacă len[i][j]≠0. Dacă ambele condiții din recurență se îndeplinesc: \`paths[i][j] = paths[i-1][j] + paths[i][j-1]\`; dacă doar una, preia valoarea respectivă; dacă len=0, paths=0. La final se adună paths[i][j] pentru toți (i,j) cu len[i][j] maxim.

**(d)**
\`\`\`
A[3][3]:        cele 4 drumuri:
1 2 3           (1): 1,2,3   (2): 1,2,5
4 5 0           (3): 1,4,5   (4): 1,4,6
6 0 0
\`\`\``,
      },
      {
        id: "s22A-3",
        number: "3",
        points: 12,
        topic: "greedy",
        statement: `**[Selectarea activităților — Greedy — 12p]**

Date \`n\` activități cu \`[s[i], f[i])\`, determinați cardinalul maxim al unei submulțimi de activități care nu se suprapun.

**(a) (3p, FP)** Formulați problema ca pereche (input, output).

**(b) (3p, AD/PD)** O strategie optimă: alege la fiecare pas activitatea care **începe ultima**. Arătați că există întotdeauna o soluție optimă care conține activitatea ce începe ultima.

**(c) (3p, AA)** Care e complexitatea algoritmului care implementează această strategie (sortare descrescătoare după start + scanare)?

**(d) (3p, PD)** Găsiți un exemplu cu optim de 3 activități, unde "se termină prima" și "începe ultima" nu au nicio activitate comună.`,
        hints: [
          "Output: A ⊆ {0,…,n-1} de cardinal maxim cu [s[i],f[i]) ∩ [s[j],f[j]) = ∅ ∀ i≠j ∈ A.",
          "Fie last activitatea cu cel mai mare s[last]. Exchange argument: înlocuiește în OPT activitatea care începe ultima cu last.",
          "Sortarea domină: O(N log N); scanarea e O(N).",
        ],
        solution: `**(a)** **Input:** n, s[0..n-1], f[0..n-1] ∈ ℕ cu s[i]<f[i]; activitatea i ocupă [s[i], f[i]). **Output:** A ⊆ {0,…,n-1} de cardinal maxim a.î. [s[i],f[i]) ∩ [s[j],f[j]) = ∅ pentru orice i≠j ∈ A.

**(b)** Fie \`last\` activitatea cu \`s[last]\` maxim global. Pentru orice soluție optimă OPT: fie last ∈ OPT (gata), fie ∃ lastₒₚₜ ≠ last care începe ultima în OPT. Construim OPT \\ {lastₒₚₜ} ∪ {last}:
1. are același număr de activități ca OPT;
2. activitățile din OPT nu se suprapun (OPT validă);
3. orice a ∈ OPT \\ {lastₒₚₜ} are f[a] ≤ s[lastₒₚₜ] < s[last] ⇒ f[a] < s[last] ⇒ nu se suprapune cu last;
4. deci noua mulțime e validă și optimă și conține last. □

**(c)** Sortarea descrescătoare după timpul de start domină: \`O(N log N)\` (merge sort). După sortare scanarea e O(N), deci complexitatea per ansamblu e dată de sortare.

**(d)** Activități \`[1,3] [2,4] [5,7] [6,8] [9,11] [10,12]\`:
- "se termină prima" → \`[1,3], [5,7], [9,11]\`
- "începe ultima" → \`[2,4], [6,8], [10,12]\`
Ambele au 3 activități, fără nicio activitate comună.`,
      },
    ],
  },

  // ───────────────────── Sesiune 2022 — Seria B (Săpt. 16) ─────────────────────
  {
    id: "sesiune-2022-B",
    year: "2021-2022",
    title: "Sesiune 2022 — Seria B",
    totalPoints: 40,
    problems: [
      {
        id: "s22B-1",
        number: "1",
        points: 15,
        topic: "bm",
        statement: `**[Algoritmul Boyer-Moore — 15p]**

Alfabet Σ = {A,B,C}, pattern \`P = ABABACABA\`.

**(a) (5p, AD)** Completați și justificați tabloul **BC** (bad character): BC[A]=?, BC[B]=?, BC[C]=?. Completați și justificați tabloul **GS** (good suffix) pentru i = 0..8.

**(b) (5p, AA)** Pentru \`P = ABABACABA\`, \`T = ABABAAABA\`, BM e la \`i=0\`, k=3 caractere potrivite, mismatch. Caracterul rău = A, sufixul bun = ABA. Ce deplasare propune regula caracterului rău? Justificați.

**(c) (5p, AA)** Pentru aceleași P și T, ce deplasare propune regula sufixului bun? Justificați.`,
        hints: [
          "BC[c] = cea mai din dreapta poziție pe care apare c în pattern.",
          "Când ultima apariție a caracterului rău e în interiorul sufixului bun, bad character poate propune o deplasare negativă (spre stânga).",
          "Good suffix aliniază sufixul bun ABA cu penultima sa apariție (poziția 2) → deplasare 4.",
        ],
        solution: `**(a)** \`BC[A]=8, BC[B]=7, BC[C]=5\` — cele mai din dreapta poziții pe care apar caracterele în \`ABABACABA\` (indexat 0..8).

Tabloul GS:
\`\`\`
i    0  1  2  3  4  5  6  7  8
P[i] A  B  A  B  A  C  A  B  A
GS[i]-6 -5 -4 -3 -2 -1  2  3  6
\`\`\`
Justificare: penultima apariție a sufixului \`A\` e pe poziția 6, a sufixului \`BA\` pe 3, a sufixului \`ABA\` pe 2; pentru sufixul \`CABA\` nu există (C imaginar, poziția -1); similar pentru restul.

**(b)** Regula caracterului rău propune o deplasare cu **−3** poziții (spre dreapta), adică spre **stânga**:
\`\`\`
ABABAAABA
   !===
ABABACABA
\`\`\`
Ultima apariție a caracterului rău (A) este în interiorul sufixului bun, deci regula caracterului rău propune mutarea pattern-ului spre stânga (deplasare negativă, ignorată în favoarea celeilalte reguli).

**(c)** Regula sufixului bun propune o deplasare cu **4** poziții spre dreapta: se aliniază sufixul bun \`ABA\` cu penultima sa apariție în pattern (cea de la poziția 2).`,
      },
      {
        id: "s22B-2",
        number: "2",
        points: 13,
        topic: "dp2",
        statement: `**[Subșir maximal neadiacent — Programare Dinamică — 13p]**

Dat \`V[1..N]\` cu numere naturale, determinați suma maximă a elementelor unui subșir care nu conține elemente de pe poziții consecutive.

**(a) (3p, FP)** Formulați problema ca pereche (input, output).

**(b) (4p, AD/PD)** Scrieți recurența pentru \`sMax[i]\`: cazuri de bază, ordine, unde e răspunsul.

**(c) (3p, AD/PD)** Se poate folosi memorie suplimentară O(1)? Argumentați.

**(d) (3p, AD)** Dați un exemplu cu 4 elemente unde strategia greedy "alege la fiecare pas elementul maxim fără vecini deja aleși" nu e optimă.`,
        hints: [
          "sMax[i] = suma maximă pentru un subșir neadiacent din V[1..i].",
          "sMax[i] = max(sMax[i-1], sMax[i-2] + V[i]).",
          "Memoria O(1): păstrează doar ultimele 3 valori (sMax1, sMax2, sMax3).",
        ],
        solution: `**(a)** **Input:** N ∈ ℕ⁺ și V[1..N] cu numere naturale. **Output:** sumMax a.î. ∃ k și p₁<p₂<…<pₖ ∈ [1,N] cu pᵢ > pᵢ₋₁+1 și Σ V[pᵢ] = sumMax maxim.

**(b)** \`sMax[i]\` = suma maximă a unui subșir cu elemente neadiacente din V[1..i].
- Bază: \`sMax[1] = V[1]\`, \`sMax[2] = max(V[1], V[2])\`.
- Recurența: \`sMax[i] = max(sMax[i-1], sMax[i-2] + V[i])\` pentru 3 ≤ i ≤ N, în ordine crescătoare.
- **Răspuns:** \`sMax[N]\`.

**(c)** **Da.** O variantă suprascrie vectorul V; alta folosește doar ultimele 3 valori:
\`\`\`
sMax1 = V[1];
sMax2 = max(V[1], V[2]);
for (i = 3; i <= N; i++) {
  sMax3 = sMax2;
  if (sMax3 < sMax1 + V[i]) sMax3 = sMax1 + V[i];
  sMax1 = sMax2;
  sMax2 = sMax3;
}
print(sMax3);
\`\`\`

**(d)** \`V = [2, 3, 2, 0]\`: greedy alege 3, apoi 0 (vecinii lui 3 sunt blocați) → sumă 3. Optim: 2 + 2 = 4 > 3.`,
      },
      {
        id: "s22B-3",
        number: "3",
        points: 12,
        topic: "bkt",
        statement: `**[VERTEX-COVER — Backtracking / Branch & Bound — 12p]**

Pentru un graf neorientat, determinați cardinalul minim al unei submulțimi de noduri astfel încât orice muchie să aibă cel puțin un capăt în submulțime.

**(a) (3p, FP)** Formulați problema ca pereche (input, output).

**(b) (3p, AD/PD)** Descrieți un algoritm de backtracking: cum e o soluție parțială, când e completă, ce pași execută.

**(c) (3p, AA)** Care e complexitatea? Argumentați.

**(d) (3p, PD)** Cum reduceți spațiul de căutare (pruning)? Dați un exemplu de soluție parțială eliminată.`,
        hints: [
          "Soluție parțială s[1..i] ∈ {0,1}: pentru fiecare nod, ales sau nu.",
          "Pruning: dacă ∃ i < level cu s[i]=0 și E[i][level]=1, atunci level trebuie luat (altfel muchia (i,level) rămâne neacoperită).",
          "Complexitatea dominantă: O(2^N) soluții parțiale.",
        ],
        solution: `**(a)** **Input:** G=(V,E) cu N noduri, V={1,…,N}, E[i][j]=1 dacă (i,j) ∈ E. **Output:** cmin a.î. ∃ S ⊆ V cu |S|=cmin și ∀(i,j) cu E[i][j]=1, i ∈ S sau j ∈ S, iar cmin minim.

**(b)** O soluție parțială \`s[1..i]\` stabilește pentru primele i noduri dacă au fost adăugate (s[i]=1) sau nu (s[i]=0). Soluție completă: \`s[1..N]\` (apelul pentru N+1). Recursiv, pe fiecare nivel = nod alegem cele două variante (includere / neincludere) și apelăm nivelul următor.

**(c)** \`O(2^N × N²)\` în cazul cel mai nefavorabil; partea semnificativă e \`O(2^N)\`, deoarece soluțiile parțiale pentru primele i noduri sunt de două ori mai multe decât pentru i−1.

**(d)** **Pruning:** la nivelul \`level\`, dacă ∃ i ∈ [1, level−1] cu s[i]=0 și E[i][level]=1, atunci nodul \`level\` **trebuie** luat (mustTake=1), altfel muchia (i, level) rămâne neacoperită.
\`\`\`
minCover = N; s = [0 | i from [1..(N+1)]]; taken = 0;
bkt(level) {
  if (level == N+1) { if (taken < minCover) minCover = taken; }
  else {
    mustTake = 0;
    for (i = 1; i < level; i++)
      if (E[i][level] && s[i] == 0) mustTake = 1;
    for (s[level] = mustTake; s[level] <= 1; s[level]++) {
      taken += s[level];
      bkt(level+1);
      taken -= s[level];
    }
  }
}
\`\`\`
Exemplu: V={1,2,3}, E={(1,2)}. Soluția parțială \`s=[0,0,?]\` e invalidă (muchia (1,2) neacoperită) și nu se mai încearcă variantele pentru nodul 3. (Branch & bound: tăiem și ramurile în care taken + estimarea depășește minCover curent.)`,
      },
    ],
  },

  // ───────────────────── Restanță 2021 (22 iunie 2021) — 3 subiecte ─────────────────────
  {
    id: "restanta-2021-s1",
    year: "2020-2021",
    title: "Restanță 2021 — Subiectul 1",
    totalPoints: 30,
    problems: [
      {
        id: "r21s1-1",
        number: "1",
        points: 30,
        topic: "analiza",
        statement: `**[Formalizare problemă & proiectare algoritm — 30p]**

2520 e cel mai mic număr divizibil cu toate numerele de la 1 la 10. Care este cel mai mic număr pozitiv divizibil cu toate numerele de la \`m\` la \`n\`?

**(a) (5p)** Descrieți formal (ca predicat) ce înseamnă "număr pozitiv divizibil cu toate numerele de la m la n".

**(b) (5p)** Precizați problema ca pereche (input, output), cu formulări matematice.

**(c) (15p)** Scrieți în Alk un algoritm care rezolvă problema.

**(d) (5p)** Argumentați corectitudinea (precizați invariantul buclei).`,
        hints: [
          "isDivByAllPred(m,n,x) ≡ ∀k. m ≤ k ≤ n ⇒ x % k = 0.",
          "Caută cel mai mic x ≥ n care satisface predicatul, pornind de la x = n.",
          "Invariantul for-ului: ∀k. m ≤ k < i ⇒ x % k = 0.",
        ],
        solution: `**(a)** \`isDivByAllPred(m,n,x) ≡ ∀k. m ≤ k ≤ n ⇒ x % k = 0\`.

**(b)** **Input:** m, n ∈ ℕ, 0 < m ≤ n (se evită împărțirea la 0). **Output:** \`x\` cu \`isDivByAllPred(m,n,x) ∧ ∀y. isDivByAllPred(m,n,y) ⇒ x ≤ y\`.

**(c)**
\`\`\`
isDivByAll(m, n, x) {
  for (i = m; i <= n; ++i)
    if (x % i != 0) return false;
  return true;
}
smallest(m, n) {
  x = n;
  while (true)
    if (isDivByAll(m, n, x)) return x;
    else ++x;
}
\`\`\`

**(d)** Funcția \`isDivByAll\` descrie în Alk predicatul \`isDivByAllPred\`. Invariantul for-ului: \`∀k. m ≤ k < i ⇒ x % k = 0\`. La terminare i = n+1, ceea ce implică \`isDivByAllPred(m,n,x)\`. Cum \`smallest\` testează valorile lui x în ordine crescătoare pornind de la n, prima care satisface predicatul este cea minimă.`,
      },
    ],
  },
  {
    id: "restanta-2021-s2",
    year: "2020-2021",
    title: "Restanță 2021 — Subiectul 2",
    totalPoints: 60,
    problems: [
      {
        id: "r21s2-1",
        number: "1",
        points: 30,
        topic: "analiza",
        statement: `**[Formalizare & proiectare — triunghi dreptunghic — 30p]**

Pentru perimetrul \`p\` al unui triunghi dreptunghic cu laturi întregi {a,b,c}, pentru p=120 există 3 soluții. Care este cea mai mare valoare \`p ≤ n\` pentru care mulțimea soluțiilor e nevidă?

**(a) (5p)** Predicat: ce înseamnă "mulțimea soluțiilor pentru p e nevidă".

**(b) (5p)** Problema ca pereche (input, output).

**(c) (15p)** Algoritm în Alk.

**(d) (5p)** Argumentați corectitudinea.`,
        hints: [
          "nonEmptySolPred(p) := ∃a,b,c. a+b+c = p ∧ c² = a² + b².",
          "Pentru a și b cunoscute, c = p − a − b. Iterează a, b cu a ≤ b.",
          "maxP(n) caută descrescător de la n primul p cu predicatul adevărat.",
        ],
        solution: `**(a)** \`nonEmptySolPred(p) := ∃a,b,c. a+b+c = p ∧ c*c = a*a + b*b\`.

**(b)** **Input:** n ∈ ℕ⁺ (fără triunghiuri degenerate). **Output:** \`p\` cu \`p ≤ n ∧ nonEmptySolPred(p) ∧ ∀q.(q ≤ n ∧ nonEmptySolPred(q)) ⇒ q ≤ p\`.

**(c)**
\`\`\`
nonEmptySol(p) {
  for (a = 1; a < p; ++a)
    for (b = a; a + b < p; ++b) {
      c = p - a - b;
      if (c*c == a*a + b*b) return true;
    }
  return false;
}
maxP(n) {
  while (n > 0) {
    if (nonEmptySol(n)) return n;
    --n;
  }
  return -1;
}
\`\`\`

**(d)** Putem presupune a ≤ b (rolurile lui a și b sunt simetrice). Dacă a și b sunt cunoscute, c = p − a − b. \`nonEmptySol(p)\` testează toate perechile (a,b) cu 1 ≤ a ≤ b < p; la prima care satisface proprietatea întoarce true, altfel false. \`maxP\` caută descrescător de la n, deci întoarce cel mai mare p valid.`,
      },
      {
        id: "r21s2-2",
        number: "2",
        points: 20,
        topic: "prob",
        statement: `**[Analiză algoritm — complexitate medie — 20p]**

\`\`\`
for (i=n; i > 0; --i)
  uniform a[i] from {1..10};
i = 1; j = -1;
while (i < n) {
  if (a[i] == a[i + 1]) { j = i; i = n; }
  else i = i + 1;
}
\`\`\`

Analizați conform șablonului: (a) dimensiunea instanței; (c) tipul de cost; (d) variabila indicator \`Yᵢ\` pentru \`a[i]==a[i+1]\`; (e) când e evaluată comparația; (f) P(Yᵢ ≠ 0); (g) N ca variabilă aleatoare; (h) numărul mediu de comparații E(N).`,
        hints: [
          "Yᵢ = 1 dacă se evaluează comparația a[i]==a[i+1], 0 altfel.",
          "Comparația a[i]==a[i+1] se evaluează doar dacă a[k]≠a[k+1] pentru k=1..i-1.",
          "P(a[j]==a[j+1]) = 10/100; deci P(Yᵢ≠0) = (90/100)^(i-1) = (9/10)^(i-1).",
        ],
        solution: `**(a)** \`n = a.size() − 1\`. **(c)** Uniform; costul unei comparații = 1.

**(d)** \`Yᵢ = 1\` dacă se evaluează comparația \`a[i]==a[i+1]\`, altfel 0.

**(e)** Comparația \`a[i]==a[i+1]\` se evaluează dacă \`a[k] ≠ a[k+1]\` pentru k = 1,…,i−1 (i−1 cazuri).

**(f)** Valori posibile pentru a[i]: 1..10 (P(a[k]=j) = 1/10). Perechi (a[j],a[j+1]): 100; cele care satisfac a[j]=a[j+1]: 10 → P = 10/100. Deci \`P(Yᵢ ≠ 0) = (90/100)^(i-1) = (9/10)^(i-1)\`.

**(g)** \`N = Σᵢ₌₁ⁿ Yᵢ\`.

**(h)** \`E(N) = Σᵢ₌₁ⁿ E(Yᵢ) = Σᵢ₌₁ⁿ (9/10)^(i-1)\` (media unei variabile indicator = probabilitatea ca ea să fie ≠ 0).`,
      },
      {
        id: "r21s2-3",
        number: "3",
        points: 25,
        topic: "dp1",
        statement: `**[Programare Dinamică — plata cu bancnote — 25p]**

Plata unei sume cu număr minim de bancnote din mulțimea \`{1, 7, 8}\`.

**(a) (5p)** Formulați problema ca pereche input-output.

**(b) (5p)** Exemplu de instanță unde numărul minim de bancnote este 3.

**(c)** Algoritm DP: (i) subproblemele; (ii) substructura optimă (specifică); (iii) relația de recurență; (iv) implementare (funcție recursivă memoizată).`,
        hints: [
          "d(i) = numărul minim de bancnote pentru a plăti suma i.",
          "Substructura optimă: dacă b₁..bₖ optim pentru i, atunci b₁..bₖ₋₁ optim pentru i − bₖ.",
          "d(i) = 1 + min{ d(i-1), d(i-7), d(i-8) } (argumente ≥ 0); d(0) = 0.",
        ],
        solution: `**(a)** **Input:** n ∈ ℕ (suma de plătit). **Output:** b₁,…,bₖ ∈ {1,7,8} cu b₁+…+bₖ = n și k minim.

**(b)** Pentru n = 3 sunt necesare k = 3 bancnote: 1 + 1 + 1.

**(c)**
- **(i)** Pentru 0 ≤ i ≤ n: \`d(i)\` = numărul minim de bancnote pentru a plăti suma i.
- **(ii)** Substructura optimă: dacă \`b₁+…+bₖ\` e o soluție optimă pentru i, atunci \`b₁+…+bₖ₋₁\` e optimă pentru \`i − bₖ\`.
- **(iii)** Recurența: \`d(0) = 0\`; \`d(i) = 1 + min{ d(k) | k ∈ {i-1, i-7, i-8}, k ≥ 0 }\`.
- **(iv)** Implementare: funcție recursivă cu memoizare a valorilor \`d(i)\` (ca la curs) — fiecare \`d(i)\` calculat o singură dată, O(n) subprobleme.`,
      },
    ],
  },
  {
    id: "restanta-2021-s3",
    year: "2020-2021",
    title: "Restanță 2021 — Subiectul 3",
    totalPoints: 60,
    problems: [
      {
        id: "r21s3-1",
        number: "1",
        points: 30,
        topic: "analiza",
        statement: `**[Formalizare & proiectare — ecuația Pell — 30p]**

Ecuații \`x² − d·y² = 1\` (x, y întregi). Pentru d=13, soluția cu x minim e 649² − 13·180² = 1. Dacă d e pătrat perfect nu există soluții pozitive. Determinați cea mai mare soluție minimă în x pentru d ≤ n.

**(a) (5p)** Predicat: "soluție cu x minim".

**(b) (5p)** Problema ca pereche (input, output).

**(c) (15p)** Algoritm în Alk.

**(d) (5p)** Argumentați corectitudinea.`,
        hints: [
          "isSol(x,d) ≡ ∃y. x>0 ∧ y>0 ∧ x² − d·y² = 1.",
          "isSolMin(x,d) ≡ isSol(x,d) ∧ ∀x'. isSol(x',d) ⇒ x ≤ x'.",
          "Sări peste d pătrat perfect; pentru fiecare d generează x crescător.",
        ],
        solution: `**(a)** \`isSol(x,d) ≡ ∃y. x>0 ∧ y>0 ∧ x*x − d*y*y = 1\`; \`isSolMin(x,d) ≡ isSol(x,d) ∧ ∀x'. isSol(x',d) ⇒ x ≤ x'\`.

**(b)** **Input:** n ∈ ℕ⁺. **Output:** \`x\` cu \`∃d. isSolMin(x,d) ∧ ∀x',d'. isSolMin(x',d') ⇒ x' ≤ x\` (cu d, d' ≤ n).

**(c)**
\`\`\`
solMin(d) {
  for (x = 1; true; ++x)
    if ((x*x - 1) % d == 0) {
      y = int(sqrt((x*x - 1) / d));
      if (y > 0 && x*x - d*y*y == 1) return x;
    }
}
largest(n) {
  max = 0;
  for (d = 1; d <= n; ++d) {
    a = int(sqrt(d));
    if (a*a != d) {            // d nu e pătrat perfect
      x = solMin(d);
      if (x > max) max = x;
    }
  }
  return max;
}
\`\`\`

**(d)** \`solMin(d)\` întoarce x cu \`isSolMin(x,d)\`: cunoscând x, \`y = int(sqrt((x²-1)/d))\`; valorile lui x sunt generate crescător, deci prima validă e minimă. \`largest(n)\` calculează soluțiile minime pentru d = 1..n, exceptând d pătrat perfect, și păstrează maximul.`,
      },
      {
        id: "r21s3-2",
        number: "2",
        points: 20,
        topic: "prob",
        statement: `**[Analiză algoritm — complexitate medie — 20p]**

\`\`\`
for (i=0; i < n; ++i)
  uniform a[i] from {2..11};
i = n;
found = false;
while (i >= 0 && !found) {
  i = i - 2;
  if (a[i] % 3 == 0) found = true;
}
\`\`\`

Analizați conform șablonului: (a) dimensiunea instanței; (c) tipul de cost; (d) indicatorul \`Wᵢ\` pentru \`a[i]%3==0\`; (e) când e evaluată; (f) P(Wᵢ ≠ 0); (g) N; (h) E(N).`,
        hints: [
          "Wᵢ = 1 dacă se evaluează a[i]%3==0, 0 altfel. Bucla scade i cu 2.",
          "Se evaluează dacă a[k]%3≠0 pentru k=i+2,i+4,…,n-2 ((n-i-2)/2 cazuri).",
          "Valori {2..11}: cele divizibile cu 3 sunt 3,6,9 → 3/10, deci P(Wᵢ≠0) = (7/10)^((n-i-2)/2).",
        ],
        solution: `**(a)** \`n = a.size()\`. **(c)** Uniform; costul unei comparații = 1.

**(d)** \`Wᵢ = 1\` dacă se evaluează \`a[i] % 3 == 0\`, altfel 0.

**(e)** Se evaluează dacă \`a[k] % 3 ≠ 0\` pentru k = i+2, i+4, …, n−2 (\`(n−i−2)/2\` cazuri).

**(f)** Valori posibile a[i]: 2..11 (10 valori, P = 1/10). Divizibile cu 3: 3, 6, 9 → P(j%3=0) = 3/10. Deci \`P(Wᵢ ≠ 0) = (7/10)^((n−i−2)/2)\`.

**(g)** \`N = Σᵢ₌₀ⁿ⁻¹ Wᵢ\`.

**(h)** \`E(N) = Σᵢ₌₀ⁿ⁻¹ E(Wᵢ) = Σᵢ₌₀ⁿ⁻¹ (7/10)^((n−i−2)/2)\`.`,
      },
      {
        id: "r21s3-3",
        number: "3",
        points: 25,
        topic: "bkt",
        statement: `**[Branch-and-Bound — Rucsacul discret — 25p]**

Problema discretă a rucsacului.

**(a) (5p)** Formulați problema ca pereche input-output.

**(b) (5p)** Exemplu cu 3 obiecte unde răspunsul optim conține 2 obiecte.

**(c)** Algoritm branch-and-bound (nu DP): (i) soluția parțială; (ii) soluție inițială, succesori, soluție viabilă, soluție completă; (iii) o euristică de aproximare a câștigului (precizie, supra/sub-aproximare); (iv) arborele de căutare.`,
        hints: [
          "p[0..i-1] ∈ {0,1}: obiectul j ales sau nu. Soluția inițială = vectorul vid.",
          "Viabilă dacă suma greutăților ≤ W. Completă dacă i = k.",
          "Euristica: câștigul greedy al rucsacului CONTINUU pentru obiectele rămase — supra-aproximare.",
        ],
        solution: `**(a)** **Input:** k ∈ ℕ (nr. obiecte), c[0..k-1] (câștiguri), g[0..k-1] (greutăți), W (capacitate). **Output:** p[0..k-1] ∈ {0,1}ᵏ cu Σ p[i]·g[i] ≤ W și Σ p[i]·c[i] maxim.

**(b)** k=3, W=10, g=[5,4,6], c=[8,7,9]. Optimul are câștig 16 și conține obiectele de greutate 4 și 6.

**(c)**
- **(i)** Pentru 0 ≤ i ≤ k: \`p[0..i-1] ∈ {0,1}ⁱ\` (p[j] = obiectul j ales sau nu); pentru i=0, vectorul vid.
- **(ii)** Soluția inițială = vectorul vid. Succesorii lui \`p[0..i-1]\` (i<k): \`[…,0]\` și \`[…,1]\`. Viabilă dacă \`Σ₀≤j≤i-1 p[j]·g[j] ≤ W\`. Completă dacă i = k.
- **(iii)** Euristică: \`h(p[0..i-1])\` = câștigul întors de algoritmul **greedy pentru rucsacul continuu** aplicat pe k'=k−i obiecte rămase, W' = W − greutatea ocupată. Se calculează eficient în O(k') (obiectele ordonate după câștig unitar), e mai precisă decât suma tuturor câștigurilor rămase și e o **supra-aproximare** (necesar pentru un bound corect la maximizare).
- **(iv)** Arbore DFS branch-and-bound: în fiecare nod marcăm câștigul parțial și câștigul suplimentar estimat de euristică; tăiem ramurile neviabile (depășesc W) și pe cele unde câștig_parțial + euristică ≤ optimul curent.`,
      },
    ],
  },

  // ───────────────────── Sesiune 2021 (2 iunie 2021) — 3 subiecte ─────────────────────
  {
    id: "sesiune-2021-s1",
    year: "2020-2021",
    title: "Sesiune 2021 — Subiectul 1",
    totalPoints: 60,
    problems: [
      {
        id: "ses21s1-1",
        number: "1",
        points: 15,
        topic: "analiza",
        statement: `**[Context KMP — frontiera maximă & analiză — 15p]**

**(a) (6p)** Scrieți în Alk un algoritm iterativ care determină frontiera (bordura) de lungime maximă \`maxFr(v)\`, folosind definiția: u este frontieră a lui v dacă e și prefix și sufix al lui v.

**(b) (9p)** Determinați timpul de execuție în cazul cel mai nefavorabil: (i) dimensiunea instanței; (ii) operații analizate; (iii) tipul de cost; (iv) cazul cel mai nefavorabil; (v) timpul pe iterație; (vi) numărul maxim de iterații; (vii) timpul total.`,
        hints: [
          "isBorder(v,k) testează dacă v[k..n-1] e frontieră comparând prefixul cu sufixul.",
          "maxFr scanează toate sufixele și reține cea mai lungă frontieră.",
          "isBorder e O(i), apelat de n-1 ori cu i crescător → Σ O(i) = O(n²).",
        ],
        solution: `**(a) Algoritm:**
\`\`\`
// testează dacă v[k..v.size()-1] este frontieră
isBorder(v, k) {
  i = 0;
  while (k < v.size() && v[i] == v[k]) { i = i+1; k = k+1; }
  if (k == v.size()) return true;
  else return false;
}
// determină frontiera maximă
maxFr(v) {
  n = v.size(); k = 0;
  for (i = 1; i < n; ++i)
    if (isBorder(v, n-i)) k = i;
  if (k == 0) return [];
  return [v[j] | j from [0..k-1]];
}
\`\`\`

**(b) Analiză:**
- **(i)** n = v.size().
- **(ii)** comparații în care intervin elementele tabloului.
- **(iii)** uniform: costul unei operații este O(1).
- **(iv)** cazul cel mai nefavorabil: orice subșir v[0..i-1], 1 ≤ i < n, este frontieră (numărul maxim de comparații).
- **(v)** timpul pe iterație: O(i) (dat de isBorder).
- **(vi)** numărul maxim de iterații: n-1.
- **(vii)** T(n) = Σᵢ₌₁ⁿ⁻¹ O(i) = **O(n²)**.`,
      },
      {
        id: "ses21s1-2",
        number: "2",
        points: 15,
        topic: "regex",
        statement: `**[Expresii regulate — 15p]**

**(a) (7p)** Construiți automatul pentru expresia \`b(cb)*b(a)*b\`.

**(b) (8p)** Explicați căutarea unui șir descris de această expresie în textul \`abbcbbaabaabababba\`, folosind șablonul stare/decizie.`,
        hints: [
          "Stări 0..4: b duce 0→1; bucla (cb)* pe stările 1↔2; b duce 1→3; bucla (a)* pe starea 3; b duce 3→4 (acceptare).",
          "Se parcurge textul cu o stare curentă; la nepotrivire se resetează la starea inițială și i++.",
          "Prima potrivire e bcbbaab la pozițiile 2-8.",
        ],
        solution: `**(a)** Automat cu stările 0→1→(buclă cb)→3→(buclă a)→4:
\`\`\`
start 0 --b--> 1 --c--> 2 --b--> 1   (bucla (cb)*)
              1 --b--> 3 --a--> 3     (bucla (a)*)
              3 --b--> 4 (acceptare)
\`\`\`

**(b)** Căutare în \`abbcbbaabaabababba\` (indexat 0..17):
\`\`\`
i  j  stare  decizie/acțiune
0  0  0      nepotrivire, s = stare inițială (0), i++
1  1  0      potrivire, s = next(0,b), j++
1  2  1      potrivire, s = next(1,b), j++
1  3  3      nepotrivire, s = stare inițială (0), i++, j=i
2  2  0      potrivire, s = next(0,b), j++
2  3  1      potrivire, s = next(1,c), j++
2  4  2      potrivire, s = next(2,b), j++
2  5  1      potrivire, s = next(1,b), j++
2  6  3      potrivire, s = next(3,a), j++
2  7  3      potrivire, s = next(3,a), j++
2  8  3      potrivire, s = next(3,b), j++
2  9  4      șir acceptat 2-8: bcbbaab
\`\`\``,
      },
      {
        id: "ses21s1-3",
        number: "3",
        points: 30,
        topic: "dp1",
        statement: `**[Programare Dinamică — Rucsacul discret (0/1) — 30p]**

Problema discretă a rucsacului (obiecte nesecționabile).

**(a) (5p)** Formulați problema ca pereche input-output.

**(b) (5p)** Dați un exemplu unde greedy după raportul câștig/greutate descrescător NU produce optimul.

**(c) (20p)** Algoritm DP: (i) subproblemele; (ii) substructura optimă; (iii) relația de recurență; (iv) implementare (funcție recursivă memoizată).`,
        hints: [
          "d(i,W) = câștigul maxim folosind primele i obiecte și capacitate W.",
          "Greedy după câștig/greutate eșuează: g=[5,5,6], c=[4,4,7], G=10 → greedy ia doar obiectul 2 (câștig 7), optim 0+1 = 8.",
          "d(i,W) = max(d(i-1, W-g[i-1]) + c[i-1], d(i-1, W)).",
        ],
        solution: `**(a)** **Input:** n ∈ ℕ (nr. obiecte), c[0..n-1] (câștiguri), g[0..n-1] (greutăți), G (capacitate). **Output:** p[0..n-1] ∈ {0,1}ⁿ cu Σ p[i]·g[i] ≤ G și Σ p[i]·c[i] maxim.

**(b)** n=3, G=10, g=[5,5,6], c=[4,4,7]. Câștigul unitar maxim e al obiectului 2 (7/6); după ce-l alegem, nu mai încape nimic → greedy obține 7. Optimul: obiectele 0 și 1 → câștig 8.

**(c)**
- **(i)** Pentru 0 ≤ i ≤ n, 0 ≤ W ≤ G: \`d(i,W)\` = câștigul maxim obținut folosind primele i obiecte și capacitate (exact/cel mult) W.
- **(ii)** Pentru i > 0: dacă p[0..i-1] e soluție optimă pentru (i,W), atunci p[0..i-2] e optimă pentru (i-1, W − p[i-1]·g[i-1]).
- **(iii)** \`d(0,0) = 0\`; \`d(0,W) = −∞\` pentru W > 0; pentru i > 0: \`d(i,W) = max(d(i-1, W-g[i-1]) + c[i-1], d(i-1, W))\`.
- **(iv)** Funcție recursivă memoizată pe (i,W), fiecare stare calculată o singură dată (ca la curs); complexitate O(n·G).`,
      },
    ],
  },
  {
    id: "sesiune-2021-s2",
    year: "2020-2021",
    title: "Sesiune 2021 — Subiectul 2",
    totalPoints: 60,
    problems: [
      {
        id: "ses21s2-1",
        number: "1",
        points: 15,
        topic: "analiza",
        statement: `**[Context KMP — relația ≤fr & analiză — 15p]**

**(a) (6p)** Scrieți în Alk un algoritm care decide dacă \`u ≤fr v\`, folosind caracterizarea: u ≤fr v ddacă ∃ j cu u = maxFrʲ(v). Funcția \`maxFr(v)\` se consideră cunoscută.

**(b) (9p)** Determinați timpul de execuție în cazul cel mai nefavorabil conform șablonului (i)–(vii).`,
        hints: [
          "Se aplică maxFr repetat asupra lui v până când dimensiunea scade sub |u| sau se găsește u.",
          "Caz nefavorabil: toate caracterele din v egale și |u|=1.",
          "La fiecare pas vj.size() scade cu 1 → n-1 iterații; fiecare maxFr poate fi O(n).",
        ],
        solution: `**(a) Algoritm:**
\`\`\`
leFr(u, v) {
  j = 0;
  vj = v;                            // vj == maxFr^0(v) = v
  while (vj.size() >= u.size() && u != vj) {   // vj == maxFr^j(v)
    vj = maxFr(vj);                  // vj == maxFr^{j+1}(v)
    j = j+1;
  }
  if (u == vj) return true;
  return false;
}
\`\`\`

**(b) Analiză:**
- **(i)** n = v.size (u ≤fr v implică u.size() ≤ v.size()).
- **(ii)** comparații între elementele lui u și ale lui v.
- **(iii)** uniform: costul unei comparații este O(1).
- **(iv)** cazul cel mai nefavorabil: toate caracterele din v egale și u.size = 1.
- **(v)** timpul pe iterație: g(j) = T(maxFr(vⱼ)) (poate fi O(n)).
- **(vi)** numărul maxim de iterații: n-1 (vj.size() scade cu 1 la fiecare pas).
- **(vii)** T(n) = Σⱼ₌₁ⁿ⁻¹ g(j) (de ex. O(n²) dacă fiecare maxFr e O(n)).`,
      },
      {
        id: "ses21s2-2",
        number: "2",
        points: 15,
        topic: "regex",
        statement: `**[Expresii regulate — 15p]**

**(a) (7p)** Construiți automatul pentru expresia \`xy(zux)*(yz)*x\`.

**(b) (8p)** Explicați căutarea unui șir descris de această expresie în textul \`uxxyzuxxyzxyzuxyzx\`, folosind șablonul stare/decizie.`,
        hints: [
          "Stări 0..7: x,y duc 0→1→2; bucla (zux)* pe 2→3→4→2; bucla (yz)* pe 5→6→5; x duce la acceptare 7.",
          "Stările 2 și 5 pot fi contopite pentru un automat determinist; tranziții spontane (ε) sunt posibile.",
          "Prima potrivire e xyzuxx la pozițiile 2-7.",
        ],
        solution: `**(a)** Automat cu stările 0..7:
\`\`\`
start 0 --x--> 1 --y--> 2
              2 --z--> 3 --u--> 4 --x--> 2   (bucla (zux)*)
              (2 → 5 spontan) 5 --y--> 6 --z--> 5   (bucla (yz)*)
              5 --x--> 7 (acceptare)
\`\`\`
Observație: stările 2 și 5 pot fi contopite pentru a obține un automat determinist.

**(b)** Căutare în \`uxxyzuxxyzxyzuxyzx\`:
\`\`\`
i  j  stare  decizie/acțiune
0  0  0      nepotrivire, s = stare inițială (0), i++
1  1  0      potrivire, s = next(0,x), j++
1  2  1      nepotrivire, s = stare inițială (0), i++, j=i
2  2  0      potrivire, s = next(0,x), j++
2  3  1      potrivire, s = next(1,y), j++
2  4  2      potrivire, s = next(2,z), j++
2  5  3      potrivire, s = next(3,u), j++
2  6  4      potrivire, s = next(4,x), j++
2  7  2      spontan
2  7  5      potrivire, s = next(5,x), j++
2  8  7      șir acceptat 2-7: xyzuxx
\`\`\``,
      },
      {
        id: "ses21s2-3",
        number: "3",
        points: 30,
        topic: "greedy",
        statement: `**[Greedy — plata cu bancnote — 30p]**

Plata unei sume cu număr minim de bancnote din \`{1, 5, 10, 50, 100, 200, 500}\`.

**(a) (5p)** Formulați problema ca pereche input-output.

**(b) (5p)** Exemplu de instanță unde numărul minim de bancnote este 3.

**(c) (20p)** Algoritm greedy: (i) subproblemele; (ii) substructura optimă; (iii) lema de alegere greedy; (iv) implementare.`,
        hints: [
          "d(i) = numărul minim de bancnote pentru suma i.",
          "Lema de alegere: pentru i cu c[j] ≤ i < c[j+1], există o soluție optimă cu prima bancnotă c[j] (cea mai mare ≤ i).",
          "Sistemul {1,5,10,50,100,200,500} e canonic → greedy e optim.",
        ],
        solution: `**(a)** **Input:** n ∈ ℕ (suma). **Output:** b₁,…,bₖ ∈ {1,5,10,50,100,200,500} cu b₁+…+bₖ = n și k minim.

**(b)** Pentru n = 16: k = 3 bancnote (1 + 5 + 10).

**(c)**
- **(i)** Pentru 0 ≤ i ≤ n: \`d(i)\` = numărul minim de bancnote pentru suma i.
- **(ii)** Dacă b₁+…+bₖ e optimă pentru i, atunci b₁+…+bₖ₋₁ e optimă pentru i − bₖ.
- **(iii)** Fie c = [1,5,10,50,100,200,500]. Pentru i > 0 cu c[j] ≤ i < c[j+1], există o soluție optimă pentru i cu b₁ = c[j].
- **(iv)** La fiecare pas alege cea mai mare bancnotă ≤ suma rămasă și o scade (ca la curs); corect pentru că sistemul e canonic.`,
      },
    ],
  },
  {
    id: "sesiune-2021-s3",
    year: "2020-2021",
    title: "Sesiune 2021 — Subiectul 3",
    totalPoints: 60,
    problems: [
      {
        id: "ses21s3-1",
        number: "1",
        points: 15,
        topic: "analiza",
        statement: `**[Context Boyer-Moore — funcția Z & analiză — 15p]**

**(a) (6p)** Scrieți în Alk un algoritm care calculează \`Z[j]\` = lungimea celui mai lung subșir care pleacă din \`p[j]\` și este prefix al lui \`p\`.

**(b) (9p)** Determinați timpul de execuție în cazul cel mai nefavorabil conform șablonului (i)–(vii).`,
        hints: [
          "Z(p,j) compară p[0..] cu p[j..] cât timp se potrivesc.",
          "Caz nefavorabil: j=1 și p[j..n-1] e prefix al lui p (toate caracterele egale).",
          "Pentru un singur j fixat: O(n) comparații, deci T = O(n).",
        ],
        solution: `**(a) Algoritm:**
\`\`\`
Z(p, j) {
  n = p.size();
  i = 0;
  while (j+i < n && p[i] == p[j+i]) i = i+1;
  return i;
}
\`\`\`

**(b) Analiză:**
- **(i)** n = p.size.
- **(ii)** comparații între elementele lui p.
- **(iii)** uniform: costul unei comparații este O(1).
- **(iv)** cazul cel mai nefavorabil: j = 1 și subșirul p[j..n-1] este prefix al lui p.
- **(v)** timpul pe iterație: O(1) (o comparație).
- **(vi)** numărul maxim de iterații: n-1.
- **(vii)** T(n) = Σ O(1) = **O(n)**.`,
      },
      {
        id: "ses21s3-2",
        number: "2",
        points: 15,
        topic: "regex",
        statement: `**[Expresii regulate — 15p]**

**(a) (7p)** Construiți automatul pentru expresia \`(mn)*pq(mnq)*n\`.

**(b) (8p)** Explicați căutarea unui șir descris de această expresie în textul \`nmmnmnpqnmnpqmnqn\`, folosind șablonul stare/decizie.`,
        hints: [
          "Bucla (mn)* pe stările 0↔1; p,q duc spre 2→3; bucla (mnq)* pe 3→4→5→3; n duce la acceptare 6.",
          "La nepotrivire se resetează la starea inițială și i++.",
          "Prima potrivire e mnmnpqn la pozițiile 2-8.",
        ],
        solution: `**(a)** Automat cu stările 0..6:
\`\`\`
start 0 --m--> 1 --n--> 0    (bucla (mn)*)
              0 --p--> ... --q--> 3
              3 --m--> 4 --n--> 5 --q--> 3   (bucla (mnq)*)
              3 --n--> 6 (acceptare)
\`\`\`

**(b)** Căutare în \`nmmnmnpqnmnpqmnqn\`:
\`\`\`
i  j  stare  decizie/acțiune
0  0  0      nepotrivire, s = stare inițială (0), i++
1  1  0      potrivire, s = next(0,m), j++
1  2  1      nepotrivire, s = stare inițială (0), i++, j=i
2  2  0      potrivire, s = next(0,m), j++
2  3  1      potrivire, s = next(1,n), j++
2  4  0      potrivire, s = next(0,m), j++
2  5  1      potrivire, s = next(1,n), j++
2  6  0      potrivire, s = next(0,p), j++
2  7  2      potrivire, s = next(2,q), j++
2  8  3      potrivire, s = next(3,n), j++
2  9  6      șir acceptat 2-8: mnmnpqn
\`\`\``,
      },
      {
        id: "ses21s3-3",
        number: "3",
        points: 30,
        topic: "bkt",
        statement: `**[Branch-and-Bound — Maximum Independent Set (MIS) — 30p]**

MIS: dat un graf neorientat, determinați o submulțime M de noduri de cardinal maxim astfel încât niciun nod din M să nu fie conectat cu altul din M.

**(a) (5p)** Formulați problema ca pereche input-output.

**(b) (5p)** Exemplu cu 5 noduri unde răspunsul e o mulțime de cardinal 3.

**(c) (20p)** Algoritm branch-and-bound: (i) soluția parțială; (ii) soluție inițială, succesori, viabilitate, soluție completă; (iii) o euristică; (iv) arborele de căutare.`,
        hints: [
          "p[0..k-1] ∈ {0,1}: nodul i face parte din M sau nu.",
          "Viabilă dacă nu există i<j aleși (p[i]=p[j]=1) cu {i,j} ∈ E.",
          "Exemplu: V={0,1,2,3,4}, E conectează 3 și 4 la 0,1,2 → optim {0,1,2}.",
        ],
        solution: `**(a)** **Input:** G = (V, E) graf neorientat. **Output:** V' ⊆ V a.î. ∀ u,v ∈ V', {u,v} ∉ E, iar |V'| maxim.

**(b)** V = {0,1,2,3,4}, E = {{3,0},{3,1},{3,2},{4,0},{4,1},{4,2}} → optim V' = {0,1,2} (cardinal 3).

**(c)**
- **(i)** Pentru 0 ≤ k ≤ |V|: \`p[0..k-1] ∈ {0,1}ᵏ\` (p[i] = nodul i e în V' sau nu); pentru k=0, vectorul vid.
- **(ii)** Soluția inițială = vectorul vid. Succesorii lui p[0..k-1] (k<|V|): [...,0] și [...,1]. Viabilă dacă pentru orice 0 ≤ i < j ≤ k-1 cu p[i]=p[j]=1 avem {i,j} ∉ E. Completă dacă k = n.
- **(iii)** Euristică (supra-aproximare): h(p[0..k-1]) = cel mai mare l a.î. în subgraful nodurilor rămase {k,…,n-1} sunt suficiente muchii lipsă pentru o mulțime stabilă de cardinal l (folosind |{muchii cu ambele capete ≥ k}| ≤ C²ₙ₋ₖ − C²ₗ). Se calculează eficient (liniar, căutare după l), dar nu e foarte precisă (nu garantează absența muchiilor între nodurile alese și cele l propuse).
- **(iv)** Arbore DFS branch-and-bound: marcăm cardinalul parțial + estimarea euristicii; tăiem ramurile neviabile și pe cele unde cardinal_parțial + euristică ≤ optimul curent.`,
      },
    ],
  },
];
