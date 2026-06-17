import type { QuizSet } from "@/types";

export const KMP_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question: "Ce reprezintă KMP în contextul algoritmilor de căutare a șirurilor?",
        options: [
          "Knuth-Morris-Pratt",
          "Karp-Miller-Pratt",
          "Knuth-Myers-Parker",
          "Kruskal-Morris-Pratt",
        ],
        correctIndex: 0,
        explanation:
          "KMP este acronimul pentru Knuth-Morris-Pratt, numele celor trei inventatori ai algoritmului de potrivire liniară a șirurilor.",
      },
      {
        question:
          "În algoritmul KMP, funcția de prefix f[i] reprezintă:",
        options: [
          "Lungimea celui mai lung prefix propriu al subșirului pattern[0..i] care este și sufix",
          "Numărul de caractere distincte din subșirul pattern[0..i]",
          "Poziția ultimei apariții a caracterului pattern[i] în subșir",
          "Lungimea totală a patternului",
        ],
        correctIndex: 0,
        explanation:
          "f[i] = lungimea celui mai lung prefix propriu al pattern[0..i] care este și sufix. Propriu înseamnă mai scurt decât întregul subșir. Exemplu: pentru 'AABAA', f[4] = 2 ('AA').",
      },
      {
        question: "Ce este o bordură (border) a unui șir S în contextul KMP?",
        options: [
          "Un șir care apare atât ca prefix cât și ca sufix al lui S",
          "Ultimul caracter al lui S",
          "O subsecvență oarecare a lui S",
          "Caracterul din mijlocul lui S",
        ],
        correctIndex: 0,
        explanation:
          "O bordură a lui S este un subșir care apare simultan ca prefix și ca sufix al lui S. KMP folosește bordurile pentru a determina cât putem sări la o nepotrivire, evitând re-compararea caracterelor deja potrivite.",
      },
      {
        question: "Care este complexitatea de timp a algoritmului KMP?",
        options: ["O(n² + m)", "O(n·m)", "O(n + m)", "O(n log m)"],
        correctIndex: 2,
        explanation:
          "KMP are complexitate liniară O(n + m), unde n = lungimea textului, m = lungimea patternului. Faza de preprocesare (calcul funcției de prefix) durează O(m), iar căutarea O(n). Fiecare caracter al textului e procesat de cel mult două ori.",
      },
      {
        question: "În KMP, la o nepotrivire cu k > 0 caractere potrivite, ce informație folosim pentru a sări peste comparații inutile?",
        options: [
          "Funcția de prefix aplicată pe text",
          "Funcția de prefix f[k-1] aplicată pe pattern",
          "Lungimea textului",
          "Hash-ul patternului",
        ],
        correctIndex: 1,
        explanation:
          "La o nepotrivire cu k caractere potrivite, KMP folosește f[k-1] — bordura maximă a prefixului de lungime k al patternului. Noul k devine f[k-1], iar textul avansează cu k - f[k-1] caractere.",
      },
      {
        question: "Care este valoarea f[0] pentru orice pattern, indiferent de primul caracter?",
        options: ["0", "1", "-1", "Depinde de primul caracter"],
        correctIndex: 0,
        explanation:
          "f[0] = 0 pentru orice pattern. Un subșir de un singur caracter nu are prefix propriu (mai scurt decât el însuși) care să fie și sufix. Singurul prefix propriu e șirul vid, de lungime 0.",
      },
      {
        question: "Ce se întâmplă când KMP găsește o potrivire completă (k = m)?",
        options: [
          "Algoritmul se oprește imediat",
          "Se raportează apariția și se continuă cu k = f[m-1]",
          "Se reîncepe căutarea de la poziția următoare cu k = 0",
          "Se șterge patternul din text",
        ],
        correctIndex: 1,
        explanation:
          "La o potrivire completă, KMP raportează apariția și continuă căutarea setând k = f[m-1]. Aceasta permite găsirea aparițiilor suprapuse, exploatând bordura maximă a întregului pattern.",
      },
      {
        question: "Ce proprietate fundamentală face KMP mai eficient decât algoritmul naiv de potrivire?",
        options: [
          "Folosește paralelism pe mai multe nuclee",
          "Nu re-compară caracterele care au fost deja potrivite",
          "Folosește funcții hash pentru evitarea comparațiilor",
          "Rulează exclusiv pe text preprocesat",
        ],
        correctIndex: 1,
        explanation:
          "Spre deosebire de algoritmul naiv care reîncepe de la începutul patternului la fiecare nepotrivire, KMP folosește funcția de prefix pentru a evita re-compararea caracterelor deja verificate, realizând progres continuu prin text.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question: 'Pentru patternul "AAAA", care este valoarea f[2] (indexat de la 0)?',
        options: ["0", "1", "2", "3"],
        correctIndex: 2,
        explanation:
          'Subșirul pattern[0..2] = "AAA". Prefixe proprii: "A" (1), "AA" (2). Sufixe proprii: "A" (1), "AA" (2). Cea mai lungă coincidență e "AA" (lungime 2). Deci f[2] = 2.',
      },
      {
        question: 'Pentru patternul "ABABAC", care este valoarea f[3]?',
        options: ["0", "1", "2", "3"],
        correctIndex: 2,
        explanation:
          'pattern[0..3] = "ABAB". Prefixe proprii: "A", "AB", "ABA". Sufixe proprii: "B", "AB", "BAB". Singura coincidență e "AB" (lungime 2). f[3] = 2.',
      },
      {
        question: 'Pentru patternul "ABCDEF", care este valoarea f[3]?',
        options: ["0", "1", "2", "3"],
        correctIndex: 0,
        explanation:
          'pattern[0..3] = "ABCD". Toate caracterele sunt distincte. Niciun prefix propriu nu coincide cu vreun sufix propriu, deci f[3] = 0.',
      },
      {
        question: 'Pentru patternul "ABABABA", care este f[5]?',
        options: ["3", "4", "5", "2"],
        correctIndex: 1,
        explanation:
          'pattern[0..5] = "ABABAB". Prefixe proprii: "A"(1), "AB"(2), "ABA"(3), "ABAB"(4), "ABABA"(5). Sufixe proprii: "B"(1), "AB"(2), "BAB"(3), "ABAB"(4), "BABAB"(5). Cea mai lungă coincidență: "ABAB" (4). f[5] = 4.',
      },
      {
        question: 'Pentru patternul "AAABAAA", care este f[6]?',
        options: ["2", "3", "4", "5"],
        correctIndex: 0,
        explanation:
          'pattern[0..6] = "AAABAAA". Prefixe proprii: "A","AA","AAA","AAAB","AAABA","AAABAA". Sufixe proprii: "A","AA","AAA","BAAA","ABAAA","AABAAA". Cea mai lungă coincidență: "AA" (2). f[6] = 2.',
      },
      {
        question: 'Pentru patternul "AABAACAA", care este f[3]?',
        options: ["0", "1", "2", "3"],
        correctIndex: 1,
        explanation:
          'pattern[0..3] = "AABA". Prefixe proprii: "A","AA","AAB". Sufixe proprii: "A","BA","ABA". Doar "A" coincide (lungime 1), deci f[3] = 1.',
      },
      {
        question: 'Dacă f[5] = 3 pentru un pattern, ce informație ne oferă aceasta?',
        options: [
          "Primele 3 caractere ale subșirului pattern[0..5] coincid cu ultimele 3 caractere",
          "Patternul are exact 3 caractere",
          "Faza de căutare va face 3 iterații",
          "Textul trebuie să aibă lungimea 3",
        ],
        correctIndex: 0,
        explanation:
          "f[5] = 3 înseamnă că în subșirul pattern[0..5] (primele 6 caractere), cele mai lungi 3 caractere de la început coincid cu ultimele 3 caractere. Aceasta e o bordură de lungime 3.",
      },
      {
        question: 'Cum se calculează f[i] cunoscând deja f[i-1] în construcția funcției de prefix?',
        options: [
          "Dacă pattern[f[i-1]] = pattern[i], atunci f[i] = f[i-1] + 1; altfel se reduce la f[f[i-1]-1] și se reîncearcă",
          "f[i] = f[i-1] + 1 dacă pattern[0] = pattern[i], altfel f[i] = 0",
          "f[i] = f[i-1] + pattern[i] - pattern[i-1] (diferența codurilor ASCII)",
          "f[i] = f[i-1] indiferent de caractere",
        ],
        correctIndex: 0,
        explanation:
          "Algoritmul încearcă să extindă bordura curentă: dacă pattern[f[i-1]] = pattern[i], f[i] = f[i-1]+1. Altfel, reduce k = f[f[i-1]-1] și reîncearcă, până când găsește o potrivire sau k = 0.",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question: "La o nepotrivire KMP cu k = 4 și f[3] = 1, care sunt noile valori (i, k)?",
        options: ["(i+3, 1)", "(i+1, 0)", "(i+2, 2)", "(i+4, 3)"],
        correctIndex: 0,
        explanation:
          "La nepotrivire, i_nou = i + k - f[k-1] = i + 4 - 1 = i + 3, iar k_nou = f[k-1] = f[3] = 1. Textul avansează cu 3 poziții, iar compararea reia de la pattern[1] cu text[i_nou].",
      },
      {
        question: "Dacă k = 0 la o nepotrivire KMP (niciun caracter potrivit), ce se întâmplă?",
        options: [
          "i crește cu 1, k rămâne 0",
          "i rămâne neschimbat, k devine f[0]",
          "i crește cu f[0], k devine 0",
          "Algoritmul se termină",
        ],
        correctIndex: 0,
        explanation:
          "Când k = 0 la nepotrivire, nu există nicio bordură de exploatat. Se avansează i cu 1 (se trece la următorul caracter din text) și k rămâne 0. Acesta e singurul caz în care i avansează cu exact 1.",
      },
      {
        question: "În starea (i = 7, k = 5) cu f[4] = 2, apare o nepotrivire. Care este noua stare?",
        options: ["(10, 2)", "(9, 1)", "(12, 2)", "(8, 0)"],
        correctIndex: 0,
        explanation:
          "i_nou = i + k - f[k-1] = 7 + 5 - f[4] = 7 + 5 - 2 = 10. k_nou = f[4] = 2. Noua stare e (10, 2), adică textul avansează la poziția 10 și reluăm compararea de la pattern[2].",
      },
      {
        question: "În KMP, când are loc o tranziție de tip 'k crește cu 1'?",
        options: [
          "Când pattern[k] = text[i], iar apoi i și k se incrementează",
          "Când pattern[k] ≠ text[i]",
          "La fiecare iterație, indiferent de potrivire",
          "Doar la începutul căutării",
        ],
        correctIndex: 0,
        explanation:
          "Când pattern[k] = text[i], avem o potrivire. Se execută k++ și i++ (se trece la următorul caracter din pattern și din text). Dacă k = m după incrementare, s-a găsit o apariție completă.",
      },
      {
        question: "După o potrivire completă (k = m), cum continuă KMP să caute apariții ulterioare?",
        options: [
          "k = f[m-1], i rămâne neschimbat (se raportează apariția la poziția i - m)",
          "k = 0, i = i + 1 (se reia de la zero)",
          "k = m, i = i + 1 (se continuă cu același k)",
          "k = f[m-1], i = i + m - f[m-1]",
        ],
        correctIndex: 0,
        explanation:
          "După o potrivire completă raportată la poziția i - m, KMP continuă cu k = f[m-1] (bordura maximă a întregului pattern), permițând detectarea aparițiilor suprapuse. i nu se modifică suplimentar față de incrementarea deja făcută.",
      },
      {
        question: "Dacă f[k-1] = 0 și k > 0 la o nepotrivire, ce se întâmplă cu starea (i, k)?",
        options: [
          "i_nou = i + k, k_nou = 0",
          "i_nou = i + 1, k_nou = 0",
          "i_nou = i, k_nou = 0",
          "i_nou = i + k, k_nou = f[k-1] = 0 (aceeași)",
        ],
        correctIndex: 0,
        explanation:
          "Dacă f[k-1] = 0, nu există nicio bordură utilă. Atunci i_nou = i + k - 0 = i + k (sărim peste toate cele k caractere potrivite), iar k_nou = 0. Reluăm compararea de la începutul patternului.",
      },
      {
        question: 'Avem patternul "ABAB" și textul "ABABAB". La prima potrivire completă (k = 4, i = 4), cum continuă KMP?',
        options: [
          "k devine f[3] = 2 (bordura 'AB'), raportează apariția la poziția 0, continuă comparând pattern[2] cu text[4]",
          "k = 0, i = 5, reîncepe de la pattern[0] cu text[5]",
          "k = 4, i = 5, caută altă apariție cu pattern întreg",
          "k = f[3] = 2, i = 5, raportează apariția",
        ],
        correctIndex: 0,
        explanation:
          "La potrivire completă i = 4 (deci apariția la poziția 0). f[3] pentru 'ABAB' este 2 (bordura 'AB'). k devine 2, i rămâne 4, deci comparăm pattern[2]='A' cu text[4]='A' și găsim o a doua apariție suprapusă.",
      },
      {
        question: "În KMP, cât de mult poate avansa indexul i (în text) la o singură nepotrivire?",
        options: [
          "Cu cel mult k caractere, unde k e numărul de potriviri curente",
          "Cu cel mult 1 caracter",
          "Cu cel mult m caractere (lungimea patternului)",
          "Cu cel mult n caractere (lungimea textului)",
        ],
        correctIndex: 0,
        explanation:
          "La o nepotrivire, i avansează cu k - f[k-1]. Deoarece f[k-1] ≥ 0, avansul maxim e k, iar minim e 1 (când f[k-1] = k-1, cazul 'AAAA...'). i nu poate avansa înapoi niciodată.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question: 'Avem patternul "AABA", textul "AABAABAA", funcția f = [0, 1, 0, 1]. În starea (i = 4, k = 0), text[4] = "A", pattern[0] = "A". Care e starea după această potrivire?',
        options: ["(5, 1)", "(4, 1)", "(5, 0)", "(4, 0)"],
        correctIndex: 0,
        explanation:
          "Deoarece text[4] = pattern[0], avem potrivire: k devine 1, i devine 5. Noua stare e (5, 1). Urmează compararea pattern[1]='A' cu text[5]='A' ș.a.m.d.",
      },
      {
        question: 'Pentru patternul "AAAB" și textul "XAAAB", funcția f = [0, 1, 2, 0]. La ce poziții din text apar apariții?',
        options: [
          "Doar la poziția 1",
          "La pozițiile 1 și 2",
          "Doar la poziția 0",
          "La pozițiile 0 și 1",
        ],
        correctIndex: 0,
        explanation:
          "Apariția e la poziția 1 (text[1..4] = 'AAAB'). Nu există a doua apariție deoarece f[3] = 0 (patternul 'AAAB' nu are nicio bordură), deci după potrivire k devine 0 și nu se suprapune nimic.",
      },
      {
        question: "Care e diferența fundamentală între KMP și algoritmul naiv la o nepotrivire?",
        options: [
          "KMP folosește funcția de prefix pentru a evita re-compararea, pe când naivul reia de la începutul patternului și de la următorul caracter din text",
          "KMP folosește hash-uri, naivul nu",
          "KMP sortează patternul înainte, naivul nu",
          "KMP compară de la dreapta la stânga, naivul de la stânga la dreapta",
        ],
        correctIndex: 0,
        explanation:
          "Algoritmul naiv, la o nepotrivire, reia căutarea de la poziția i - k + 1 în text și de la 0 în pattern, re-comparând caractere deja verificate. KMP folosește f[k-1] pentru a sări peste aceste re-comparări, asigurând complexitate liniară.",
      },
      {
        question: "Câte apariții suprapuse ale patternului 'AAA' apar în textul 'AAAAAA' folosind KMP?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation:
          "f = [0, 1, 2] pentru 'AAA'. KMP găsește apariții la pozițiile 0, 1, 2, 3 — în total 4 apariții. După fiecare potrivire, k = f[2] = 2, permițând descoperirea apariției următoare.",
      },
      {
        question: "În KMP, dacă f[m-1] = 0 pentru un pattern, ce înseamnă pentru căutare după o potrivire completă?",
        options: [
          "k devine 0 după potrivire, deci nu pot exista apariții suprapuse",
          "k devine m după potrivire, reluând de la început",
          "Patternul nu are nicio apariție în text",
          "f[m-1] nu poate fi 0 pentru niciun pattern",
        ],
        correctIndex: 0,
        explanation:
          "f[m-1] = 0 înseamnă că patternul nu are nicio bordură (niciun prefix propriu nu e și sufix). După o potrivire completă, k devine 0, deci nu se pot detecta apariții suprapuse. Exemplu: 'AB' are f[1] = 0.",
      },
      {
        question: "La o nepotrivire KMP cu k = 6 și f[5] = 3, care este avansul lui i (numărul de caractere sărite în text)?",
        options: ["3", "6", "2", "4"],
        correctIndex: 0,
        explanation:
          "Avansul = k - f[k-1] = 6 - f[5] = 6 - 3 = 3. Textul avansează cu 3 caractere, iar noul k = f[5] = 3. Aceasta reflectă exploatarea bordurii de lungime 3.",
      },
      {
        question: 'Care este funcția de prefix completă pentru patternul "ABCABCABC"?',
        options: [
          "[0, 0, 0, 1, 2, 3, 4, 5, 6]",
          "[0, 0, 0, 0, 0, 0, 0, 0, 0]",
          "[0, 0, 0, 1, 2, 3, 1, 2, 3]",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
        ],
        correctIndex: 0,
        explanation:
          "f = [0,0,0,1,2,3,4,5,6]. Explicație: 'ABC'→0, 'ABCA'→1('A'), 'ABCAB'→2('AB'), 'ABCABC'→3('ABC'), 'ABCABCA'→4('ABCA'), 'ABCABCAB'→5('ABCAB'), 'ABCABCABC'→6('ABCABC').",
      },
      {
        question: "De ce KMP garantează cel mult 2n comparații între caractere în faza de căutare?",
        options: [
          "Pentru că fiecare caracter al textului e incrementat de cel mult două ori: o dată la potrivire și o dată la nepotrivire cu decrementarea lui k",
          "Pentru că patternul e parcurs de două ori",
          "Pentru că textul e parcurs o dată iar patternul o dată",
          "Pentru că folosește doi pointeri",
        ],
        correctIndex: 0,
        explanation:
          "În KMP, i (indexul în text) crește monoton. La fiecare comparație, fie i crește (la potrivire sau la k=0), fie k se reduce (folosind f). k se reduce de cel mult atâtea ori cât a crescut, deci total comparații ≤ 2n.",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question: "Care dintre următoarele este o variantă a KMP care elimină necesitatea calculării explicite a funcției de prefix?",
        options: [
          "Algoritmul Z (liniar) — se poate adapta pentru potrivirea șirurilor",
          "Algoritmul lui Rabin-Karp",
          "Sortarea prin selecție",
          "Algoritmul lui Floyd-Warshall",
        ],
        correctIndex: 0,
        explanation:
          "Algoritmul Z calculează pentru fiecare poziție i lungimea celui mai lung subșir care începe la i și coincide cu prefixul. Poate fi folosit pentru potrivire concatenând pattern + '$' + text și rulând Z pe rezultat. Are aceeași complexitate O(n+m).",
      },
      {
        question: "Cum poate fi văzută funcția de prefix a KMP în contextul automatelor finite?",
        options: [
          "Ca o funcție de tranziție a unui automat finit determinist care recunoaște limbajul șirurilor care conțin patternul ca sufix",
          "Ca o funcție de hash a patternului",
          "Ca o funcție de sortare a caracterelor",
          "Ca o funcție de compresie a textului",
        ],
        correctIndex: 0,
        explanation:
          "KMP poate fi reinterpretat ca un DFA: stările sunt 0..m (câte caractere potrivite), iar f[i] definește tranzițiile de eșec. La un caracter c, din starea k, trecem la k+1 dacă c = pattern[k], altfel urmăm lanțul de fallback prin f.",
      },
      {
        question: "Ce se întâmplă dacă aplicăm KMP pe un text și un pattern de lungimi egale (n = m)?",
        options: [
          "Complexitatea rămâne O(n), iar căutarea testează efectiv dacă textul conține patternul ca subșir",
          "Complexitatea devine O(n²)",
          "KMP nu funcționează când n = m",
          "Se compară direct șirurile caracter cu caracter, fără a folosi f",
        ],
        correctIndex: 0,
        explanation:
          "KMP funcționează corect pentru orice n, m ≥ 1. Când n = m, complexitatea e O(n). Utilitatea e limitată (poți compara direct), dar algoritmul rămâne corect și poate găsi apariții suprapuse chiar și în acest caz.",
      },
      {
        question: "Care este relația dintre funcția de prefix KMP și funcția de eșec din algoritmul Aho-Corasick?",
        options: [
          "Aho-Corasick generalizează ideea KMP de la un singur pattern la un set de patternuri, fiecare nod având un link de eșec similar cu f[i]",
          "Aho-Corasick e o variantă mai lentă a KMP",
          "Aho-Corasick nu folosește funcții de eșec",
          "Aho-Corasick folosește funcția de prefix inversată",
        ],
        correctIndex: 0,
        explanation:
          "Aho-Corasick extinde KMP la un dicționar de patternuri. Construiește un trie al patternurilor, iar fiecare nod primește un 'fail link' care indică cel mai lung sufix al șirului curent care e prefix al unui pattern din dicționar, exact ca f[k-1] în KMP.",
      },
      {
        question: "Cum poate fi demonstrată corectitudinea KMP folosind invarianți?",
        options: [
          "Invariant: la orice pas, pattern[0..k-1] = text[i-k..i-1] (ultimele k caractere din text până la i coincid cu prefixul patternului), iar k = f[stare]",
          "Invariant: suma i + k e constantă pe parcursul algoritmului",
          "Invariant: textul e sortat alfabetic",
          "Invariant: patternul e o subsecvență a textului",
        ],
        correctIndex: 0,
        explanation:
          "Invariantul central al KMP: în orice moment, avem potrivirea a k caractere (pattern[0..k-1] = text[i-k..i-1]). Menținerea acestuia la tranziții, plus faptul că i crește monoton și k e corect actualizat prin f, demonstrează că algoritmul găsește toate aparițiile.",
      },
      {
        question: "Care este complexitatea de spațiu a KMP și de ce?",
        options: [
          "O(m) — se stochează doar funcția de prefix, un vector de m elemente",
          "O(n) — se stochează întregul text",
          "O(n + m) — se stochează textul și patternul",
          "O(1) — nu se stochează nimic suplimentar",
        ],
        correctIndex: 0,
        explanation:
          "KMP necesită O(m) spațiu suplimentar pentru vectorul f (funcția de prefix) de dimensiune m. Textul și patternul sunt deja stocate ca intrare, iar algoritmul folosește doar câțiva pointeri (i, k).",
      },
      {
        question: "Care dintre următoarele probleme NU poate fi rezolvată direct cu KMP?",
        options: [
          "Găsirea celui mai lung palindrom dintr-un șir",
          "Găsirea tuturor aparițiilor unui pattern într-un text",
          "Numărarea aparițiilor suprapuse ale unui pattern",
          "Găsirea celei mai lungi subsecvențe care apare de două ori într-un șir (prin concatenare cu sine)",
        ],
        correctIndex: 0,
        explanation:
          "KMP rezolvă problema potrivirii exacte a șirurilor. Găsirea celui mai lung palindrom e o problemă diferită care necesită algoritmi specializați (ex. Manacher). Celelalte opțiuni se pot rezolva prin adaptări ale KMP.",
      },
      {
        question: "În demonstrația complexității O(n+m) a KMP, cum se justifică că fiecare caracter al textului e vizitat de cel mult 2 ori?",
        options: [
          "i crește doar la potriviri sau când k=0; k scade doar când i e constant; fiecare increment al lui i e asociat cu cel mult un decrement al lui k; total decremente ≤ total incremente",
          "Textul e parcurs secvențial o singură dată",
          "Algoritmul nu accesează textul de mai mult de două ori din cauza cache-ului",
          "Se folosește teorema master",
        ],
        correctIndex: 0,
        explanation:
          "i crește cu 1 la fiecare potrivire sau când k=0 (cel mult n incremente). k crește cu 1 la fiecare potrivire (cel mult n), și poate scădea de mai multe ori la o nepotrivire, dar totalul scăderilor ≤ totalul creșterilor lui k, deci O(n).",
      },
    ],
  },
];

