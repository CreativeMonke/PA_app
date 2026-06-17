import type { QuizSet } from "@/types";

export const BKT_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question: "Ce este backtracking-ul?",
        options: [
          "Un algoritm de sortare a datelor",
          "O tehnică de explorare exhaustivă a spațiului de soluții, cu întoarcere atunci când o soluție parțială nu poate fi extinsă",
          "Un algoritm de căutare binară",
          "O metodă de programare dinamică",
        ],
        correctIndex: 1,
        explanation:
          "Backtracking-ul explorează sistematic toate soluțiile posibile, construind soluția pas cu pas. Când descoperă că soluția parțială curentă nu poate duce la o soluție completă validă, se întoarce (backtrack) la pasul anterior și încearcă următoarea opțiune.",
      },
      {
        question: "Ce înseamnă 'pruning' în contextul backtracking-ului?",
        options: [
          "Sortarea candidaților înainte de explorare",
          "Tăierea ramurilor din arborele de căutare care nu pot duce la soluții valide",
          "Memoizarea rezultatelor subproblemelor",
          "Transformarea problemei într-una de grafuri",
        ],
        correctIndex: 1,
        explanation:
          "Pruning = tăierea ramurilor care nu pot duce la soluții valide. Verifici validitatea soluției parțiale înainte de a continua recursiv, economisind timp prin evitarea explorării unor subarbori întregi.",
      },
      {
        question: "Care este structura de bază a unui algoritm de backtracking?",
        options: [
          "Sortare, apoi căutare binară",
          "Parcurgere nivel cu nivel, cu calcul de minim local",
          "Pentru fiecare candidat: verifică validitatea, adaugă, reapelă recursiv, apoi elimină (backtrack)",
          "Construirea soluției de la sfârșit către început",
        ],
        correctIndex: 2,
        explanation:
          "Structura BKT: pentru fiecare candidat, verifici dacă e valid (pruning), adaugi candidatul la soluție, reapeli recursiv pentru nivelul următor, apoi elimini ultimul element (backtrack) pentru a încerca următorul candidat.",
      },
      {
        question: "Ce reprezintă clasa P în teoria complexității?",
        options: [
          "Probleme care nu pot fi rezolvate de calculator",
          "Probleme decizionale rezolvabile în timp polinomial de un algoritm determinist",
          "Probleme care necesită timp exponențial",
          "Probleme care se rezolvă doar cu algoritmi randomizați",
        ],
        correctIndex: 1,
        explanation:
          "P = clasa problemelor de decizie pentru care există un algoritm determinist cu complexitatea O(n^k), unde n e dimensiunea intrării și k e o constantă. Exemple: sortare, căutare, drum minim în graf.",
      },
      {
        question: "Ce reprezintă clasa NP în teoria complexității?",
        options: [
          "Probleme care nu pot fi rezolvate deloc",
          "Probleme pentru care o soluție candidat poate fi verificată în timp polinomial",
          "Probleme care se rezolvă doar în timp exponențial",
          "Probleme care necesită memorie polinomială",
        ],
        correctIndex: 1,
        explanation:
          "NP = Non-deterministic Polynomial = clasa problemelor de decizie pentru care un certificat (soluție candidat) poate fi verificat în timp polinomial. Nu înseamnă că găsirea soluției e polinomială — doar verificarea.",
      },
      {
        question: "Ce diferențiază P de NP?",
        options: [
          "Problemele din P sunt mai ușoare, cele din NP sunt mai grele",
          "În P găsirea soluției e polinomială; în NP doar verificarea e garantată polinomială",
          "P conține doar probleme de sortare, NP conține doar probleme de grafuri",
          "Nu există nicio diferență, P = NP",
        ],
        correctIndex: 1,
        explanation:
          "Diferența: P = găsirea soluției e polinomială (rezolvare directă). NP = verificarea unei soluții date e polinomială. Se știe că P ⊆ NP, dar nu se știe dacă P = NP (problemă deschisă, recompensă 1 milion $).",
      },
      {
        question: "Ce este o reducere polinomială?",
        options: [
          "O transformare a unei probleme în alta, executată în timp polinomial",
          "O reducere a complexității unui algoritm prin optimizări",
          "O metodă de a împărți o problemă în subprobleme mai mici",
          "Un algoritm care reduce numărul de operații necesare",
        ],
        correctIndex: 0,
        explanation:
          "O reducere polinomială transformă o instanță a problemei P într-o instanță a problemei Q în timp polinomial, astfel încât soluția pentru Q dă soluția pentru P. Notație: P ∝ Q (P se reduce la Q).",
      },
      {
        question: "Ce este o problemă NP-completă?",
        options: [
          "Cea mai simplă problemă din NP",
          "O problemă care e atât în NP, cât și NP-hard (orice problemă din NP se reduce la ea)",
          "O problemă care nu poate fi rezolvată niciodată",
          "O problemă care se rezolvă în O(n log n)",
        ],
        correctIndex: 1,
        explanation:
          "O problemă e NP-completă dacă: (1) e în NP (verificare polinomială), și (2) e NP-hard (orice problemă din NP se reduce polinomial la ea). NP-complete sunt 'cele mai grele' probleme din NP.",
      },
      {
        question: "Ce face operația de backtrack (scoaterea ultimului element) în algoritmul BKT?",
        options: [
          "Termină definitiv algoritmul",
          "Permite încercarea următorului candidat la nivelul curent",
          "Resetează întreaga soluție",
          "Sortează din nou candidații",
        ],
        correctIndex: 1,
        explanation:
          "După ce ai explorat toate extensiile posibile pentru un candidat, scoți acel candidat din soluția parțială și încerci următorul candidat la același nivel. Fără backtrack, ai rămâne blocat pe un singur candidat.",
      },
      {
        question: "Pentru o problemă decidabilă, un algoritm de backtracking fără pruning are ce complexitate?",
        options: [
          "Polinomială",
          "Exponențială în cel mai rău caz (O(2^n) sau O(n!))",
          "Liniară",
          "Logaritmică",
        ],
        correctIndex: 1,
        explanation:
          "Backtracking-ul explorează toate combinațiile posibile. Fără pruning, numărul de noduri explorate este exponențial — de exemplu O(2^n) pentru submulțimi sau O(n!) pentru permutări. Pruning-ul reduce în practică, dar nu schimbă complexitatea teoretică în cel mai rău caz.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question: "În template-ul BKT, după ce adăugăm un candidat și reapelăm recursiv, ce urmează?",
        options: [
          "Continuăm cu următorul nivel direct",
          "Eliminăm candidatul (backtrack) pentru a încerca următoarea opțiune",
          "Terminăm algoritmul",
          "Sortăm candidații rămași",
        ],
        correctIndex: 1,
        explanation:
          "După reapelarea recursivă, urmează eliminarea candidatului (backtrack). Astfel, la întoarcerea din recursie, soluția parțială revine la starea anterioară și putem încerca următorul candidat fără interferențe.",
      },
      {
        question: "Ce adaugă Branch and Bound față de Backtracking-ul clasic?",
        options: [
          "Folosește memoizare",
          "Menține o limită (bound) superioară/inferioară și taie ramurile sub-optimale",
          "Rulează în paralel pe mai multe procesoare",
          "Folosește randomizare",
        ],
        correctIndex: 1,
        explanation:
          "Branch and Bound adaugă un bound (estimare superioară pentru maximizare, inferioară pentru minimizare). Dacă bound-ul unui nod e mai rău decât cea mai bună soluție găsită, ramura e tăiată — nu pentru că e invalidă, ci pentru că e sub-optimală.",
      },
      {
        question: "Ce fel de probleme rezolvă Branch and Bound?",
        options: [
          "Probleme de căutare (oricare soluție)",
          "Probleme de optimizare (cea mai bună soluție)",
          "Probleme de sortare",
          "Probleme de aproximare",
        ],
        correctIndex: 1,
        explanation:
          "Branch and Bound e specific problemelor de optimizare. Scopul nu e să găsească orice soluție validă, ci soluția optimă. Bound-ul permite tăierea ramurilor care nu pot îmbunătăți soluția curentă.",
      },
      {
        question: "Ce înseamnă că o problemă e NP-hard?",
        options: [
          "E mai greu decât orice problemă din NP (toate problemele NP se reduc la ea)",
          "E la fel de grea ca problemele din P",
          "Nu poate fi rezolvată cu algoritmi determiniști",
          "E rezolvabilă doar cu algoritmi randomizați",
        ],
        correctIndex: 0,
        explanation:
          "NP-hard = cel puțin la fel de grea ca orice problemă din NP. Orice problemă din NP se poate reduce polinomial la ea. NP-hard nu trebuie să fie în NP; poate fi chiar indecidabilă (ex: problema opririi e NP-hard).",
      },
      {
        question: "Care e primul pas pentru a demonstra că o problemă e NP-completă?",
        options: [
          "Scriem un algoritm greedy",
          "Arătăm că e în NP (verificare polinomială) și reducem o problemă NP-completă cunoscută la ea",
          "Demonstrăm că nu există algoritm polinomial",
          "Calculăm complexitatea exactă",
        ],
        correctIndex: 1,
        explanation:
          "Pașii: (1) Arătăm că problema e în NP — există un algoritm de verificare polinomial. (2) Alegem o problemă NP-completă cunoscută și o reducem polinomial la problema noastră. Astfel, dacă problema noastră ar fi în P, atunci toate NP ar fi în P.",
      },
      {
        question: "Ce problemă NP-completă clasică e despre satisfiabilitatea unei formule booleene?",
        options: [
          "Problema Clică",
          "SAT (Satisfiabilitatea booleană)",
          "Problema comis-voiajorului",
          "Problema rucsacului",
        ],
        correctIndex: 1,
        explanation:
          "SAT = prima problemă demonstrată NP-completă (Cook-Levin, 1971). Întreabă: există o asignare de valori de adevăr pentru variabilele unei formule booleene astfel încât formula să fie adevărată?",
      },
      {
        question: "Ce verificăm pentru a arăta că problema Clică e în NP?",
        options: [
          "Că putem găsi clica maximă în timp polinomial",
          "Că, dată o mulțime S de noduri, putem verifica în O(|S|²) că e clică (toate perechile sunt muchii)",
          "Că putem sorta nodurile în timp polinomial",
          "Că putem calcula gradul fiecărui nod",
        ],
        correctIndex: 1,
        explanation:
          "Pentru a verifica un certificat (o mulțime S de k noduri), parcurgem toate perechile (u,v) din S și verificăm dacă există muchie între ele. Complexitate: O(k²) = O(n²) — polinomial. Deci Clică ∈ NP.",
      },
      {
        question: "Ce face faza de ghicire într-un algoritm nedeterminist pentru NP?",
        options: [
          "Alege aleator o valoare și continuă pe o singură cale",
          "Creează câte o copie pentru fiecare soluție candidat posibilă, toate rulând simultan",
          "Iterează secvențial prin toate opțiunile",
          "Calculează soluția optimă direct",
        ],
        correctIndex: 1,
        explanation:
          "Faza de ghicire (nondeterministă) folosește 'choose' pentru a crea copii simultane ale algoritmului, câte una pentru fiecare valoare posibilă. Fiecare copie continuă independent, explorând un candidat diferit.",
      },
      {
        question: "Care e structura unui algoritm nedeterminist pentru o problemă NP?",
        options: [
          "Fază de sortare + fază de căutare",
          "Fază de ghicire (nondeterministă) + fază de verificare (deterministă polinomială)",
          "Fază de randomizare + fază de backtracking",
          "O singură fază: rezolvare directă",
        ],
        correctIndex: 1,
        explanation:
          "Algoritmii nedeterminiști pentru NP au: (1) Ghicirea unui certificat (soluție candidat) folosind 'choose' — nondeterminist, O(1) pași; (2) Verificarea certificatului — algoritm determinist în timp polinomial.",
      },
      {
        question: "Ce se întâmplă când cel puțin o cale dintr-un algoritm nedeterminist ajunge la 'success'?",
        options: [
          "Algoritmul continuă până când toate căile se termină",
          "Algoritmul se oprește imediat și raportează succes (răspuns DA)",
          "Calea respectivă se oprește, dar celelalte continuă",
          "Algoritmul resetează și reîncepe",
        ],
        correctIndex: 1,
        explanation:
          "'success' termină cu succes calea curentă și oprește întregul algoritm — toate celelalte căi sunt abandonate imediat. Algoritmul raportează DA (soluție găsită).",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question: "Care e complexitatea algoritmului BKT pentru problema celor n regine?",
        options: [
          "O(n)",
          "O(n²)",
          "O(n!) — factorială, cu pruning care reduce drastic",
          "O(2ⁿ)",
        ],
        correctIndex: 2,
        explanation:
          "Fără pruning, am plasa o regină pe fiecare coloană → n! posibilități. Cu pruning (verificare atacuri), multe ramuri sunt tăiate devreme, dar complexitatea teoretică rămâne O(n!) în cel mai rău caz.",
      },
      {
        question: "În Branch and Bound, cum se calculează bound-ul pentru o problemă de maximizare?",
        options: [
          "E o estimare superioară a valorii maxime posibile în subarborele respectiv",
          "E o estimare inferioară a valorii minime posibile",
          "E valoarea soluției curente",
          "E media aritmetică a tuturor soluțiilor posibile",
        ],
        correctIndex: 0,
        explanation:
          "Pentru maximizare, bound-ul e o estimare superioară (optimistă) — cea mai bună valoare pe care am putea-o atinge în ramura respectivă. Dacă bound-ul ≤ cea mai bună soluție găsită, ramura e tăiată (nu poate fi mai bună).",
      },
      {
        question: "Care e diferența principală dintre o problemă NP-completă și una NP-hard?",
        options: [
          "Nu există diferență",
          "NP-completă e în NP + NP-hard; NP-hard nu trebuie să fie în NP",
          "NP-hard e mai grea decât NP-completă",
          "NP-completă include doar probleme de decizie",
        ],
        correctIndex: 1,
        explanation:
          "Toate problemele NP-complete sunt NP-hard, dar reciproca nu e adevărată. NP-hard include și probleme care nu sunt în NP (ex: problema opririi, problema comis-voiajorului în varianta de optimizare). NP-complete sunt 'cele mai grele probleme din NP'.",
      },
      {
        question: "În reducerea SAT → Clică, cum transformăm o formulă SAT într-un graf?",
        options: [
          "Fiecare variabilă devine nod, muchiile sunt clauzele",
          "Fiecare literal e un nod; conectăm literali din clauze diferite care nu sunt complementari",
          "Transformăm variabilele în culori",
          "Creăm câte un nod pentru fiecare clauză",
        ],
        correctIndex: 1,
        explanation:
          "Construim un graf cu noduri = apariții de literali. Adăugăm muchii între literali din clauze diferite, cu excepția perechilor complementare (x și ¬x). O clică de dimensiune k (nr. clauze) corespunde unei asignări care satisface toate clauzele.",
      },
      {
        question: "De ce e SAT considerată prima problemă NP-completă?",
        options: [
          "Pentru că e cea mai ușoară problemă din NP",
          "Pentru că Cook și Levin au demonstrat în 1971 că orice problemă din NP se reduce polinomial la SAT",
          "Pentru că are complexitate O(n²)",
          "Pentru că e singura problemă din NP care nu e în P",
        ],
        correctIndex: 1,
        explanation:
          "Teorema Cook-Levin (1971) demonstrează că SAT e NP-completă prin construirea unei reduceri directe de la orice problemă NP la SAT. Aceasta a fost prima demonstrație de NP-completitudine, făcând din SAT 'piatra de temelie' a teoriei.",
      },
      {
        question: "Ce înseamnă că o reducere e 'polinomială'?",
        options: [
          "Că algoritmul de reducere are complexitate O(n!)",
          "Că transformarea instanțelor se face în timp O(n^k) pentru o constantă k",
          "Că rezultatul e un polinom",
          "Că se folosește memorie polinomială",
        ],
        correctIndex: 1,
        explanation:
          "O reducere polinomială transformă instanța problemei P în instanța problemei Q în timp O(n^k), unde n = dimensiunea instanței lui P. Dimensiunea instanței lui Q trebuie să fie și ea polinomială în n.",
      },
      {
        question: "Ce înseamnă 'success' într-un algoritm nedeterminist?",
        options: [
          "Se termină doar calea curentă de execuție",
          "Se termină cu succes calea curentă și toate celelalte căi de execuție (algoritmul raportează DA)",
          "Se reia algoritmul de la început",
          "Se trece la următoarea fază",
        ],
        correctIndex: 1,
        explanation:
          "'success' e o instrucțiune terminală: oprește calea curentă și întregul algoritm. Toate celelalte copii (căi de execuție) sunt abandonate. Algoritmul raportează că există o soluție (răspuns DA).",
      },
      {
        question: "Ce se întâmplă când toate căile unui algoritm nedeterminist ajung la 'failure'?",
        options: [
          "Algoritmul raportează eșec (răspuns NU)",
          "Algoritmul reia de la început",
          "Se alege o cale la întâmplare și se continuă",
          "Algoritmul intră în buclă infinită",
        ],
        correctIndex: 0,
        explanation:
          "Când toate căile s-au terminat cu 'failure', înseamnă că niciun candidat nu satisface condiția. Algoritmul raportează că nu există soluție (răspuns NU). Fiecare 'failure' termină doar calea respectivă; celelalte continuă până se epuizează.",
      },
      {
        question: "Care e diferența dintre un algoritm nedeterminist și unul randomizat (probabilistic)?",
        options: [
          "Sunt același lucru",
          "Nedeterministul creează copii simultane pentru toate opțiunile; randomizatul alege aleator o singură cale",
          "Randomizatul e mai rapid",
          "Nedeterministul e mai eficient",
        ],
        correctIndex: 1,
        explanation:
          "Algoritmul nedeterminist creează copii simultane pentru TOATE opțiunile (explorare paralelă). Algoritmul randomizat alege o singură cale la întâmplare. Nedeterminismul e un concept teoretic; randomizarea e practică și implementabilă pe calculatoare reale.",
      },
      {
        question: "Pentru a arăta că o problemă e NP-completă, putem reduce:",
        options: [
          "Problema noastră la o problemă NP-completă cunoscută",
          "O problemă NP-completă cunoscută la problema noastră",
          "Problema noastră la o problemă din P",
          "O problemă din P la problema noastră",
        ],
        correctIndex: 1,
        explanation:
          "Trebuie să reducem O problemă NP-completă cunoscută LA problema noastră (Q ∝ P unde Q e NP-completă cunoscută, P e problema noastră). Astfel arătăm că P e cel puțin la fel de grea ca Q. Dacă am reduce P la Q, am arăta că P e mai ușoară, nu mai grea.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question: "În demonstrația că 3-SAT se reduce la Clică, ce dimensiune are clica pe care o căutăm?",
        options: [
          "Numărul total de variabile",
          "Numărul de clauze din formula 3-SAT",
          "Numărul de literali diferiți",
          "Numărul de variabile care apar pozitiv",
        ],
        correctIndex: 1,
        explanation:
          "Căutăm o clică de dimensiune = numărul de clauze k. Fiecare nod al clicei corespunde unui literal dintr-o clauză diferită. O clică de k noduri înseamnă că am selectat câte un literal din fiecare clauză, fără conflicte (x și ¬x) — deci asignarea satisface toate clauzele.",
      },
      {
        question: "Care sunt cei 3 pași ai unei reduceri polinomiale de tip Turing?",
        options: [
          "Sortare, căutare, verificare",
          "Preprocesare (transformare polinomială a instanței P în Q), apel (rulează algoritmul pentru Q), postprocesare (transformare polinomială a răspunsului)",
          "Definire, implementare, testare",
          "Ghicire, verificare, success",
        ],
        correctIndex: 1,
        explanation:
          "Reducerea Turing: (1) Preprocesare — transformi instanța lui P într-o instanță a lui Q în timp polinomial; (2) Apelezi algoritmul pentru Q de un număr polinomial de ori; (3) Postprocesare — transformi răspunsul lui Q în răspunsul lui P în timp polinomial.",
      },
      {
        question: "De ce problema P vs NP e considerată o problemă deschisă fundamentală?",
        options: [
          "Pentru că nimeni nu a încercat să o rezolve",
          "Pentru că nu s-a găsit niciun algoritm polinomial pentru vreo problemă NP-completă, dar nici nu s-a demonstrat că unul nu există",
          "Pentru că e prea dificil de formulat matematic",
          "Pentru că necesită tehnologie cuantică",
        ],
        correctIndex: 1,
        explanation:
          "P vs NP e deschisă deoarece: (1) Nu s-a găsit niciun algoritm polinomial pentru vreo problemă NP-completă (deși s-au încercat multe); (2) Nu s-a demonstrat nici că un astfel de algoritm nu poate exista. Ambele posibilități rămân deschise, deși majoritatea cercetătorilor cred P ≠ NP.",
      },
      {
        question: "Cum diferă bound-ul în Branch and Bound de validarea (pruning-ul) din Backtracking?",
        options: [
          "Sunt același lucru",
          "Pruning-ul taie ramuri invalide; bound-ul taie ramuri sub-optimale (valide, dar care nu pot fi mai bune decât optimul curent)",
          "Bound-ul e mai lent",
          "Pruning-ul se aplică doar problemelor de optimizare",
        ],
        correctIndex: 1,
        explanation:
          "Pruning (BKT): verifici o constrângere — soluția parțială e invalidă → tai ramura. Bound (B&B): compari o estimare cu optimul curent — soluția poate fi validă, dar nu poate fi mai bună decât ce avem deja → tai ramura. B&B e pentru optimizare, BKT pentru căutare.",
      },
      {
        question: "Dacă un algoritm nedeterminist are timpul TA(n), care e timpul algoritmului determinist echivalent?",
        options: [
          "O(TA(n))",
          "O(TA(n)²)",
          "O(2^{TA(n)})",
          "O(TA(n) · log TA(n))",
        ],
        correctIndex: 2,
        explanation:
          "Teorema de determinizare: T_B(n) = O(2^{TA(n)}). Algoritmul determinist simulează toate căile de execuție. Numărul de căi crește exponențial cu TA(n) pentru că fiecare 'choose' creează copii multiple, iar acestea se ramifică la rândul lor.",
      },
      {
        question: "Dacă s-ar demonstra P = NP, ce implicație majoră ar avea?",
        options: [
          "Toate problemele ar deveni nerezolvabile",
          "Orice problemă cu verificare polinomială ar putea fi rezolvată în timp polinomial — criptografia actuală ar fi spartă",
          "Calculatoarele ar deveni de două ori mai rapide",
          "Nu ar avea niciun impact practic",
        ],
        correctIndex: 1,
        explanation:
          "P = NP ar însemna că orice problemă a cărei soluție poate fi verificată rapid poate fi și rezolvată rapid. Majoritatea criptografiei moderne (RSA, etc.) se bazează pe dificultatea unor probleme NP (factoring) — ar fi spartă. Optimizare, planificare, etc. ar deveni mult mai ușoare.",
      },
      {
        question: "Exemplu de problemă NP-hard care NU e NP-completă:",
        options: [
          "Problema Clică",
          "SAT",
          "Problema opririi (Halting Problem)",
          "3-SAT",
        ],
        correctIndex: 2,
        explanation:
          "Problema opririi e NP-hard (orice problemă NP se reduce la ea), dar nu e în NP (e indecidabilă — nu există algoritm care să o rezolve mereu). NP-complete sunt în NP. Problema Clică, SAT și 3-SAT sunt toate NP-complete.",
      },
      {
        question: "În BKT pentru problema rucsacului (decizie), ce verificăm la pruning?",
        options: [
          "Dacă greutatea curentă depășește capacitatea",
          "Dacă valoarea curentă + valoarea maximă posibilă rămasă < valoarea țintă",
          "Atât A cât și B",
          "Dacă am epuizat toate obiectele",
        ],
        correctIndex: 2,
        explanation:
          "La rucsac: (1) pruning de validitate — greutatea curentă nu poate depăși capacitatea W; (2) pruning de optimizare (B&B) — chiar și cu cele mai bune obiecte rămase, nu putem atinge valoarea țintă V. Ambele sunt necesare pentru eficiență.",
      },
      {
        question: "Ce face 'failure' într-un algoritm nedeterminist?",
        options: [
          "Termină întregul algoritm cu eșec",
          "Termină doar calea curentă de execuție, celelalte continuând",
          "Resetează algoritmul la starea inițială",
          "Afișează un mesaj de eroare și continuă",
        ],
        correctIndex: 1,
        explanation:
          "'failure' termină doar calea curentă (copia respectivă). Celelalte copii (căi) continuă să ruleze independent. Abia când TOATE căile s-au terminat cu 'failure', algoritmul raportează NU.",
      },
      {
        question: "Cum diferă o reducere Karp de o reducere Turing?",
        options: [
          "Sunt identice",
          "Karp = o singură transformare + un singur apel; Turing = permite apeluri multiple, interactiv",
          "Turing e mai restrictivă",
          "Karp se aplică doar problemelor de decizie",
        ],
        correctIndex: 1,
        explanation:
          "Reducerea Karp (many-one): transformi o instanță a lui P într-o instanță a lui Q cu un singur apel. Reducerea Turing: poți apela algoritmul pentru Q de mai multe ori, folosind răspunsurile anterioare. Turing e mai generală (include Karp ca caz particular).",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question: "În demonstrația de NP-completitudine pentru 3-Colorabilitate, la ce problemă NP-completă se face reducerea?",
        options: [
          "De la 3-SAT la 3-Colorabilitate",
          "De la 3-Colorabilitate la SAT",
          "De la Clică la 3-Colorabilitate",
          "De la 2-Colorabilitate la 3-Colorabilitate",
        ],
        correctIndex: 0,
        explanation:
          "Se reduce 3-SAT la 3-Colorabilitate. Se construiește un graf special cu: (1) noduri pentru variabile (x și ¬x în culori diferite), (2) un triunghi 'paletă' (culorile TRUE, FALSE, BASE), (3) subgrafuri pentru fiecare clauză care forțează ca cel puțin un literal din clauză să fie TRUE.",
      },
      {
        question: "Ce demonstrează teorema Cook-Levin?",
        options: [
          "Că P ≠ NP",
          "Că SAT e NP-completă (orice problemă din NP se reduce polinomial la SAT)",
          "Că algoritmii nedeterminiști sunt utili",
          "Că problema opririi e indecidabilă",
        ],
        correctIndex: 1,
        explanation:
          "Teorema Cook-Levin (1971): SAT e NP-completă. Demonstrația construiește, pentru orice problemă NP, o reducere polinomială la SAT. Ideea: reprezintă execuția unui NDTM (mașină Turing nedeterministă) ca o formulă booleană care e satisfiabilă exact când mașina acceptă.",
      },
      {
        question: "Care e cel mai bun algoritm cunoscut pentru SAT în practică?",
        options: [
          "Backtracking simplu",
          "Algoritmul DPLL (Davis-Putnam-Logemann-Loveland) cu îmbunătățiri (CDCL)",
          "Căutare binară",
          "Programare dinamică",
        ],
        correctIndex: 1,
        explanation:
          "Algoritmul DPLL cu CDCL (Conflict-Driven Clause Learning) e standardul pentru SAT. Combină backtracking cu: propagare unitară, învățare de clauze din conflicte, restarturi periodice. Solverele moderne (MiniSAT, Glucose) rezolvă instanțe cu sute de mii de variabile în practică.",
      },
      {
        question: "Care e diferența fundamentală dintre un algoritm nedeterminist și unul randomizat?",
        options: [
          "Nedeterministul ghicește corect întotdeauna; randomizatul poate greși",
          "Nedeterministul explorează TOATE căile simultan; randomizatul alege o cale la întâmplare (o singură execuție)",
          "Sunt același lucru din punct de vedere teoretic",
          "Randomizatul e mai puternic decât nedeterministul",
        ],
        correctIndex: 1,
        explanation:
          "Nedeterminism: la un 'choose', se creează COPII PENTRU TOATE valorile, toate rulând simultan. E un model teoretic (NDTM). Randomizare: se alege o valoare ALEATOARE (o singură cale), cu o anumită distribuție de probabilitate. Randomizarea e implementabilă practic.",
      },
      {
        question: "În Branch and Bound pentru TSP, cum se calculează bound-ul?",
        options: [
          "Suma muchiilor deja selectate",
          "Suma muchiilor deja selectate + suma minimelor muchiilor de intrare/ieșire pentru orașele rămase",
          "Distanța Euclideană directă între primul și ultimul oraș",
          "Media distanțelor dintre toate orașele",
        ],
        correctIndex: 1,
        explanation:
          "Bound-ul TSP = costul muchiilor deja alese + o estimare inferioară a costului pentru orașele rămase. De exemplu, pentru fiecare oraș rămas, adunăm muchia de intrare minimă și muchia de ieșire minimă (împărțit la 2). Dacă acest bound depășește cel mai bun tur găsit, ramura e tăiată.",
      },
      {
        question: "Cum transformi o problemă de decizie NP-completă în problema de optimizare corespunzătoare?",
        options: [
          "Reduci problema de optimizare la cea de decizie",
          "Folosești căutare binară pe valoarea soluției, apelând repetat problema de decizie",
          "Nu se poate face transformarea",
          "Aplici algoritmul nedeterminist direct",
        ],
        correctIndex: 1,
        explanation:
          "Pentru a rezolva optimizarea folosind decizia: (1) stabilești un interval [lo, hi] pentru valoarea optimă; (2) cauți binar valoarea optimă — la fiecare pas întrebi 'Există soluție cu valoare ≥ k?' (problema de decizie). Astfel, optimizarea se reduce polinomial la decizie (de un număr logaritmic de ori).",
      },
      {
        question: "De ce e teorema Cook-Levin considerată revoluționară?",
        options: [
          "Pentru că a demonstrat că P ≠ NP",
          "Pentru că a demonstrat existența unei prime probleme NP-complete, permițând clasificarea a mii de alte probleme prin reduceri",
          "Pentru că a introdus algoritmul de backtracking",
          "Pentru că a demonstrat că SAT e în P",
        ],
        correctIndex: 1,
        explanation:
          "Cook-Levin a demonstrat că SAT e NP-completă, oferind un 'punct de plecare' pentru reduceri. Odată ce ai o problemă NP-completă, poți demonstra NP-completitudinea altor probleme reducând SAT (sau alta deja cunoscută) la ele. Astfel s-au clasificat mii de probleme.",
      },
      {
        question: "Există probleme complete pentru alte clase de complexitate (EXPTIME, PSPACE)?",
        options: [
          "Nu, NP e singura clasă cu probleme complete",
          "Da, fiecare clasă de complexitate are propriile probleme complete (ex: QBF e PSPACE-completă)",
          "Doar P și NP au probleme complete",
          "Problemele complete există doar pentru clasele nedeterministe",
        ],
        correctIndex: 1,
        explanation:
          "Da. EXPTIME: probleme EXPTIME-complete (ex: jocul GO generalizat). PSPACE: QBF (Quantified Boolean Formula) e PSPACE-completă. NL: problema accesibilității în graf orientat e NL-completă. Fiecare clasă are propriile probleme 'cele mai grele'.",
      },
      {
        question: "Cum se leagă algoritmii nedeterminiști de definiția formală a clasei NP?",
        options: [
          "NP = probleme rezolvate de un NDTM în timp polinomial (faza de ghicire + verificare)",
          "NP = probleme care nu au algoritm determinist",
          "NP = probleme pentru care NDTM folosește memorie polinomială",
          "NP = probleme care necesită timp exponențial pe DTM",
        ],
        correctIndex: 0,
        explanation:
          "Definiția formală: NP = ∪_{k≥1} NTIME(n^k), unde NTIME(f(n)) = clasa problemelor decise de un NDTM în O(f(n)) pași. Algoritmul nedeterminist ghicește un certificat (O(1) pași nedeterminiști) și verifică (O(n^k)). Verificarea deterministă polinomială e definiția alternativă.",
      },
      {
        question: "Ce este problema SUBSET-SUM și de ce e NP-completă?",
        options: [
          "Găsește submulțimea cu suma maximă — rezolvabilă greedy",
          "Există o submulțime a unui set de numere cu suma exact T? — NP-completă, reducere de la 3-SAT",
          "Sortează numerele și verifică — complexitate O(n log n)",
          "E rezolvabilă prin programare dinamică în timp polinomial",
        ],
        correctIndex: 1,
        explanation:
          "SUBSET-SUM: date n numere și o țintă T, există o submulțime cu suma T? E NP-completă (reducere de la 3-SAT). Există algoritm DP pseudo-polinomial O(nT) — dar T poate fi exponențial în n, deci nu e polinomial adevărat.",
      },
    ],
  },
];

