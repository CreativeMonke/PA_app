import type { QuizSet } from "@/types";

export const PROB_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question:
          "Ce este un algoritm randomizat?",
        options: [
          "Un algoritm care rulează întotdeauna în același timp indiferent de intrare",
          "Un algoritm care folosește numere aleatoare pentru a-și ghida execuția",
          "Un algoritm care sortează datele în ordine aleatoare",
          "Un algoritm care nu folosește niciodată numere aleatoare",
        ],
        correctIndex: 1,
        explanation:
          "Un algoritm randomizat își bazează deciziile pe numere aleatoare (sau pseudo-aleatoare) pe parcursul execuției. Comportamentul său poate diferi de la o rulare la alta chiar pentru aceeași intrare.",
      },
      {
        question:
          "Care dintre următoarele este o caracteristică a unui algoritm de tip Las Vegas?",
        options: [
          "Răspunsul poate fi incorect cu o probabilitate mică",
          "Rulează într-un timp fix, garantat",
          "Răspunsul este întotdeauna corect, dar timpul de execuție poate varia",
          "Nu folosește niciodată randomizare",
        ],
        correctIndex: 2,
        explanation:
          "Algoritmii Las Vegas oferă întotdeauna un răspuns corect. Timpul de execuție poate varia de la o rulare la alta, dar la terminare rezultatul este garantat corect.",
      },
      {
        question:
          "Care dintre următoarele este o caracteristică a unui algoritm de tip Monte Carlo?",
        options: [
          "Oferă întotdeauna răspunsul corect",
          "Oferă un răspuns corect cu o anumită probabilitate, putând greși cu o probabilitate mică",
          "Nu folosește randomizare",
          "Timpul de execuție depinde doar de intrare, nu și de alegerile aleatoare",
        ],
        correctIndex: 1,
        explanation:
          "Algoritmii Monte Carlo au un timp de execuție fix (de obicei polinomial) dar pot produce un răspuns incorect cu o probabilitate mică. Această probabilitate poate fi redusă prin rulări multiple independente.",
      },
      {
        question:
          "În contextul algoritmilor randomizați, ce reprezintă o variabilă aleatoare indicator I{A}?",
        options: [
          "I{A} = 1 dacă evenimentul A are loc, 0 altfel",
          "I{A} = numărul de apariții ale lui A",
          "I{A} = probabilitatea evenimentului A",
          "I{A} = valoarea medie a lui A",
        ],
        correctIndex: 0,
        explanation:
          "O variabilă aleatoare indicator I{A} ia valoarea 1 dacă evenimentul A are loc și 0 în caz contrar. Este utilă deoarece E[I{A}] = Pr{A}, permițând calculul probabilităților prin valori medii.",
      },
      {
        question:
          "Care este valoarea medie (speranța matematică) a unei variabile aleatoare indicator I{A}?",
        options: [
          "E[I{A}] = 0",
          "E[I{A}] = 1",
          "E[I{A}] = Pr{A}",
          "E[I{A}] = 1 / Pr{A}",
        ],
        correctIndex: 2,
        explanation:
          "E[I{A}] = 1 · Pr{A} + 0 · Pr{Ā} = Pr{A}. Această proprietate fundamentală face variabilele indicator extrem de utile în analiza algoritmilor randomizați.",
      },
      {
        question:
          "Algoritmul Randomizat QuickSort alege pivotul:",
        options: [
          "Ca fiind primul element al sub-arrayului",
          "Ca fiind ultimul element al sub-arrayului",
          "Uniform aleator dintre elementele sub-arrayului",
          "Ca fiind elementul median al sub-arrayului",
        ],
        correctIndex: 2,
        explanation:
          "QuickSort randomizat alege pivotul uniform aleator dintre elementele sub-arrayului curent. Aceasta elimină dependența de distribuția intrării și asigură un timp așteptat O(n log n) pentru orice intrare.",
      },
      {
        question:
          "Care este timpul așteptat de execuție al algoritmului Randomizat QuickSort?",
        options: [
          "O(n)",
          "O(n²)",
          "O(n log n)",
          "O(log n)",
        ],
        correctIndex: 2,
        explanation:
          "Randomizat QuickSort are timpul așteptat O(n log n) pentru orice intrare. Prin alegerea aleatoare a pivotului, cazul cel mai defavorabil (O(n²)) are probabilitate extrem de mică.",
      },
      {
        question:
          "În problema Hiring (angajare), dacă avem n candidați într-o ordine aleatoare, care este numărul așteptat de angajări?",
        options: [
          "1",
          "n",
          "Hn (al n-lea număr armonic ≈ ln n)",
          "n / 2",
        ],
        correctIndex: 2,
        explanation:
          "Numărul așteptat de angajări este Hn = 1 + 1/2 + 1/3 + ... + 1/n ≈ ln n. Acesta se obține folosind variabile indicator: fiecare candidat i este angajat dacă este cel mai bun dintre primii i, cu probabilitatea 1/i.",
      },
      {
        question:
          "Un algoritm Monte Carlo cu probabilitatea de eroare p poate fi rulat independent de k ori. Care este probabilitatea ca toate k rulări să greșească?",
        options: [
          "k · p",
          "p^k",
          "1 - (1-p)^k",
          "1 - p^k",
        ],
        correctIndex: 1,
        explanation:
          "Dacă rulările sunt independente, probabilitatea ca toate să greșească este p^k. Astfel, prin rulări multiple, probabilitatea de eroare scade exponențial, permițând obținerea unei precizii arbitrar de mari.",
      },
      {
        question:
          "Ce diferențiază fundamental algoritmii Las Vegas de cei Monte Carlo?",
        options: [
          "Las Vegas folosesc randomizare, Monte Carlo nu",
          "Las Vegas sunt întotdeauna corecți, Monte Carlo pot greși",
          "Monte Carlo sunt mai rapidi decât Las Vegas",
          "Monte Carlo nu folosesc randomizare",
        ],
        correctIndex: 1,
        explanation:
          "Diferența fundamentală: Las Vegas garantează corectitudinea rezultatului (timpul variază), iar Monte Carlo garantează timpul de execuție (rezultatul poate fi incorect cu probabilitate mică). Ambele folosesc randomizare.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question:
          "În algoritmul Miller-Rabin, dacă n este compozit, câți martori (witnessi) există cel puțin?",
        options: [
          "n/2",
          "n/4",
          "3n/4",
          "niciunul",
        ],
        correctIndex: 2,
        explanation:
          "Pentru orice n compozit, cel puțin 3/4 din numerele din {1, ..., n-1} sunt martori ai compozitivității (witnessi). Astfel, un martor ales aleator are probabilitatea ≥ 3/4 de a detecta corect compozitivitatea.",
      },
      {
        question:
          "Care este probabilitatea de eroare a testului Miller-Rabin după o singură iterație (alegerea unui martor aleator)?",
        options: [
          "1/2",
          "1/4",
          "1/n",
          "0",
        ],
        correctIndex: 1,
        explanation:
          "Probabilitatea de eroare după o iterație este cel mult 1/4. După k iterații independente, probabilitatea de eroare scade la cel mult 4^{-k}. De exemplu, pentru k = 10, eroarea este mai mică de 10^{-6}.",
      },
      {
        question:
          "Ce este α-Bounded Random Search (α-BRS)?",
        options: [
          "Un algoritm care caută un element printr-un tabel sortat folosind căutare binară randomizată",
          "Un algoritm Monte Carlo care alege α poziții aleatoare dintr-un domeniu și le testează; dacă nu găsește soluția, eșuează",
          "Un algoritm Las Vegas care explorează toate cele α poziții",
          "Un algoritm de sortare randomizată",
        ],
        correctIndex: 1,
        explanation:
          "α-BRS testează α poziții alese uniform aleator dintr-un domeniu de căutare. Dacă soluția există, fiecare poziție aleasă are o probabilitate de a o găsi. Probabilitatea de eșec este (1 - 1/N)^α, iar pentru α = c·N devine ~ e^{-c}.",
      },
      {
        question:
          "În α-Bounded Random Search, dacă domeniul are dimensiunea N și α = N, care este probabilitatea de eșec?",
        options: [
          "0",
          "1/e ≈ 0.368",
          "0.5",
          "1/2^N",
        ],
        correctIndex: 0,
        explanation:
          "Dacă α = N, testăm toate pozițiile, deci găsim soluția cu certitudine. Probabilitatea de eșec este 0, dar α-BRS este util când N este mare și α << N, oferind un compromis între efort și probabilitatea de succes.",
      },
      {
        question:
          "Ce este Infinite Random Search?",
        options: [
          "Un algoritm Monte Carlo care rulează la infinit",
          "Un algoritm Las Vegas care alege poziții aleatoare până găsește soluția, garantând corectitudinea",
          "Un algoritm care nu se oprește niciodată",
          "Un algoritm care testează toate pozițiile în ordine aleatoare",
        ],
        correctIndex: 1,
        explanation:
          "Infinite Random Search este un algoritm Las Vegas: alege repetat poziții aleatoare până când găsește soluția. Este întotdeauna corect, dar timpul de execuție este o variabilă aleatoare cu distribuție geometrică.",
      },
      {
        question:
          "În problema streak-urilor (aruncări de monedă), care este lungimea așteptată a celui mai lung șir de cap consecutive după n aruncări?",
        options: [
          "O(1)",
          "O(log n)",
          "O(√n)",
          "O(n)",
        ],
        correctIndex: 1,
        explanation:
          "Lungimea așteptată a celui mai lung streak de cap (sau paletă) după n aruncări echitabile este O(log n). Mai exact, pentru o monedă corectă, aceasta este ≈ log₂ n.",
      },
      {
        question:
          "În problema nuts and bolts (piulițe și șuruburi), care este complexitatea așteptată a soluției randomizate?",
        options: [
          "O(n²)",
          "O(n log n)",
          "O(n)",
          "O(log n)",
        ],
        correctIndex: 1,
        explanation:
          "Problema nuts and bolts cere potrivirea fiecărei piulițe cu șurubul corespunzător. Soluția randomizată, similară cu QuickSort, are complexitatea așteptată O(n log n) și nu necesită comparații directe între piulițe sau între șuruburi.",
      },
      {
        question:
          "Cum se comportă un algoritm Monte Carlo cu probabilitatea de eroare < ε dacă îl rulăm de 2k ori și alegem răspunsul majoritar?",
        options: [
          "Eroarea rămâne ε",
          "Eroarea scade la ε^k",
          "Eroarea scade la ε² (pentru ε < 1/2)",
          "Eroarea crește",
        ],
        correctIndex: 2,
        explanation:
          "Rulând algoritmul de 2k ori și alegând răspunsul majoritar (votul majorității), probabilitatea de eroare scade exponențial cu k. Pentru ε < 1/2, probabilitatea ca majoritatea răspunsurilor să fie greșite scade rapid, conform inegalității Chernoff.",
      },
      {
        question:
          "Care este diferența dintre un algoritm randomizat și un algoritm determinist?",
        options: [
          "Algoritmii randomizați sunt întotdeauna mai lenți",
          "Algoritmii randomizați iau decizii bazate pe numere aleatoare, în timp ce cei determiniști au un comportament fix pentru aceeași intrare",
          "Algoritmii determiniști folosesc randomizare",
          "Nu există diferențe",
        ],
        correctIndex: 1,
        explanation:
          "Un algoritm determinist execută aceiași pași pentru aceeași intrare, producând același rezultat. Un algoritm randomizat folosește numere aleatoare, astfel încât comportamentul poate diferi între rulări, chiar pentru aceeași intrare.",
      },
      {
        question:
          "În analiza algoritmului de căutare a primei apariții (First Occurrence), dacă încercăm poziții aleatoare până găsim un element, care este numărul așteptat de încercări?",
        options: [
          "1",
          "n",
          "N (dimensiunea domeniului)",
          "n/2",
        ],
        correctIndex: 2,
        explanation:
          "Numărul așteptat de încercări este N (dimensiunea domeniului), presupunând o singură poziție care satisface condiția. Fiecare încercare are probabilitatea 1/N de succes, deci timpul așteptat urmează o distribuție geometrică cu media N.",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question:
          "În algoritmul Miller-Rabin, cum se verifică dacă a este martor al compozitivității lui n?",
        options: [
          "Se calculează a^(n-1) mod n; dacă ≠ 1, n este compozit",
          "Se descompune n-1 = 2^s · d și se verifică anumite condiții pe a^(2^i · d) mod n",
          "Se verifică dacă a divide n",
          "Se calculează a^n mod n",
        ],
        correctIndex: 1,
        explanation:
          "Miller-Rabin descompune n-1 = 2^s · d cu d impar. Apoi calculează x₀ = a^d mod n și succesiv x_{i+1} = x_i² mod n. Dacă x₀ ≠ 1 mod n și niciun x_i ≠ -1 mod n, atunci a este martor, deci n este compozit.",
      },
      {
        question:
          "Care este numărul de iterații necesare în Miller-Rabin pentru ca probabilitatea de eroare să fie mai mică de 10^{-6}?",
        options: [
          "5",
          "10",
          "20",
          "100",
        ],
        correctIndex: 1,
        explanation:
          "Fiecare iterație are probabilitatea de eroare ≤ 1/4. După k iterații, eroarea ≤ 4^{-k}. Pentru 4^{-k} < 10^{-6}, avem k ≥ log₄(10^6) ≈ 9.97, deci k = 10 iterații sunt suficiente.",
      },
      {
        question:
          "În α-Bounded Random Search, dacă domeniul are N elemente și alegem α poziții, care este probabilitatea de a găsi soluția (presupunând că există o singură soluție)?",
        options: [
          "α / N",
          "1 - (1 - 1/N)^α",
          "(1 - 1/N)^α",
          "α / (α + N)",
        ],
        correctIndex: 1,
        explanation:
          "Probabilitatea de a găsi soluția este 1 - (1 - 1/N)^α. Pentru α mic relativ la N, aceasta este ≈ α/N. Pentru α = c·N, probabilitatea tinde la 1 - e^{-c} conform aproximării exponențiale.",
      },
      {
        question:
          "În problema Hiring, dacă angajăm pe oricine este mai bun decât toți cei intervievați anterior, care este probabilitatea ca al i-lea candidat să fie angajat?",
        options: [
          "1/2",
          "1/n",
          "1/i",
          "1/(n-i+1)",
        ],
        correctIndex: 2,
        explanation:
          "Al i-lea candidat este angajat dacă este cel mai bun dintre primii i candidați. Într-o ordine aleatoare, toți primii i sunt la fel de probabil să fie cei mai buni, deci probabilitatea este 1/i.",
      },
      {
        question:
          "În Randomizat QuickSort, care este probabilitatea ca pivotul ales să împartă array-ul într-un raport de cel puțin 1:9?",
        options: [
          "0.1",
          "0.2",
          "0.8",
          "0.5",
        ],
        correctIndex: 2,
        explanation:
          "Pentru un raport de cel puțin 1:9, pivotul trebuie să fie în primele 10% sau ultimele 10% din elemente (caz rău) — probabilitate 0.2. Deci probabilitatea unei împărțiri bune (între 10% și 90%) este 0.8.",
      },
      {
        question:
          "Care este relația dintre variabilele indicator I{A} și I{B} când A și B sunt evenimente independente?",
        options: [
          "I{A} · I{B} = I{A ∩ B}",
          "I{A} · I{B} = 0",
          "I{A} + I{B} = I{A ∪ B}",
          "I{A} · I{B} = I{A} + I{B}",
        ],
        correctIndex: 0,
        explanation:
          "I{A} · I{B} = 1 dacă și numai dacă ambele evenimente au loc, adică I{A} · I{B} = I{A ∩ B}. Aceasta este valabil indiferent de independență, dar pentru calculul E[I{A} · I{B}] = Pr{A ∩ B}, dacă sunt independente, avem Pr{A ∩ B} = Pr{A} · Pr{B}.",
      },
      {
        question:
          "În analiza streak-urilor, cum se justifică faptul că lungimea celui mai lung streak este O(log n)?",
        options: [
          "Prin legea numerelor mari",
          "Prin limitarea probabilității unui streak de lungime L la n/2^L și alegerea L = c log₂ n",
          "Prin teorema limită centrală",
          "Prin inegalitatea Markov",
        ],
        correctIndex: 1,
        explanation:
          "Probabilitatea unui streak de exact L cap consecutive într-o poziție dată este 2^{-L}. Numărul așteptat de streak-uri de lungime L este ≤ n/2^L. Pentru L = 3 log₂ n, această valoare este n/n³ = 1/n², deci pentru L > log₂ n probabilitatea tinde la 0.",
      },
      {
        question:
          "Ce sunt evenimentele mutual exclusiv și cum se aplică variabilelor indicator?",
        options: [
          "Dacă A și B sunt mutual exclusive, atunci I{A} + I{B} = I{A ∪ B}",
          "Dacă A și B sunt mutual exclusive, atunci I{A} · I{B} = I{A ∪ B}",
          "Evenimentele mutual exclusive sunt întotdeauna independente",
          "I{A} + I{B} = 2 pentru evenimente mutual exclusive",
        ],
        correctIndex: 0,
        explanation:
          "Dacă A și B nu pot avea loc simultan (mutual exclusive), atunci indicatorul reuniunii este suma indicatorilor: I{A ∪ B} = I{A} + I{B}. Aceasta este utilă deoarece E[I{A} + I{B}] = E[I{A}] + E[I{B}] = Pr{A} + Pr{B}.",
      },
      {
        question:
          "În problema nuts and bolts, de ce nu putem compara direct două piulițe între ele?",
        options: [
          "Pentru că nu avem un instrument de măsură comun",
          "Pentru că piulițele și șuruburile au dimensiuni diferite",
          "Pentru că singura comparație posibilă este între o piuliță și un șurub (potrivire sau nepotrivire)",
          "Se pot compara, dar este ineficient",
        ],
        correctIndex: 2,
        explanation:
          "Singura operație permisă este încercarea unei piulițe cu un șurub: piulița este fie prea mare, fie prea mică, fie se potrivește perfect. Nu putem compara direct două piulițe între ele sau două șuruburi între ele.",
      },
      {
        question:
          "Cum se numește tehnica de reducere a erorii unui algoritm Monte Carlo prin rulări multiple și alegerea răspunsului majoritar?",
        options: [
          "Amplificarea probabilității",
          "Minoritatea raportată",
          "Votul majorității (majority voting)",
          "Reducerea varianței",
        ],
        correctIndex: 2,
        explanation:
          "Votul majorității constă în rularea algoritmului Monte Carlo de mai multe ori și alegerea răspunsului care apare cel mai frecvent. Dacă probabilitatea individuală de succes > 1/2, probabilitatea de eroare scade exponențial cu numărul de rulări.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question:
          "În analiza Randomizat QuickSort, cum se demonstrează că timpul așteptat este O(n log n)?",
        options: [
          "Prin inegalitatea Markov aplicată direct",
          "Prin definirea variabilelor indicator X_{ij} = 1 dacă elementele i și j sunt comparate și sumând E[X_{ij}] = 2/(j-i+1)",
          "Prin calcularea directă a numărului de partiții",
          "Prin legea numerelor mari",
        ],
        correctIndex: 1,
        explanation:
          "Se definesc variabilele indicator X_{ij} = 1 dacă elementele clasate pe pozițiile i și j sunt comparate. Probabilitatea ca ele să fie comparate este 2/(j-i+1). Timpul total T = ΣᵢΣⱼ₊₁ X_{ij}, iar E[T] = ΣᵢΣⱼ₊₁ 2/(j-i+1) = O(n log n).",
      },
      {
        question:
          "În testul Miller-Rabin, ce se întâmplă dacă n este un număr prim?",
        options: [
          "Oricare a între 1 și n-1 va fi martor al compozitivității",
          "Niciun a între 1 și n-1 nu este martor al compozitivității",
          "70% dintre valorile lui a sunt martori",
          "Testul eșuează",
        ],
        correctIndex: 1,
        explanation:
          "Dacă n este prim, pentru orice a între 1 și n-1, testul Miller-Rabin nu va găsi niciun martor al compozitivității. Testul va răspunde corect 'n este probabil prim' pentru orice a ales.",
      },
      {
        question:
          "În problema Hiring cu n candidați, care este varianța numărului de angajări?",
        options: [
          "Var = 0",
          "Var = H_n - Σ_{i=1}^n 1/i²",
          "Var = n²",
          "Var = H_n",
        ],
        correctIndex: 1,
        explanation:
          "Varianța numărului de angajări este Σ_{i=1}^n (1/i - 1/i²) = H_n - Σ 1/i². Deoarece variabilele indicator nu sunt independente, se calculează E[X_i²] = E[X_i] = 1/i, iar Cov(X_i, X_j) = 1/(i·j) - 1/(i·j) = ... și suma duce la acest rezultat.",
      },
      {
        question:
          "Cum se adaptează α-Bounded Random Search pentru a reduce probabilitatea de eșec sub un prag δ dat?",
        options: [
          "Se alege α = log₂(1/δ)",
          "Se alege α = N · ln(1/δ)",
          "Se alege α = N · ln(1/δ) și se rulează în faze multiple",
          "Se alege α = 1/δ",
        ],
        correctIndex: 2,
        explanation:
          "Pentru a avea probabilitatea de eșec < δ, alegem α = N · ln(1/δ), deoarece (1 - 1/N)^α ≈ e^{-α/N} = e^{-ln(1/δ)} = δ. Astfel, pentru δ = 0.001, avem nevoie de α ≈ 6.9N poziții pentru a asigura succesul cu probabilitate 0.999.",
      },
      {
        question:
          "În analiza Infinite Random Search, care este distribuția numărului de încercări până la succes?",
        options: [
          "Distribuție normală",
          "Distribuție uniformă",
          "Distribuție geometrică cu parametrul 1/N",
          "Distribuție Poisson cu media 1/N",
        ],
        correctIndex: 2,
        explanation:
          "Numărul de încercări urmează o distribuție geometrică cu probabilitatea de succes p = 1/N (presupunând o singură soluție). Media este 1/p = N, iar varianța este (1-p)/p² ≈ N².",
      },
      {
        question:
          "Ce este inegalitatea lui Markov și cum se aplică algoritmilor randomizați?",
        options: [
          "Pr{X ≥ t} ≤ E[X]/t, folosită pentru a limita probabilitatea devierilor mari",
          "Pr{X = t} = E[X]/t, folosită pentru a calcula probabilități exacte",
          "Pr{X ≤ t} ≥ E[X]/t, folosită pentru a garanta performanța",
          "E[X] = Σ Pr{X ≥ t}, folosită pentru a calcula media",
        ],
        correctIndex: 0,
        explanation:
          "Inegalitatea lui Markov: pentru o variabilă aleatoare nenegativă X și t > 0, Pr{X ≥ t} ≤ E[X]/t. Se aplică pentru a limita probabilitatea ca un algoritm randomizat să depășească un anumit timp de execuție. De exemplu, pentru a încadra probabilitatea ca timpul să fie de 2 ori media.",
      },
      {
        question:
          "În algoritmii randomizați, ce este inegalitatea lui Chernoff și când se folosește?",
        options: [
          "Se folosește pentru a calcula media exactă a unei variabile aleatoare",
          "Este o limită superioară exponențială pentru probabilitatea ca suma variabilelor independente să devieze de la medie",
          "Se folosește pentru a demonstra corectitudinea algoritmilor Las Vegas",
          "Este o inegalitate care garantează că E[X] = Pr{X = 1}",
        ],
        correctIndex: 1,
        explanation:
          "Inegalitatea lui Chernoff oferă limite exponențiale superioare pentru probabilitatea ca suma variabilelor aleatoare independente să devieze semnificativ de la valoarea sa așteptată. Este folosită în analiza algoritmilor randomizați pentru a demonstra concentrarea rezultatelor în jurul mediei.",
      },
      {
        question:
          "În problema streak-urilor, cum se modifică lungimea așteptată a celui mai lung streak dacă moneda este trucată (probabilitatea de cap = p)?",
        options: [
          "Rămâne O(log n) indiferent de p",
          "Devine O(log_{1/p} n)",
          "Devine O(n)",
          "Devine O(log₂ n) indiferent de p",
        ],
        correctIndex: 1,
        explanation:
          "Pentru o monedă cu probabilitatea de cap p, lungimea așteptată a celui mai lung streak de cap este O(log_{1/p} n). Dacă p = 1/2, log_{1/p} n = log₂ n. Dacă p crește, lungimea așteptată crește și ea.",
      },
      {
        question:
          "În problema nuts and bolts, care este analogul cu QuickSort?",
        options: [
          "Se alege un șurub aleator ca pivot, se partitionează piulițele în jurul lui, apoi piulița potrivită partitionează șuruburile",
          "Se sortează piulițele și șuruburile separat, apoi se potrivesc",
          "Se compară fiecare piuliță cu fiecare șurub",
          "Se folosește căutarea binară pentru fiecare piuliță",
        ],
        correctIndex: 0,
        explanation:
          "Se alege un șurub aleator ca pivot. Se partitionează piulițele în cele mai mici și mai mari decât pivotul, identificând și piulița care se potrivește. Apoi piulița potrivită partitionează șuruburile. Se continuă recursiv pe cele două părți, similar cu QuickSort.",
      },
      {
        question:
          "Cum se poate converti un algoritm Monte Carlo cu eroare unilaterală într-unul cu eroare bilaterală?",
        options: [
          "Nu se poate converti",
          "Rulând algoritmul de două ori și combinând rezultatele",
          "Prin randomizarea intrării",
          "Prin adăugarea unui test suplimentar de consistență",
        ],
        correctIndex: 1,
        explanation:
          "Un algoritm Monte Carlo cu eroare unilaterală (de exemplu, poate spune 'nu' când răspunsul corect e 'da', dar niciodată invers) poate fi convertit în unul cu eroare bilaterală rulându-l de două ori și combinând rezultatele. Totuși, de obicei este preferabil să păstrăm eroarea unilaterală, deoarece este mai ușor de amplificat prin vot majoritar.",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question:
          "În analiza Randomizat QuickSort, demonstrați că E[X_{ij}] = 2/(j-i+1) pentru elementele clasate i și j (cu i < j). Care este justificarea?",
        options: [
          "X_{ij} = 1 când pivotul este ales dintre elementele i..j și este primul pivot din acest interval",
          "X_{ij} = 1 când pivotul este elementul i sau j",
          "X_{ij} = 1 când elementele i și j sunt adiacente",
          "X_{ij} = 1 când pivotul este elementul median al intervalului",
        ],
        correctIndex: 0,
        explanation:
          "Elementele i și j sunt comparate dacă și numai dacă primul pivot ales din intervalul [i, j] este chiar unul dintre aceste două elemente. Probabilitatea ca primul pivot din cele j-i+1 elemente să fie i sau j este 2/(j-i+1). Dacă primul pivot este alt element, i și j ajung în subprobleme diferite și nu mai sunt comparate.",
      },
      {
        question:
          "În Miller-Rabin, care este justificarea matematică pentru care cel puțin 3/4 din valori sunt martori pentru un n compozit?",
        options: [
          "Se bazează pe teorema chineză a resturilor",
          "Se bazează pe existența unui subgrup propriu al (Z_n*, ×) cu indicele cel mult 4, care conține exact non-martorii",
          "Se bazează pe mica teoremă a lui Fermat",
          "Se bazează pe conjectura Goldbach",
        ],
        correctIndex: 1,
        explanation:
          "Mulțimea non-martorilor (a pentru care testul nu detectează compozitivitatea) formează un subgrup propriu al grupului multiplicativ Z_n*. Conform teoremei lui Lagrange, dimensiunea unui subgrup propriu este cel mult jumătate, iar pentru numerele compozite care nu sunt puteri de prime, indicele este cel mult 4, deci |non-martori| ≤ n/4.",
      },
      {
        question:
          "În α-Bounded Random Search, cum se modifică analiza dacă există multiple soluții, să zicem t soluții?",
        options: [
          "Probabilitatea de eșec devine (1 - t/N)^α",
          "Probabilitatea de succes devine t · α / N",
          "Probabilitatea de eșec este 0 indiferent de α",
          "Probabilitatea de succes nu depinde de numărul de soluții",
        ],
        correctIndex: 0,
        explanation:
          "Dacă există t soluții, probabilitatea de a nu găsi niciuna la o singură încercare este 1 - t/N. După α încercări independente, probabilitatea de eșec este (1 - t/N)^α. Pentru α = N/t · ln(1/δ), obținem probabilitatea de eșec < δ.",
      },
      {
        question:
          "În problema Hiring, dacă în loc de 'cel mai bun de până acum' angajăm candidații care sunt în top k dintre cei intervievați până acum, care este numărul așteptat de angajări?",
        options: [
          "Rămâne H_n",
          "Devine k · H_n",
          "Devine H_{n/k}",
          "Devine n",
        ],
        correctIndex: 1,
        explanation:
          "Fiecare candidat i este angajat dacă se clasează în primele k dintre primele i poziții, cu probabilitatea k/i. Numărul așteptat de angajări devine Σ_{i=1}^n k/i = k · H_n. Pentru k = 1, revenim la cazul clasic.",
      },
      {
        question:
          "Care este diferența dintre un algoritm randomizat și un algoritm probabilistic (în sensul teoriei complexității)?",
        options: [
          "Sunt același lucru",
          "Algoritmii randomizați folosesc randomizare doar la intrare, cei probabilistici la fiecare pas",
          "Un algoritm randomizat are acces la un generator de numere aleatoare; clasele de complexitate (RP, BPP, ZPP) descriu puterea algoritmilor probabilistici cu eroare limitată",
          "Algoritmii probabilistici sunt determiniști",
        ],
        correctIndex: 2,
        explanation:
          "În teoria complexității, clasele RP (randomizat polinomial cu eroare unilaterală), BPP (eroare bilaterală) și ZPP (fără eroare, timp așteptat polinomial) descriu puterea algoritmilor probabilistici. Un algoritm randomizat practic poate fi privit ca un membru al acestor clase.",
      },
      {
        question:
          "În analiza streak-urilor, cum se poate demonstra o limită mai strânsă, de genul E[LS] = (1+o(1)) · log₂ n?",
        options: [
          "Folosind doar inegalitatea lui Markov",
          "Folosind teorema Borel-Cantelli și cuplarea cu distribuții binomiale negative",
          "Folosind teorema limită centrală",
          "Folosind legea tare a numerelor mari",
        ],
        correctIndex: 1,
        explanation:
          "Pentru o limită mai strânsă, se folosește teorema Borel-Cantelli: pentru L_n = (1+ε)log₂ n, probabilitatea ca streak-ul maxim să depășească L_n tinde la 0; pentru L_n = (1-ε)log₂ n, probabilitatea tinde la 1. Se folosește și cuplarea cu procese Bernoulli pentru a calcula distribuția exactă.",
      },
      {
        question:
          "În problema nuts and bolts, care este complexitatea în cazul cel mai defavorabil pentru algoritmul randomizat?",
        options: [
          "O(n log n)",
          "O(n²)",
          "O(n)",
          "O(n log² n)",
        ],
        correctIndex: 1,
        explanation:
          "Deși timpul așteptat este O(n log n), cazul cel mai defavorabil este O(n²), similar cu QuickSort. Acest caz apare când pivotul ales este întotdeauna elementul minim sau maxim, ceea ce are probabilitate exponențial mică.",
      },
      {
        question:
          "Ce este randomizarea în stil Yao și cum se aplică în analiza algoritmilor?",
        options: [
          "O tehnică de randomizare a intrării pentru a demonstra limite inferioare",
          "Principiul lui Yao: complexitatea randomizată așteptată pentru o distribuție a intrării este mărginită inferior de complexitatea deterministă pe acea distribuție",
          "Un algoritm de randomizare a memoriei",
          "O metodă de generare a numerelor pseudo-aleatoare",
        ],
        correctIndex: 1,
        explanation:
          "Principiul lui Yao (Yao's Minimax Principle) spune că pentru orice problemă, timpul așteptat al celui mai bun algoritm randomizat pe cel mai rău caz este cel puțin timpul celui mai bun algoritm determinist pe o distribuție fixată a intrărilor. Este folosit pentru a demonstra limite inferioare pentru algoritmi randomizați.",
      },
      {
        question:
          "În contextul algoritmilor randomizați, ce este derivandomizarea (derandomization)?",
        options: [
          "Procesul de a face un algoritm randomizat să ruleze mai repede",
          "Tehnica de a converti un algoritm randomizat într-unul determinist, păstrând aceeași complexitate (când este posibil)",
          "Eliminarea tuturor surselor de randomizare din algoritm",
          "Reducerea numărului de biți aleatori folosiți",
        ],
        correctIndex: 1,
        explanation:
          "Derandomizarea urmărește convertirea algoritmilor randomizați în echivalenți determiniști cu aceeași complexitate. Metode includ metoda momentelor (method of conditional expectations) și folosirea generatorilor de numere pseudo-aleatoare cu expansiune suficientă.",
      },
      {
        question:
          "În analiza First Occurrence cu poziții alese aleator cu înlocuire, care este numărul așteptat de încercări dacă există t soluții într-un domeniu de dimensiune N?",
        options: [
          "N/t",
          "N",
          "t/N",
          "N - t",
        ],
        correctIndex: 0,
        explanation:
          "Fiecare încercare are probabilitatea t/N de succes. Numărul de încercări urmează o distribuție geometrică cu media 1/(t/N) = N/t. Cu cât sunt mai multe soluții (t mai mare), cu atât găsim mai repede una.",
      },
    ],
  },
];

