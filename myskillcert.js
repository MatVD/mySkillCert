"use strict";

      /* =============================================
   CONSTANTS
   ============================================= */
      const EXAM_DURATION = 2 * 60 * 60 + 15 * 60; // 8100 seconds
      const LS_KEY = "myskillcert_session";
      const EMAIL_TO = "mathieuvd64@gmail.com";
      const SALT = "msc2025q";

      // SHA-256 hashes of correct answers (pre-computed, not readable in plain text)
      const ANSWER_HASHES = [
        "c5c3138db429086561d542dc6cda0b9d16bff46dbc56fe79c1b0162dee8b5315", // Q1: b
        "75f6ec17d2b2db0eb23d1b1b0c0907f4e88574f30bb18a15e3fe1ad74dfc8e75", // Q2: a
        "dd6b8c817b91caf48343385ca9ee09904e5bea4d07dc88857cc59d7a3235894a", // Q3: b
        "251ce47588dd4abfdfb62d7b9c125c9e681002f21d989274fb23334712afcaa7", // Q4: b
        "1aa8a4e7b02d08f75587ca12d5901f1027f8104fc98e0e372504b194232b3aba", // Q5: c
        "9757c9bc27c130ccac00ec3ba15841a9397d29fcb7072645ca84136035b172ab", // Q6: b
        "997163f9bd88d06f2ea9c42fd072f6f503fe17070c438bf5ff9fd2b251adada9", // Q7: c
        "eb67cf25a6787cb9133377b27f18764c37ea517763a1f3c78c3c51660178cd18", // Q8: d
        "6f5e2ec0a3cf94026055f51f1431751069a6d5562cf48b01804a0cf84003a3e5", // Q9: b
        "a66bd74f06b9a77724b9198677aa5fbd05ec304778324173e4e56f34bf597ab2", // Q10: b
        "9d86761761a766c17df1e8299b3b9f8b804da9d587011f80e940301f6528db83", // Q11: b
        "17f587c19d64b39ccb34e852d242aad5e9db8d872df98f2d1e00f5972d1b6939", // Q12: c
        "da58406dcb2e1a3e167fd237462a3ff209757345a53b1b997d59a05bf5cabea2", // Q13: b
        "f158354d78567e81c6323e25555428799ba4144723edb57b8a07a3b5f389984e", // Q14: b
        "68c32b2fe25b0550e1b893252515ca7d18839cbc97d21145f261fdc3bf90dc8a", // Q15: b
        "5c3524ae0d84d83641d28337b4af8b6d49ff27b37f1dc11f3e6c04a1c51cf4a1", // Q16: b
      ];

      /* =============================================
   MCQ DATA
   ============================================= */
      const MCQ_QUESTIONS = [
        {
          q: "Quelle est la fonction principale du fichier robots.txt ?",
          opts: [
            { k: "a", txt: "Empêcher l'indexation des pages" },
            {
              k: "b",
              txt: "Indiquer aux robots quels chemins explorer ou non",
            },
            { k: "c", txt: "Améliorer la vitesse de chargement" },
            { k: "d", txt: "Générer automatiquement un sitemap" },
          ],
        },
        {
          q: "Quelle balise meta empêche l'indexation d'une page ?",
          opts: [
            {
              k: "a",
              txt: '<code>&lt;meta name="robots" content="noindex"&gt;</code>',
            },
            {
              k: "b",
              txt: '<code>&lt;meta name="robots" content="nofollow"&gt;</code>',
            },
            {
              k: "c",
              txt: '<code>&lt;meta name="description" content="noindex"&gt;</code>',
            },
            { k: "d", txt: "<code>Disallow: /</code> dans robots.txt" },
          ],
        },
        {
          q: "Combien de balises <code>&lt;h1&gt;</code> doit contenir une page optimisée SEO ?",
          opts: [
            { k: "a", txt: "Autant que nécessaire" },
            { k: "b", txt: "Exactement 1" },
            { k: "c", txt: "Exactement 2" },
            { k: "d", txt: "Aucune si on utilise <code>&lt;title&gt;</code>" },
          ],
        },
        {
          q: "Quel attribut de <code>&lt;script&gt;</code> permet un chargement en parallèle avec exécution après le parsing HTML ?",
          opts: [
            { k: "a", txt: "<code>async</code>" },
            { k: "b", txt: "<code>defer</code>" },
            { k: "c", txt: "<code>lazy</code>" },
            { k: "d", txt: "<code>preload</code>" },
          ],
        },
        {
          q: "Que mesure le LCP (Largest Contentful Paint) ?",
          opts: [
            { k: "a", txt: "Le temps de chargement total de la page" },
            { k: "b", txt: "La stabilité visuelle de la page" },
            {
              k: "c",
              txt: "Le temps d'affichage du plus gros élément visible",
            },
            { k: "d", txt: "Le temps de réponse aux interactions utilisateur" },
          ],
        },
        {
          q: "Quelle est la longueur recommandée pour une balise <code>&lt;title&gt;</code> ?",
          opts: [
            { k: "a", txt: "20–30 caractères" },
            { k: "b", txt: "50–60 caractères" },
            { k: "c", txt: "100–120 caractères" },
            { k: "d", txt: "Pas de limite" },
          ],
        },
        {
          q: "Quel type de redirection HTTP transfère le « jus SEO » ?",
          opts: [
            { k: "a", txt: "302" },
            { k: "b", txt: "307" },
            { k: "c", txt: "301" },
            { k: "d", txt: "404" },
          ],
        },
        {
          q: "Quel format d'image offre la meilleure compression en 2025 ?",
          opts: [
            { k: "a", txt: "PNG" },
            { k: "b", txt: "JPEG" },
            { k: "c", txt: "GIF" },
            { k: "d", txt: "AVIF" },
          ],
        },
        {
          q: 'À quoi sert la balise <code>&lt;link rel="canonical"&gt;</code> ?',
          opts: [
            { k: "a", txt: "Rediriger une page vers une autre" },
            {
              k: "b",
              txt: "Indiquer la version officielle d'une page en cas de contenu dupliqué",
            },
            { k: "c", txt: "Charger le CSS de manière différée" },
            { k: "d", txt: "Améliorer le LCP" },
          ],
        },
        {
          q: "Quel seuil de LCP est considéré comme « bon » par Google ?",
          opts: [
            { k: "a", txt: "≤ 1 seconde" },
            { k: "b", txt: "≤ 2,5 secondes" },
            { k: "c", txt: "≤ 4 secondes" },
            { k: "d", txt: "≤ 500 millisecondes" },
          ],
        },
        {
          q: "Que signifie « Mobile-First Indexing » ?",
          opts: [
            { k: "a", txt: "Le site doit être uniquement mobile" },
            {
              k: "b",
              txt: "Google utilise la version mobile du site pour l'indexation",
            },
            {
              k: "c",
              txt: "Les sites mobiles sont automatiquement mieux classés",
            },
            { k: "d", txt: "Il faut obligatoirement une application mobile" },
          ],
        },
        {
          q: "Quel attribut d'image permet de réduire le CLS (Cumulative Layout Shift) ?",
          opts: [
            { k: "a", txt: "<code>alt</code>" },
            { k: "b", txt: '<code>loading="lazy"</code>' },
            { k: "c", txt: "<code>width</code> et <code>height</code>" },
            { k: "d", txt: "<code>srcset</code>" },
          ],
        },
        {
          q: "Quel est le rôle de la balise <code>&lt;main&gt;</code> en SEO ?",
          opts: [
            { k: "a", txt: "Définir le menu de navigation" },
            { k: "b", txt: "Indiquer le contenu principal de la page" },
            { k: "c", txt: "Charger les scripts principaux" },
            { k: "d", txt: "Afficher le pied de page" },
          ],
        },
        {
          q: "Où faut-il placer le fichier sitemap.xml ?",
          opts: [
            { k: "a", txt: "Dans le dossier /assets/" },
            { k: "b", txt: "À la racine du site" },
            { k: "c", txt: "Dans le dossier /admin/" },
            { k: "d", txt: "N'importe où" },
          ],
        },
        {
          q: "Quelle valeur de <code>font-display</code> évite le FOIT (Flash of Invisible Text) ?",
          opts: [
            { k: "a", txt: "<code>block</code>" },
            { k: "b", txt: "<code>swap</code>" },
            { k: "c", txt: "<code>auto</code>" },
            { k: "d", txt: "<code>fallback</code>" },
          ],
        },
        {
          q: "Que doit contenir un bon attribut alt d'image ?",
          opts: [
            { k: "a", txt: "Le nom du fichier image" },
            { k: "b", txt: "Une description du contenu visuel de l'image" },
            { k: "c", txt: "Les mots-clés principaux du site" },
            { k: "d", txt: "Rien, l'alt est optionnel" },
          ],
        },
      ];

      /* =============================================
   CODE BLOCKS
   ============================================= */
      const P2_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bienvenue</title>
  <script src="jquery.js"><\/script>
  <script src="app.js"><\/script>
