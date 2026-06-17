import type { Topic } from "@/types";

export const TOPICS: Topic[] = [
  {
    id: "kmp",
    title: "KMP",
    subtitle: "Knuth-Morris-Pratt",
    icon: "🔍",
    hasSimulator: true,
    simulatorType: "kmp",
    description: `## Algoritmul KMP

KMP caută un **pattern** într-un **text** în timp O(n + m), evitând comparații redundante prin **funcția eșec**.

### Funcția Eșec f[i]

\`f[i]\` = lungimea celui mai lung **prefix propriu** al lui \`pattern[0..i]\` care este și **sufix**.

**Bordura** unui șir = cel mai lung prefix propriu care este și sufix.

#### Calcul pas cu pas:
\`\`\`
pattern = A B A B A C A B A
index  = 0 1 2 3 4 5 6 7 8
f[]    = 0 0 1 2 3 0 1 2 3
\`\`\`

**Regula:** fie \`k = f[i-1]\`:
- dacă \`pattern[i] == pattern[k]\` → \`f[i] = k + 1\`
- altfel, încearcă \`k = f[k-1]\` (bordura bordurii)
- dacă \`k = 0\` și nu se potrivește → \`f[i] = 0\`

---

### Simularea KMP — Starea (i, k)

**i** = poziția din text unde începe alinierea curentă
**k** = numărul de caractere potrivite din pattern

**La potrivire** (\`text[i+k] == pattern[k]\`):
- \`k++\`
- dacă \`k == m\` → am găsit o apariție la poziția \`i\`

**La nepotrivire** (\`text[i+k] != pattern[k]\`):
- overlap-ul potrivit = \`pattern[0..k-1]\`
- bordura = \`pattern[0..f[k-1]-1]\` (lungime \`f[k-1]\`)
- **Nou i** = \`i + k - f[k-1]\`
- **Nou k** = \`f[k-1]\`

**Caz special:** dacă \`k = 0\` și nepotrivire → \`i++\`, \`k\` rămâne 0.

---

### Exemplu din Examen (2024)

\`\`\`
text    = H I A B A B X A B A B X A B A B Y
pattern = A B A B X A B A B Y
\`\`\`

Starea \`i=2, k=9\` (s-au potrivit 9 caractere = ABABXABAB):
- \`f[8] = 4\` (bordura "ABAB")
- Nou i = 2 + 9 - 4 = **7**
- Nou k = **4**`,

    keyPoints: [
      "f[i] = lungimea celui mai lung prefix propriu al pattern[0..i] care e și sufix",
      "La nepotrivire: nou i = i + k − f[k−1], nou k = f[k−1]",
      "Dacă k = 0 la nepotrivire: i++, k rămâne 0",
      "Complexitate: O(n + m) — O(m) preprocessing + O(n) căutare",
    ],

    codeExamples: [
      {
        title: "Calcul funcție eșec (ALK)",
        code: `funcție_eșec(pattern[0..m-1], out f[0..m-1]):
  f[0] = 0
  k = 0
  pentru i de la 1 la m-1:
    cât timp k > 0 și pattern[i] ≠ pattern[k]:
      k = f[k-1]
    dacă pattern[i] == pattern[k]:
      k = k + 1
    f[i] = k`,
      },
      {
        title: "KMP Search (ALK)",
        code: `kmp_search(text[0..n-1], pattern[0..m-1]):
  calculează f[] pentru pattern
  k = 0  // caractere potrivite
  i = 0  // aliniere curentă în text
  cât timp i ≤ n - m:
    dacă text[i+k] == pattern[k]:
      k = k + 1
      dacă k == m:
        raportează apariție la i
        k_nou = f[k-1]
        i = i + k - k_nou
        k = k_nou
    altfel:
      dacă k == 0: i = i + 1
      altfel:
        k_nou = f[k-1]
        i = i + k - k_nou
        k = k_nou`,
      },
    ],
  },

  {
    id: "bm",
    title: "Boyer-Moore",
    subtitle: "& Rabin-Karp (Rolling Hash)",
    icon: "⚡",
    hasSimulator: true,
    simulatorType: "bm",
    description: `## Algoritmul Boyer-Moore

BM compară pattern cu textul **de la dreapta la stânga** și poate face salturi mari.

### Cele Două Reguli

#### 1. Regula Caracterului Rău (Bad Character)
La nepotrivire \`text[i+k] ≠ pattern[k]\`, caracterul rău este \`text[i+k]\`.

**Deplasament** = \`k − lastOcc(text[i+k])\`
- unde \`lastOcc(c)\` = ultima poziție a lui \`c\` în pattern
- dacă \`c\` nu apare → salt de \`k + 1\`
- dacă deplasamentul e negativ → 1

#### 2. Regula Sufixului Bun (Good Suffix)
Sufixul bun = \`pattern[k+1..m-1]\` (ce s-a potrivit de la dreapta).

Aliniezi **penultima apariție** a sufixului bun în pattern.
Dacă nu există → cel mai lung prefix al pattern-ului care e sufix al sufixului bun.

**Se ia maximul** dintre cele două deplasamente.

---

### Funcția Salt (pentru bad character)

\`\`\`
salt[c] = distanța de la ultima apariție a lui c în pattern până la capăt
\`\`\`

**Algoritm:**
\`\`\`
detsalt(k, pattern, out salt):
  n = len(pattern)
  pentru toți c: salt[c] = n   // default
  pentru i de la n-1 la 0:
    dacă salt[pattern[i]] == n:
      salt[pattern[i]] = n - 1 - i
\`\`\`

---

### Rabin-Karp (Rolling Hash)

Calculează hash-ul pattern-ului și îl compară cu hash-ul fiecărei ferestre din text.

**Hash**: \`H = (c₀·d^(m-1) + c₁·d^(m-2) + ... + c_{m-1}) mod q\`

**Rolling update** (slide cu 1):
\`H_nou = (d·(H - text[i]·d^(m-1)) + text[i+m]) mod q\`

**False positives**: coliziuni de hash → verificare suplimentară caracter cu caracter.

**Complexitate**: O(nm) worst case (multe false positives), O(n+m) expected.`,

    keyPoints: [
      "BM compară de la dreapta la stânga, cu salturi mari",
      "Bad character: deplasament = k − lastOcc(text[i+k])",
      "Good suffix: aliniezi penultima apariție a sufixului potrivit",
      "Se ia maximul dintre cele două reguli",
      "Rabin-Karp: rolling hash, false positives posibile",
    ],

    codeExamples: [
      {
        title: "Boyer-Moore (ALK)",
        code: `bm_search(text[0..n-1], pattern[0..m-1]):
  calculează salt[] (bad character)
  calculează goodSuffix[] (good suffix)
  i = 0
  cât timp i ≤ n - m:
    k = m - 1  // compară de la dreapta
    cât timp k ≥ 0 și pattern[k] == text[i+k]:
      k = k - 1
    dacă k < 0:
      raportează apariție la i
      i = i + goodSuffix[0]
    altfel:
      shift_bc = k - lastOcc(text[i+k])
      shift_gs = goodSuffix[k]
      i = i + max(1, shift_bc, shift_gs)`,
      },
      {
        title: "Rabin-Karp Rolling Hash (ALK)",
        code: `rabin_karp(text, pattern, d, q):
  m = len(pattern), n = len(text)
  h = d^(m-1) mod q
  p_hash = 0, t_hash = 0
  pentru i de la 0 la m-1:
    p_hash = (d*p_hash + pattern[i]) mod q
    t_hash = (d*t_hash + text[i]) mod q
  pentru i de la 0 la n-m:
    dacă p_hash == t_hash:
      dacă pattern == text[i..i+m-1]:  // verificare
        raportează apariție la i
    dacă i < n-m:
      t_hash = (d*(t_hash - text[i]*h) + text[i+m]) mod q`,
      },
    ],
  },

  {
    id: "dp1",
    title: "Programare Dinamică I",
    subtitle: "Drumuri în Matrice",
    icon: "📊",
    hasSimulator: true,
    simulatorType: "dp1",
    description: `## DP I — Drumuri Crescătoare în Matrice

Cel mai frecvent tip de problemă DP la examen: drumuri care respectă o condiție de creștere.

### Structura Răspunsului la Examen

**(a) Formulare formală:**
- **Input:** \`N, M ∈ ℕ\`, matrice \`A[1..N][1..M]\` de numere întregi
- **Output:** cel mai mare \`k\` astfel încât ∃ un drum de la \`(1,1)\` la \`(i,j)\` cu \`k\` elemente strict crescătoare

**(b) Definiția subproblemei:**
\`\`\`
dp[i][j] = lungimea celui mai lung drum crescător
           de la (1,1) la (i,j) care trece prin A[i][j]
\`\`\`

**(c) Cazuri de bază:**
\`\`\`
dp[1][1] = 1
dp[1][j] = j  dacă A[1][1] < A[1][2] < ... < A[1][j], altfel 0
dp[i][1] = i  dacă A[1][1] < ... < A[i][1], altfel 0
\`\`\`

**(d) Recurența (i > 1, j > 1):**
\`\`\`
dp[i][j] = i+j-1  dacă (A[i-1][j] < A[i][j] și dp[i-1][j] > 0)
                        SAU (A[i][j-1] < A[i][j] și dp[i][j-1] > 0)
         = 0       altfel
\`\`\`

**(e) Ordinea de parcurgere:** linie cu linie, stânga → dreapta

**(f) Răspuns:** \`max(dp[i][j])\` pentru toți \`i, j\`

---

### Numărarea Drumurilor

Adaugi matrice \`cnt[i][j]\` = număr de drumuri distincte la \`(i,j)\`:
\`\`\`
dacă ambii vecini contribuie: cnt[i][j] = cnt[i-1][j] + cnt[i][j-1]
dacă doar stânga: cnt[i][j] = cnt[i][j-1]
dacă doar sus: cnt[i][j] = cnt[i-1][j]
\`\`\`

Răspuns = suma \`cnt[i][j]\` pentru toate \`(i,j)\` cu \`dp[i][j] == max\`.

---

### Substructura Optimă

**De demonstrat:** dacă \`dp[i][j]\` este optim, atunci predecesorii sunt și ei optimi.

**Proof sketch:** dacă drumul optim la \`(i,j)\` trece prin \`(i-1,j)\`, atunci subdrumul la \`(i-1,j)\` este și el optim (altfel putem îmbunătăți).`,

    keyPoints: [
      "dp[i][j] = lungimea celui mai lung drum crescător de la (1,1) la (i,j)",
      "Cazuri de bază: dp[1][1]=1, prima linie și prima coloană condiționat",
      "Recurența: dp[i][j] = i+j-1 dacă există vecin valid, altfel 0",
      "Ordinea: linie cu linie, de la stânga la dreapta",
      "Răspuns: max(dp[i][j]) pe toată matricea",
    ],

    codeExamples: [
      {
        title: "DP Drumuri în Matrice (ALK)",
        code: `solve(N, M, A[1..N][1..M]):
  // Cazuri de bază — prima linie
  dp[1][1] = 1
  pentru j de la 2 la M:
    dacă A[1][j-1] < A[1][j] și dp[1][j-1] > 0:
      dp[1][j] = j
    altfel: dp[1][j] = 0
  // Cazuri de bază — prima coloană
  pentru i de la 2 la N:
    dacă A[i-1][1] < A[i][1] și dp[i-1][1] > 0:
      dp[i][1] = i
    altfel: dp[i][1] = 0
  // Umple tabelul DP
  pentru i de la 2 la N:
    pentru j de la 2 la M:
      sus_ok = (A[i-1][j] < A[i][j] și dp[i-1][j] > 0)
      st_ok  = (A[i][j-1] < A[i][j] și dp[i][j-1] > 0)
      dacă sus_ok sau st_ok:
        dp[i][j] = i + j - 1
      altfel:
        dp[i][j] = 0
  // Găsește răspunsul
  maxLen = 0
  pentru i de la 1 la N:
    pentru j de la 1 la M:
      maxLen = max(maxLen, dp[i][j])
  returnează maxLen`,
      },
    ],
  },

  {
    id: "dp2",
    title: "Programare Dinamică II",
    subtitle: "Subșiruri & Numărare",
    icon: "🔗",
    hasSimulator: true,
    simulatorType: "dp2",
    description: `## DP II — Subșiruri Comune și Palindroame

Al doilea tip frecvent: probleme pe șiruri — prefix/sufix comune, palindroame, subșiruri.

### Problema Prefix-Sufix Comun

**Enunț**: Dat un șir \`S[0..n-1]\`, găsește cea mai lungă subsecvență care apare atât **direct** (ca prefix), cât și **invers** (ca sufix).

**Definiție:**
\`\`\`
d(i, j) = lungimea celei mai lungi subsecvențe comune:
  - prefix care începe la indexul i
  - sufix care se termină la indexul j
\`\`\`

**Cazuri de bază:**
\`\`\`
d(n-1, j) = 1  dacă S[n-1] == S[j], altfel 0
d(i, 0)   = 1  dacă S[0] == S[i], altfel 0
\`\`\`

**Recurența:**
\`\`\`
d(i, j) = 0               dacă S[i] ≠ S[j]
d(i, j) = 1 + d(i+1, j-1)  dacă S[i] == S[j]
\`\`\`

**Ordinea:** creșteri ale \`i\` și descreșteri ale \`j\` (diagonal, sau pe anti-diagonale)

**Răspuns:** \`max(d(i, j))\` pentru \`i < j\`

---

### Cea Mai Lungă Subsecvență Comună (LCS)

\`\`\`
lcs[i][j] = lungimea LCS a lui A[1..i] și B[1..j]
\`\`\`

**Bază:** \`lcs[0][j] = 0\`, \`lcs[i][0] = 0\`

**Recurență:**
\`\`\`
lcs[i][j] = lcs[i-1][j-1] + 1   dacă A[i] == B[j]
lcs[i][j] = max(lcs[i-1][j], lcs[i][j-1])  altfel
\`\`\`

**Răspuns:** \`lcs[n][m]\`

---

### Substructura Optimă (standard)

Orice soluție optimă a problemei mari conține soluțiile optime ale subproblemelor. Se demonstrează prin **contradicție** (exchange argument).`,

    keyPoints: [
      "d(i,j): lungimea subsecvenței comune prefix-la-i și sufix-la-j",
      "d(i,j) = 1 + d(i+1, j-1) dacă S[i] == S[j], altfel 0",
      "LCS: lcs[i][j] = lcs[i-1][j-1]+1 dacă egal, max dacă nu",
      "Ordinea: de obicei diagonal sau anti-diagonal",
      "Răspuns: maximul din toată matricea DP",
    ],

    codeExamples: [
      {
        title: "Prefix-Sufix Comun (ALK)",
        code: `prefix_sufix(S[0..n-1]):
  // Cazuri de bază — ultima linie
  pentru j de la 0 la n-1:
    dacă S[n-1] == S[j]: d[n-1][j] = 1
    altfel: d[n-1][j] = 0
  // Cazuri de bază — prima coloana
  pentru i de la 0 la n-1:
    dacă S[0] == S[i]: d[i][0] = 1
    altfel: d[i][0] = 0
  // Umple
  pentru i de la n-2 la 1 (descrescător):
    pentru j de la 1 la n-1:
      dacă S[i] == S[j]:
        d[i][j] = 1 + d[i+1][j-1]
      altfel:
        d[i][j] = 0
  // Răspuns
  maxLen = 0
  pentru i de la 0 la n-1:
    pentru j de la i+1 la n-1:
      maxLen = max(maxLen, d[i][j])
  returnează maxLen`,
      },
      {
        title: "LCS (ALK)",
        code: `lcs(A[1..n], B[1..m]):
  // Baze
  pentru j de la 0 la m: dp[0][j] = 0
  pentru i de la 0 la n: dp[i][0] = 0
  // Recurență
  pentru i de la 1 la n:
    pentru j de la 1 la m:
      dacă A[i] == B[j]:
        dp[i][j] = dp[i-1][j-1] + 1
      altfel:
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  returnează dp[n][m]`,
      },
    ],
  },

  {
    id: "greedy",
    title: "Greedy",
    subtitle: "Argumente de Schimb",
    icon: "🏆",
    hasSimulator: false,
    description: `## Algoritmi Greedy

La examen: formulare + contraexemplu (strategie greșită) + demonstrație (strategie corectă) + implementare.

### Structura Răspunsului

**(a) Formulare formală** — Input + Output cu notații matematice

**(b) Contraexemplu** pentru o strategie greedy incorectă:
- Un input concret unde strategia greșită eșuează
- Arată: ce returnează greedy-ul greșit vs. optimul real

**(c) Strategie corectă + Demonstrație (Exchange Argument):**
1. Presupune că există soluție optimă OPT fără alegerea greedy
2. Arată că poți **înlocui** un element din OPT cu alegerea greedy, fără a înrăutăți soluția
3. Concluzie: există întotdeauna un optim care conține alegerea greedy → greedy e corect

---

### Problema Selectării Activităților

**Input:** \`n\` activități cu intervale \`[s_i, f_i)\`, \`s_i < f_i\`
**Output:** cel mai mare set de activități mutual non-suprapuse

**Strategie greșită:** alege activitatea cu durata minimă.
**Contraexemplu:** activități = {[1,10], [2,4], [5,9]} → greedy dă {[2,4], [5,9]} (corect), dar {[1,3], [2,5], [4,7]} → durata minimă dă {[1,3],[4,7]} = 2, dar optimul e tot 2 (greedy corect). Alege {[1,10]}... etc.

**Strategie corectă:** la fiecare pas, alege activitatea care **se termină prima**.

**Demonstrație:** Fie \`early\` activitatea care se termină prima global. Dacă OPT nu conține \`early\`, înlocuiește prima activitate din OPT cu \`early\`. Deoarece \`early\` se termină cel mai devreme, nu suprapune restul activităților din OPT. Deci noul set e la fel de bun. □

---

### Problema Grupării Studenților

**Input:** \`n\` punctaje \`x[1..n]\`, o lățime \`k\`
**Output:** număr minim de grupe astfel încât \`max - min ≤ k\` per grupă

**Strategie:** sortează, la fiecare pas deschide grupă nouă la cel mai mic punctaj neacoperit.

\`\`\`
greedy_grupe(x[1..n], k):
  sortează x crescător
  start = x[1]; count = 1
  pentru i de la 2 la n:
    dacă x[i] > start + k:
      start = x[i]
      count = count + 1
  returnează count
\`\`\`

---

### Problema Parității Pozițiilor (Swaps)

**Observație:**
- Numără \`nrPare\` = elemente pare pe poziții impare (index impar)
- Numără \`nrImpare\` = elemente impare pe poziții pare (index par)
- Dacă \`nrPare == nrImpare\` → răspuns = \`nrPare\`
- Altfel → **-1** (imposibil)

**De ce?** Orice swap util schimbă câte un element din fiecare categorie → trebuie să fie egale.`,

    keyPoints: [
      "Formulare → Contraexemplu (strategie greșită) → Corectitudine → Implementare",
      "Exchange argument: înlocuiești un element din OPT cu alegerea greedy",
      "Activități: sortează după timp de terminare, alege prima disponibilă",
      "Grupe: sortează, deschide grupă nouă la primul element neacoperit",
      "Swaps paritate: nrPare == nrImpare → nrPare, altfel -1",
    ],

    codeExamples: [
      {
        title: "Activity Selection (ALK)",
        code: `selectare_activitati(n, s[1..n], f[1..n]):
  sortează activitățile crescător după f[i]
  count = 1
  last_finish = f[1]
  pentru i de la 2 la n:
    dacă s[i] >= last_finish:
      count = count + 1
      last_finish = f[i]
  returnează count`,
      },
      {
        title: "Parity Swaps (ALK)",
        code: `parity_swaps(A[1..n]):
  nrPare = 0    // pare pe poziții impare
  nrImpare = 0  // impare pe poziții pare
  pentru i de la 1 la n:
    dacă i % 2 == 1 și A[i] % 2 == 0:
      nrPare = nrPare + 1
    dacă i % 2 == 0 și A[i] % 2 == 1:
      nrImpare = nrImpare + 1
  dacă nrPare == nrImpare:
    returnează nrPare
  altfel:
    returnează -1`,
      },
    ],
  },

  {
    id: "bkt",
    title: "Backtracking & NP",
    subtitle: "BKT, Branch & Bound, NP-Completitudine",
    icon: "🌲",
    hasSimulator: false,
    description: `## Backtracking (BKT)

Explorare exhaustivă a spațiului de soluții cu **pruning** (tăiere ramuri invalide).

### Template BKT (ALK)

\`\`\`
bkt(solutiePartiala, nivel):
  dacă solutieCompleta(solutiePartiala):
    procesează(solutiePartiala)
    return
  pentru fiecare candidat c:
    dacă valid(solutiePartiala + c):
      solutiePartiala.add(c)
      bkt(solutiePartiala, nivel + 1)
      solutiePartiala.remove(c)    // backtrack
\`\`\`

**Complexitate:** O(2^n) sau O(n!) în funcție de problemă.

### Pruning (Tăierea Ramurilor)

Verifici validitatea soluției parțiale **înainte** de a continua recursiv:
- Dacă o soluție parțială nu poate fi extinsă la o soluție validă → tai ramura
- Reduce dramatic spațiul de căutare în practică

### Branch and Bound

Variantă a BKT pentru **probleme de optimizare**:
- Menții o **limită superioară** (bound) pentru fiecare nod
- Tai ramura dacă bound-ul e mai mic decât cel mai bun găsit până acum
- Găsești soluția optimă fără a explora tot spațiul

---

## NP-Completitudine

### Clasele P și NP

- **P** = probleme decizionale rezolvabile în timp polinomial O(n^k)
- **NP** = probleme decizionale unde **verificarea** unei soluții e polinomială
- **NP-complete** = cele mai grele din NP
- **NP-hard** = cel puțin la fel de greu ca NP-complete (nu neapărat în NP)

### Cum Arăți că o Problemă e NP-Completă

1. **Arată că e în NP**: dat un certificat (soluție candidat), verificarea se face în timp polinomial
2. **Reduci** o problemă NP-completă **cunoscută** la ea în timp polinomial

### Probleme NP-Complete Clasice

| Problemă | Descriere |
|----------|-----------|
| SAT | Formulă booleană satisfiabilă? |
| 3-SAT | SAT cu clauze de lungime ≤ 3 |
| Clică | Graf cu clică de dimensiune k? |
| Colorare Graf | Graf 3-colorabil? |
| Ciclu Hamiltonian | Graf cu ciclu ce vizitează fiecare nod exact o dată? |
| Rucsac (decizie) | Se poate atinge valoarea V cu greutate ≤ W? |

### Algoritmul Nondeterminist

**Structura** pentru a arăta că un problemă e în NP:
\`\`\`
alg_nondeterminist(input):
  // Faza 1: Ghicire (nondeterministă) — O(1) pași nondeterminiști
  soluție = ghicește_o_solutie()

  // Faza 2: Verificare (deterministă) — polinomială
  dacă verifică(soluție, input):
    ACCEPT
  altfel:
    REJECT
\`\`\`

Un problem e în NP dacă un NDTM o rezolvă în timp polinomial.`,

    keyPoints: [
      "BKT = explorare exhaustivă + pruning (tăiere ramuri invalide)",
      "Template: pentru fiecare candidat → verifică → adaugă → recursie → backtrack",
      "Branch & Bound = BKT + bound superior pentru optimizare",
      "NP: verificarea soluției e polinomială (nu găsirea ei)",
      "NP-complete = în NP + orice problemă NP se reduce la ea polinomial",
    ],

    codeExamples: [
      {
        title: "Template BKT (ALK)",
        code: `bkt(sol[], nivel, n):
  dacă nivel == n:
    // soluție completă
    procesează(sol)
    return
  pentru fiecare val v ∈ candidați(nivel):
    sol[nivel] = v
    dacă valid(sol, nivel):
      bkt(sol, nivel + 1, n)
    sol[nivel] = ∅  // backtrack`,
      },
      {
        title: "Verificare NP (template)",
        code: `verificare_np(certificat, input):
  // Trebuie să ruleze în O(poly(|input|))
  // Exemplu: Clică de dimensiune k
  verificare_clica(S, G, k):
    dacă |S| ≠ k: return FALS
    pentru fiecare pereche (u,v) ∈ S × S cu u ≠ v:
      dacă (u,v) ∉ E(G): return FALS
    return ADEVĂRAT
  // Complexitate: O(k^2) = O(n^2) → polinomial`,
      },
    ],
  },

  {
    id: "analiza",
    title: "Analiza Algoritmilor",
    subtitle: "Notații Asimptotice, Recurențe, Corectitudine",
    icon: "📈",
    hasSimulator: false,
    description: `## Analiza Algoritmilor

La examen: demonstrarea corectitudinii (invariant de buclă) și analiza complexității (notații asimptotice, recurențe).

### Notații Asimptotice

**O (Big-Oh)** — limită superioară asimptotică:
\`\`\`
O(g(n)) = {f(n) | ∃ n₀, c > 0 a.î. 0 ≤ f(n) ≤ c·g(n), ∀ n ≥ n₀}
\`\`\`

**Ω (Omega)** — limită inferioară asimptotică:
\`\`\`
Ω(g(n)) = {f(n) | ∃ n₀, c > 0 a.î. 0 ≤ c·g(n) ≤ f(n), ∀ n ≥ n₀}
\`\`\`

**Θ (Theta)** — limită strânsă (ambelesensuri):
\`\`\`
Θ(g(n)) = {f(n) | ∃ n₀, c₁, c₂ > 0 a.î. 0 ≤ c₁·g(n) ≤ f(n) ≤ c₂·g(n)}
\`\`\`

**Reguli practice:**
- \`f(n) = a_k·n^k + a_{k-1}·n^{k-1} + ... + a₀\` → \`f(n) = Θ(n^k)\`
- \`log^a n = O(n^b)\` pentru orice \`a, b > 0\`
- \`n^a = O(b^n)\` pentru orice \`a > 0, b > 1\`

---

### Demonstrarea Corectitudinii (Loop Invariant)

Un **invariant de buclă** e o proprietate care:
1. **Initializare:** e adevărată înainte de prima iterație
2. **Menținere:** dacă e adevărată înaintea unei iterații, rămâne adevărată și după
3. **Terminare:** la terminarea buclei, invariantul oferă o proprietate utilă

**Exemplu — Insertion Sort:**
- **Invariant:** la începutul iterației \`i\`, subșirul \`a[0..i-1]\` este sortat
- **Initializare:** \`i = 1\`, \`a[0..0]\` are 1 element → sortat
- **Menținere:** inserează \`a[i]\` în poziția corectă → \`a[0..i]\` sortat
- **Terminare:** \`i = n\` → tot array-ul e sortat

---

### Recurențe Divide-et-Impera

Forma generală: \`T(n) = a·T(n/b) + f(n)\`

**Arborele de recurență:**
- Nivelul \`k\`: \`a^k\` noduri, fiecare de dimensiune \`n/b^k\`
- Cost pe nivel \`k\`: \`a^k · f(n/b^k)\`
- Număr de niveluri: \`log_b n\`
- Frunze (nivelul \`log_b n\`): \`a^{log_b n} = n^{log_b a}\` frunze, cost \`Θ(n^{log_b a})\`

**Exemplu — Merge Sort:** \`T(n) = 2T(n/2) + Θ(n)\` → \`Θ(n log n)\`
**Exemplu — Karatsuba:** \`T(n) = 3T(n/2) + Θ(n)\` → \`Θ(n^{log₂ 3}) ≈ Θ(n^{1.59})\`
**Exemplu — căutare binară:** \`T(n) = T(n/2) + Θ(1)\` → \`Θ(log n)\`

---

### Analiza Celor Mai Bune / Mai Proaste Cazuri

| Caz | Definire | Exemplu Insertion Sort |
|-----|----------|------------------------|
| Best-case | \`T_{best}(n) = min_{|X|=n} T(X)\` | Array deja sortat → \`Θ(n)\` |
| Worst-case | \`T_{worst}(n) = max_{|X|=n} T(X)\` | Array invers sortat → \`Θ(n²)\` |
| Average-case | \`E[T(n)] = Σ T(X)·Pr{X}\` | Presupunând distribuție uniformă → \`Θ(n²)\` |

### Reduceri Polinomiale (Turing)

\`P ∝ Q\` (P se reduce polinomial la Q) dacă:
1. Preprocesăm instanța lui \`P\` în timp polinomial → instanță a lui \`Q\`
2. Apelăm algoritmul pentru \`Q\` de un număr polinomial de ori
3. Postprocesăm răspunsul în timp polinomial

**Exemplu:** \`SET-INCLUSION ∝ SORTING\` — sortăm ambele mulțimi, apoi parcurgem linear.`,

    keyPoints: [
      "O(g(n)) = limită superioară; Ω(g(n)) = limită inferioară; Θ(g(n)) = limită strânsă",
      "Invariant de buclă: Inițializare → Menținere → Terminare",
      "T(n) = a·T(n/b) + f(n): arbore cu log_b n niveluri, n^{log_b a} frunze",
      "Merge Sort: T(n) = 2T(n/2) + Θ(n) → Θ(n log n)",
      "Reducere P ∝ Q: P nu e mai greu decât Q",
    ],

    codeExamples: [
      {
        title: "Loop Invariant — Insertion Sort (ALK)",
        code: `insertion_sort(a[0..n-1]):
  // Invariant: la începutul iterației i,
  //   a[0..i-1] este sortat
  pentru i de la 1 la n-1:
    current = a[i]
    j = i - 1
    cât timp j ≥ 0 și a[j] > current:
      a[j+1] = a[j]
      j = j - 1
    a[j+1] = current
  // Terminare: a[0..n-1] este sortat`,
      },
      {
        title: "Analiza prin Arbore de Recurență (ALK)",
        code: `// T(n) = 2T(n/2) + cn
//
// Nivel 0: 1 nod, cost cn
// Nivel 1: 2 noduri, fiecare c(n/2) → total cn
// Nivel 2: 4 noduri, fiecare c(n/4) → total cn
// ...
// Nivel k: 2^k noduri, fiecare c(n/2^k) → total cn
//
// Număr niveluri: log₂ n + 1
// Cost total: cn · (log₂ n + 1) = Θ(n log n)

// Merge Sort: T(n) = 2T(n/2) + Θ(n) → Θ(n log n)
// Karatsuba:  T(n) = 3T(n/2) + Θ(n) → Θ(n^{log₂ 3})
// Binary Search: T(n) = T(n/2) + Θ(1) → Θ(log n)`,
      },
    ],
  },

  {
    id: "nedet",
    title: "Algoritmi Nedeterminiști",
    subtitle: "NDTM, Faza de Ghicire, Verificare",
    icon: "🎲",
    hasSimulator: false,
    description: `## Algoritmi Nedeterminiști

Un algoritm **nedeterminist** poate avea **multiple căi de execuție** simultane. La aceeași intrare, rezultatul poate diferi în funcție de calea aleasă.

### Operații Specifice

- **\`choose x from A\`** — la execuție, se creează câte o copie a algoritmului pentru fiecare valoare din \`A\`; toate copiile rulează simultan și independent
- **\`success\`** — termină cu succes calea curentă **și întregul algoritm** (toate celelalte căi sunt oprite)
- **\`failure\`** — termină cu eșec doar calea curentă; celelalte căi continuă

### Faza de Ghicire și Verificare

Un algoritm nedeterminist are două faze:
1. **Ghicire (nondeterministă):** alege o soluție candidat din spațiul de căutare
2. **Verificare (deterministă):** verifică dacă soluția candidat e corectă

**Exemplu — existența unui număr par:**
\`\`\`
choose x from {2, 3, 4}
dacă x MOD 2 = 0:
  success
altfel:
  failure
\`\`\`
Algoritmul are alegeri reușite (\`x=2\` sau \`x=4\`), deci se termină cu \`success\`.

**Exemplu — SAT (Satisfiabilitate booleană):**
\`\`\`
alg_nedeterminist_SAT(formula F cu n variabile):
  // Ghicire: alege o atribuire
  assignare = choose din {0,1}^n

  // Verificare: evaluează F sub această atribuire
  dacă evaluează(F, assignare) == true:
    success
  altfel:
    failure
\`\`\`

### Teoremă (Determinizare)

Pentru orice algoritm nedeterminist \`A\` există un algoritm determinist echivalent \`B\` cu:
\`\`\`
T_B(n) = O(2^{T_A(n)})
\`\`\`
Demonstrație: \`B\` rulează toate căile de execuție posibile secvențial.

### Comparație: Determinist vs. Nedeterminist

| Caracteristică | Algoritm Determinist | Algoritm Nedeterminist |
|---------------|---------------------|----------------------|
| Căi execuție | Una singură | Multiple posibile |
| Output (aceeași intrare) | Același | Poate varia |
| Randomizare | Nu | Folosește "ghicire" |

### Când e utilă Nedeterminismul?

- **Clasa NP:** probleme a căror soluție poate fi **verificată** în timp polinomial de un algoritm nedeterminist
- **Algoritmul nondeterminist** pentru o problemă NP: ghicește un certificat, apoi verifică polinomial
- **Teoretic:** demonstrarea apartenenței la NP prin construirea unui algoritm nedeterminist polinomial`,

    keyPoints: [
      "choose x from A → creează copii simultane pentru fiecare valoare",
      "success = termină cu succes calea curentă + întregul algoritm",
      "failure = termină cu eșec doar calea curentă",
      "Două faze: ghicire (nondeterministă) + verificare (deterministă)",
      "Orice alg. nedeterminist poate fi determinizat cu cost exponențial",
    ],

    codeExamples: [
      {
        title: "Template Algoritm Nedeterminist (ALK)",
        code: `alg_nedeterminist(input):
  // Faza 1: Ghicirea
  sol = choose x from spatul_solutiilor(input)

  // Faza 2: Verificarea
  dacă verifică(sol, input):
    success
  altfel:
    failure

// Exemplu: SAT
alg_nedeterminist_SAT(F, n):
  a = choose din {0,1}^n    // ghicire atribuire
  dacă eval(F, a) == true:   // verificare
    success
  altfel:
    failure`,
      },
      {
        title: "Determinizare (simulare) (ALK)",
        code: `// Transformarea unui alg. nedeterminist în determinist
// prin explorarea tuturor căilor

simulare_deterministă(input):
  // Stivă de configurații (stări)
  stack = [configurație_inițială]

  cât timp stack nu e goală:
    config = stack.pop()

    dacă config conține instruction "choose x from A":
      pentru fiecare valoare v ∈ A:
        stack.push(config cu x=v)

    altfel dacă config == success:
      returnează "REUSIT"

    altfel dacă config == failure:
      continuă  // doar această cale e abandonată

    altfel:
      // execuție deterministică
      stack.push(următoarea_configurație(config))

  returnează "EȘEC"`,
      },
    ],
  },

  {
    id: "prob",
    title: "Algoritmi Probabilistici",
    subtitle: "Las Vegas, Monte Carlo, Analiză Probabilistică",
    icon: "🎯",
    hasSimulator: false,
    description: `## Algoritmi Probabilistici

Algoritmii probabilistici (randomizați) folosesc **valori aleatoare** în deciziile lor. Pentru aceeași intrare, timpul de execuție (sau chiar rezultatul) poate varia.

### Variabile Aleatoare cu Indicator

O variabilă indicator \`I{A}\` = 1 dacă evenimentul \`A\` are loc, 0 altfel.
\`\`\`
E[I{A}] = Pr{A}
\`\`\`

Utilitate: calculul valorii așteptate prin descompunere în evenimente simple.

**Exemplu — problema Hiring:**
- \`n\` candidați în ordine aleatoare
- Angajăm pe \`i\` dacă e mai bun decât toți \`1..i-1\`
- \`X_i = I{candidatul i e angajat}\`, \`E[X_i] = 1/i\`
- \`E[X] = Σ 1/i = H_n ≈ ln n\` → cost așteptat \`O(c_h · log n)\`

### Las Vegas

**Corectitudine garantată**, timp de execuție variabil.

- Produ întotdeauna răspunsul corect
- Timpul de execuție e o variabilă aleatoare
- Ne interesează **timpul așteptat**

**Exemplu — Randomized QuickSort:**
- Alege pivotul aleator → evită cazul cel mai rău
- Timp așteptat: \`O(n log n)\`
- Timp worst-case: \`O(n²)\` (probabilitate foarte mică)

**Exemplu — Infinite Random Search:**
\`\`\`
// Găsește un index unde a[k] = 1 (știind că există)
cât timp true:
  k = Random(0, n-1)
  dacă a[k] == 1:
    returnează k
\`\`\`
- Totdeauna găsește un \`1\` (corect)
- Timpul e variabil: probabilitatea ca primul \`k\` să fie \`1\` e \`1/2\`

### Monte Carlo

**Timp de execuție garantat**, corectitudine probabilistă.

- Se oprește într-un timp fix
- Poate da răspunsuri greșite cu o probabilitate mică
- Probabilitatea de eroare poate fi redusă prin repetare

**Exemplu — α-Bounded Random Search:**
\`\`\`
// Găsește un index unde a[k] = 1 (știind că există)
pentru i = 1 la α:
  k = Random(0, n-1)
  dacă a[k] == 1:
    returnează k
returnează "failed"
\`\`\`
- Timp garantat: \`O(α)\`
- Probabilitate de eșec: \`1/2^α\` (când toate alegerile sunt \`0\`)

### Analiza Probabilistică

Analiza probabilistică estimează **timpul așteptat** al unui algoritm **determinist** pe intrări aleatoare.

**Pași:**
1. Presupunem o distribuție de probabilitate pentru intrări
2. Definim variabile aleatoare pentru pașii algoritmului
3. Calculăm \`E[T(n)] = Σ t · Pr{T(n) = t}\`

**Exemplu — First Occurrence:**
- Array de lungime \`n\`, căutăm prima apariție a lui \`k\`
- \`q\` = probabilitatea ca \`k\` să fie în array
- \`E[T(n)] = n + 1 - n·q/2 + q/2\`
- Pentru \`q = 1\`: \`E[T(n)] = n/2 + 3/2\``,

    keyPoints: [
      "E[I{A}] = Pr{A} — variabile indicator simplifică calculul valorii așteptate",
      "Las Vegas: corect întotdeauna, timp variabil (ex: Randomized QuickSort)",
      "Monte Carlo: timp fix, corect cu probabilitate mare (ex: Miller-Rabin)",
      "Probabilitatea de eșec Monte Carlo se reduce prin repetare",
      "Analiza probabilistică = timpul așteptat al unui alg. determinist pe intrări aleatoare",
    ],

    codeExamples: [
      {
        title: "Las Vegas — Randomized QuickSort (ALK)",
        code: `randomized_quicksort(A, p, r):
  dacă p < r:
    q = randomized_partition(A, p, r)
    randomized_quicksort(A, p, q-1)
    randomized_quicksort(A, q+1, r)

randomized_partition(A, p, r):
  i = Random(p, r)
  swap(A[r], A[i])      // pivot aleator
  returnează partition(A, p, r)

// partition standard (pivot = A[r]):
// Timp așteptat: O(n log n)
// Worst-case: O(n²) — probabilitate neglijabilă`,
      },
      {
        title: "Monte Carlo — Miller-Rabin (conceptual) (ALK)",
        code: `monte_carlo_primalitate(n, k):
  // Testează dacă n e prim (k iterații)
  dacă n < 2: returnează FALS
  dacă n == 2 sau n == 3: returnează ADEVĂRAT

  scrie n-1 = 2^s · d  (d impar)
  pentru i = 1 la k:
    a = Random(2, n-2)
    x = a^d mod n
    dacă x == 1 sau x == n-1:
      continuă
    repetă de s-1 ori:
      x = x^2 mod n
      dacă x == n-1:
        iese din buclă
    dacă x ≠ n-1:
      returnează FALS  // n e compus
  returnează ADEVĂRAT  // probabil prim

// Eroare: < 4^{-k}  (Monte Carlo)
// Timp: O(k · log^3 n) garantat`,
      },
    ],
  },

  {
    id: "regex",
    title: "Expresii Regulate",
    subtitle: "Regex, Automate, Potrivirea Șirurilor",
    icon: "🔤",
    hasSimulator: false,
    description: `## Expresii Regulate

O **expresie regulată** (regex) descrie un set de șiruri (un limbaj regulat) printr-un șablon compact.

### Sintaxa de Bază

| Simbol | Semnificație | Exemplu | Potrivește |
|--------|-------------|---------|------------|
| \`c\` | Caracterul \`c\` | \`a\` | \`"a"\` |
| \`.\` | Orice caracter | \`a.b\` | \`"acb"\`, \`"aXb"\` |
| \`*\` | 0 sau mai multe repetări | \`ab*c\` | \`"ac"\`, \`"abc"\`, \`"abbc"\` |
| \`+\` | 1 sau mai multe repetări | \`ab+c\` | \`"abc"\`, \`"abbc"\` (nu \`"ac"\`) |
| \`?\` | 0 sau 1 apariție | \`ab?c\` | \`"ac"\`, \`"abc"\` |
| \`\|\` | Alternare (OR) | \`a\|b\` | \`"a"\` sau \`"b"\` |
| \`[]\` | Clasă de caractere | \`[abc]\` | \`"a"\`, \`"b"\`, \`"c"\` |
| \`[^]\` | Negație | \`[^abc]\` | Orice except \`a,b,c\` |
| \`^\` | Început de șir | \`^ab\` | Șiruri care încep cu \`"ab"\` |
| \`$\` | Sfârșit de șir | \`ab$\` | Șiruri care se termină cu \`"ab"\` |
| \`{n,m}\` | Între n și m repetări | \`a{2,4}\` | \`"aa"\`, \`"aaa"\`, \`"aaaa"\` |
| \`()\` | Grupare | \`(ab)+\` | \`"ab"\`, \`"abab"\`, \`"ababab"\` |

### Automate Finite

Orice expresie regulată poate fi implementată ca un **Automat Finit Determinist** (DFA):

- **Stări** = configurații ale recunoașterii
- **Tranziții** = citirea unui caracter
- **Stare finală** = șirul e acceptat

**Construcția Thompson:**
1. \`ε\` (șir vid) → automat cu 2 stări
2. \`c\` (caracter) → automat cu 2 stări
3. \`R|S\` → paralelizare (union)
4. \`RS\` → compunere secvențială (concatenare)
5. \`R*\` → buclă (Kleene star)

### Aplicații în Algoritmi

- **Validare:** email, URL, numere de telefon
- **Parsare:** tokenizare, extragere patternuri
- **String matching:** grep, sed, awk
- **Compilatoare:** analiză lexicală (lex/flex)

### Complexitate

- Potrivirea unui regex (fără backreferences) pe un șir de lungime \`n\`: **O(n)** cu DFA
- Cu construcție NFA + simulare: **O(n·|regex|)**
- Backreferences → NP-complet (ex: \`(.*)\\\\1\`)

### Diferența față de KMP/BM

| Algoritm | Potrivire exactă | Regex |
|----------|-----------------|-------|
| KMP | Pattern fix, O(n+m) | -\u2013 |\n| BM | Pattern fix, salturi mari | -\u2013 |\n| RK | Rolling hash, O(n+m) așteptat | -\u2013 |\n| Regex | -\u2013 | \u0218ablon flexibil, O(n) DFA |`,

    keyPoints: [
      "Regex = șablon compact pentru un set de șiruri (limbaj regulat)",
      "Operații: * (0+), + (1+), ? (0-1), | (OR), [] (clasă), () (grupare)",
      "Orice regex poate fi transformat în NFA → DFA → recunoaștere O(n)",
      "Construcția Thompson: ε, c, R|S, RS, R*",
      "Backreferences → NP-complet; regex fără ele → O(n) cu DFA",
    ],

    codeExamples: [
      {
        title: "Exemple Regex (ALK)",
        code: `// Validare email (simplificat)
email = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

// Număr de telefon românesc
telefon = "^07[0-9]{8}$"

// URL
url = "^(https?://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(/[a-zA-Z0-9-_.~?&=+%]*)?$"

// Cuvinte care conțin "PA"
pa_words = ".*PA.*"

// Identificator în limbaje de programare
ident = "^[a-zA-Z_][a-zA-Z0-9_]*$"

// Număr întreg (cu semn)
intreg = "^[+-]?[0-9]+$"`,
      },
      {
        title: "Construcția Thompson — NFA (ALK)",
        code: `// Transformarea unui regex în NFA (conceptual)
//
// ε (șir vid):
//   (q₀) ──── ε ────> (q₁)
//
// c (caracter):
//   (q₀) ──── c ────> (q₁)
//
// R|S (alternare):
//            ┌─> NFA(R) ─┐
//   (q₀) ─ε─┤           ├─ε─> (q₁)
//            └─> NFA(S) ─┘
//
// RS (concatenare):
//   (q₀) ──> NFA(R) ──ε──> NFA(S) ──> (q₁)
//
// R* (Kleene star):
//            ┌───────── ε ─────────┐
//            ↓                     │
//   (q₀) ─ε─> NFA(R) ──ε──> (q₁)  │
//            │                     │
//            └─────── ε ───────────┘
//
// Simulare NFA: menținem mulțimea de stări curente
//   pentru fiecare caracter c din input:
//     stare_curentă = ε-închidere(tranziție(stare_curentă, c))
//   dacă stare_curentă ∩ stare_finală ≠ ∅ → acceptat`,
      },
    ],
  },
];

export const TOPIC_IDS = TOPICS.map((t) => t.id);

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}