export const ANALIZA_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question: "Ce reprezintă O(g(n)) în notația asimptotică?",
        options: [
          "Limită inferioară — funcția crește cel puțin la fel de repede ca g(n)",
          "Limită superioară — există n₀, c a.î. f(n) ≤ c·g(n) pentru n ≥ n₀",
          "Limită strânsă — funcția e exact g(n)",
          "Limită medie — funcția e aproximativ g(n)",
        ],
        correctIndex: 1,
        explanation:
          "O(g(n)) = {f(n) | ∃ c, n₀ > 0 a.î. 0 ≤ f(n) ≤ c·g(n), ∀ n ≥ n₀}. O spune că f(n) nu crește mai repede decât g(n) asimptotic, până la un factor constant.",
      },
      {
        question: "Ce reprezintă Ω(g(n)) în notația asimptotică?",
        options: [
          "Limită superioară — f(n) ≤ c·g(n)",
          "Limită inferioară — există n₀, c a.î. f(n) ≥ c·g(n) pentru n ≥ n₀",
          "Limită strânsă — f(n) = Θ(g(n))",
          "Limită exactă — f(n) = g(n) pentru n mare",
        ],
        correctIndex: 1,
        explanation:
          "Ω(g(n)) = {f(n) | ∃ c, n₀ > 0 a.î. 0 ≤ c·g(n) ≤ f(n), ∀ n ≥ n₀}. Ω spune că f(n) crește cel puțin la fel de repede ca g(n) asimptotic.",
      },
      {
        question: "Ce reprezintă Θ(g(n)) în notația asimptotică?",
        options: [
          "Doar limită superioară",
          "Doar limită inferioară",
          "Limită strânsă — atât superioară cât și inferioară: c₁·g(n) ≤ f(n) ≤ c₂·g(n)",
          "Limită medie — cazul mediu",
        ],
        correctIndex: 2,
        explanation:
          "Θ(g(n)) = {f(n) | ∃ c₁, c₂, n₀ > 0 a.î. 0 ≤ c₁·g(n) ≤ f(n) ≤ c₂·g(n), ∀ n ≥ n₀}. f(n) = Θ(g(n)) ⇔ f(n) = O(g(n)) și f(n) = Ω(g(n)). E cea mai puternică notație.",
      },
      {
        question: "Care sunt cele 3 proprietăți ale unui invariant de buclă?",
        options: [
          "Corectitudine, Eficiență, Terminare",
          "Inițializare, Menținere, Terminare",
          "Intrare, Ieșire, Eroare",
          "Definire, Calcul, Verificare",
        ],
        correctIndex: 1,
        explanation:
          "Un invariant de buclă trebuie să satisfacă: (1) Inițializare — e adevărat înainte de prima iterație; (2) Menținere — dacă e adevărat înaintea unei iterații, rămâne adevărat și după; (3) Terminare — la terminare, oferă o proprietate utilă care demonstrează corectitudinea.",
      },
      {
        question: "Ce verifică faza de 'Inițializare' a unui invariant de buclă?",
        options: [
          "Că bucla se termină",
          "Că invariantul e adevărat imediat înainte de prima execuție a buclei",
          "Că datele de intrare sunt corecte",
          "Că algoritmul e eficient",
        ],
        correctIndex: 1,
        explanation:
          "Inițializarea verifică că invariantul e adevărat în starea inițială, înainte de prima iterație. De exemplu, în Insertion Sort, la i=1 subșirul a[0..0] are un singur element, deci e sortat — invariantul e adevărat.",
      },
      {
        question: "Ce verifică faza de 'Menținere' a unui invariant de buclă?",
        options: [
          "Că bucla nu e infinită",
          "Că dacă invariantul e adevărat înaintea unei iterații, rămâne adevărat și după execuția acelei iterații",
          "Că datele de intrare sunt valide",
          "Că algoritmul folosește memoria optim",
        ],
        correctIndex: 1,
        explanation:
          "Menținerea e pasul inductiv: presupui invariantul adevărat la începutul iterației k și demonstrezi că rămâne adevărat la începutul iterației k+1. Dacă inițializarea și menținerea sunt adevărate, invariantul e adevărat la începutul fiecărei iterații.",
      },
      {
        question: "Ce verifică faza de 'Terminare' a unui invariant de buclă?",
        options: [
          "Că bucla se termină și că la terminare invariantul oferă o proprietate care demonstrează corectitudinea algoritmului",
          "Că algoritmul e mai rapid decât alternativele",
          "Că memoria e eliberată corect",
          "Că datele de ieșire sunt tipărite corect",
        ],
        correctIndex: 0,
        explanation:
          "Terminarea are două părți: (1) bucla se termină (de obicei evident, când contorul atinge limita); (2) la terminare, invariantul + condiția de terminare implică corectitudinea algoritmului. De exemplu, la Insertion Sort: când i = n, toate elementele sunt sortate.",
      },
      {
        question: "Ce este un invariant de buclă?",
        options: [
          "O proprietate care e adevărată la începutul fiecărei iterații a buclei",
          "O variabilă care nu se modifică în timpul execuției",
          "O constantă definită la începutul programului",
          "O condiție care e adevărată doar la sfârșitul buclei",
        ],
        correctIndex: 0,
        explanation:
          "Un invariant de buclă e o proprietate logică care e adevărată la începutul fiecărei iterații a buclei. Se demonstrează prin inițializare (adevărat prima dată) + menținere (persistă), iar la terminare oferă dovada corectitudinii.",
      },
      {
        question: "Dacă f(n) = 3n² + 5n + 7, care e notația Θ corectă?",
        options: [
          "Θ(n)",
          "Θ(n²)",
          "Θ(n³)",
          "Θ(n log n)",
        ],
        correctIndex: 1,
        explanation:
          "Pentru un polinom, termenul dominant determină comportarea asimptotică. 3n² + 5n + 7 = Θ(n²). Demonstrație: c₁ = 3, c₂ = 4, n₀ = 6: 3n² ≤ 3n² + 5n + 7 ≤ 4n² pentru n suficient de mare.",
      },
      {
        question: "Ce relație există între O, Ω și Θ?",
        options: [
          "Sunt independente, fără relație",
          "f(n) = Θ(g(n)) ⇔ f(n) = O(g(n)) și f(n) = Ω(g(n)) simultan",
          "O e mai puternic decât Θ",
          "Ω e mai slab decât O",
        ],
        correctIndex: 1,
        explanation:
          "Θ e intersecția dintre O și Ω. f(n) = Θ(g(n)) exact când f(n) = O(g(n)) (limită superioară) și f(n) = Ω(g(n)) (limită inferioară). Pentru a demonstra Θ, trebuie să demonstrezi ambele direcții.",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question: "Pentru Merge Sort, recurența T(n) = 2T(n/2) + Θ(n) are soluția:",
        options: [
          "Θ(n)",
          "Θ(n²)",
          "Θ(n log n)",
          "Θ(log n)",
        ],
        correctIndex: 2,
        explanation:
          "Arborele de recurență are log₂ n + 1 niveluri. Fiecare nivel k are 2^k noduri, fiecare cu cost c·n/2^k, total cn pe nivel. Cost total = cn·(log₂ n + 1) = Θ(n log n).",
      },
      {
        question: "Pentru căutarea binară, recurența T(n) = T(n/2) + Θ(1) are soluția:",
        options: [
          "Θ(n)",
          "Θ(n²)",
          "Θ(n log n)",
          "Θ(log n)",
        ],
        correctIndex: 3,
        explanation:
          "Arborele de recurență: log₂ n + 1 niveluri, fiecare cu cost Θ(1). Cost total = Θ(1)·(log₂ n + 1) = Θ(log n).",
      },
      {
        question: "Pentru algoritmul lui Karatsuba, recurența T(n) = 3T(n/2) + Θ(n) are soluția:",
        options: [
          "Θ(n log n)",
          "Θ(n^{log₂ 3}) ≈ Θ(n^{1.59})",
          "Θ(n²)",
          "Θ(n³)",
        ],
        correctIndex: 1,
        explanation:
          "a = 3, b = 2, log_b a = log₂ 3 ≈ 1.59. Costul la frunze e Θ(n^{log_b a}) = Θ(n^{log₂ 3}), care domină costul f(n) = Θ(n). Deci T(n) = Θ(n^{log₂ 3}).",
      },
      {
        question: "Ce este un arbore de recurență?",
        options: [
          "O structură de date pentru stocarea recurențelor",
          "O reprezentare vizuală a expansiunii unei recurențe, unde fiecare nod reprezintă costul unui sub-apel",
          "Un arbore binar de căutare",
          "O metodă de sortare",
        ],
        correctIndex: 1,
        explanation:
          "Arborele de recurență desenează expansiunea T(n) = a·T(n/b) + f(n). Rădăcina = costul f(n). Fiecare nod are a copii, fiecare de dimensiune n/b. Nivelul k: a^k noduri, cost a^k·f(n/b^k). Frunze la nivelul log_b n, cost n^{log_b a}.",
      },
      {
        question: "Câte niveluri are arborele de recurență pentru T(n) = aT(n/b) + f(n)?",
        options: [
          "log_a n",
          "log_b n + 1 (inclusiv nivelul frunzelor)",
          "n",
          "n/b",
        ],
        correctIndex: 1,
        explanation:
          "Dimensiunea problemei se împarte la b la fiecare nivel. După k niveluri, dimensiunea e n/b^k. Când n/b^k = 1 → k = log_b n. Sunt log_b n niveluri cu cost f(n) + nivelul frunzelor, deci total log_b n + 1.",
      },
      {
        question: "Ce reprezintă f(n) în recurența T(n) = aT(n/b) + f(n)?",
        options: [
          "Costul total al algoritmului",
          "Costul împărțirii problemei și combinării rezultatelor subproblemelor la nivelul curent",
          "Dimensiunea problemei",
          "Numărul de subprobleme",
        ],
        correctIndex: 1,
        explanation:
          "În recurența divide-et-impera, f(n) = costul fazei de divide (împărțirea în subprobleme) + costul fazei de combinare (îmbinarea rezultatelor). a = numărul de subprobleme, n/b = dimensiunea fiecărei subprobleme.",
      },
      {
        question: "Care e complexitatea best-case a algoritmului Insertion Sort?",
        options: [
          "Θ(n²)",
          "Θ(n)",
          "Θ(log n)",
          "Θ(1)",
        ],
        correctIndex: 1,
        explanation:
          "Best-case: array-ul e deja sortat. La fiecare iterație i, a[i] e comparat o singură dată (cu a[i-1]), deci bucla while nu execută niciun swap. Total: Θ(n).",
      },
      {
        question: "Care e complexitatea worst-case a algoritmului Insertion Sort?",
        options: [
          "Θ(n²)",
          "Θ(n)",
          "Θ(n log n)",
          "Θ(log n)",
        ],
        correctIndex: 0,
        explanation:
          "Worst-case: array-ul e sortat invers. La iterația i, a[i] trebuie comparat și deplasat cu toate cele i elemente din stânga. Total: Σ_{i=1}^{n-1} i = n(n-1)/2 = Θ(n²).",
      },
      {
        question: "Ce este analiza 'average-case' a unui algoritm?",
        options: [
          "Analiza celui mai prost caz posibil",
          "Valoarea așteptată a timpului de execuție, presupunând o distribuție de probabilitate pentru intrări",
          "Analiza celui mai bun caz",
          "Media aritmetică dintre best și worst case",
        ],
        correctIndex: 1,
        explanation:
          "Average-case = E[T(n)] = Σ_{X: |X|=n} T(X) · Pr{X}. Se presupune o distribuție de probabilitate pentru intrări (de obicei uniformă). De exemplu, Insertion Sort are average-case Θ(n²) pentru intrări uniform distribuite.",
      },
      {
        question: "Care e diferența dintre best-case și worst-case?",
        options: [
          "Best-case = cea mai favorabilă intrare; worst-case = cea mai defavorabilă intrare de dimensiune n",
          "Best-case = timpul minim absolut; worst-case = timpul maxim absolut",
          "Best-case e întotdeauna O(n); worst-case e întotdeauna O(n²)",
          "Nu există diferență pentru algoritmii divide-et-impera",
        ],
        correctIndex: 0,
        explanation:
          "T_best(n) = min_{|X|=n} T(X) — cea mai favorabilă intrare. T_worst(n) = max_{|X|=n} T(X) — cea mai defavorabilă. Pentru același algoritm, pot fi foarte diferite (ex: Insertion Sort: best Θ(n), worst Θ(n²)).",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question: "Câte frunze are arborele de recurență pentru T(n) = aT(n/b) + f(n)?",
        options: [
          "a^{log_b n} = n^{log_b a}",
          "log_b n",
          "a^{n/b}",
          "a · n/b",
        ],
        correctIndex: 0,
        explanation:
          "La nivelul k = log_b n (când n/b^k = 1), avem a^{log_b n} frunze. Folosind identitatea a^{log_b n} = n^{log_b a}, obținem că numărul de frunze e n^{log_b a}. Fiecare frunză are cost Θ(1), deci costul total al frunzelor e Θ(n^{log_b a}).",
      },
      {
        question: "Ce afirmă faza de 'Menținere' în demonstrația prin invariant pentru Selection Sort?",
        options: [
          "Array-ul e sortat complet după fiecare iterație",
          "Primele i elemente sunt cele mai mici i elemente și sunt sortate între ele",
          "Algoritmul se termină întotdeauna",
          "Toate elementele sunt în pozițiile finale",
        ],
        correctIndex: 1,
        explanation:
          "Invariantul Selection Sort: la începutul iterației i, subșirul a[0..i-1] conține cele mai mici i elemente, sortate. Menținerea: iterația i găsește minimul din a[i..n-1] și îl plasează pe poziția i → acum a[0..i] are cele mai mici i+1 elemente, sortate.",
      },
      {
        question: "Ce înseamnă P ∝ Q (P se reduce polinomial la Q)?",
        options: [
          "P e mai greu decât Q",
          "P și Q sunt la fel de grele",
          "P nu e mai greu decât Q — există o transformare polinomială a instanțelor lui P în instanțe ale lui Q",
          "P și Q sunt amândouă NP-complete",
        ],
        correctIndex: 2,
        explanation:
          "P ∝ Q: poți transforma orice instanță a lui P într-o instanță a lui Q în timp polinomial, apela un algoritm pentru Q, și transforma răspunsul înapoi. Deci P poate fi 'rezolvat' prin Q — P nu e mai greu decât Q.",
      },
      {
        question: "Care e complexitatea algoritmului lui Karatsuba pentru înmulțirea numerelor mari?",
        options: [
          "Θ(n²)",
          "Θ(n log n)",
          "Θ(n^{log₂ 3}) ≈ Θ(n^{1.59})",
          "Θ(n^{1.41})",
        ],
        correctIndex: 2,
        explanation:
          "Karatsuba împarte numerele în jumătăți și face 3 înmulțiri (nu 4 ca înmulțirea clasică). Recurența: T(n) = 3T(n/2) + Θ(n). log₂ 3 ≈ 1.59, deci Θ(n^{1.59}) — mai bun decât Θ(n²) al înmulțirii clasice.",
      },
      {
        question: "Care e complexitatea căutării binare?",
        options: [
          "Θ(n)",
          "Θ(n²)",
          "Θ(n log n)",
          "Θ(log n)",
        ],
        correctIndex: 3,
        explanation:
          "Căutarea binară: la fiecare pas, înjumătățim intervalul de căutare. T(n) = T(n/2) + Θ(1) → Θ(log n). E optimală pentru căutare într-un array sortat.",
      },
      {
        question: "Ordonați corect următoarele funcții după rata de creștere asimptotică: log n, n, n log n, n², 2ⁿ.",
        options: [
          "2ⁿ > n² > n log n > n > log n",
          "log n < n < n log n < n² < 2ⁿ",
          "log n < n² < n < n log n < 2ⁿ",
          "n log n < n < n² < 2ⁿ < log n",
        ],
        correctIndex: 1,
        explanation:
          "Ordinea corectă (de la cea mai lentă la cea mai rapidă): Θ(log n) < Θ(n) < Θ(n log n) < Θ(n²) < Θ(2ⁿ). Reguli: log n domină constantele; n domină log n; n log n domină n; n² domină n log n; exponențial domină polinomial.",
      },
      {
        question: "Care e diferența dintre O (big-oh) și o (little-oh)?",
        options: [
          "O e limită superioară; o e limită superioară strictă (f(n)/g(n) → 0)",
          "O e pentru funcții, o e pentru șiruri",
          "O e mai puternic decât o",
          "Sunt sinonime",
        ],
        correctIndex: 0,
        explanation:
          "O(g(n)): f(n) ≤ c·g(n) pentru n suficient de mare (poate fi egal). o(g(n)): f(n)/g(n) → 0 când n → ∞ (creștere strict mai lentă). Exemplu: 2n = O(n) dar 2n ≠ o(n); n² = o(n³) dar n² ≠ o(n²).",
      },
      {
        question: "În analiza reducerii P ∝ Q, ce conține faza de preprocesare?",
        options: [
          "Executarea algoritmului pentru Q",
          "Transformarea instanței problemei P într-o instanță a problemei Q în timp polinomial",
          "Verificarea corectitudinii rezultatului",
          "Sortarea datelor de intrare",
        ],
        correctIndex: 1,
        explanation:
          "Preprocesarea = transformarea datelor de intrare ale lui P în date de intrare pentru Q. Această transformare trebuie să ruleze în timp polinomial și să păstreze răspunsul (da/nu pentru aceeași problemă de decizie).",
      },
      {
        question: "Pentru recurența T(n) = 3T(n/4) + cn², care nivel domină costul total?",
        options: [
          "Nivelul 0 (rădăcina) — cost cn² domină pentru că descrește geometric",
          "Nivelul frunzelor — pentru că sunt multe",
          "Toate nivelurile au același cost",
          "Depinde de n",
        ],
        correctIndex: 0,
        explanation:
          "Cost pe nivel: nivel 0 = cn², nivel 1 = 3·c(n/4)² = (3/16)cn², nivel 2 = (3/16)²cn², ... = progresie geometrică cu rație 3/16 < 1. Suma = cn²·(1/(1-3/16)) = Θ(n²). Rădăcina domină.",
      },
      {
        question: "Ce este analiza amortizată?",
        options: [
          "Media costurilor peste toate operațiile, nu doar costul individual maxim",
          "Analiza celui mai rău caz",
          "Analiza randomizată",
          "Costul mediu al unei singure operații izolate",
        ],
        correctIndex: 0,
        explanation:
          "Analiza amortizată: deși o operație individuală poate fi scumpă (ex: redimensionarea unui vector dinamic), costul mediu pe operație peste o secvență e mic. Exemplu: inserare în vector dinamic → O(1) amortizat, deși o inserare poate fi O(n) când se redimensionează.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question: "Pentru T(n) = 3T(n/4) + cn², cum se calculează suma totală folosind arborele de recurență?",
        options: [
          "Suma progresiei geometrice: cn² · (1 + (3/16) + (3/16)² + ...) = Θ(n²)",
          "cn² · log₄ n",
          "cn² · n^{log₄ 3}",
          "Depinde de constanta c",
        ],
        correctIndex: 0,
        explanation:
          "Cost nivel 0: cn². Nivel 1: 3·c(n/4)² = (3/16)cn². Nivel k: (3/16)^k·cn². Progresie geometrică cu rație r = 3/16 < 1. Suma = cn²·(1/(1-r)) = (16/13)cn² = Θ(n²). Rădăcina domină.",
      },
      {
        question: "Cum demonstrezi corectitudinea unui algoritm greedy folosind invarianti?",
        options: [
          "Arăți că invariantul e adevărat la început și se menține după fiecare alegere greedy",
          "Folosești doar exchange argument, nu și invarianti",
          "Arăți că algoritmul sortează datele corect",
          "Verifici manual pentru câteva exemple",
        ],
        correctIndex: 0,
        explanation:
          "Corectitudinea greedy se demonstrează adesea cu un invariant: 'după k alegeri greedy, soluția parțială poate fi extinsă la o soluție optimă'. Inițializare: k=0, mulțimea vidă poate fi extinsă la orice optim. Menținere: dacă invariantul e adevărat la k, alegerea greedy la pasul k+1 păstrează proprietatea.",
      },
      {
        question: "Care e relația dintre best-case, worst-case și average-case?",
        options: [
          "T_best(n) ≤ T_average(n) ≤ T_worst(n) pentru orice n",
          "T_best(n) ≥ T_average(n) ≥ T_worst(n)",
          "Sunt independente",
          "T_average(n) = (T_best(n) + T_worst(n))/2",
        ],
        correctIndex: 0,
        explanation:
          "Prin definiție: T_best(n) = min T(X), T_worst(n) = max T(X), iar T_average(n) = E[T(X)] e o medie ponderată. Deci T_best(n) ≤ T_average(n) ≤ T_worst(n). Exemplu: Insertion Sort — best Θ(n), average Θ(n²), worst Θ(n²).",
      },
      {
        question: "Care e diferența dintre o reducere Turing și o reducere Karp?",
        options: [
          "Sunt identice",
          "Karp (many-one): un singur apel la Q; Turing: permise apeluri multiple, posibil adaptiv",
          "Turing: un singur apel; Karp: apeluri multiple",
          "Karp e mai puternică decât Turing",
        ],
        correctIndex: 1,
        explanation:
          "Reducerea Karp (many-one): transformi x (instanță P) în f(x) (instanță Q) și răspunsul pentru Q e direct răspunsul pentru P. Reducerea Turing: poți apela algoritmul pentru Q de mai multe ori, chiar folosind rezultate anterioare. Turing generalizează Karp.",
      },
      {
        question: "Cum se calculează complexitatea exactă a lui Merge Sort (număr de comparații)?",
        options: [
          "C(n) = 2C(n/2) + n - 1 → C(n) = n log₂ n - n + 1",
          "C(n) = 2C(n/2) + n → C(n) = n log₂ n",
          "C(n) = 2C(n/2) + 1 → C(n) = n",
          "C(n) = n² / 2",
        ],
        correctIndex: 0,
        explanation:
          "Pentru Merge Sort: C(n) = 2C(n/2) + (n - 1) (la interclasare, în cel mai rău caz, se fac n-1 comparații pentru n elemente). Rezolvând: C(1)=0, C(n) = n log₂ n - n + 1 pentru n = 2^k.",
      },
      {
        question: "Ce spune teorema master (Master Theorem) pentru T(n) = aT(n/b) + f(n)?",
        options: [
          "Oferă soluția direct în trei cazuri, în funcție de comparația dintre f(n) și n^{log_b a}",
          "Spune că T(n) = Θ(n log n) întotdeauna",
          "E un algoritm de sortare",
          "Calculează numărul de frunze din arbore",
        ],
        correctIndex: 0,
        explanation:
          "Teorema Master are 3 cazuri: (1) f(n) = O(n^{log_b a - ε}) → T(n) = Θ(n^{log_b a}); (2) f(n) = Θ(n^{log_b a}) → T(n) = Θ(n^{log_b a} log n); (3) f(n) = Ω(n^{log_b a + ε}) și condiția de regularitate → T(n) = Θ(f(n)).",
      },
      {
        question: "Pentru recurența T(n) = 2T(n/2) + Θ(n log n), care e soluția?",
        options: [
          "Θ(n log n)",
          "Θ(n (log n)²)",
          "Θ(n²)",
          "Θ(n log n log log n)",
        ],
        correctIndex: 1,
        explanation:
          "Arborele: nivel 0: n log n; nivel 1: 2·(n/2) log(n/2) = n log(n/2); nivel k: n log(n/2^k). Suma ≈ Σ_{k=0}^{log n} n (log n - k) = n · (log n)(log n + 1)/2 = Θ(n (log n)²). Cazul 2 extins al teoremei master.",
      },
      {
        question: "Ce e o reducere polinomială în contextul clasei P?",
        options: [
          "O reducere care transformă orice problemă în alta, indiferent de complexitate",
          "O reducere care transformă problema P în problema Q în timp polinomial, cu proprietatea: P(y)=DA ⇔ Q(f(y))=DA",
          "O reducere care face problema mai ușoară",
          "O reducere care folosește doar operații aritmetice",
        ],
        correctIndex: 1,
        explanation:
          "O reducere polinomială f: {instanțe P} → {instanțe Q} unde: (1) f se calculează în timp polinomial; (2) y e instanță DA a lui P ⇔ f(y) e instanță DA a lui Q. Astfel, un algoritm pentru Q poate fi folosit să rezolve P.",
      },
      {
        question: "Dacă f(n) = O(g(n)) și g(n) = O(h(n)), atunci f(n) = O(h(n)). Ce proprietate e aceasta?",
        options: [
          "Reflexivitatea",
          "Tranzitivitatea",
          "Simetria",
          "Antisimetria",
        ],
        correctIndex: 1,
        explanation:
          "Tranzitivitatea notațiilor asimptotice: dacă f(n) = O(g(n)) și g(n) = O(h(n)), atunci f(n) = O(h(n)). Demonstrație: f(n) ≤ c₁·g(n) și g(n) ≤ c₂·h(n) → f(n) ≤ (c₁·c₂)·h(n). Aceeași proprietate e valabilă și pentru Ω și Θ.",
      },
      {
        question: "Ce este analiza de caz mediu (average-case) pentru un algoritm determinist?",
        options: [
          "Media aritmetică a timpilor de execuție pentru toate intrările de dimensiune n",
          "Valoarea așteptată a timpului, presupunând o distribuție de probabilitate specificată pe intrări",
          "Media dintre best și worst case",
          "Timpul de execuție pentru o intrare 'tipică'",
        ],
        correctIndex: 1,
        explanation:
          "Analiza average-case = E[T(n)] = Σ_{X} T(X) · Pr{X}. Necesită o distribuție de probabilitate pentru intrări (de obicei uniformă). Exemplu: QuickSort are average-case O(n log n) pentru ordine aleatoare, deși worst-case e O(n²).",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question: "Cum se calculează T(n) din recurența T(n) = 2T(n/2) + Θ(n log n) folosind teorema master?",
        options: [
          "Cazul 1: f(n) = O(n^{1 - ε}) → T(n) = Θ(n)",
          "Cazul 2 extins: f(n) = Θ(n^{log_b a} log^k n) cu k=1 → T(n) = Θ(n^{log_b a} log^{k+1} n) = Θ(n (log n)²)",
          "Cazul 3: f(n) = Ω(n^{1 + ε}) → T(n) = Θ(n log n)",
          "Teorema master nu se poate aplica",
        ],
        correctIndex: 1,
        explanation:
          "a=2, b=2, log_b a = 1, n^{log_b a} = n. f(n) = n log n = Θ(n log n) = Θ(n^{log_b a} log^1 n). Cazul 2 extins: T(n) = Θ(n^{log_b a} log^{k+1} n) = Θ(n (log n)²).",
      },
      {
        question: "Care e numărul exact de comparații pentru Merge Sort în cazul cel mai rău?",
        options: [
          "n log₂ n",
          "n log₂ n - n + 1",
          "n²/2",
          "2ⁿ",
        ],
        correctIndex: 1,
        explanation:
          "C(n) = 2C(n/2) + (n-1) pentru n = 2^k. Desfacem: C(2^k) = 2·C(2^{k-1}) + (2^k - 1) = 2^k·C(1) + Σ_{i=1}^k 2^{k-i}·(2^i - 1) = 0 + k·2^k - (2^k - 1) = n log₂ n - n + 1.",
      },
      {
        question: "Ce sunt notațiile o (little-oh) și ω (little-omega)?",
        options: [
          "o = O dar cu limită strictă (f/g → 0); ω = Ω dar cu limită strictă (f/g → ∞)",
          "o = Ω, ω = O",
          "o și ω sunt sinonime pentru O și Ω",
          "o = limită superioară, ω = limită inferioară, ambele ne-stricte",
        ],
        correctIndex: 0,
        explanation:
          "f(n) = o(g(n)): ∀c>0, ∃n₀ a.î. f(n) < c·g(n) pentru n≥n₀, echivalent cu lim f(n)/g(n) = 0. f(n) = ω(g(n)): ∀c>0, ∃n₀ a.î. c·g(n) < f(n), echivalent cu lim f(n)/g(n) = ∞. Sunt versiunile 'stricte' ale O și Ω.",
      },
      {
        question: "Care e limita inferioară pentru sortarea prin comparație a n elemente?",
        options: [
          "Ω(n)",
          "Ω(n log n)",
          "Ω(log n)",
          "Ω(n²)",
        ],
        correctIndex: 1,
        explanation:
          "Orice algoritm de sortare bazat pe comparații necesită cel puțin Ω(n log n) comparații în cazul cel mai rău. Demonstrație: există n! permutări posibile; fiecare comparație elimină cel mult jumătate; deci sunt necesare cel puțin log₂(n!) ≈ n log₂ n comparații.",
      },
      {
        question: "Care e complexitatea average-case a lui QuickSort cu pivot aleator?",
        options: [
          "Θ(n)",
          "Θ(n log n)",
          "Θ(n²)",
          "Θ(n √n)",
        ],
        correctIndex: 1,
        explanation:
          "QuickSort randomizat: T(n) = T(k) + T(n-k-1) + Θ(n), unde k e uniform distribuit între 0 și n-1. Rezolvând: E[T(n)] = Θ(n log n). Demonstrație: E[T(n)] = (2/n)·Σ_{k=0}^{n-1} E[T(k)] + Θ(n) → E[T(n)] ≈ 2n ln n ≈ 1.39 n log₂ n.",
      },
      {
        question: "Ce este o reducere polinomială și ce proprietate de închidere are clasa P?",
        options: [
          "Dacă Q ∈ P și P ∝ Q, atunci P ∈ P (P e închisă la reduceri polinomiale)",
          "P nu e închisă la reduceri",
          "Dacă P ∝ Q și P ∈ P, atunci Q ∈ P",
          "Reducerile nu au legătură cu P",
        ],
        correctIndex: 0,
        explanation:
          "Clasa P e închisă la reduceri polinomiale: dacă Q poate fi rezolvată în timp polinomial și P se reduce polinomial la Q, atunci și P poate fi rezolvată în timp polinomial (prin preprocesare + apel Q + postprocesare, toate polinomiale).",
      },
      {
        question: "Pentru T(n) = T(n/3) + T(2n/3) + Θ(n), care e soluția?",
        options: [
          "Θ(n)",
          "Θ(n log n)",
          "Θ(n²)",
          "Θ(log n)",
        ],
        correctIndex: 1,
        explanation:
          "Arborele are adâncime diferită: ramura n/3 atinge 1 după log₃ n niveluri; ramura 2n/3 după log_{3/2} n niveluri. Costul pe fiecare nivel e Θ(n). Total: Θ(n log n). E similar cu QuickSort average-case.",
      },
      {
        question: "Cum se definește complexitatea pentru algoritmi randomizați?",
        options: [
          "E același ca pentru algoritmi determiniști",
          "T(n) e o variabilă aleatoare: T_expected(n) = E[T(n)], T_worst(n) = timpul maxim posibil",
          "Nu se poate defini complexitatea pentru algoritmi randomizați",
          "Doar T_expected se poate defini",
        ],
        correctIndex: 1,
        explanation:
          "Pentru algoritmi randomizați: T(n) e o variabilă aleatoare. Definim: T_expected(n) = E[T(n)] (timpul așteptat), T_worst(n) = timpul maxim posibil. De exemplu, QuickSort randomizat: T_expected = O(n log n), dar T_worst = O(n²) (probabilitate neglijabilă).",
      },
      {
        question: "Ce este teorema master și care sunt cele 3 cazuri principale?",
        options: [
          "Caz1: f(n) = O(n^{log_b a - ε}) → Θ(n^{log_b a}); Caz2: f(n) = Θ(n^{log_b a}) → Θ(n^{log_b a} log n); Caz3: f(n) = Ω(n^{log_b a + ε}) cu regularitate → Θ(f(n))",
          "Toate cazurile dau Θ(n log n)",
          "Caz1: Θ(n), Caz2: Θ(n log n), Caz3: Θ(n²)",
          "Se aplică doar când a = b",
        ],
        correctIndex: 0,
        explanation:
          "Teorema Master pentru T(n) = aT(n/b) + f(n): Cazul 1: f(n) crește mai lent decât n^{log_b a} → domină frunzele. Cazul 2: f(n) ≈ n^{log_b a} → ambele contribuie egal. Cazul 3: f(n) crește mai rapid și satisface condiția de regularitate → domină rădăcina.",
      },
      {
        question: "Cum se leagă analiza asimptotică de conceptul de eficiență în practică?",
        options: [
          "Notațiile asimptotice sunt singurul criteriu de eficiență",
          "O notă asimptotică mai bună garantează viteză mai mare în practică pentru orice dimensiune",
          "Notațiile asimptotice descriu comportamentul pentru n → ∞; constantele și factorii mici pot face un algoritm Θ(n²) mai rapid decât unul Θ(n log n) pentru n suficient de mici",
          "Analiza asimptotică nu are relevanță practică",
        ],
        correctIndex: 2,
        explanation:
          "Notațiile asimptotice ignoră constantele. Un algoritm Θ(n log n) cu constantă mare (ex: 1000n log n) poate fi mai lent decât unul Θ(n²) cu constantă mică (ex: 0.5n²) pentru n mici. Practic, testăm pentru dimensiunile reale ale datelor.",
      },
    ],
  },
];