export const REGEX_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question:
          "Ce este o expresie regulată (regex)?",
        options: [
          "Un șir de caractere care descrie un tipar (pattern) de căutat într-un text",
          "O funcție matematică care calculează regularități statistice",
          "Un algoritm de sortare a șirurilor",
          "Un tip de bază de date relațională",
        ],
        correctIndex: 0,
        explanation:
          "O expresie regulată este un șir care descrie un set de șiruri (un limbaj) printr-un pattern. Este folosită pentru căutarea, validarea și manipularea textului după reguli sintactice precise.",
      },
      {
        question:
          "Într-o expresie regulată, ce înseamnă simbolul * (asterisc)?",
        options: [
          "Zero sau mai multe apariții ale caracterului sau grupului precedent",
          "Una sau mai multe apariții",
          "Zero sau o apariție",
          "Caracterul exact *",
        ],
        correctIndex: 0,
        explanation:
          "Operatorul Kleene star (*) înseamnă 'zero sau mai multe repetări' ale elementului precedent. De exemplu, 'a*' potrivește șirul vid, 'a', 'aa', 'aaa' etc.",
      },
      {
        question:
          "Într-o expresie regulată, ce înseamnă simbolul +?",
        options: [
          "Zero sau mai multe apariții",
          "Una sau mai multe apariții ale caracterului sau grupului precedent",
          "Zero sau o apariție",
          "Caracterul exact +",
        ],
        correctIndex: 1,
        explanation:
          "Operatorul + înseamnă 'una sau mai multe repetări'. Este echivalent cu R·R*. De exemplu, 'a+' potrivește 'a', 'aa', 'aaa' dar NU și șirul vid.",
      },
      {
        question:
          "Într-o expresie regulată, ce înseamnă simbolul ? (semnul întrebării)?",
        options: [
          "Una sau mai multe apariții",
          "Zero sau o apariție a elementului precedent (facultativ)",
          "Zero sau mai multe apariții",
          "Caracterul exact ?",
        ],
        correctIndex: 1,
        explanation:
          "Operatorul ? face elementul precedent opțional, însemnând 'zero sau o apariție'. De exemplu, 'colou?r' potrivește și 'color' și 'colour'.",
      },
      {
        question:
          "Într-o expresie regulată, ce reprezintă simbolul | (bară verticală)?",
        options: [
          "Concatenare",
          "Alternare (sau logic) între două expresii",
          "Repetare",
          "Grupare",
        ],
        correctIndex: 1,
        explanation:
          "| este operatorul de alternare: R|S potrivește orice șir care se potrivește cu R SAU cu S. De exemplu, 'urs|pisică' potrivește fie 'urs', fie 'pisică'.",
      },
      {
        question:
          "Într-o expresie regulată, ce rol au parantezele ( )?",
        options: [
          "Sunt doar decorative",
          "Grupează subexpresii și permit aplicarea operatorilor pe întreg grupul",
          "Indică o clasă de caractere",
          "Marchează începutul și sfârșitul șirului",
        ],
        correctIndex: 1,
        explanation:
          "Parantezele grupează subexpresii, permițând aplicarea operatorilor (*, +, ?, |) pe întreg grupul. De exemplu, '(ab)+' potrivește 'ab', 'abab', 'ababab' etc.",
      },
      {
        question:
          "Într-o expresie regulată, ce reprezintă simbolul ^ (accent circumflex)?",
        options: [
          "Sfârșit de șir",
          "Început de șir (când este primul caracter al expresiei)",
          "Zero sau mai multe apariții",
          "Orice caracter",
        ],
        correctIndex: 1,
        explanation:
          "^ ancorează potrivirea la începutul șirului (sau începutul liniei în modul multiline). De exemplu, '^abc' potrivește doar șirurile care încep cu 'abc'.",
      },
      {
        question:
          "Într-o expresie regulată, ce reprezintă simbolul $ (dolar)?",
        options: [
          "Început de șir",
          "Sfârșit de șir (când este ultimul caracter al expresiei)",
          "Orice caracter",
          "O cifră",
        ],
        correctIndex: 1,
        explanation:
          "$ ancorează potrivirea la sfârșitul șirului (sau sfârșitul liniei). De exemplu, 'abc$' potrivește doar șirurile care se termină cu 'abc'.",
      },
      {
        question:
          "Într-o expresie regulată, ce reprezintă simbolul . (punct)?",
        options: [
          "Un punct literal",
          "Orice caracter (cu excepția newline-ului, în modul implicit)",
          "Sfârșit de șir",
          "Separator de cuvinte",
        ],
        correctIndex: 1,
        explanation:
          "Punctul (.) potrivește orice caracter unic, cu excepția caracterului de linie nouă (\n) în modul implicit. De exemplu, 'c.t' potrivește 'cat', 'cut', 'cot' etc.",
      },
      {
        question:
          "Într-o expresie regulată, ce reprezintă [abc] (clasă de caractere)?",
        options: [
          "Un grup de captură numit",
          "Potrivește orice caracter dintre cei din lista 'a', 'b' sau 'c'",
          "O alternare obligatorie",
          "Un interval numeric",
        ],
        correctIndex: 1,
        explanation:
          "Clasele de caractere [ ] potrivesc ORICE caracter dintre cei specificați. De exemplu, '[aeiou]' potrivește orice vocală. Se pot folosi și intervale, ca '[a-z]' pentru litere mici.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question:
          "Ce este construcția Thompson (Thompson construction) în contextul regex-urilor?",
        options: [
          "Un algoritm de compilare a expresiilor regulate în automate finite nedeterministe (NFA)",
          "O metodă de sortare a șirurilor",
          "Un algoritm de căutare în text fără regex",
          "O tehnică de optimizare a memoriei",
        ],
        correctIndex: 0,
        explanation:
          "Construcția Thompson este un algoritm care transformă orice expresie regulată într-un NFA (automat finit nedeterminist) echivalent. Se bazează pe reguli recursive pentru ε, caractere, alternare (R|S), concatenare (RS) și stea Kleene (R*).",
      },
      {
        question:
          "În construcția Thompson, cum se reprezintă un caracter individual 'c' ca NFA?",
        options: [
          "Printr-un NFA cu o singură stare (inițială = finală)",
          "Printr-un NFA cu două stări și o tranziție etichetată 'c' de la starea inițială la starea finală",
          "Printr-un NFA cu trei stări",
          "Printr-un ε-NFA cu tranziții multiple",
        ],
        correctIndex: 1,
        explanation:
          "Un caracter 'c' este reprezentat ca un NFA cu două stări: o stare inițială și o stare finală (acceptoare), cu o singură tranziție etichetată 'c' între ele. Acesta este cel mai simplu bloc de construcție.",
      },
      {
        question:
          "În construcția Thompson, cum se reprezintă ε (șirul vid)?",
        options: [
          "Printr-un NFA cu o singură tranziție etichetată ε între starea inițială și finală",
          "Printr-un NFA cu o singură stare, care este și inițială și finală",
          "Printr-un NFA cu două stări fără tranziții",
          "Nu se reprezintă, ε nu există în NFA",
        ],
        correctIndex: 1,
        explanation:
          "Șirul vid ε este reprezentat printr-un NFA cu o singură stare, care este simultan stare inițială și stare finală (acceptoare). Astfel, șirul vid este acceptat fără a consuma niciun simbol.",
      },
      {
        question:
          "În construcția Thompson, cum se construiește NFA pentru R|S (alternare) din NFA-urile pentru R și S?",
        options: [
          "Se adaugă o nouă stare inițială cu ε-tranziții la stările inițiale ale lui R și S",
          "Se concatenă secvențial R și S",
          "Se înlocuiește fiecare tranziție din R cu NFA-ul lui S",
          "Se unesc stările finale ale lui R și S",
        ],
        correctIndex: 0,
        explanation:
          "Pentru R|S, se introduce o nouă stare inițială cu două ε-tranziții, una către starea inițială a NFA-ului lui R și una către starea inițială a NFA-ului lui S. Stările finale sunt unite printr-o ε-tranziție la o nouă stare finală comună.",
      },
      {
        question:
          "În construcția Thompson, cum se construiește NFA pentru RS (concatenare)?",
        options: [
          "Se adaugă o ε-tranziție de la starea finală a lui R la starea inițială a lui S, iar starea finală a lui S devine finală",
          "Se unesc stările inițiale",
          "Se creează un NFA paralel",
          "Se înlocuiesc toate tranzițiile",
        ],
        correctIndex: 0,
        explanation:
          "Pentru RS, se face o ε-tranziție de la starea finală a lui R la starea inițială a lui S. Starea finală a lui R încetează să mai fie finală, iar starea finală a lui S devine starea finală a compunerii.",
      },
      {
        question:
          "În construcția Thompson, cum se construiește NFA pentru R* (stea Kleene)?",
        options: [
          "Se adaugă ε-tranziții: de la noua stare inițială la cea veche și la noua finală, și de la vechea finală la cea veche inițială",
          "Se repetă NFA-ul lui R de un număr fix de ori",
          "Se elimină starea finală a lui R",
          "Se dublează toate tranzițiile",
        ],
        correctIndex: 0,
        explanation:
          "Pentru R*, se adaugă o nouă stare inițială (și finală) cu ε-tranziții: la noua stare finală (pentru zero repetări) și la starea inițială veche. Se adaugă și ε-tranziții de la vechea finală la vechea inițială (pentru repetare) și la noua finală.",
      },
      {
        question:
          "Ce este ε-closure (ε-închiderea) într-un NFA?",
        options: [
          "Mulțimea tuturor stărilor accesibile dintr-o stare dată folosind doar ε-tranziții",
          "Numărul de ε-tranziții dintr-un NFA",
          "O proprietate a DFA-urilor",
          "Un algoritm de minimizare",
        ],
        correctIndex: 0,
        explanation:
          "ε-closure(S) este mulțimea tuturor stărilor accesibile din orice stare din S urmând zero sau mai multe ε-tranziții. Este fundamentală pentru simularea NFA-urilor, deoarece la fiecare pas, automatul poate fi în mai multe stări simultan din cauza ε-tranzițiilor.",
      },
      {
        question:
          "Cum se simulează un NFA pe un șir de intrare?",
        options: [
          "Se menține o singură stare curentă și se urmăresc tranzițiile",
          "Se menține o mulțime de stări curente (subsetul stărilor active), aplicând ε-closure după fiecare caracter",
          "Se convertește în DFA înainte de simulare",
          "Se folosește backtracking",
        ],
        correctIndex: 1,
        explanation:
          "Simularea NFA menține o mulțime de stări active (subsetul de stări în care poate fi automatul). La fiecare caracter, se calculează următoarele stări prin tranziții etichetate cu acel caracter, urmat de ε-closure. Aceasta se numește simulare în subset.",
      },
      {
        question:
          "Ce este un DFA (Automat Finit Deterministic)?",
        options: [
          "Un automat în care fiecare stare are exact o tranziție pentru fiecare simbol din alfabet",
          "Un automat cu ε-tranziții",
          "Un automat care poate fi în mai multe stări simultan",
          "Un automat fără stare finală",
        ],
        correctIndex: 0,
        explanation:
          "Un DFA are proprietatea că pentru fiecare stare și fiecare simbol de intrare, există exact o tranziție definită. Aceasta face simularea foarte eficientă: se parcurge șirul caracter cu caracter, urmând o singură stare la fiecare pas.",
      },
      {
        question:
          "Care este complexitatea de timp pentru potrivirea unui șir de lungime n cu un DFA?",
        options: [
          "O(n²)",
          "O(n)",
          "O(2^n)",
          "O(n log n)",
        ],
        correctIndex: 1,
        explanation:
          "Potrivirea cu un DFA necesită o singură trecere prin șirul de intrare, procesând fiecare caracter în O(1) (tranziția din starea curentă). Complexitatea este O(n). Aceasta este mult mai rapidă decât simularea directă a unui NFA, care poate fi O(n · |S|).",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question:
          "Ce este construcția de subseturi (subset construction) pentru conversia NFA → DFA?",
        options: [
          "Se creează câte o stare în DFA pentru fiecare subset de stări din NFA care este accesibil",
          "Se elimină toate ε-tranzițiile din NFA",
          "Se sortează stările NFA-ului",
          "Se dublează numărul de stări",
        ],
        correctIndex: 0,
        explanation:
          "Subset construction creează un DFA ale cărui stări sunt subseturi (mulțimi) de stări ale NFA-ului original. Fiecare stare DFA reprezintă ε-closure după procesarea unui prefix. Tranzițiile se calculează aplicând simbolul pe fiecare stare NFA din subset și apoi ε-closure.",
      },
      {
        question:
          "Care este complexitatea în cazul cel mai defavorabil a conversiei NFA → DFA?",
        options: [
          "O(n) unde n = numărul de stări NFA",
          "O(n log n)",
          "O(2^n) — numărul de stări DFA poate fi exponențial în numărul de stări NFA",
          "O(n²)",
        ],
        correctIndex: 2,
        explanation:
          "În cazul cel mai defavorabil, DFA-ul poate avea 2^n stări, unde n este numărul de stări ale NFA-ului. De exemplu, pentru limbajul 'șiruri în care al n-lea caracter de la sfârșit este 1', NFA-ul are n+1 stări, dar DFA-ul are 2^n stări.",
      },
      {
        question:
          "Care este diferența fundamentală dintre potrivirea cu regex și algoritmul KMP?",
        options: [
          "KMP este mai lent decât regex",
          "KMP caută un șir fix, iar regex poate căuta orice tipar descris de o expresie regulată",
          "Regex este un caz particular al KMP",
          "KMP folosește automate, regex nu",
        ],
        correctIndex: 1,
        explanation:
          "KMP caută un șir exact (pattern fix) în timp liniar O(n+m). În schimb, regex-urile descriu un întreg limbaj (set de șiruri) și pot fi mai flexibile, dar pot necesita construirea unui automat. KMP este mai eficient pentru căutarea unui singur pattern fix.",
      },
      {
        question:
          "Cum se diferențiază un NFA de un DFA din punct de vedere al puterii de expresie?",
        options: [
          "NFA-urile pot exprima mai multe limbaje decât DFA-urile",
          "DFA-urile pot exprima mai multe limbaje decât NFA-urile",
          "NFA-urile și DFA-urile sunt echivalente ca putere de expresie (recunosc exact limbajele regulate)",
          "NFA-urile nu pot recunoaște limbaje regulate",
        ],
        correctIndex: 2,
        explanation:
          "Deși NFA-urile par mai puternice datorită nedeterminismului, ele sunt echivalente cu DFA-urile: orice limbaj acceptat de un NFA poate fi acceptat și de un DFA. Conversia NFA → DFA (subset construction) poate duce la o creștere exponențială a numărului de stări.",
      },
      {
        question:
          "Ce este Kleene's theorem (teorema lui Kleene)?",
        options: [
          "Orice limbaj regulat poate fi descris de o expresie regulată și reciproc, orice expresie regulată descrie un limbaj regulat",
          "Regex-urile sunt mai puternice decât automatele finite",
          "Orice NFA poate fi convertit în DFA fără pierdere de putere",
          "Limbajele regulate sunt închise la complement",
        ],
        correctIndex: 0,
        explanation:
          "Teorema lui Kleene stabilește echivalența fundamentală între expresii regulate și limbaje recunoscute de automate finite (NFA/DFA). Orice expresie regulată poate fi convertită într-un NFA (construcția Thompson), și orice NFA poate fi convertit într-o expresie regulată.",
      },
      {
        question:
          "Care sunt aplicațiile practice ale regex-urilor în programare?",
        options: [
          "Doar căutare în editoare de text",
          "Validare date (email, telefon), grep, lexical analysis (lexeri), căutare și înlocuire în editoare",
          "Doar procesare de imagini",
          "Doar sortare de date",
        ],
        correctIndex: 1,
        explanation:
          "Regex-urile au numeroase aplicații: validare formulare (email-uri, numere de telefon), comanda grep pentru căutare în fișiere, analiză lexicală (tokenizare în compilatoare, gen lex/flex), căutare și înlocuire inteligentă în editoare de text și IDE-uri.",
      },
      {
        question:
          "Ce diferență există între cuantificatorii greedy și lazy (leneși) în regex?",
        options: [
          "Greedy consumă cât mai mult text posibil, lazy cât mai puțin posibil",
          "Greedy este mai rapid decât lazy",
          "Lazy consumă cât mai mult text posibil",
          "Nu există diferență, sunt sinonime",
        ],
        correctIndex: 0,
        explanation:
          "Cuantificatorii greedy (*, +, ?, {n,m}) încearcă să consume cât mai mult text posibil, apoi fac backtracking dacă restul patternului nu se potrivește. Cei lazy (*?, +?, ??, {n,m}?) consumă cât mai puțin posibil, extinzându-se doar dacă este necesar.",
      },
      {
        question:
          "Cum se poate defini operatorul {n,m} (repetare de la n la m ori) în termenii operatorilor de bază?",
        options: [
          "R{n,m} = R·R·...·R (de n ori) · (R?)?...? (de m-n ori)",
          "R{n,m} = R* · R*",
          "R{n,m} = (R|ε) · (R|ε) · ... (de m ori)",
          "R{n,m} = R+ · R?",
        ],
        correctIndex: 0,
        explanation:
          "R{n,m} poate fi descompus ca R repetat de n ori (obligatoriu), urmat de m-n apariții opționale: R·R·...·R (n ori) · (R?)·(R?)·... (m-n ori). Alternativ, se poate scrie ca R·R·...·R (n ori) urmat de (R|ε)·... (m-n ori).",
      },
      {
        question:
          "Ce este un lexer (analizator lexical) și cum se leagă de regex-uri?",
        options: [
          "Un lexer sortează cuvintele dintr-un text după alfabet",
          "Un lexer folosește regex-uri pentru a împărți textul în tokeni (unități lexicale) pe baza unor pattern-uri",
          "Un lexer compilează cod sursă în cod mașină",
          "Un lexer optimizează regex-urile",
        ],
        correctIndex: 1,
        explanation:
          "Un lexer (sau scanner) este prima fază a unui compilator. Acesta citește textul sursă și îl împarte în tokeni (identificatori, cuvinte cheie, operatori etc.) folosind expresii regulate pentru a recunoaște fiecare tip de token.",
      },
      {
        question:
          "Ce sunt backreferences în regex și de ce sunt problematice?",
        options: [
          "Referințe la grupuri de captură anterioare; fac potrivirea NP-completă",
          "Referințe la fișiere externe; nu sunt suportate de motoarele regex",
          "Referințe la caractere escape; sunt simple de implementat",
          "Referințe la poziții în șir; sunt la fel ca ancorările",
        ],
        correctIndex: 0,
        explanation:
          "Backreferences (ca \\1, \\2) permit referirea la textul potrivit de un grup de captură anterior. Deși sunt utile, ele fac problema potrivirii NP-completă (nu mai corespund unui limbaj regulat). Motoarele care le suportă nu mai sunt automate finite pure.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question:
          "În simularea unui NFA pentru potrivirea unui șir de lungime n, care este complexitatea de timp dacă NFA-ul are s stări și t tranziții?",
        options: [
          "O(n + s)",
          "O(n · s)",
          "O(n · (s + t)) — deoarece la fiecare caracter procesăm toate stările active și tranzițiile lor",
          "O(n · 2^s)",
        ],
        correctIndex: 2,
        explanation:
          "Simularea NFA prin menținerea mulțimii stărilor active necesită la fiecare caracter: pentru fiecare stare activă, se urmăresc tranzițiile etichetate cu simbolul curent și se calculează ε-closure. În cazul cel mai defavorabil, O(s + t) per caracter, deci O(n · (s + t)) total.",
      },
      {
        question:
          "Comparați potrivirea cu regex (prin DFA) cu algoritmul Boyer-Moore (BM). Care este avantajul principal al BM?",
        options: [
          "BM poate căuta orice pattern regex",
          "BM sare peste caractere în text (skip), putând fi sub-liniar în practică pentru pattern-uri lungi și alfabete mari",
          "BM este mai simplu de implementat",
          "BM nu necesită preprocesare",
        ],
        correctIndex: 1,
        explanation:
          "Boyer-Moore folosește euristici (bad character shift, good suffix shift) pentru a sări peste porțiuni din text, putând atinge complexitate sub-liniară O(n/m) în cazuri favorabile. Regex-ul (prin DFA) este întotdeauna O(n), dar oferă flexibilitatea pattern-urilor.",
      },
      {
        question:
          "În construcția Thompson, cum afectează dimensiunea NFA-ului dimensiunea expresiei regulate (notată cu |R|)?",
        options: [
          "NFA-ul rezultat are cel mult 2|R| stări și 4|R| tranziții",
          "NFA-ul rezultat are |R|² stări",
          "NFA-ul rezultat are 2^|R| stări",
          "Dimensiunea NFA-ului nu depinde de |R|",
        ],
        correctIndex: 0,
        explanation:
          "Construcția Thompson produce un NFA cu cel mult 2|R| stări și cel mult 4|R| tranziții. Fiecare caracter din expresia regulată adaugă cel mult 2 stări și 2-4 tranziții. Aceasta asigură o construcție eficientă, liniară în dimensiunea expresiei.",
      },
      {
        question:
          "Ce este algoritmul de potrivire regex bazat pe simulare NFA (algoritmul lui Thompson)?",
        options: [
          "Un algoritm care convertește întâi regex-ul în DFA, apoi rulează DFA-ul",
          "Un algoritm care menține o listă de stări active (simulare în subset) fără a construi explicit DFA-ul, având complexitate O(n · |R|)",
          "Un algoritm care folosește backtracking cu memoizare",
          "Un algoritm care sortează tranzițiile NFA-ului",
        ],
        correctIndex: 1,
        explanation:
          "Algoritmul lui Thompson (cunoscut și ca 'Thompson NFA simulation') menține un set de stări active în NFA, actualizat la fiecare caracter. Nu construiește DFA-ul explicit, ci simulează NFA-ul direct. Are complexitate O(n · |R|) și este folosit de multe motoare regex.",
      },
      {
        question:
          "De ce motoarele de regex bazate pe backtracking (ca în Perl, Java, Python) pot fi exponențiale în anumite cazuri?",
        options: [
          "Pentru că nu folosesc NFA-uri",
          "Din cauza backtracking-ului pe cuantificatori greedy suprapuși, care poate duce la explorarea a 2^n posibilități",
          "Pentru că convertesc regex-ul în DFA",
          "Pentru că nu pot gestiona ε-tranziții",
        ],
        correctIndex: 1,
        explanation:
          "Motoarele bazate pe backtracking (regex-directed) pot suferi de 'catastrofal backtracking' pe pattern-uri ca '(a|aa)*b' pe intrarea 'aaaaaaaaaac'. Explorarea tuturor modurilor de potrivire poate duce la complexitate exponențială O(2^n), în contrast cu O(n · |R|) al simulării NFA.",
      },
      {
        question:
          "Cum se poate optimiza un DFA pentru potrivirea multiplă a mai multor pattern-uri regex simultan?",
        options: [
          "Se rulează fiecare DFA separat",
          "Se construiește un automat Aho-Corasick (trie cu fallback links) care combină toate pattern-urile",
          "Se sortează pattern-urile și se caută secvențial",
          "Se folosește un singur NFA combinat cu ε-tranziții între stările inițiale",
        ],
        correctIndex: 1,
        explanation:
          "Pentru potrivirea simultană a mai multor pattern-uri fixe, algoritmul Aho-Corasick construiește un automat finit (trie cu linkuri de fallback) care procesează textul în O(n) indiferent de numărul de pattern-uri. Pentru pattern-uri regex, se poate combina NFA-urile și apoi converti opțional în DFA.",
      },
      {
        question:
          "Ce este proprietatea de 'pumpare' (pumping lemma) pentru limbaje regulate?",
        options: [
          "Orice șir suficient de lung dintr-un limbaj regulat poate fi 'pompat' (repetat o subsecvență) și rămâne în limbaj",
          "Limbajele regulate nu pot fi 'pompate'",
          "Este o proprietate doar a limbajelor ne-regulate",
          "Este o metodă de generare a șirurilor dintr-un limbaj",
        ],
        correctIndex: 0,
        explanation:
          "Pumping lemma pentru limbaje regulate: pentru orice limbaj regulat L, există o constantă p astfel încât orice șir w ∈ L cu |w| ≥ p poate fi împărțit în w = xyz cu |xy| ≤ p, y ≠ ε, iar xyⁱz ∈ L pentru orice i ≥ 0. Se folosește pentru a demonstra că un limbaj NU este regulat.",
      },
      {
        question:
          "Care dintre următoarele limbaje NU este regulat și cum se demonstrează?",
        options: [
          "{aⁿbⁿ | n ≥ 0} — limbajul cu număr egal de a și b consecutive, demonstrat prin pumping lemma",
          "{a, b}* — toate șirurile peste {a, b}",
          "{aⁿ | n ≥ 0} — șiruri de a-uri",
          "{a, b}* · {aa} — șiruri care se termină cu 'aa'",
        ],
        correctIndex: 0,
        explanation:
          "Limbajul {aⁿbⁿ | n ≥ 0} nu este regulat. Demonstrația: presupunem prin absurd că este regulat, fie p constanta de pompare. Considerăm w = aᵖbᵖ. Prin pompare, y = aᵏ cu k > 0, iar xy²z = a^{p+k}b^{p} ∉ L (număr diferit de a-uri și b-uri). Contradicție.",
      },
      {
        question:
          "Cum poate fi implementată o căutare regex care să ofere garanția complexității liniare O(n)?",
        options: [
          "Folosind backtracking cu limită de adâncime",
          "Construind un DFA din regex și rulându-l pe text (construcția Thompson + subset construction)",
          "Folosind exclusiv greedy quantifiers",
          "Nu se poate garanta O(n) pentru regex-uri",
        ],
        correctIndex: 1,
        explanation:
          "Pentru a garanta O(n), se convertește expresia regulată într-un NFA (Thompson), apoi în DFA (subset construction). Rularea DFA-ului pe text este O(n). Dezavantajul: construirea DFA-ului poate necesita memorie exponențială, dar pentru regex-uri practice acest lucru este rar.",
      },
      {
        question:
          "Ce este automatul finit minim (DFA minimal)?",
        options: [
          "Un DFA cu numărul minim posibil de stări pentru limbajul pe care îl recunoaște",
          "Un DFA fără ε-tranziții",
          "Un NFA care a fost compilat direct",
          "Un DFA cu toate stările finale",
        ],
        correctIndex: 0,
        explanation:
          "Un DFA minimal este un DFA cu cel mai mic număr posibil de stări care recunoaște același limbaj. Se obține prin algoritmi de minimizare (de exemplu, Hopcroft sau tabelar) care identifică și unesc stările echivalente (indistinguibile). Minimizarea asigură eficiență maximă.",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question:
          "În construcția de subseturi NFA → DFA, cum se justifică corectitudinea?",
        options: [
          "Prin inducție pe lungimea șirului: o stare DFA δ'(S, w) = ε-closure(δ(S, w)) reprezintă exact mulțimea stărilor NFA accesibile după w",
          "Prin teorema lui Kleene",
          "Prin pumping lemma",
          "Prin construcția Thompson",
        ],
        correctIndex: 0,
        explanation:
          "Corectitudinea se demonstrează prin inducție structurală pe lungimea șirului de intrare. δ'(S, w) = ε-closure(∪_{q∈S} δ(q, w)). Se arată că o stare DFA (un subset de stări NFA) conține exact acele stări NFA în care se poate ajunge procesând șirul w, păstrând limbajul acceptat.",
      },
      {
        question:
          "Care este complexitatea în timp și spațiu a algoritmului de minimizare a DFA-ului (Hopcroft)?",
        options: [
          "O(n) timp, O(n) spațiu",
          "O(n log n) timp, O(n) spațiu",
          "O(n²) timp, O(n) spațiu",
          "O(2^n) timp, O(n) spațiu",
        ],
        correctIndex: 1,
        explanation:
          "Algoritmul lui Hopcroft pentru minimizarea DFA-ului are complexitatea O(n log n) în timp și O(n) în spațiu (unde n = numărul de stări). Algoritmul partitionează iterativ mulțimea stărilor în clase de echivalență, folosind o coadă de priorități pe perechi (clasă, simbol).",
      },
      {
        question:
          "În contextul limbajelor regulate, care este diferența dintre un NFA cu ε-tranziții (ε-NFA) și un NFA fără ε-tranziții?",
        options: [
          "ε-NFA poate accepta limbaje pe care NFA-ul fără ε nu le poate accepta",
          "Orice ε-NFA poate fi convertit într-un NFA echivalent fără ε-tranziții, prin ε-eliminare",
          "ε-NFA-urile sunt mai puțin expresive",
          "NFA-urile fără ε sunt mai puternice",
        ],
        correctIndex: 1,
        explanation:
          "ε-NFA-urile sunt o generalizare convenabilă, dar nu mai puternică. Orice ε-NFA poate fi convertit într-un NFA fără ε-tranziții prin eliminare: se adaugă tranziții directe pentru a înlocui drumurile cu ε și se ajustează stările finale. Timpul de conversie este O(n³) în cazul naiv.",
      },
      {
        question:
          "Cum se poate determina dacă un DFA acceptă un șir vid (ε)?",
        options: [
          "Se verifică dacă starea inițială este și stare finală",
          "Se parcurg toate tranzițiile",
          "Se verifică dacă există ε-tranziții",
          "Se verifică dacă există vreo tranziție din starea inițială",
        ],
        correctIndex: 0,
        explanation:
          "Un DFA nu are ε-tranziții. Șirul vid ε este acceptat dacă și numai dacă starea inițială a DFA-ului este și stare finală (acceptoare). Fără a consuma niciun caracter, pornind din starea inițială, ne aflăm deja în ea.",
      },
      {
        question:
          "Ce este algoritmul Myhill-Nerode și care este relația sa cu DFA-urile minime?",
        options: [
          "Myhill-Nerode definește o relație de echivalență pe șiruri (indistinguibilitate) care corespunde exact stărilor DFA-ului minim; numărul de clase de echivalență este numărul minim de stări",
          "Myhill-Nerode este un algoritm de conversie regex → NFA",
          "Myhill-Nerode demonstrează că NFA-urile sunt mai puternice decât DFA-urile",
          "Myhill-Nerode este o metodă de generare a șirurilor de test",
        ],
        correctIndex: 0,
        explanation:
          "Teorema Myhill-Nerode stabilește că un limbaj L este regulat dacă și numai dacă relația de echivalență 'x și y sunt indistinguishable în raport cu L' (x ∼ y dacă pentru orice z, xz ∈ L ↔ yz ∈ L) are un număr finit de clase. Fiecare clasă corespunde unei stări a DFA-ului minim.",
      },
      {
        question:
          "Cum poate fi folosită teoria automatelor finite pentru a demonstra că limbajul {ww | w ∈ {a,b}*} NU este regulat?",
        options: [
          "Prin pumping lemma: orice șir suficient de lung poate fi pompat, dar dublarea unui segment rupe proprietatea ww",
          "Prin teorema Myhill-Nerode: șirurile aⁿ și aᵐ sunt distinguishable pentru n ≠ m (z = bⁿaⁿ distinge), deci numărul de clase este infinit",
          "Prin construcția Thompson",
          "Prin algoritmul de minimizare",
        ],
        correctIndex: 1,
        explanation:
          "Pentru L = {ww}, considerăm șirurile aⁿ și aᵐ cu n ≠ m. Fie z = bⁿaⁿ. Atunci aⁿ·z = aⁿbⁿaⁿ ∈ L, dar aᵐ·z = aᵐbⁿaⁿ ∉ L. Deci aⁿ și aᵐ sunt distinguishable, ceea ce înseamnă un număr infinit de clase de echivalență Myhill-Nerode, deci L nu este regulat.",
      },
      {
        question:
          "În implementarea unui motor de regex care suportă backreferences (ca \\1), de ce complexitatea devine NP-completă?",
        options: [
          "Pentru că backreferences necesită numărare, iar problema echivalenței cu backreferences poate codifica SAT (satisfiabilitatea booleană)",
          "Pentru că NFA-urile nu pot reprezenta backreferences",
          "Pentru că DFA-urile nu pot reprezenta backreferences",
          "Pentru că backreferences măresc dimensiunea expresiei",
        ],
        correctIndex: 0,
        explanation:
          "Backreferences (ca \\1, \\2) necesită ca același subșir să apară în două poziții, ceea ce depășește puterea automatelor finite (necesită memorie arbitrară). S-a demonstrat că potrivirea cu backreferences este NP-completă, putând codifica probleme de satisfiabilitate booleană.",
      },
      {
        question:
          "Care este relația dintre gramatici regulate și expresii regulate?",
        options: [
          "Gramaticile regulate generează exact aceleași limbaje ca expresiile regulate (limbaje regulate)",
          "Gramaticile regulate generează limbaje mai largi",
          "Expresiile regulate generează limbaje mai largi decât gramaticile regulate",
          "Nu există nicio relație",
        ],
        correctIndex: 0,
        explanation:
          "Gramaticile regulate (de tip 3 în ierarhia Chomsky) generează exact limbajele regulate. Orice gramatică regulată poate fi convertită într-un NFA (și deci într-o expresie regulată), iar orice expresie regulată poate fi convertită într-o gramatică regulată care generează același limbaj.",
      },
      {
        question:
          "Cum poate fi implementat operatorul de 'lookahead' (înaintare) într-un motor de regex bazat pe automate finite?",
        options: [
          "Lookahead depășește puterea automatelor finite pure; implementarea necesită combinarea mai multor automate sau backtracking",
          "Lookahead poate fi implementat direct printr-un DFA",
          "Lookahead este același lucru cu gruparea",
          "Lookahead nu poate fi implementat în regex",
        ],
        correctIndex: 0,
        explanation:
          "Lookahead-ul ((?=...)) specifică o condiție care trebuie îndeplinită la poziția curentă, fără a consuma caractere. Automatele finite pure nu pot exprima ușor acest lucru; implementarea practică necesită simularea unui sub-automat la fiecare poziție sau backtracking cu verificare de lookahead.",
      },
      {
        question:
          "Care este complexitatea construirii DFA-ului dintr-un NFA cu n stări și un alfabet de dimensiune k?",
        options: [
          "O(2^n · n · k) în cazul cel mai defavorabil, deoarece pot exista 2^n subseturi, fiecare necesitând procesarea a n stări și k simboluri",
          "O(n · k)",
          "O(n² · k)",
          "O(2^n · k)",
        ],
        correctIndex: 0,
        explanation:
          "Construcția de subseturi parcurge toate subseturile accesibile de stări NFA. În cazul cel mai defavorabil, toate 2^n subseturi sunt accesibile. Pentru fiecare subset, se calculează tranzițiile pentru fiecare din cele k simboluri, necesitând examinarea a până la n stări per simbol.",
      },
    ],
  },
];