</head>
<body>
  <div id="header">
    <div class="nav">
      <a href="/page1">Cliquez ici</a>
      <a href="/page2">Lien</a>
    </div>
  </div>
  <div id="content">
    <h1>Nos produits</h1>
    <h1>Catégorie vélos</h1>
    <h3>Vélo de route</h3>
    <p>Super vélo de route pour tous.</p>
    <img src="IMG_4827.jpg">
    <h3>VTT</h3>
    <p>Excellent VTT pour la montagne.</p>
    <img src="photo2.png" alt="image">
  </div>
  <div id="footer">
    <p>Copyright 2025</p>
  </div>
</body>
</html>`;

      const P3_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Accueil</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="animations.css">
  <script src="lib/jquery-3.7.1.min.js"><\/script>
  <script src="lib/bootstrap.bundle.min.js"><\/script>
  <script src="js/carousel.js"><\/script>
  <script src="js/app.js"><\/script>
  <script src="js/tracking.js"><\/script>
</head>
<body>
  <div class="top-bar">
    <a href="/"><img src="logo.png"></a>
    <a href="/produits">Produits</a>
    <a href="/a-propos">A propos</a>
    <a href="/blog">Blog</a>
    <a href="/contact">Contact</a>
  </div>
  <h2>Bienvenue chez BoutiqueVelo.fr</h2>
  <img src="slide1.jpg" style="width:100%">
  <h1>Nos vélos</h1>
  <h1>Promotions du moment</h1>
  <div class="product">
    <h4>Vélo Route Carbon Pro</h4>
    <img src="DSCN3847.JPG">
    <p>Le meilleur vélo de route carbon. Prix: 2499€</p>
    <a href="/produits/12">Voir</a>
  </div>
  <div class="product">
    <h4>VTT Trail 500</h4>
    <img src="20240315_143022.jpg">
    <p>VTT polyvalent pour trails et randonnées. Prix: 1299€</p>
    <a href="/produits/15">Détails</a>
  </div>
  <div class="footer">
    <p>BoutiqueVelo.fr - 2025</p>
  </div>
</body>
</html>`;

      /* =============================================
   APP STATE
   ============================================= */
      let state = {
        firstName: "",
        lastName: "",
        startTime: null,
        currentPart: 1,
        mcqAnswers: {}, // { "1": "a", "2": "b", ... }
        p2Answers: {}, // { "1": { element: "", problem: "", fix: "" }, ... }
        p3Answer: "",
      };

      let timerInterval = null;
      let submissionEmailBody = "";

      /* =============================================
   CRYPTO UTILS
   ============================================= */
      async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      async function checkAnswer(qIndex, answer) {
        const key = SALT + (qIndex + 1) + answer;
        const hash = await sha256(key);
        return hash === ANSWER_HASHES[qIndex];
      }

      // Derive the correct answer letter for a question by testing all options against its hash
      async function deriveCorrectAnswer(qIndex) {
        for (const opt of ["a", "b", "c", "d"]) {
          if (await checkAnswer(qIndex, opt)) return opt;
        }
        return "?";
      }

      /* =============================================
   LOCAL STORAGE
   ============================================= */
      function saveState() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(state));
          showSaveIndicator();
        } catch (e) {}
      }

      function loadState() {
        try {
          const raw = localStorage.getItem(LS_KEY);
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      }

      function clearState() {
        localStorage.removeItem(LS_KEY);
      }

      function showSaveIndicator() {
        const el = document.getElementById("save-indicator");
        el.classList.add("visible");
        clearTimeout(el._timeout);
        el._timeout = setTimeout(() => el.classList.remove("visible"), 1800);
      }

      /* =============================================
   WELCOME SCREEN
   ============================================= */
      function initWelcome() {
        const saved = loadState();
        if (saved && saved.startTime && saved.firstName) {
          const startDate = new Date(saved.startTime);
          const hh = String(startDate.getHours()).padStart(2, "0");
          const mm = String(startDate.getMinutes()).padStart(2, "0");
          document.getElementById("resume-text").textContent =
            `Reprendre l'examen de ${saved.firstName} ${saved.lastName} commencé à ${hh}:${mm} ?`;
          document.getElementById("resume-banner").style.display = "block";
          document.getElementById("new-session-form").style.display = "none";
        }
      }

      function resumeSession() {
        const saved = loadState();
        if (!saved) return;
        state = { ...state, ...saved };
        launchExam();
      }

      function newSession() {
        clearState();
        document.getElementById("resume-banner").style.display = "none";
        document.getElementById("new-session-form").style.display = "block";
        document.getElementById("input-firstname").value = "";
        document.getElementById("input-lastname").value = "";
      }

      function startExam() {
        const fn = document.getElementById("input-firstname").value.trim();
        const ln = document.getElementById("input-lastname").value.trim();
        if (!fn || !ln) {
          alert("Veuillez renseigner votre prénom et nom de famille.");
          return;
        }
        state.firstName = fn;
        state.lastName = ln;
        state.startTime = Date.now();
        state.mcqAnswers = {};
        state.p2Answers = {};
        state.p3Answer = "";
        state.currentPart = 1;
        saveState();
        launchExam();
      }

      /* =============================================
   EXAM LAUNCH
   ============================================= */
      function launchExam() {
        showScreen("screen-exam");
        document.getElementById("topbar-name-display").textContent =
          state.firstName + " " + state.lastName;

        buildMCQ();
        buildP2();
        buildP3();
        restoreAnswers();
        renderSidebarNav();
        updateProgress();
        updateSubmitButton();
        startTimer();
        goToPart(state.currentPart || 1);
      }

      function showScreen(id) {
        document
          .querySelectorAll(".screen")
          .forEach((s) => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
      }

      /* =============================================
   BUILD MCQ
   ============================================= */
      function buildMCQ() {
        const container = document.getElementById("mcq-questions");
        container.innerHTML = "";
        MCQ_QUESTIONS.forEach((q, i) => {
          const card = document.createElement("div");
          card.className = "question-card";
          card.id = `qcard-${i + 1}`;
          card.innerHTML = `
      <div class="question-number">Question ${i + 1} / 16 <span style="color:var(--accent);font-size:10px;margin-left:8px;">· 0,5 pt</span></div>
      <div class="question-text">${q.q}</div>
      <div class="options">
        ${q.opts
          .map(
            (o) => `
          <label class="option-label">
            <input type="radio" name="q${i + 1}" value="${o.k}" onchange="onMCQChange(${i + 1}, '${o.k}')">
            <span>${o.txt}</span>
          </label>
        `,
          )
          .join("")}
      </div>
    `;
          container.appendChild(card);
        });
      }

      function onMCQChange(qNum, val) {
        state.mcqAnswers[String(qNum)] = val;
        const card = document.getElementById(`qcard-${qNum}`);
        if (card) card.classList.add("answered");
        saveState();
        updateProgress();
        updateSubmitButton();
        renderSidebarNav();
      }

      /* =============================================
   BUILD PART 2
   ============================================= */
      function buildP2() {
        // Code block
        document.getElementById("p2-code-block").textContent = P2_HTML;

        const container = document.getElementById("error-blocks");
        container.innerHTML = "";
        for (let i = 1; i <= 12; i++) {
          const card = document.createElement("div");
          card.className = "error-card";
          card.id = `errcard-${i}`;
          card.innerHTML = `
      <div class="error-title">
        <span class="error-badge">Erreur ${i}</span>
      </div>
      <div class="error-fields">
        <div class="error-field">
          <label>Élément / ligne concerné(e)</label>
          <textarea id="p2-${i}-element" placeholder="Ex : <img src=&quot;IMG_4827.jpg&quot;> — ligne 21" rows="2"
            oninput="onP2Change(${i})" onchange="onP2Change(${i})"></textarea>
        </div>
        <div class="error-field">
          <label>Problème SEO identifié</label>
          <textarea id="p2-${i}-problem" placeholder="Ex : Attribut alt manquant — les moteurs de recherche ne peuvent pas interpréter l'image" rows="2"
            oninput="onP2Change(${i})" onchange="onP2Change(${i})"></textarea>
        </div>
        <div class="error-field">
          <label>Correction proposée</label>
          <textarea id="p2-${i}-fix" placeholder="Ex : Ajouter alt=&quot;Vélo de route rouge en forêt&quot; à la balise img" rows="2"
            oninput="onP2Change(${i})" onchange="onP2Change(${i})"></textarea>
        </div>
      </div>
    `;
          container.appendChild(card);
        }
      }

      function onP2Change(num) {
        const el = document.getElementById(`p2-${num}-element`).value;
        const pr = document.getElementById(`p2-${num}-problem`).value;
        const fx = document.getElementById(`p2-${num}-fix`).value;
        if (!state.p2Answers) state.p2Answers = {};
        state.p2Answers[String(num)] = { element: el, problem: pr, fix: fx };
        const card = document.getElementById(`errcard-${num}`);
        if (card) {
          const filled = el.trim() || pr.trim() || fx.trim();
          card.classList.toggle("answered", !!filled);
        }
        saveState();
        updateProgress();
        updateSubmitButton();
        renderSidebarNav();
      }

      /* =============================================
   BUILD PART 3
   ============================================= */
      function buildP3() {
        document.getElementById("p3-code-block").textContent = P3_HTML;
        const ta = document.getElementById("textarea-p3");
        ta.addEventListener("input", onP3Change);
        ta.addEventListener("change", onP3Change);
      }

      function onP3Change() {
        state.p3Answer = document.getElementById("textarea-p3").value;
        saveState();
        updateProgress();
        updateSubmitButton();
        renderSidebarNav();
      }

      function copyP3() {
        const val = document.getElementById("textarea-p3").value;
        if (!val.trim()) {
          alert("Le champ est vide.");
          return;
        }
        navigator.clipboard
          .writeText(val)
          .then(() => {
            const btn = document.querySelector(".btn-copy");
            const orig = btn.textContent;
            btn.textContent = "✓ Copié !";
            setTimeout(() => (btn.textContent = orig), 1800);
          })
          .catch(() =>
            alert(
              "Impossible de copier automatiquement. Sélectionnez et copiez manuellement.",
            ),
          );
      }

      /* =============================================
   RESTORE ANSWERS
   ============================================= */
      function restoreAnswers() {
        // MCQ
        Object.entries(state.mcqAnswers || {}).forEach(([q, v]) => {
          const radio = document.querySelector(
            `input[name="q${q}"][value="${v}"]`,
          );
          if (radio) {
            radio.checked = true;
            const card = document.getElementById(`qcard-${q}`);
            if (card) card.classList.add("answered");
          }
        });

        // Part 2
        Object.entries(state.p2Answers || {}).forEach(([num, data]) => {
          const el = document.getElementById(`p2-${num}-element`);
          const pr = document.getElementById(`p2-${num}-problem`);
          const fx = document.getElementById(`p2-${num}-fix`);
          if (el) el.value = data.element || "";
          if (pr) pr.value = data.problem || "";
          if (fx) fx.value = data.fix || "";
          if (data.element || data.problem || data.fix) {
            const card = document.getElementById(`errcard-${num}`);
            if (card) card.classList.add("answered");
          }
        });

        // Part 3
        if (state.p3Answer) {
          document.getElementById("textarea-p3").value = state.p3Answer;
        }

        // Apply highlight.js
        requestAnimationFrame(() => {
          document
            .querySelectorAll("pre code")
            .forEach((el) => hljs.highlightElement(el));
        });
      }

      /* =============================================
   SIDEBAR NAV
   ============================================= */
      function renderSidebarNav() {
        const nav = document.getElementById("sidebar-nav");
        const parts = [
          {
            num: 1,
            name: "QCM SEO",
            pts: "8 pts",
            answered: countP1(),
            total: 16,
          },
          {
            num: 2,
            name: "Analyse HTML",
            pts: "6 pts",
            answered: countP2(),
            total: 12,
          },
          {
            num: 3,
            name: "Réécriture HTML",
            pts: "6 pts",
            answered: countP3(),
            total: 1,
          },
        ];

        nav.innerHTML = parts
          .map((p) => {
            const isActive = state.currentPart === p.num;
            const isDone = p.answered >= p.total;
            return `
      <div class="sidebar-nav-item ${isActive ? "active" : ""}" onclick="goToPart(${p.num})">
        <div class="part-number">${p.num}</div>
        <div class="part-info">
          <div class="part-name">${p.name}</div>
          <div class="part-progress-text">${p.answered}/${p.total} · ${p.pts}</div>
        </div>
        <div class="part-check ${isDone ? "visible" : ""}">✓</div>
      </div>
    `;
          })
          .join("");
      }

      function countP1() {
        return Object.keys(state.mcqAnswers || {}).length;
      }

      function countP2() {
        let count = 0;
        for (let i = 1; i <= 12; i++) {
          const d = (state.p2Answers || {})[String(i)];
          if (d && (d.element || d.problem || d.fix)) count++;
        }
        return count;
      }

      function countP3() {
        return (state.p3Answer || "").trim() ? 1 : 0;
      }

      /* =============================================
   PROGRESS BAR
   ============================================= */
      function updateProgress() {
        const total = 16 + 12 + 1; // 29 total items
        const done = countP1() + countP2() + countP3();
        const pct = Math.round((done / total) * 100);
        document.getElementById("progress-bar").style.width = pct + "%";
      }

      /* =============================================
   SUBMIT BUTTON
   ============================================= */
      function updateSubmitButton() {
        const p1ok = countP1() >= 1;
        const p2ok = countP2() >= 1;
        const p3ok = countP3() >= 1;
        const btn = document.getElementById("btn-submit");
        if (btn) btn.disabled = !(p1ok && p2ok && p3ok);
      }

      /* =============================================
   NAVIGATION
   ============================================= */
      function goToPart(num) {
        state.currentPart = num;
        saveState();
        document
          .querySelectorAll(".part-section")
          .forEach((s) => s.classList.remove("active"));
        document.getElementById(`part-${num}`).classList.add("active");
        document.getElementById("topbar-part-display").textContent =
          `Partie ${num} / 3`;
        renderSidebarNav();
        closeSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function toggleSidebar() {
        const sb = document.getElementById("sidebar");
        const ov = document.getElementById("sidebar-overlay");
        sb.classList.toggle("open");
        ov.classList.toggle("open");
      }

      function closeSidebar() {
        document.getElementById("sidebar").classList.remove("open");
        document.getElementById("sidebar-overlay").classList.remove("open");
      }

      /* =============================================
   TIMER
   ============================================= */
      function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
      }

      function updateTimer() {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        const remaining = Math.max(0, EXAM_DURATION - elapsed);

        const h = Math.floor(remaining / 3600);
        const m = Math.floor((remaining % 3600) / 60);
        const s = remaining % 60;
        const display = `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

        const el = document.getElementById("timer-display");
        if (el) {
          el.textContent = display;
          if (remaining <= 900 && remaining > 0) {
            el.classList.add("warning");
          } else {
            el.classList.remove("warning");
          }
        }

        // Alert at 15 minutes
        if (remaining === 900) {
          alert("⚠️ Il vous reste 15 minutes !");
        }

        // Auto-submit at 0
        if (remaining <= 0) {
          clearInterval(timerInterval);
          alert(
            "⏰ Le temps est écoulé ! Votre devoir va être soumis automatiquement.",
          );
          submitExam();
        }
      }

      /* =============================================
   SUBMISSION
   ============================================= */
      async function submitExam() {
        const now = new Date();
        const startDate = new Date(state.startTime);
        const elapsed = Math.floor((now - startDate) / 1000);
        const elapsedH = Math.floor(elapsed / 3600);
        const elapsedM = Math.floor((elapsed % 3600) / 60);

        const fmt = (d) => {
          const dd = String(d.getDate()).padStart(2, "0");
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const yyyy = d.getFullYear();
          const hh = String(d.getHours()).padStart(2, "0");
          const min = String(d.getMinutes()).padStart(2, "0");
          return { date: `${dd}/${mm}/${yyyy}`, time: `${hh}:${min}` };
        };

        const startFmt = fmt(startDate);
        const nowFmt = fmt(now);

        // Score calculation + derive correct answers dynamically from hashes (never stored in plain text)
        let correctCount = 0;
        const mcqResults = [];
        const CORRECT_LABELS = [];
        for (let i = 0; i < MCQ_QUESTIONS.length; i++) {
          const ans = (state.mcqAnswers || {})[String(i + 1)];
          const isCorrect = ans ? await checkAnswer(i, ans) : false;
          if (isCorrect) correctCount++;
          mcqResults.push({ q: i + 1, ans: ans || "—", correct: isCorrect });
          CORRECT_LABELS.push(isCorrect ? ans : await deriveCorrectAnswer(i));
        }
        const mcqScore = (correctCount * 0.5).toFixed(1);

        // Build email body
        let body = `========================================
MYSKILLCERT — ÉVALUATION SEO TECHNIQUE
========================================

Élève         : ${state.firstName} ${state.lastName}
Date          : ${startFmt.date}
Heure début   : ${startFmt.time}
Heure remise  : ${nowFmt.time}
Durée utilisée: ${elapsedH}h ${String(elapsedM).padStart(2, "0")}min

========================================
PARTIE 1 — QCM (score automatique)
========================================
Score : ${mcqScore} / 8 pts (${correctCount} bonnes réponses sur 16)

`;

        mcqResults.forEach((r) => {
          const status = r.correct
            ? "✓ Correct"
            : `✗ Incorrect (bonne réponse : ${CORRECT_LABELS[r.q - 1].toUpperCase()})`;
          body += `Q${String(r.q).padStart(2, "0")} : ${r.ans.toUpperCase()} — ${status}\n`;
        });

        body += `
========================================
PARTIE 2 — ANALYSE DE CODE HTML
========================================
(En attente de correction manuelle — 6 pts)

`;

        for (let i = 1; i <= 12; i++) {
          const d = (state.p2Answers || {})[String(i)] || {};
          body += `Erreur ${i}\n`;
          body += `  Élément    : ${d.element || "(non renseigné)"}\n`;
          body += `  Problème   : ${d.problem || "(non renseigné)"}\n`;
          body += `  Correction : ${d.fix || "(non renseigné)"}\n\n`;
        }

        body += `========================================
PARTIE 3 — CORRECTION TECHNIQUE
========================================
(En attente de correction manuelle — 6 pts)

${state.p3Answer || "(non renseigné)"}

========================================
Score MCQ automatique : ${mcqScore} / 8 pts
Parties 2 & 3 : à corriger manuellement
Score total provisoire : ${mcqScore} / 20 pts
========================================`;

        submissionEmailBody = body;

        // Build mailto
        const subject = encodeURIComponent(
          `[MySkillCert] Devoir SEO — ${state.firstName} ${state.lastName} — ${startFmt.date}`,
        );
        const bodyEncoded = encodeURIComponent(body);
        const mailtoURL = `mailto:${EMAIL_TO}?subject=${subject}&body=${bodyEncoded}`;

        // Download JSON backup
        downloadJSON(
          mcqResults,
          mcqScore,
          now,
          startFmt,
          nowFmt,
          elapsedH,
          elapsedM,
        );

        // Open mailto
        setTimeout(() => {
          window.location.href = mailtoURL;
        }, 200);

        // Show modal
        document.getElementById("submit-modal").classList.remove("hidden");

        // Store results for results screen
        window._examResults = {
          mcqResults,
          mcqScore,
          correctCount,
          now,
          nowFmt,
          CORRECT_LABELS,
        };
      }

      function downloadJSON(
        mcqResults,
        mcqScore,
        now,
        startFmt,
        nowFmt,
        elapsedH,
        elapsedM,
      ) {
        const data = {
          meta: {
            student: { firstName: state.firstName, lastName: state.lastName },
            examDate: startFmt.date,
            startTime: startFmt.time,
            submitTime: nowFmt.time,
            durationMin: elapsedH * 60 + elapsedM,
          },
          part1: {
            score: parseFloat(mcqScore),
            maxScore: 8,
            answers: state.mcqAnswers,
            results: mcqResults,
          },
          part2: {
            score: "pending",
            maxScore: 6,
            answers: state.p2Answers,
          },
          part3: {
            score: "pending",
            maxScore: 6,
            answer: state.p3Answer,
          },
          totalAutoScore: parseFloat(mcqScore),
          timestamp: now.toISOString(),
        };

        const name = `${state.lastName.toUpperCase()}_${state.firstName}_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }

      function copyFullSubmission() {
        if (!submissionEmailBody) {
          alert("Erreur : devoir non disponible.");
          return;
        }
        navigator.clipboard
          .writeText(submissionEmailBody)
          .then(() => {
            const btn = document.querySelector(
              ".modal-box .modal-btn-secondary",
            );
            const orig = btn.textContent;
            btn.textContent = "✓ Copié dans le presse-papiers !";
            setTimeout(() => (btn.textContent = orig), 2000);
          })
          .catch(() => {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = submissionEmailBody;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            alert("Copié dans le presse-papiers !");
          });
      }

      function confirmSent() {
        document.getElementById("submit-modal").classList.add("hidden");
        clearInterval(timerInterval);
        clearState();
        showResultsScreen();
      }

      /* =============================================
   RESULTS SCREEN
   ============================================= */
      function showResultsScreen() {
        const r = window._examResults;
        if (!r) {
          showScreen("screen-results");
          return;
        }

        const {
          mcqResults,
          mcqScore,
          correctCount,
          now,
          nowFmt,
          CORRECT_LABELS,
        } = r;

        document.getElementById("results-score-num").textContent = mcqScore;
        document.getElementById("results-meta").textContent =
          `Soumis par ${state.firstName} ${state.lastName} le ${nowFmt.date || ""} à ${nowFmt.time}`;

        const Q_LABELS = [
          "Fonction robots.txt",
          "Balise meta noindex",
          "Nombre de h1",
          "Attribut script (defer)",
          "Définition LCP",
          "Longueur balise title",
          "Redirection SEO-friendly",
          "Format image 2025",
          "Balise canonical",
          "Seuil LCP Google",
          "Mobile-First Indexing",
          "Réduction CLS image",
          "Rôle balise main",
          "Emplacement sitemap.xml",
          "font-display swap",
          "Attribut alt d'image",
        ];

        const tbody = document.getElementById("mcq-results-body");
        tbody.innerHTML = mcqResults
          .map(
            (r) => `
    <tr>
      <td><strong>Q${r.q}</strong> <span style="color:var(--text-muted);font-size:12px;">— ${Q_LABELS[r.q - 1]}</span></td>
      <td><span style="font-family:var(--font-mono);font-weight:600;">${r.ans.toUpperCase()}</span></td>
      <td>${
        r.correct
          ? '<span class="badge-correct">✓ Correct</span>'
          : '<span class="badge-wrong">✗ Incorrect</span>'
      }</td>
      <td>${!r.correct ? `<span class="badge-pending">${CORRECT_LABELS[r.q - 1].toUpperCase()}</span>` : '<span style="color:var(--text-muted);">—</span>'}</td>
    </tr>
  `,
          )
          .join("");

        showScreen("screen-results");
      }

      /* =============================================
   INIT
   ============================================= */
      document.addEventListener("DOMContentLoaded", () => {
        initWelcome();
        // Keyboard shortcut: Escape closes sidebar
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeSidebar();
        });
      });