export const NEDET_QUIZZES: QuizSet[] = [
  {
    difficulty: "Începător",
    questions: [
      {
        question: "Ce efect are instrucțiunea 'choose x from A' într-un algoritm nedeterminist?",
        options: [
          "Alege o valoare aleatoare din A și continuă pe o singură cale",
          "Creează câte o copie a algoritmului pentru fiecare valoare din A, toate rulând simultan și independent",
          "Iterează prin toate valorile din A secvențial",
          "Sortează A și alege prima valoare",
        ],
        correctIndex: 1,
        explanation:
          "'choose x from A' e instrucțiunea fundamentală a nedeterminismului. Creează o copie independentă a algoritmului pentru fiecare valoare din A. Toate copiile rulează simultan, explorând toate posibilitățile în paralel.",
      },
      {
        question: "Când se execută 'success' într-un algoritm nedeterminist, ce se întâmplă?",
        options: [
          "Se termină doar calea curentă de execuție",
          "Se termină cu succes calea curentă și toate celelalte căi de execuție (algoritmul raportează DA)",
          "Se reia algoritmul de la început",
          "Se afișează un mesaj și se continuă execuția",
        ],
        correctIndex: 1,
        explanation:
          "'success' e o instrucțiune terminală globală: termină cu succes calea curentă și oprește întregul algoritm. Toate celelalte copii (căi de execuție) sunt abandonate. Algoritmul raportează că există o soluție (răspuns DA).",
      },
      {
        question: "Când se execută 'failure' într-un algoritm nedeterminist, ce se întâmplă?",
        options: [
          "Se termină întregul algoritm cu eșec",
          "Se termină doar calea curentă de execuție; celelalte căi continuă",
          "Se reia execuția de la ultimul 'choose'",
          "Se transformă în 'success' și continuă",
        ],
        correctIndex: 1,
        explanation:
          "'failure' termină doar calea curentă. Celelalte copii (căi) continuă să ruleze independent. Abia când TOATE căile s-au terminat cu 'failure', algoritmul raportează NU (nu există soluție).",
      },
      {
        question: "Care e diferența principală dintre un algoritm determinist și unul nedeterminist?",
        options: [
          "Algoritmii nedeterminiști sunt mai rapizi",
          "Algoritmii determiniști au o singură cale de execuție; cei nedeterminiști pot avea multiple căi simultane",
          "Algoritmii nedeterminiști nu se termină niciodată",
          "Algoritmii determiniști folosesc randomizare",
        ],
        correctIndex: 1,
        explanation:
          "Algoritm determinist: o singură cale de execuție, același rezultat pentru aceeași intrare. Algoritm nedeterminist: poate avea multiple căi de execuție simultane (prin 'choose'), rezultatul depinzând de existența unei căi de succes.",
      },
      {
        question: "Câte căi de execuție poate avea un algoritm nedeterminist?",
        options: [
          "O singură cale",
          "Exact două căi",
          "Un număr potențial exponențial de căi, determinate de instrucțiunile 'choose'",
          "Depinde de numărul de procesoare",
        ],
        correctIndex: 2,
        explanation:
          "Numărul de căi crește exponențial cu numărul de instrucțiuni 'choose'. Dacă avem k instrucțiuni 'choose x from A_i', numărul total de căi e |A₁| × |A₂| × ... × |A_k|, care poate fi exponențial în dimensiunea intrării.",
      },
      {
        question: "Ce înseamnă NDTM?",
        options: [
          "Non-Deterministic Turing Machine — o mașină Turing care poate avea multiple tranziții posibile dintr-o configurație",
          "New Data Transfer Method",
          "Non-Directional Time Machine",
          "Numeric Data Type Model",
        ],
        correctIndex: 0,
        explanation:
          "NDTM = Non-Deterministic Turing Machine, modelul teoretic al calculului nedeterminist. La fiecare pas, NDTM poate alege dintre mai multe tranziții posibile, creând multiple 'ramuri' de execuție. Acceptă intrarea dacă cel puțin o ramură ajunge într-o stare de acceptare.",
      },
      {
        question: "Ce se întâmplă cu un algoritm nedeterminist dacă niciun 'success' nu e atins?",
        options: [
          "Algoritmul nu se oprește niciodată",
          "Toate căile se termină cu 'failure' și algoritmul raportează NU",
          "Se alege o cale la întâmplare",
          "Algoritmul reia de la început",
        ],
        correctIndex: 1,
        explanation:
          "Dacă niciun 'success' nu e atins, înseamnă că toate căile s-au terminat cu 'failure'. În acest caz, algoritmul raportează NU (răspuns negativ) — nu există nicio soluție care să satisfacă condiția.",
      },
      {
        question: "Ce este un certificat în contextul algoritmilor nedeterminiști?",
        options: [
          "O autorizație de rulare a algoritmului",
          "O soluție candidat ghicită în faza de ghicire, care trebuie verificată în faza de verificare",
          "Un document care atestă corectitudinea algoritmului",
          "O variabilă care numără pașii executați",
        ],
        correctIndex: 1,
        explanation:
          "Certificatul = soluția candidat produsă de faza de ghicire (ghicită nondeterminist). Faza de verificare deterministă examinează acest certificat și decide dacă e o soluție corectă pentru problema dată.",
      },
      {
        question: "Cum diferă nedeterminismul de randomizare?",
        options: [
          "Sunt același lucru",
          "Nedeterminismul explorează TOATE opțiunile simultan; randomizarea alege o singură cale la întâmplare",
          "Randomizarea e mai puternică",
          "Nedeterminismul e un caz particular de randomizare",
        ],
        correctIndex: 1,
        explanation:
          "Nedeterminism: 'choose' creează copii pentru toate opțiunile simultan (explorare paralelă). Randomizare: se alege o valoare aleatoare, o singură execuție. Nedeterminismul e un concept teoretic; randomizarea e practică, implementabilă pe hardware real.",
      },
      {
        question: "Ce este un algoritm nedeterminist?",
        options: [
          "Un algoritm care poate avea mai multe rezultate posibile pentru aceeași intrare, datorită instrucțiunilor 'choose'",
          "Un algoritm care rulează aleator",
          "Un algoritm care nu se termină niciodată",
          "Un algoritm care sortează datele",
        ],
        correctIndex: 0,
        explanation:
          "Un algoritm nedeterminist poate produce mai multe căi de execuție pentru aceeași intrare. Rezultatul poate fi DA (dacă cel puțin o cale duce la 'success') sau NU (dacă toate căile duc la 'failure').",
      },
    ],
  },
  {
    difficulty: "Ușor",
    questions: [
      {
        question: "Care sunt cele două faze ale unui algoritm nedeterminist pentru o problemă NP?",
        options: [
          "Fază de sortare + fază de căutare",
          "Fază de ghicire (nondeterministă) + fază de verificare (deterministă polinomială)",
          "Fază de randomizare + fază de backtracking",
          "Fază de intrare + fază de ieșire",
        ],
        correctIndex: 1,
        explanation:
          "Un algoritm nedeterminist pentru NP are: (1) Faza de ghicire — folosește 'choose' pentru a produce o soluție candidat (certificat) într-un număr polinomial de pași nedeterminiști; (2) Faza de verificare — algoritm determinist care verifică certificatul în timp polinomial.",
      },
      {
        question: "Ce face faza de ghicire într-un algoritm nedeterminist?",
        options: [
          "Verifică corectitudinea soluției",
          "Produce o soluție candidat (certificat) folosind instrucțiuni 'choose'",
          "Sortează datele de intrare",
          "Calculează complexitatea algoritmului",
        ],
        correctIndex: 1,
        explanation:
          "Faza de ghicire construiește un certificat printr-o serie de instrucțiuni 'choose'. De exemplu, pentru SAT: 'choose a from {0,1}^n' ghicește o asignare booleană. Această fază e nondeterministă (toate asignările sunt explorate simultan).",
      },
      {
        question: "Ce face faza de verificare într-un algoritm nedeterminist?",
        options: [
          "Ghicește o soluție",
          "Verifică determinist dacă certificatul produs de faza de ghicire e o soluție corectă pentru problemă",
          "Sortează rezultatele",
          "Calculează media aritmetică",
        ],
        correctIndex: 1,
        explanation:
          "Faza de verificare e un algoritm determinist care primește inputul și certificatul și verifică dacă certificatul e o soluție validă. Pentru SAT: evaluează formula booleană sub asignarea ghicită. Complexitatea acestei faze trebuie să fie polinomială.",
      },
      {
        question: "Ce spune teorema de determinizare?",
        options: [
          "Orice algoritm nedeterminist poate fi transformat într-unul determinist echivalent",
          "Algoritmii nedeterminiști nu pot fi simulați",
          "Determinizarea reduce complexitatea",
          "Toți algoritmii sunt determiniști în practică",
        ],
        correctIndex: 0,
        explanation:
          "Teorema de determinizare: pentru orice algoritm nedeterminist A, există un algoritm determinist B care produce același rezultat. B simulează toate căile de execuție ale lui A. Costul: B poate fi exponențial mai lent decât A.",
      },
      {
        question: "Care e costul determinizării unui algoritm nedeterminist?",
        options: [
          "T_B(n) = O(T_A(n))",
          "T_B(n) = O(2^{T_A(n)})",
          "T_B(n) = O(T_A(n)²)",
          "T_B(n) = O(log T_A(n))",
        ],
        correctIndex: 1,
        explanation:
          "Teorema de determinizare: T_B(n) = O(2^{T_A(n)}). Algoritmul determinist B simulează toate căile de execuție. Dacă A face k = T_A(n) pași, numărul de căi poate fi exponențial în k.",
      },
      {
        question: "De ce e exponențial costul determinizării?",
        options: [
          "Pentru că algoritmii nedeterminiști sunt rari",
          "Pentru că fiecare instrucțiune 'choose' crește numărul de căi, iar căile se ramifică independent, ducând la un număr exponențial de configurații de simulat",
          "Pentru că procesoarele sunt lente",
          "Pentru că memoria e limitată",
        ],
        correctIndex: 1,
        explanation:
          "Fiecare 'choose' creează copii multiple. Dacă avem m instrucțiuni 'choose', fiecare cu d opțiuni, numărul total de căi = d^m. Simularea secvențială a tuturor căilor duce la un cost exponențial.",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru SAT?",
        options: [
          "Sortează variabilele și verifică fiecare clauză",
          "Alege o asignare (choose din {0,1}^n), apoi verifică dacă formula e adevărată; dacă da → success, altfel → failure",
          "Rulează backtracking pe toate asignările",
          "Aplică algoritmul DPLL",
        ],
        correctIndex: 1,
        explanation:
          "Algoritm nedeterminist pentru SAT: (1) Ghicire: 'a = choose from {0,1}^n' — alege o asignare booleană (nondeterminist, toate cele 2^n asignări sunt explorate simultan); (2) Verificare: evaluează F(a); dacă true → success, altfel → failure.",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru existența unui element par într-o mulțime?",
        options: [
          "Sortează mulțimea și caută binar",
          "'choose x from A'; dacă x % 2 == 0 → success, altfel → failure",
          "Iterează prin toate elementele secvențial",
          "Calculează suma elementelor",
        ],
        correctIndex: 1,
        explanation:
          "Algoritm: (1) 'choose x from A' — creează câte o copie pentru fiecare element din A; (2) Dacă x e par → success (oprește totul, răspuns DA); altfel → failure (doar această cale se termină, celelalte continuă).",
      },
      {
        question: "Ce spune teorema de determinizare despre relația dintre timpii de execuție?",
        options: [
          "T_B(n) = O(T_A(n)) — determinizarea nu adaugă cost",
          "T_B(n) = O(2^{T_A(n)}) — determinizarea poate fi exponențial mai lentă",
          "T_B(n) = O(T_A(n) · log T_A(n))",
          "T_B(n) = O(T_A(n)²)",
        ],
        correctIndex: 1,
        explanation:
          "Teorema: T_B(n) = O(2^{T_A(n)}). Dacă algoritmul nedeterminist A face k = T_A(n) pași, numărul de căi de explorat e cel mult exponențial în k. Algoritmul determinist B simulează toate căile, deci timpul e exponențial în T_A(n).",
      },
      {
        question: "Ce se întâmplă dacă într-un algoritm nedeterminist avem două instrucțiuni 'choose' consecutive?",
        options: [
          "Numărul de căi se multiplică: dacă primul alege din A și al doilea din B, avem |A| × |B| căi",
          "A doua instrucțiune o anulează pe prima",
          "Se alege aceeași valoare de două ori",
          "Algoritmul e invalid",
        ],
        correctIndex: 0,
        explanation:
          "Fiecare 'choose' creează copii independente. După primul 'choose x from A' avem |A| căi. Fiecare dintre acestea execută al doilea 'choose y from B', creând încă |B| căi fiecare. Total: |A| × |B| căi.",
      },
    ],
  },
  {
    difficulty: "Mediu",
    questions: [
      {
        question: "Cum se demonstrează teorema de determinizare?",
        options: [
          "Prin inducție pe numărul de variabile",
          "Prin simularea tuturor căilor de execuție: menținem o mulțime de configurații și le procesăm pe toate secvențial",
          "Prin reducere la problema opririi",
          "Prin sortarea tuturor configurațiilor",
        ],
        correctIndex: 1,
        explanation:
          "Demonstrația: algoritmul determinist B menține o mulțime (sau stivă) de configurații ale lui A. La fiecare pas, B înlocuiește fiecare configurație cu toate succesoarele posibile (pentru 'choose', creează câte o configurație pentru fiecare valoare). Numărul de configurații poate crește exponențial.",
      },
      {
        question: "Cum se leagă algoritmii nedeterminiști de clasa NP?",
        options: [
          "NP = clasa problemelor pentru care există un algoritm nedeterminist cu timp polinomial",
          "NP = clasa problemelor care nu pot fi rezolvate de algoritmi nedeterminiști",
          "NP = clasa problemelor pentru care algoritmii nedeterminiști necesită timp exponențial",
          "NP și algoritmii nedeterminiști nu au nicio legătură",
        ],
        correctIndex: 0,
        explanation:
          "NP = clasa problemelor de decizie rezolvabile de un NDTM (algoritm nedeterminist) în timp polinomial. Faza de ghicire + faza de verificare trebuie să ruleze în O(n^k). Alternativ: NP = probleme cu verificare polinomială.",
      },
      {
        question: "De ce 'choose' creează copii, în loc să aleagă o valoare la întâmplare?",
        options: [
          "Pentru că așa e definit modelul teoretic: nedeterminismul explorează toate opțiunile simultan, garantând că dacă există o soluție, o va găsi",
          "Pentru că e mai eficient",
          "Pentru că randomizarea nu exista când a fost inventat conceptul",
          "Pentru că așa e implementat în limbaje de programare",
        ],
        correctIndex: 0,
        explanation:
          "Nedeterminismul e un concept teoretic. 'choose' creează copii simultane pentru a explora toate opțiunile în paralel. Asta garantează că dacă există o cale de succes (o soluție), algoritmul o va găsi. Randomizarea lasă lucrurile la voia întâmplării și poate rata soluția.",
      },
      {
        question: "Care e diferența dintre nedeterminism și randomizare (probabilistic)?",
        options: [
          "Nedeterminismul garantează corectitudinea (dacă există soluție, o găsește); randomizarea poate eșua cu o anumită probabilitate",
          "Sunt identice",
          "Randomizarea e mai puternică",
          "Nedeterminismul e un caz particular de randomizare",
        ],
        correctIndex: 0,
        explanation:
          "Nedeterminism: explorează TOATE căile → dacă există soluție, cel puțin o cale o găsește → garantează corectitudinea. Randomizarea: alege o singură cale la întâmplare → poate nimeri sau nu soluția.",
      },
      {
        question: "Ce se întâmplă când toate căile unui algoritm nedeterminist ajung la 'failure'?",
        options: [
          "Algoritmul raportează NU (nu există soluție)",
          "Algoritmul reia de la început",
          "Se alege o cale la întâmplare și se reia",
          "Algoritmul intră în buclă infinită",
        ],
        correctIndex: 0,
        explanation:
          "Când toate căile au ajuns la 'failure', înseamnă că nicio soluție candidat nu e validă. Algoritmul raportează 'NU'. E important: 'failure' termină doar calea curentă, nu întregul algoritm.",
      },
      {
        question: "Ce se întâmplă dacă cel puțin o cale dintr-un algoritm nedeterminist ajunge la 'success'?",
        options: [
          "Algoritmul continuă până se termină toate căile",
          "Algoritmul se oprește imediat și raportează DA",
          "Se alege calea cu cele mai multe 'success'-uri",
          "Algoritmul așteaptă ca toate căile să ajungă la 'success'",
        ],
        correctIndex: 1,
        explanation:
          "'success' e o instrucțiune terminală GLOBALĂ. Când o cale execută 'success', întregul algoritm se oprește imediat și raportează DA. Toate celelalte căi sunt abandonate.",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru problema rucsacului (varianta de decizie)?",
        options: [
          "Alege o submulțime de obiecte, verifică dacă greutatea ≤ W și valoarea ≥ V",
          "Sortează obiectele după valoare și alege primele k",
          "Aplică programare dinamică",
          "Rulează algoritmul greedy și verifică",
        ],
        correctIndex: 0,
        explanation:
          "(1) Ghicire: 'S = choose din toate submulțimile' — fiecare copie explorează o submulțime diferită. (2) Verificare: calculează greutatea totală w(S) și valoarea v(S); dacă w(S) ≤ W și v(S) ≥ V → success; altfel → failure.",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru problema Clică?",
        options: [
          "Alege k noduri și verifică dacă toate perechile sunt muchii",
          "Sortează nodurile după grad",
          "Aplică algoritmul greedy",
          "Calculează complementul grafului",
        ],
        correctIndex: 0,
        explanation:
          "(1) Ghicire: 'S = choose din {submulțimi de k noduri}' — fiecare copie alege câte o submulțime de k noduri. (2) Verificare: pentru fiecare pereche (u,v) din S, verifică dacă (u,v) e muchie; dacă toate perechile sunt muchii → success; altfel → failure.",
      },
      {
        question: "Cum se simulează un algoritm nedeterminist pe un calculator real?",
        options: [
          "Nu se poate simula deloc",
          "Prin backtracking: explorezi toate căile secvențial, cu revenire (backtrack) când o cale eșuează",
          "Prin paralelizare pe toate procesoarele disponibile",
          "Prin randomizare",
        ],
        correctIndex: 1,
        explanation:
          "Simularea unui algoritm nedeterminist pe un calculator secvențial se face prin backtracking — explorezi o cale complet, apoi te întorci și explorezi următoarea. Aceasta e exact conexiunea dintre nedeterminism și backtracking.",
      },
      {
        question: "Ce e un pas nedeterminist?",
        options: [
          "Un pas care nu poate fi prezis",
          "Un pas (instrucțiune 'choose') care creează multiple căi de execuție, fiecare corespunzând unei valori diferite",
          "Un pas care durează un timp variabil",
          "Un pas de randomizare",
        ],
        correctIndex: 1,
        explanation:
          "Un pas nedeterminist e o instrucțiune 'choose x from A' care bifurcă execuția în |A| căi paralele. Fiecare cale primește o valoare diferită pentru x.",
      },
    ],
  },
  {
    difficulty: "Avansat",
    questions: [
      {
        question: "Cum demonstrezi formal că o problemă e în NP folosind un algoritm nedeterminist?",
        options: [
          "Scrii un algoritm cu fază de ghicire O(n^k) + fază de verificare O(n^k), ambele polinomiale",
          "Scrii un algoritm care sortează datele",
          "Scrii un algoritm randomizat",
          "Scrii un algoritm de backtracking",
        ],
        correctIndex: 0,
        explanation:
          "Pentru a arăta P ∈ NP: construiești un NDTM (algoritm nedeterminist) care (1) într-un număr polinomial de pași nedeterminiști ghicește un certificat, și (2) într-un număr polinomial de pași deterministi verifică certificatul.",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru 3-Colorabilitate?",
        options: [
          "Alege o culoare pentru fiecare nod (choose din {1,2,3}), apoi verifică dacă orice muchie are capete de culori diferite",
          "Sortează nodurile și colorează greedy",
          "Aplică algoritmul BFS",
          "Calculează gradul maxim",
        ],
        correctIndex: 0,
        explanation:
          "(1) Ghicire: pentru fiecare nod v, 'choose c(v) from {1,2,3}' — fiecare copie explorează o colorare diferită. (2) Verificare: pentru fiecare muchie (u,v), verifică c(u) ≠ c(v); dacă toate muchiile sunt bune → success; altfel → failure.",
      },
      {
        question: "Care e structura formală a determinizării (simulării) unui NDTM pe un DTM?",
        options: [
          "DTM-ul explorează arborele de execuție al NDTM-ului în lățime sau în adâncime, menținând configurațiile curente",
          "DTM-ul rulează NDTM-ul de un număr fix de ori",
          "DTM-ul sortează toate configurațiile",
          "DTM-ul folosește un oracol",
        ],
        correctIndex: 0,
        explanation:
          "DTM-ul simulează NDTM-ul explorând arborele de execuție. Menține o bandă cu mulțimea configurațiilor curente. La fiecare pas, pentru fiecare configurație, generează toate succesoarele posibile.",
      },
      {
        question: "Ce relație există între T_A(n) (timpul NDTM) și numărul de căi explorate de DTM?",
        options: [
          "Numărul de căi e cel mult b^{T_A(n)}, unde b e numărul maxim de tranziții per configurație NDTM",
          "Numărul de căi e T_A(n)²",
          "Numărul de căi e T_A(n)",
          "Numărul de căi e log T_A(n)",
        ],
        correctIndex: 0,
        explanation:
          "Un NDTM poate avea cel mult b tranziții dintr-o configurație (b = constantă). După T_A(n) pași, numărul maxim de configurații distincte (căi) e b^{T_A(n)}. DTM-ul le simulează pe toate: T_B(n) = O(2^{T_A(n)}).",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru Hamiltonian Cycle?",
        options: [
          "Alege o permutare a nodurilor (choose din n! permutări) și verifică dacă muchiile consecutive există",
          "Aplică DFS",
          "Sortează nodurile și verifică",
          "Calculează arborele parțial de cost minim",
        ],
        correctIndex: 0,
        explanation:
          "(1) Ghicire: alege o permutare π a nodurilor (folosind n instrucțiuni 'choose'). (2) Verificare: pentru i = 1..n-1, verifică dacă (π_i, π_{i+1}) e muchie; dacă toate sunt muchii și ultimul se leagă de primul → success.",
      },
      {
        question: "Ce e clasa NTIME(f(n))?",
        options: [
          "Clasa problemelor decise de un NDTM în O(f(n)) pași",
          "Clasa problemelor care nu pot fi rezolvate în timp f(n)",
          "Clasa problemelor rezolvate de un DTM în O(f(n)) pași",
          "Clasa problemelor care necesită memorie O(f(n))",
        ],
        correctIndex: 0,
        explanation:
          "NTIME(f(n)) = {probleme de decizie L | ∃ NDTM care decide L în O(f(n)) pași}. NP = ∪_{k ≥ 1} NTIME(n^k) — problemele decise de un NDTM în timp polinomial.",
      },
      {
        question: "De ce e suficient ca verificarea să fie polinomială pentru a fi în NP?",
        options: [
          "Pentru că faza de ghicire poate fi făcută în O(1) pași nedeterminiști (un singur 'choose' care ghicește tot certificatul)",
          "Pentru că verificarea e mai importantă decât ghicirea",
          "Pentru că ghicirea e întotdeauna în O(n)",
          "Pentru că faza de ghicire e randomizată",
        ],
        correctIndex: 0,
        explanation:
          "În modelul NDTM, putem ghici întregul certificat într-un singur pas nedeterminist (un 'choose' dintr-un set polinomial ca dimensiune — deci exponențial ca număr de elemente). Faza de ghicire e O(1) pași nedeterminiști.",
      },
      {
        question: "Cum se clasifică problemele după complexitatea algoritmilor nedeterminiști?",
        options: [
          "După numărul de pași nedeterminiști și timpul de verificare: NP = timp polinomial nedeterminist + verificare polinomială",
          "Toate problemele sunt la fel de complexe",
          "După memoria folosită",
          "După numărul de instrucțiuni 'choose'",
        ],
        correctIndex: 0,
        explanation:
          "Clasificarea se face după resursele NDTM: NTIME(f(n)) = timp f(n) pe NDTM. NP = NTIME(n^k). NEXPTIME = NTIME(2^{n^k}). Ierarhia: NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME ⊆ NEXPTIME.",
      },
      {
        question: "Un algoritm determinist polinomial e și un algoritm nedeterminist polinomial?",
        options: [
          "Da, orice algoritm determinist poate fi văzut ca un algoritm nedeterminist fără 'choose' (o singură cale)",
          "Nu, sunt concepte separate",
          "Doar dacă algoritmul folosește randomizare",
          "Doar dacă algoritmul e de tip backtracking",
        ],
        correctIndex: 0,
        explanation:
          "Orice algoritm determinist e un caz particular de algoritm nedeterminist (cu zero instrucțiuni 'choose', deci o singură cale de execuție). Asta demonstrează P ⊆ NP.",
      },
      {
        question: "Ce e mai puternic: un NDTM cu timp polinomial sau un DTM cu timp polinomial?",
        options: [
          "NDTM e cel puțin la fel de puternic (P ⊆ NP), dar nu se știe dacă e strict mai puternic (P ≠ NP e o problemă deschisă)",
          "DTM e mai puternic",
          "Sunt la fel de puternice (P = NP e demonstrat)",
          "Niciunul nu e mai puternic decât celălalt",
        ],
        correctIndex: 0,
        explanation:
          "NDTM poate explora multiple căi simultan, deci e cel puțin la fel de puternic ca DTM-ul. P ⊆ NP e cunoscut. Problema P vs NP rămâne deschisă.",
      },
    ],
  },
  {
    difficulty: "Expert",
    questions: [
      {
        question: "Ce înseamnă definiția formală NP = ∪_{k≥1} NTIME(n^k)?",
        options: [
          "NP = clasa problemelor decise de un NDTM în timp O(n^k) pentru o constantă k oarecare",
          "NP = clasa problemelor care nu pot fi rezolvate de NDTM",
          "NP = clasa problemelor care necesită exact n^k pași",
          "NP = clasa problemelor rezolvate de DTM în timp O(n^k)",
        ],
        correctIndex: 0,
        explanation:
          "Definiția formală: NP = reuniune peste toate constantele k a claselor NTIME(n^k). O problemă e în NP dacă există un NDTM care o decide și al cărui timp de execuție (pe orice cale) e O(n^k).",
      },
      {
        question: "Cum arată un algoritm nedeterminist pentru problema SUBSET-SUM?",
        options: [
          "Alege o submulțime (choose bitmask), apoi verifică dacă suma = T",
          "Sortează numerele și alege primele k",
          "Aplică programare dinamică",
          "Rulează algoritmul greedy",
        ],
        correctIndex: 0,
        explanation:
          "(1) Ghicire: 'S = choose din {0,1}^n' — fiecare copie alege o submulțime diferită (bitmask). (2) Verificare: calculează suma elementelor selectate; dacă suma = T → success; altfel → failure. Verificare O(n).",
      },
      {
        question: "Care sunt limitările algoritmilor nedeterminiști în practică?",
        options: [
          "Nu pot fi implementați direct pe hardware actual decât prin simulare (backtracking), care e exponențială",
          "Sunt la fel de eficienți ca algoritmii determiniști",
          "Pot rula doar pe calculatoare cuantice",
          "Nu au limitări — sunt soluția universală",
        ],
        correctIndex: 0,
        explanation:
          "Algoritmii nedeterminiști sunt un concept teoretic — nu putem crea copii infinite ale unui algoritm simultan. Singura modalitate de a-i simula e prin backtracking, care are cost exponențial.",
      },
      {
        question: "Ce spune teorema ierarhiei pentru timp nedeterminist?",
        options: [
          "NTIME(f(n)) ⊊ NTIME(g(n)) dacă f(n) = o(g(n)) și g e 'time-constructible'",
          "Toate clasele NTIME sunt egale",
          "NTIME(f(n)) = DTIME(f(n)) pentru orice f",
          "Nu există o ierarhie pentru timp nedeterminist",
        ],
        correctIndex: 0,
        explanation:
          "Teorema ierarhiei: dacă f(n) crește strict mai lent decât g(n) (și g e time-constructible), atunci NTIME(f(n)) ⊊ NTIME(g(n)). Deci există probleme rezolvabile în O(n²) dar nu în O(n).",
      },
      {
        question: "Cum se leagă oracolele de algoritmii nedeterminiști?",
        options: [
          "Un oracol e o 'cutie neagră' care rezolvă o problemă instantaneu; un algoritm nedeterminist poate apela un oracol pentru faza de verificare",
          "Oracolele nu au legătură cu nedeterminismul",
          "Oracolele sunt un tip special de algoritm determinist",
          "Oracolele înlocuiesc faza de ghicire",
        ],
        correctIndex: 0,
        explanation:
          "Un oracol e o subrutină ipotetică care rezolvă o problemă Q într-un singur pas. Algoritmii pot folosi oracole (ex: P^{NP} = probleme rezolvabile în timp polinomial cu un oracol NP).",
      },
      {
        question: "Cum poate nedeterminismul să ajute la separarea claselor de complexitate?",
        options: [
          "Prin teorema ierarhiei: NTIME(n^{k+1}) conține probleme care nu sunt în NTIME(n^k)",
          "Nu poate — toate clasele sunt egale",
          "Doar pentru spațiu, nu și pentru timp",
          "Separarea claselor e imposibilă",
        ],
        correctIndex: 0,
        explanation:
          "Teorema ierarhiei pentru NDTM arată că mai mult timp permite rezolvarea mai multor probleme. De exemplu, NTIME(n²) ⊊ NTIME(n³). E o separare necondiționată (nu depinde de P vs NP).",
      },
      {
        question: "Ce spune teorema lui Savitch și cum se leagă de nedeterminism?",
        options: [
          "NSPACE(f(n)) ⊆ SPACE(f(n)²) — spațiul nedeterminist poate fi simulat de un DTM cu pătratul spațiului",
          "NSPACE(f(n)) = SPACE(f(n)) — spațiul nedeterminist și determinist sunt egale",
          "NTIME(f(n)) = DTIME(f(n))",
          "NSPACE(f(n)) ⊆ NTIME(f(n))",
        ],
        correctIndex: 0,
        explanation:
          "Teorema lui Savitch: NSPACE(f(n)) ⊆ SPACE(f(n)²). Orice problemă rezolvabilă de un NDTM cu spațiu f(n) poate fi rezolvată de un DTM cu spațiu f(n)². Pentru timp nu se cunoaște o relație similară.",
      },
      {
        question: "Cum se leagă clasele P, NP, PSPACE, EXPTIME?",
        options: [
          "P ⊆ NP ⊆ PSPACE ⊆ EXPTIME; cel puțin una dintre incluziuni e strictă (teorema ierarhiei)",
          "Toate clasele sunt egale",
          "NP ⊊ P ⊊ PSPACE",
          "PSPACE ⊆ P ⊆ NP",
        ],
        correctIndex: 0,
        explanation:
          "P ⊆ NP ⊆ PSPACE ⊆ EXPTIME. Din teorema ierarhiei: P ⊊ EXPTIME, deci cel puțin una dintre incluziunile intermediare e strictă. Nu se știe care dintre P ⊊ NP, NP ⊊ PSPACE, sau PSPACE ⊊ EXPTIME e strictă.",
      },
      {
        question: "De ce e conceptul de nedeterminism important pentru clasa NP?",
        options: [
          "Pentru că NP e definită prin existența unui algoritm nedeterminist polinomial (NDTM)",
          "Pentru că nedeterminismul e singurul mod de a rezolva probleme NP",
          "Pentru că toate problemele NP necesită nedeterminism",
          "Pentru că nedeterminismul e mai puternic decât orice algoritm determinist",
        ],
        correctIndex: 0,
        explanation:
          "Definiția originală a clasei NP (Non-deterministic Polynomial) e bazată pe NDTM. NP = probleme decise de un NDTM în timp polinomial. Definiția alternativă (verificare polinomială) e echivalentă, dar cea cu NDTM e fundamentală teoretic.",
      },
      {
        question: "Ce e relația dintre P și NP din perspectiva algoritmilor nedeterminiști?",
        options: [
          "P ⊆ NP (algoritmii determiniști sunt un caz particular de algoritmi nedeterminiști); P = NP rămâne deschis",
          "P ⊊ NP (demonstrat)",
          "NP ⊊ P (demonstrat)",
          "P și NP sunt disjuncte",
        ],
        correctIndex: 0,
        explanation:
          "Orice algoritm determinist e și nedeterminist (zero 'choose'-uri, o singură cale). Deci P ⊆ NP. Dacă P = NP, atunci orice problemă cu verificare polinomială ar avea și algoritm de găsire polinomial. Problema rămâne deschisă.",
      },
    ],
  },
];