export const BM_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question: "În ce ordine compară Boyer-Moore caracterele patternului cu textul?",
        options: [
          "De la stânga la dreapta",
          "De la dreapta la stânga",
          "Alternând stânga-dreapta",
          "În ordine aleatorie",
        ],
        correctIndex: 1,
        explanation:
          "Boyer-Moore compară caracterele de la dreapta la stânga (de la ultimul caracter al patternului spre primul). Aceasta permite salturi mari la nepotriviri, deoarece un caracter nepotrivit în dreapta poate elimina multe poziții simultan.",
      },
      {
        question: "Care este ideea de bază din spatele regulii 'bad character' în Boyer-Moore?",
        options: [
          "Un caracter din text care nu apare în pattern poate fi ignorat, permițând alinierea patternului după acel caracter",
          "Se sortează caracterele patternului după frecvență",
          "Se compară doar caracterele care apar în ambele șiruri",
          "Se calculează media aritmetică a codurilor caracterelor",
        ],
        correctIndex: 0,
        explanation:
          "Regula bad character: la o nepotrivire, dacă caracterul din text (la care s-a produs nepotrivirea) nu apare în pattern, putem deplasa patternul complet după acel caracter. Dacă apare, aliniem ultima sa apariție cu caracterul din text.",
      },
      {
        question: "Ce este tabela lastOcc în Boyer-Moore?",
        options: [
          "Un dicționar care stochează pentru fiecare caracter ultima sa poziție (cea mai din dreapta) în pattern",
          "Un vector cu lungimile maximale ale sufixelor",
          "O listă cu toate aparițiile patternului în text",
          "Un tabel cu complexitățile algoritmilor",
        ],
        correctIndex: 0,
        explanation:
          "lastOcc mapează fiecare caracter din alfabet la ultima poziție (indexul cel mai din dreapta) la care apare în pattern. Pentru caractere care nu apar în pattern, lastOcc = -1. Aceasta e folosită de regula bad character.",
      },
      {
        question: "Algoritmul Rabin-Karp se bazează pe ce concept principal?",
        options: [
          "Hash-uri (funcții de amprentă) pentru ferestre de text, comparate cu hash-ul patternului",
          "Compararea de la dreapta la stânga",
          "Funcția de prefix",
          "Sortarea caracterelor patternului",
        ],
        correctIndex: 0,
        explanation:
          "Rabin-Karp calculează un hash pentru pattern și hash-uri pentru toate ferestrele consecutive de lungime m din text. Când hash-urile coincid, se verifică caracter cu caracter. Hash-ul se actualizează eficient folosind o fereastră glisantă.",
      },
      {
        question: "Care este complexitatea Boyer-Moore în cazul mediu, pe texte naturale?",
        options: [
          "O(n/m) — sublineară",
          "O(n + m) — liniară",
          "O(n·m) — pătratică",
          "O(n log m)",
        ],
        correctIndex: 0,
        explanation:
          "Pe texte cu alfabet mare și patternuri obișnuite, BM face în medie O(n/m) comparații, adică sublinear. Datorită salturilor mari (regula bad character și good suffix), multe caractere din text nu sunt niciodată inspectate.",
      },
      {
        question: "Ce face Boyer-Moore când regula bad character dă un deplasament negativ?",
        options: [
          "Ignoră regula bad character și folosește doar good suffix",
          "Deplasează patternul la stânga (în sens invers)",
          "Folosește max(1, bad_char_shift) — deplasamentul minim e 1",
          "Oprește algoritmul",
        ],
        correctIndex: 0,
        explanation:
          "Dacă bad character shift e negativ (ultima apariție e la dreapta poziției curente de comparare), BM îl ignoră și folosește deplasamentul dat de regula good suffix, care e întotdeauna pozitiv.",
      },
      {
        question: "Cum se numește faza de preprocesare în care Boyer-Moore construiește structuri auxiliare?",
        options: [
          "Faza de preprocesare — construiește lastOcc și goodSuffix",
          "Faza de sortare",
          "Faza de compresie",
          "Faza de randomizare",
        ],
        correctIndex: 0,
        explanation:
          "BM are două faze: (1) preprocesare O(m + Σ) unde calculează tabela lastOcc și vectorul goodSuffix, și (2) căutarea propriu-zisă. Preprocesarea se face o singură dată pentru un pattern dat.",
      },
      {
        question: "Ce reprezintă k în contextul comparării Boyer-Moore?",
        options: [
          "Poziția din pattern de la care comparăm (decrementează de la m-1 la 0)",
          "Numărul de caractere potrivite de la stânga",
          "Indexul în text",
          "Lungimea patternului",
        ],
        correctIndex: 0,
        explanation:
          "În BM, k începe de la m-1 (ultimul caracter al patternului) și scade până la 0 pe măsură ce comparăm de la dreapta la stânga. Când k devine -1, avem o potrivire completă a patternului.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question: 'Pentru patternul "ABACB", care e valoarea lastOcc pentru caracterul "A"?',
        options: ["0", "1", "2", "3"],
        correctIndex: 2,
        explanation:
          '"A" apare la pozițiile 0 și 2 în pattern. lastOcc reține ultima apariție (cea mai din dreapta), deci lastOcc("A") = 2.',
      },
      {
        question: 'Pentru patternul "ABCABC", care e valoarea lastOcc("D")?',
        options: ["-1", "0", "5", "6"],
        correctIndex: 0,
        explanation:
          '"D" nu apare în patternul "ABCABC". Conform convenției, lastOcc("D") = -1, indicând că acest caracter nu există în pattern.',
      },
      {
        question: "Care e formula deplasamentului dat de regula bad character în Boyer-Moore?",
        options: [
          "shift = k - lastOcc(text[i+k]), unde k e poziția în pattern la nepotrivire",
          "shift = lastOcc(text[i+k])",
          "shift = k + lastOcc(text[i+k])",
          "shift = m - k",
        ],
        correctIndex: 0,
        explanation:
          "La o nepotrivire la poziția k în pattern (numerotat de la 0 de la stânga), cu caracterul text[i+k] = c, deplasamentul bad character e shift_bc = k - lastOcc(c). Dacă lastOcc(c) = -1, shift_bc = k + 1.",
      },
      {
        question: 'Pentru patternul "ABCD" și textul "XBCDY...", dacă BM compară și găsește nepotrivire la k = 3 (pattern[3]="D" vs text[3]="B"), care e bad character shift?',
        options: ["2", "3", "1", "4"],
        correctIndex: 0,
        explanation:
          'Caracterul rău e "B" (text[3]). lastOcc("B") în patternul "ABCD" = 1. k = 3, deci shift = 3 - 1 = 2. Patternul se deplasează cu 2 poziții la dreapta.',
      },
      {
        question: 'Pentru patternul "ABC", dacă nepotrivirea e la k = 2 cu caracterul "X" (care nu apare în pattern), care e bad character shift?',
        options: ["2", "3", "1", "0"],
        correctIndex: 1,
        explanation:
          'lastOcc("X") = -1. Shift = k - (-1) = 2 + 1 = 3. Patternul se deplasează complet după poziția caracterului "X", deoarece "X" nu apare în pattern.',
      },
      {
        question: 'Pentru patternul "AABA", calculați lastOcc pentru "A" și "B".',
        options: [
          'lastOcc("A") = 3, lastOcc("B") = 2',
          'lastOcc("A") = 2, lastOcc("B") = 3',
          'lastOcc("A") = 0, lastOcc("B") = 3',
          'lastOcc("A") = 3, lastOcc("B") = 1',
        ],
        correctIndex: 0,
        explanation:
          '"A" apare la pozițiile 0, 1, 3 → ultima e 3. "B" apare la poziția 2 → ultima e 2. lastOcc("A") = 3, lastOcc("B") = 2.',
      },
      {
        question: "Ce face Boyer-Moore după ce calculează deplasamentele bad character și good suffix?",
        options: [
          "Alege deplasamentul maxim dintre cele două reguli",
          "Alege deplasamentul minim dintre cele două reguli",
          "Adună cele două deplasamente",
          "Folosește doar bad character",
        ],
        correctIndex: 0,
        explanation:
          "BM alege max(bad_char_shift, good_suffix_shift) pentru a maximiza avansul. Aceasta asigură că nu se omit potriviri (ambele reguli sunt sigure dpdv al corectitudinii) și oferă salturi cât mai mari.",
      },
      {
        question: 'Pentru patternul "ABCBA", calculați bad character shift dacă nepotrivirea e la k = 4 cu caracterul "C" (text[i+4] = "C").',
        options: ["1", "2", "3", "4"],
        correctIndex: 0,
        explanation:
          'lastOcc("C") în "ABCBA" = 2 (poziția 2). k = 4. shift_bc = 4 - 2 = 2. Patternul avansează cu 2 poziții, aliniind "C"-ul din pattern cu "C"-ul din text.',
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question: "În Boyer-Moore, ce face regula good suffix (sufix bun)?",
        options: [
          "Când un sufix al patternului s-a potrivit, caută aceeași subsecvență mai la stânga în pattern și o aliniază cu textul",
          "Compară sufixele patternului cu prefixele textului",
          "Calculează hash-ul sufixelor",
          "Inversează patternul și reia căutarea",
        ],
        correctIndex: 0,
        explanation:
          "Regula good suffix: după o potrivire parțială a unui sufix al patternului, caută în pattern aceeași subsecvență (sau un prefix care e sufix al acesteia) și aliniază patternul astfel încât aceasta să corespundă cu textul deja potrivit.",
      },
      {
        question: "Când se aplică regula good suffix în Boyer-Moore?",
        options: [
          "Când cel puțin un caracter al sufixului patternului s-a potrivit cu textul (k < m-1) și apare o nepotrivire",
          "Doar la începutul căutării",
          "Când toate caracterele patternului s-au potrivit",
          "Regula good suffix se aplică întotdeauna, indiferent de context",
        ],
        correctIndex: 0,
        explanation:
          "Good suffix se aplică atunci când o parte din sufixul patternului s-a potrivit (deci k, poziția curentă de comparare, e mai mică decât m-1) și apare o nepotrivire. Regula încearcă să reutilizeze porțiunea potrivită.",
      },
      {
        question: "Cum combină Boyer-Moore regulile bad character și good suffix?",
        options: [
          "Alege shift = max(shift_bad_char, shift_good_suffix)",
          "Alege shift = min(shift_bad_char, shift_good_suffix)",
          "Folosește shift_bad_char când e pozitiv, altfel shift_good_suffix",
          "Calculează media celor două shift-uri",
        ],
        correctIndex: 0,
        explanation:
          "BM alege maximul dintre cele două deplasamente. Ambele reguli sunt corecte (nu sar peste potriviri), iar maximul oferă cel mai mare salt sigur, optimizând performanța.",
      },
      {
        question: "În Boyer-Moore, dacă bad character shift = 2 și good suffix shift = 5, ce deplasament se folosește?",
        options: ["5", "2", "7", "3"],
        correctIndex: 0,
        explanation:
          "Se alege max(2, 5) = 5. Good suffix permite un salt mai mare în această situație. Deplasamentul mai mare reduce numărul de alinieri ce trebuie verificate.",
      },
      {
        question: "Pentru patternul 'ABABAB', dacă s-a potrivit sufixul 'AB' (ultimele 2 caractere) și apare nepotrivire la k = 3, ce face regula good suffix?",
        options: [
          "Caută 'AB' mai la stânga în pattern (la poziția 2) și aliniază patternul astfel încât acel 'AB' să corespundă cu 'AB'-ul din text",
          "Ignoră sufixul și aplică bad character",
          "Resetează căutarea de la început",
          "Inversează patternul",
        ],
        correctIndex: 0,
        explanation:
          "Regula good suffix caută o apariție anterioară a sufixului potrivit ('AB') în pattern. În 'ABABAB', 'AB' apare la pozițiile 0, 2, 4. Cea mai din stânga apariție care nu e chiar sufixul curent e la poziția 2, deci shift = 3 - 2 = ...",
      },
      {
        question: "Când bad character shift e mai mic decât 1, ce shift folosește Boyer-Moore?",
        options: [
          "Cel puțin 1 — de obicei shift_good_suffix care e întotdeauna ≥ 1",
          "1 — avansează cu exact 1 poziție",
          "0 — nu avansează deloc",
          "Shift_bad_char, chiar și negativ",
        ],
        correctIndex: 0,
        explanation:
          "Dacă bad character shift e ≤ 0 (pentru că ultima apariție e la dreapta poziției curente de comparare), BM folosește good suffix shift, care e garantat să fie cel puțin 1. Astfel, algoritmul progresează întotdeauna.",
      },
      {
        question: "În construcția tabelei goodSuffix, ce reprezintă o valoare mai mare?",
        options: [
          "Un salt mai mare la nepotrivire — mai eficient",
          "Un salt mai mic — mai conservator",
          "Lungimea patternului",
          "Numărul de caractere potrivite",
        ],
        correctIndex: 0,
        explanation:
          "goodSuffix[k] = cu cât poate sări patternul la o nepotrivire când s-au potrivit ultimele m-1-k caractere. O valoare mai mare înseamnă un salt mai mare, deci mai eficient.",
      },
      {
        question: "Dacă patternul e 'ABCDEF', toate caracterele distincte, cum se comportă de obicei regula bad character la o nepotrivire?",
        options: [
          "Dă shift = k + 1 (deoarece caracterul rău nu reapare în stânga), permițând salturi mari",
          "Dă shift = 1 întotdeauna",
          "Dă shift = k - 1",
          "Nu se poate aplica regula bad character",
        ],
        correctIndex: 0,
        explanation:
          "Când toate caracterele sunt distincte, la o nepotrivire la poziția k, caracterul text nu apare în pattern (sau apare doar la poziția curentă), deci shift = k - (-1) = k + 1. Saltul e proporțional cu distanța de la capătul din dreapta.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question: "Care este formula pentru hash-ul Rabin-Karp (rolling hash) când folosim o bază B și un modul M?",
        options: [
          "h(șir[i..i+m-1]) = (h(șir[i..i+m-2]) - șir[i]·B^(m-1))·B + șir[i+m] (mod M)",
          "h = Σ șir[i] (suma caracterelor)",
          "h = șir[i] XOR șir[i+1] XOR ... XOR șir[i+m-1]",
          "h = șir[i] · șir[i+1] · ... · șir[i+m-1] (produsul)",
        ],
        correctIndex: 0,
        explanation:
          "Rabin-Karp folosește un hash polinomial: h = (c₀·B^(m-1) + c₁·B^(m-2) + ... + c_{m-1}) mod M. La trecerea la fereastra următoare, se scade termenul vechi (c₀·B^(m-1)), se înmulțește cu B, și se adună noul caracter.",
      },
      {
        question: "Ce se întâmplă când hash-ul ferestrei curente coincide cu hash-ul patternului în Rabin-Karp?",
        options: [
          "Se verifică caracter cu caracter (verificare directă) pentru a elimina false positive-urile",
          "Se raportează imediat o potrivire",
          "Se trece la fereastra următoare fără verificare",
          "Se recalculează hash-ul cu o altă bază",
        ],
        correctIndex: 0,
        explanation:
          "Deoarece funcțiile hash pot produce coliziuni (șiruri diferite cu același hash), Rabin-Karp trebuie să verifice direct caracterele când hash-urile coincid. Fără această verificare, am putea raporta false positive-uri.",
      },
      {
        question: "Care e probabilitatea unei coliziuni de hash în Rabin-Karp când se folosește un modul M mare (număr prim)?",
        options: [
          "Aproximativ 1/M pentru o singură comparație (foarte mică când M e mare)",
          "1/2 (50%) indiferent de M",
          "1/M²",
          "0 — coliziunile nu sunt posibile cu numere prime",
        ],
        correctIndex: 0,
        explanation:
          "Cu un modul M prim, hash-urile sunt distribuite uniform în [0, M-1]. Probabilitatea ca două șiruri diferite să aibă același hash e ≈ 1/M. Pentru M ≈ 10⁹, aceasta e neglijabilă, dar riscul există totuși.",
      },
      {
        question: "Care e complexitatea de timp a lui Rabin-Karp în cazul cel mai rău?",
        options: [
          "O(n·m) — când toate ferestrele au același hash ca patternul (foarte multe coliziuni)",
          "O(n + m) — întotdeauna liniar",
          "O(n/m) — sublinear ca BM",
          "O(n²) — pătratică",
        ],
        correctIndex: 0,
        explanation:
          "În cazul cel mai rău (de exemplu, text 'AAAA...A' și pattern 'AAA...A'), toate ferestrele au același hash, iar fiecare necesită O(m) comparații directe, rezultând O(n·m). În practică, cu M mare și text normal, e aproape liniar.",
      },
      {
        question: "Care e diferența principală între Rabin-Karp și KMP în abordarea problemei potrivirii șirurilor?",
        options: [
          "Rabin-Karp folosește hash-uri pentru a elimina majoritatea comparațiilor directe; KMP folosește funcția de prefix pentru a evita re-compararea caracterelor",
          "Rabin-Karp e determinist, KMP e randomizat",
          "KMP folosește hash-uri, Rabin-Karp nu",
          "Rabin-Karp compară de la dreapta la stânga, KMP de la stânga la dreapta",
        ],
        correctIndex: 0,
        explanation:
          "Rabin-Karp e un algoritm randomizat (sau cel puțin bazat pe hash) care poate avea false positive-uri, dar e excelent pentru potrivirea multiplă (mai multe patternuri). KMP e determinist și liniar, dar mai complex de implementat.",
      },
      {
        question: "Cum poate fi folosit Rabin-Karp pentru a căuta mai multe patternuri de aceeași lungime simultan?",
        options: [
          "Se calculează hash-urile tuturor patternurilor și se stochează într-un set; la fiecare fereastră, se verifică dacă hash-ul curent e în set",
          "Se rulează KMP pentru fiecare pattern",
          "Se sortează patternurile și se face căutare binară",
          "Se construiește un trie al patternurilor",
        ],
        correctIndex: 0,
        explanation:
          "Rabin-Karp se extinde natural la mai multe patternuri: calculează hash-urile tuturor patternurilor (de aceeași lungime) și le pune într-un HashSet. Pentru fiecare fereastră, verifică rapid dacă hash-ul e în set, apoi confirmă prin comparație directă.",
      },
      {
        question: "Ce este un 'false positive' în Rabin-Karp și cum se gestionează?",
        options: [
          "Când hash-ul ferestrei coincide cu hash-ul patternului, dar șirurile sunt diferite; se detectează prin verificarea directă caracter cu caracter",
          "Când patternul apare dar hash-ul nu coincide; se ignoră această situație",
          "Când algoritmul e prea lent; se folosește un modul mai mic",
          "Când textul e gol; se returnează eroare",
        ],
        correctIndex: 0,
        explanation:
          "False positive = coliziune de hash (șiruri diferite cu același hash). Rabin-Karp îl detectează prin comparația directă obligatorie după coincidența hash-urilor. Dacă caracterele diferă, e false positive și se ignoră.",
      },
      {
        question: "Care e complexitatea de spațiu a Rabin-Karp în varianta pentru un singur pattern?",
        options: [
          "O(1) — doar câteva variabile (hash pattern, hash curent, puterea B^(m-1))",
          "O(m) — se stochează patternul",
          "O(n) — se stochează textul",
          "O(n + m) — se stochează ambele șiruri",
        ],
        correctIndex: 0,
        explanation:
          "Rabin-Karp necesită doar O(1) spațiu suplimentar: hash-ul patternului, hash-ul curent, și puterea B^(m-1) mod M. Patternul și textul sunt deja disponibile ca intrare. Aceasta e o mare eficiență față de KMP care necesită O(m).",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question: "Care este complexitatea Boyer-Moore în cazul cel mai rău și de ce?",
        options: [
          "O(n·m) — de exemplu, pattern 'AAAB' și text 'AAAA...A': la fiecare aliniere, se compară multe caractere, iar bad character și good suffix dau deplasamente mici",
          "O(n + m) — BM e întotdeauna liniar",
          "O(n/m) — BM e întotdeauna sublinear",
          "O(m² + n) — preprocesarea e cea mai scumpă",
        ],
        correctIndex: 0,
        explanation:
          "În cazul cel mai rău (de exemplu text 'AAAA...A' cu pattern 'AAAB'), BM face O(n·m) comparații. La fiecare aliniere, se compară aproape tot patternul, iar deplasamentul e mic (de obicei 1). Cu toate acestea, în practică, pe texte naturale, BM e sublinear.",
      },
      {
        question: "Cum se compară KMP, Boyer-Moore și Rabin-Karp din perspectiva complexității în cazul mediu?",
        options: [
          "BM: O(n/m) sublinear; KMP: O(n) liniar; RK: O(n) aproape liniar (cu risc de O(n·m) la coliziuni)",
          "Toți trei au O(n) în cazul mediu",
          "BM: O(n); KMP: O(n/m); RK: O(n·m)",
          "Toți trei au O(n·m) în cazul mediu",
        ],
        correctIndex: 0,
        explanation:
          "Boyer-Moore e sublinear în cazul mediu datorită salturilor mari. KMP e liniar garantat. Rabin-Karp e aproape liniar în practică, dar poate degenera la O(n·m) cu coliziuni multe. BM e cel mai rapid pe texte naturale.",
      },
      {
        question: "Când ați alege Rabin-Karp în locul KMP sau BM?",
        options: [
          "Când căutăm mai multe patternuri de aceeași lungime simultan — RK se extinde natural prin seturi de hash-uri",
          "Când textul e foarte scurt",
          "Când patternul e mai lung decât textul",
          "RK e întotdeauna mai bun decât KMP și BM",
        ],
        correctIndex: 0,
        explanation:
          "Rabin-Karp e ideal pentru căutarea simultană a mai multor patternuri de aceeași lungime (ex: detectarea plagiatului, căutare în dicționar). KMP și BM ar necesita rulări separate pentru fiecare pattern, în timp ce RK verifică toate patternurile într-o singură trecere.",
      },
      {
        question: "De ce Boyer-Moore are performanță sublineară în cazul mediu?",
        options: [
          "Pentru că majoritatea caracterelor din text nu sunt niciodată inspectate — la o nepotrivire, se sar multe poziții, mai ales când caracterul rău nu apare în pattern",
          "Pentru că rulează pe mai multe nuclee",
          "Pentru că textul e indexat în prealabil",
          "Pentru că folosește compresie",
        ],
        correctIndex: 0,
        explanation:
          "BM evită inspectarea multor caractere din text. La o nepotrivire, în special când caracterul din text nu apare în pattern, saltul e mare (k + 1). Pe texte cu alfabet mare, majoritatea caracterelor nu sunt în pattern, deci salturile sunt frecvente și mari.",
      },
      {
        question: "Care dintre următoarele afirmații despre Boyer-Moore este ADEVĂRATĂ?",
        options: [
          "BM poate fi mai lent decât KMP pe patternuri cu multe repetiții (ex: 'AAAA')",
          "BM e întotdeauna mai rapid decât KMP",
          "BM are complexitate O(n+m) garantată",
          "BM nu necesită preprocesare",
        ],
        correctIndex: 0,
        explanation:
          "Pe patternuri repetitive (ex: 'AAA...A'), BM degradează la O(n·m), în timp ce KMP rămâne O(n+m). BM excelează pe patternuri cu caractere diverse, iar KMP e mai robust în cazul cel mai rău.",
      },
      {
        question: "Ce înseamnă că Boyer-Moore e 'sublinear' în cazul mediu?",
        options: [
          "Algoritmul inspectează mai puține caractere decât lungimea textului (inspectează doar o fracție din caractere)",
          "Rulează în timp mai mic decât introducerea datelor",
          "Folosește mai puțină memorie decât textul",
          "Complexitatea e O(log n)",
        ],
        correctIndex: 0,
        explanation:
          "Sublinear înseamnă că numărul de operații e mai mic decât lungimea textului n. BM inspectează doar o fracție din caracterele textului (aproximativ n/m în mediu), datorită salturilor mari. 'Sublinear' nu înseamnă O(log n), ci o(n).",
      },
      {
        question: "Cum poate fi modificat Boyer-Moore pentru a garanta complexitate O(n) în cazul cel mai rău?",
        options: [
          "Combinând BM cu KMP sau folosind varianta Boyer-Moore-Galil, care adaugă un mecanism de memorare a potrivirilor parțiale pentru a evita re-compararea",
          "Alegând întotdeauna shift = max(1, shift_bad_char)",
          "Mărind tabela lastOcc",
          "Folosind un modul hash",
        ],
        correctIndex: 0,
        explanation:
          "Varianta Boyer-Moore-Galil (1980) modifică BM pentru a garanta O(n) în cazul cel mai rău. Ideea: după o potrivire completă, se reține cât s-a potrivit la ultima aliniere, evitând re-compararea porțiunilor deja verificate. Se combină cu idei din KMP.",
      },
      {
        question: "Care e compromisul principal între KMP și Boyer-Moore când alegeți un algoritm pentru o aplicație practică?",
        options: [
          "KMP oferă complexitate liniară garantată și e mai simplu; BM e mai rapid în practică pe text normal, dar poate fi O(n·m) în cazul cel mai rău",
          "KMP e mai rapid pe text normal; BM e mai sigur",
          "KMP și BM sunt identice ca performanță",
          "BM e mai ușor de implementat corect",
        ],
        correctIndex: 0,
        explanation:
          "Alegerea depinde de context: BM e preferat în aplicații practice (editor de text, grep) unde textul e natural, oferind performanță sublineară. KMP e preferat când predictibilitatea și garanțiile sunt critice (sisteme în timp real, date patologice posibile).",
      },
    ],
  },
];
