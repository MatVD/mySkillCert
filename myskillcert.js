"use strict";

/* =============================================
   CONSTANTS
   ============================================= */
const EXAM_DURATION = 2 * 60 * 60 + 30 * 60; // 9000 seconds — 5 parties
const LS_KEY = "myskillcert_session";
const FORM_SUBMIT_TOKEN = "f0a853afc038e811d2800040ab39e637";
const SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_TOKEN}`;
const SALT = "msc2025q";
const SEM_SALT = "mschtml25";

// SHA-256 hashes — Partie 1 QCM SEO (20 questions)
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
  "661ab690821c72362de3ddad0d88a3377042430657aa1f619de73f5f7deaf13e", // Q17: a
  "edc23b375ef74bb065f1cc43a4d6612b396ab1a1fff479079cddde6076d0b516", // Q18: b
  "dd37859af2cfea6318b1565f7d0f53b73929a04eba83b7452a83314a71b90155", // Q19: c
  "51e62e05c9d8f92ba3831a82731f665ff44d0474aa7aba0e816d2cb7bfa9d0b4", // Q20: c
];

// SHA-256 hashes — Partie 4 QCM Sémantique HTML (12 questions)
const SEM_ANSWER_HASHES = [
  "f404f26c418c2c55ecb6fcdd8886c3dcd28822c06ee834e32c14ae756f91a8a2", // Q1: c
  "f21afec918ee250523934060bbcd644ff9899789ecd828663a2c42ac18489549", // Q2: b
  "4f9bdade75eaa2f984ae264d55a50aab9ca3e5fd1d98af3fdbf2f18cc7455ff5", // Q3: c
  "87f8c799c280bc4535151df9739b13eb2fadc94dd802985db6b037868ada5f62", // Q4: c
  "5148fe769f079aaf487ce7d9f2db5cf69bc8b6c73cf10c0fc4f8b1c65a3d9266", // Q5: b
  "b2a80089d0f7d209df95ce7b54cfedbebe2d9a107e74985e7f47565329a68095", // Q6: d
  "58baf6ccfbc81b5395d0a450261ed1d118b81f9aa0c91e9a0894ed87d982871f", // Q7: c
  "17bdb461603ea8b09944c838c506e93427dadf99bb9e88751c185373e50aaa52", // Q8: b
  "36d492068e1a6dd38e6311032e52a4ad5fcda4ebf6ebd8d5a33074993901da09", // Q9: b
  "98de68c0926c48594f63c3b2391d1ac11fe228e73ef8599cdee7ab6b89baf801", // Q10: c
  "199f7eb2e522d1b1ad335af54aebbdc08596465d7cb40db0156859a6d2d76709", // Q11: c
  "ad558db6fcd091546a29f79c12b010ae5206b823657ebe48560158e30c2fb5db", // Q12: d
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
  // Q17-Q20 — Questions supplémentaires
  {
    q: "Que mesure le CLS (Cumulative Layout Shift) dans les Core Web Vitals ?",
    opts: [
      {
        k: "a",
        txt: "Les décalages visuels inattendus des éléments pendant le chargement",
      },
      { k: "b", txt: "Le temps de premier octet (TTFB)" },
      { k: "c", txt: "Le nombre total d'éléments décalés" },
      { k: "d", txt: "La vitesse de chargement des scripts" },
    ],
  },
  {
    q: "Quel attribut de lien empêche le transfert de « jus SEO » vers un site externe ?",
    opts: [
      { k: "a", txt: '<code>rel="noindex"</code>' },
      { k: "b", txt: '<code>rel="nofollow"</code>' },
      { k: "c", txt: '<code>rel="external"</code>' },
      { k: "d", txt: '<code>rel="noreferrer"</code>' },
    ],
  },
  {
    q: "Quel protocole de métadonnées permet de contrôler l'aperçu d'une URL partagée sur les réseaux sociaux ?",
    opts: [
      { k: "a", txt: "Dublin Core" },
      { k: "b", txt: "Schema.org" },
      { k: "c", txt: "Open Graph (<code>og:</code>)" },
      { k: "d", txt: "Twitter Cards" },
    ],
  },
  {
    q: "Quelle métrique Core Web Vitals remplace le FID (First Input Delay) depuis 2024 ?",
    opts: [
      { k: "a", txt: "TTI (Time To Interactive)" },
      { k: "b", txt: "TBT (Total Blocking Time)" },
      { k: "c", txt: "INP (Interaction to Next Paint)" },
      { k: "d", txt: "TTFB (Time To First Byte)" },
    ],
  },
];

/* =============================================
   PARTIE 4 — QCM SÉMAN TIQUE HTML
   ============================================= */
const SEM_QUESTIONS = [
  {
    q: "Quelle balise HTML représente sémantiquement le contenu principal <em>unique</em> d'une page ?",
    opts: [
      { k: "a", txt: '<code>&lt;div id="main"&gt;</code>' },
      { k: "b", txt: '<code>&lt;section class="main"&gt;</code>' },
      { k: "c", txt: "<code>&lt;main&gt;</code>" },
      { k: "d", txt: "<code>&lt;content&gt;</code>" },
    ],
  },
  {
    q: "Quelle est la différence sémantique entre <code>&lt;article&gt;</code> et <code>&lt;section&gt;</code> ?",
    opts: [
      {
        k: "a",
        txt: "<code>&lt;article&gt;</code> est uniquement pour les articles de blog",
      },
      {
        k: "b",
        txt: "<code>&lt;article&gt;</code> est un contenu autonome redistribuable ; <code>&lt;section&gt;</code> est un regroupement thématique",
      },
      {
        k: "c",
        txt: "<code>&lt;section&gt;</code> est obsolète depuis HTML5.2",
      },
      { k: "d", txt: "Aucune différence, ils sont interchangeables" },
    ],
  },
  {
    q: "Quelle balise HTML est dédiée à la navigation principale d'un site ?",
    opts: [
      { k: "a", txt: '<code>&lt;div class="navbar"&gt;</code>' },
      { k: "b", txt: '<code>&lt;ul class="nav"&gt;</code>' },
      { k: "c", txt: "<code>&lt;nav&gt;</code>" },
      { k: "d", txt: "<code>&lt;menu&gt;</code>" },
    ],
  },
  {
    q: "Quel élément HTML5 est sémantiquement correct pour encapsuler une image avec sa légende ?",
    opts: [
      {
        k: "a",
        txt: '<code>&lt;img&gt;</code> + <code>&lt;p class="caption"&gt;</code>',
      },
      {
        k: "b",
        txt: "<code>&lt;picture&gt;</code> + <code>&lt;caption&gt;</code>",
      },
      {
        k: "c",
        txt: "<code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code>",
      },
      { k: "d", txt: "<code>&lt;img&gt;</code> + <code>&lt;label&gt;</code>" },
    ],
  },
  {
    q: "Comment déclarer correctement la langue principale d'un document HTML ?",
    opts: [
      {
        k: "a",
        txt: '<code>&lt;meta http-equiv="Content-Language" content="fr"&gt;</code>',
      },
      { k: "b", txt: '<code>&lt;html lang="fr"&gt;</code>' },
      { k: "c", txt: '<code>&lt;meta name="language" content="fr"&gt;</code>' },
      { k: "d", txt: '<code>&lt;body lang="fr"&gt;</code>' },
    ],
  },
  {
    q: "Quelle balise met en valeur un texte avec une <em>importance forte</em> (sémantique, pas seulement visuelle) ?",
    opts: [
      { k: "a", txt: "<code>&lt;b&gt;</code>" },
      { k: "b", txt: "<code>&lt;i&gt;</code>" },
      { k: "c", txt: "<code>&lt;em&gt;</code>" },
      { k: "d", txt: "<code>&lt;strong&gt;</code>" },
    ],
  },
  {
    q: "Quelle combinaison de balises est sémantiquement correcte pour une liste de termes et leurs définitions ?",
    opts: [
      { k: "a", txt: "<code>&lt;ul&gt;</code> + <code>&lt;li&gt;</code>" },
      { k: "b", txt: "<code>&lt;ol&gt;</code> + <code>&lt;li&gt;</code>" },
      {
        k: "c",
        txt: "<code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>",
      },
      { k: "d", txt: "<code>&lt;table&gt;</code> + <code>&lt;tr&gt;</code>" },
    ],
  },
  {
    q: "Quel attribut ARIA permet de donner un nom accessible à un élément sans texte visible ?",
    opts: [
      { k: "a", txt: "<code>role</code>" },
      { k: "b", txt: "<code>aria-label</code>" },
      { k: "c", txt: "<code>aria-hidden</code>" },
      { k: "d", txt: "<code>aria-live</code>" },
    ],
  },
  {
    q: "Quelle balise HTML5 représente sémantiquement le pied de page d'un document ou d'une section ?",
    opts: [
      { k: "a", txt: '<code>&lt;div id="footer"&gt;</code>' },
      { k: "b", txt: "<code>&lt;footer&gt;</code>" },
      { k: "c", txt: "<code>&lt;bottom&gt;</code>" },
      { k: "d", txt: '<code>&lt;section class="footer"&gt;</code>' },
    ],
  },
  {
    q: "Quelle balise permet d'intégrer des données structurées JSON-LD (Schema.org) dans une page ?",
    opts: [
      { k: "a", txt: '<code>&lt;meta type="application/ld+json"&gt;</code>' },
      { k: "b", txt: '<code>&lt;link rel="schema"&gt;</code>' },
      { k: "c", txt: '<code>&lt;script type="application/ld+json"&gt;</code>' },
      { k: "d", txt: '<code>&lt;data schema="json-ld"&gt;</code>' },
    ],
  },
  {
    q: "Quelle est la sémantique correcte pour un bouton déclenchant une action JavaScript (sans navigation) ?",
    opts: [
      { k: "a", txt: '<code>&lt;a href="javascript:void(0)"&gt;</code>' },
      {
        k: "b",
        txt: '<code>&lt;div onclick="action()" class="btn"&gt;</code>',
      },
      { k: "c", txt: '<code>&lt;button type="button"&gt;</code>' },
      {
        k: "d",
        txt: '<code>&lt;span class="btn" onclick="action()"&gt;</code>',
      },
    ],
  },
  {
    q: "Dans quelle balise HTML doit-on placer le titre visible dans l'onglet du navigateur ?",
    opts: [
      { k: "a", txt: "<code>&lt;h1&gt;</code>" },
      { k: "b", txt: "<code>&lt;header&gt;</code>" },
      { k: "c", txt: '<code>&lt;meta name="title"&gt;</code>' },
      { k: "d", txt: "<code>&lt;title&gt;</code>" },
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

const P5_CONTENT = `# robot.txt
User-agent:
Disallow: admin/
Disallow: /
Sitemap: http://www.example.com/sitemap.wml

--- sitemap.wml ---
<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url>
    <loc>http://www.example.com</loc>
    <lastmod>12-03-2026</lastmod>
    <changefreq>always</changefreq>
    <priority>1.7</priority>
  </url>
  <url>
    <loc>https://www.example.com/blog/seo-technique/</loc>
    <lastmod>2026-03-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

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
  semAnswers: {}, // Partie 4 sémantique { "1": "c", ... }
  p5Answers: {}, // Added to store answers for Part 5
};

let timerInterval = null;
let isSubmitting = false;

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

async function deriveCorrectAnswer(qIndex) {
  for (const opt of ["a", "b", "c", "d"]) {
    if (await checkAnswer(qIndex, opt)) return opt;
  }
  return "?";
}

async function checkSemAnswer(qIndex, answer) {
  const key = SEM_SALT + (qIndex + 1) + answer;
  const hash = await sha256(key);
  return hash === SEM_ANSWER_HASHES[qIndex];
}

async function deriveSemCorrectAnswer(qIndex) {
  for (const opt of ["a", "b", "c", "d"]) {
    if (await checkSemAnswer(qIndex, opt)) return opt;
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
  state.semAnswers = {};
  state.p5Answers = {};
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
  buildP4();
  buildP5();
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
      <div class="question-number">Question ${i + 1} / ${MCQ_QUESTIONS.length} <span style="color:var(--accent);font-size:10px;margin-left:8px;">· 0,25 pt</span></div>
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

/* =============================================
   BUILD PART 4 — SÉMANTIQUE HTML
   ============================================= */
function buildP4() {
  const container = document.getElementById("sem-questions");
  if (!container) return;
  container.innerHTML = "";
  SEM_QUESTIONS.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `semcard-${i + 1}`;
    card.innerHTML = `
      <div class="question-number">Question ${i + 1} / ${SEM_QUESTIONS.length} <span style="color:var(--accent-sem);font-size:10px;margin-left:8px;">· 0,25 pt</span></div>
      <div class="question-text">${q.q}</div>
      <div class="options">
        ${q.opts
          .map(
            (o) => `
          <label class="option-label">
            <input type="radio" name="sem${i + 1}" value="${o.k}" onchange="onSemChange(${i + 1}, '${o.k}')">
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

function onSemChange(qNum, val) {
  state.semAnswers[String(qNum)] = val;
  const card = document.getElementById(`semcard-${qNum}`);
  if (card) card.classList.add("answered");
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
    const radio = document.querySelector(`input[name="q${q}"][value="${v}"]`);
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

  // Part 4 — Sémantique
  Object.entries(state.semAnswers || {}).forEach(([q, v]) => {
    const radio = document.querySelector(`input[name="sem${q}"][value="${v}"]`);
    if (radio) {
      radio.checked = true;
      const card = document.getElementById(`semcard-${q}`);
      if (card) card.classList.add("answered");
    }
  });

  // Part 5 — sitemap/robots
  Object.entries(state.p5Answers || {}).forEach(([num, data]) => {
    const el = document.getElementById(`p5-${num}-element`);
    const pr = document.getElementById(`p5-${num}-problem`);
    const fx = document.getElementById(`p5-${num}-fix`);
    if (el) el.value = data.element || "";
    if (pr) pr.value = data.problem || "";
    if (fx) fx.value = data.fix || "";
    if (data.element || data.problem || data.fix) {
      const card = document.getElementById(`p5-errcard-${num}`);
      if (card) card.classList.add("answered");
    }
  });

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
      pts: "5 pts",
      answered: countP1(),
      total: MCQ_QUESTIONS.length,
    },
    {
      num: 2,
      name: "Analyse HTML",
      pts: "4 pts",
      answered: countP2(),
      total: 12,
    },
    {
      num: 3,
      name: "Réécriture HTML",
      pts: "4 pts",
      answered: countP3(),
      total: 1,
    },
    {
      num: 4,
      name: "Sémantique HTML",
      pts: "3 pts",
      answered: countP4(),
      total: SEM_QUESTIONS.length,
    },
    {
      num: 5,
      name: "Fichiers SEO",
      pts: "4 pts",
      answered: countP5(),
      total: 12,
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

function countP4() {
  return Object.keys(state.semAnswers || {}).length;
}

function countP5() {
  let count = 0;
  for (let i = 1; i <= 12; i++) {
    const d = (state.p5Answers || {})[String(i)];
    if (d && (d.element || d.problem || d.fix)) count++;
  }
  return count;
}

/* =============================================
   PROGRESS BAR
   ============================================= */
function updateProgress() {
  const total = MCQ_QUESTIONS.length + 12 + 1 + SEM_QUESTIONS.length + 12; // +12 for P5
  const done = countP1() + countP2() + countP3() + countP4();
  const pct = Math.round(((done + countP5()) / total) * 100);
  document.getElementById("progress-bar").style.width = pct + "%";
}

/* =============================================
   SUBMIT BUTTON
   ============================================= */
function updateSubmitButton() {
  const p1ok = countP1() >= 1;
  const p2ok = countP2() >= 1;
  const p3ok = countP3() >= 1;
  const p4ok = countP4() >= 1;
  const p5ok = countP5() >= 1;
  const btn = document.getElementById("btn-submit");
  if (btn)
    btn.disabled = !(p1ok && p2ok && p3ok && p4ok && p5ok) || isSubmitting;
}

function setSubmittingState(nextState) {
  isSubmitting = nextState;
  const btn = document.getElementById("btn-submit");
  if (!btn) return;
  btn.classList.toggle("is-loading", nextState);
  btn.textContent = nextState ? "Envoi en cours..." : "✓ Soumettre mon devoir";
  updateSubmitButton();
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
    `Partie ${num} / 5`;
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
  if (isSubmitting) return;

  setSubmittingState(true);

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

  // Score P1 (SEO)
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
  const mcqScore = (correctCount * 0.25).toFixed(2);

  // Score P4 (Sémantique HTML)
  let semCorrectCount = 0;
  const semResults = [];
  const SEM_CORRECT_LABELS = [];
  for (let i = 0; i < SEM_QUESTIONS.length; i++) {
    const ans = (state.semAnswers || {})[String(i + 1)];
    const isCorrect = ans ? await checkSemAnswer(i, ans) : false;
    if (isCorrect) semCorrectCount++;
    semResults.push({ q: i + 1, ans: ans || "—", correct: isCorrect });
    SEM_CORRECT_LABELS.push(isCorrect ? ans : await deriveSemCorrectAnswer(i));
  }
  const semScore = (semCorrectCount * 0.25).toFixed(2);

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
PARTIE 1 — QCM SEO (score automatique)
========================================
Score : ${mcqScore} / 5 pts (${correctCount} bonnes réponses sur ${MCQ_QUESTIONS.length})

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
(En attente de correction manuelle — 4 pts)

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
(En attente de correction manuelle — 4 pts)

${state.p3Answer || "(non renseigné)"}

========================================
PARTIE 5 — SITEMAP.WML & ROBOT.TXT
========================================
(En attente de correction manuelle — 4 pts)

`;

  for (let i = 1; i <= 12; i++) {
    const d = (state.p5Answers || {})[String(i)] || {};
    body += `Erreur ${i}\n`;
    body += `  Élément    : ${d.element || "(non renseigné)"}\n`;
    body += `  Problème   : ${d.problem || "(non renseigné)"}\n`;
    body += `  Correction : ${d.fix || "(non renseigné)"}\n\n`;
  }

  body += `========================================
PARTIE 4 — QCM SÉMANTIQUE HTML (score automatique)
========================================
Score : ${semScore} / 3 pts (${semCorrectCount} bonnes réponses sur ${SEM_QUESTIONS.length})

`;

  semResults.forEach((r) => {
    const status = r.correct
      ? "✓ Correct"
      : `✗ Incorrect (bonne réponse : ${SEM_CORRECT_LABELS[r.q - 1].toUpperCase()})`;
    body += `Q${String(r.q).padStart(2, "0")} : ${r.ans.toUpperCase()} — ${status}\n`;
  });

  body += `
========================================
Score automatique P1 : ${mcqScore} / 5 pts
Score automatique P4 : ${semScore} / 3 pts
Parties 2, 3 & 5 : à corriger manuellement (12 pts)
Score MCQ total automatique : ${(parseFloat(mcqScore) + parseFloat(semScore)).toFixed(2)} / 8 pts
Score total provisoire : ${(parseFloat(mcqScore) + parseFloat(semScore)).toFixed(2)} / 20 pts
========================================`;

  const submissionData = {
    meta: {
      student: { firstName: state.firstName, lastName: state.lastName },
      examDate: startFmt.date,
      startTime: startFmt.time,
      submitTime: nowFmt.time,
      durationMin: elapsedH * 60 + elapsedM,
    },
    part1: {
      score: parseFloat(mcqScore),
      maxScore: 5,
      answers: state.mcqAnswers,
      results: mcqResults,
    },
    part2: {
      score: "pending",
      maxScore: 4,
      answers: state.p2Answers,
    },
    part3: {
      score: "pending",
      maxScore: 4,
      answer: state.p3Answer,
    },
    part4: {
      score: parseFloat(semScore),
      maxScore: 3,
      answers: state.semAnswers,
      results: semResults,
    },
    part5: {
      score: "pending",
      maxScore: 4,
      answers: state.p5Answers,
    },
    totalAutoScore: parseFloat(mcqScore) + parseFloat(semScore),
    timestamp: now.toISOString(),
  };

  // Store results for results screen
  window._examResults = {
    mcqResults,
    mcqScore,
    correctCount,
    semResults,
    semScore,
    semCorrectCount,
    now,
    nowFmt,
    CORRECT_LABELS,
    SEM_CORRECT_LABELS,
  };

  try {
    await sendSubmissionEmail({
      name: `${state.firstName} ${state.lastName}`,
      first_name: state.firstName,
      last_name: state.lastName,
      exam: "MySkillCert - SEO Technique pour Developpeurs",
      exam_date: startFmt.date,
      start_time: startFmt.time,
      submit_time: nowFmt.time,
      duration_minutes: String(elapsedH * 60 + elapsedM),
      mcq_score: `${(parseFloat(mcqScore) + parseFloat(semScore)).toFixed(2)} / 8`,
      total_auto_score: `${(parseFloat(mcqScore) + parseFloat(semScore)).toFixed(2)} / 20`,
      message: body,
      raw_json: JSON.stringify(submissionData, null, 2),
      _subject: `[MySkillCert] Devoir SEO - ${state.firstName} ${state.lastName} - ${startFmt.date}`,
      _template: "table",
      _captcha: "false",
    });

    clearInterval(timerInterval);
    clearState();
    showResultsScreen();
  } catch (error) {
    console.error("Erreur lors de l'envoi du devoir", error);
    alert(
      "L'envoi du devoir a échoue. Verifiez la connexion ou confirmez l'adresse de reception sur FormSubmit, puis recommencez.",
    );
  } finally {
    setSubmittingState(false);
  }
}

function buildP5() {
  // Code block
  document.getElementById("p5-code-block").textContent = P5_CONTENT;

  const container = document.getElementById("error-blocks-p5");
  container.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const card = document.createElement("div");
    card.className = "error-card";
    card.id = `p5-errcard-${i}`;
    card.innerHTML = `
      <div class="error-title">
        <span class="error-badge">Erreur ${i}</span>
      </div>
      <div class="error-fields">
        <div class="error-field">
          <label>Élément / ligne concerné(e)</label>
          <textarea id="p5-${i}-element" placeholder="Ex : # robot.txt, User-agent: ou <changefreq>always</changefreq>" rows="2"
            oninput="onP5Change(${i})" onchange="onP5Change(${i})"></textarea>
        </div>
        <div class="error-field">
          <label>Problème identifié</label>
          <textarea id="p5-${i}-problem" placeholder="Ex : nom de fichier incorrect, directive invalide, protocole HTTP ou balise sitemap non conforme" rows="2"
            oninput="onP5Change(${i})" onchange="onP5Change(${i})"></textarea>
        </div>
        <div class="error-field">
          <label>Correction proposée</label>
          <textarea id="p5-${i}-fix" placeholder="Ex : renommer en robots.txt / sitemap.xml, compléter la directive et corriger les valeurs XML" rows="2"
            oninput="onP5Change(${i})" onchange="onP5Change(${i})"></textarea>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
}

function onP5Change(num) {
  const el = document.getElementById(`p5-${num}-element`).value;
  const pr = document.getElementById(`p5-${num}-problem`).value;
  const fx = document.getElementById(`p5-${num}-fix`).value;
  if (!state.p5Answers) state.p5Answers = {};
  state.p5Answers[String(num)] = { element: el, problem: pr, fix: fx };
  const card = document.getElementById(`p5-errcard-${num}`);
  if (card) {
    const filled = el.trim() || pr.trim() || fx.trim();
    card.classList.toggle("answered", !!filled);
  }
  saveState();
  updateProgress();
  updateSubmitButton();
  renderSidebarNav();
}

async function sendSubmissionEmail(payload) {
  const response = await fetch(SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || `HTTP ${response.status}`);
  }

  return result;
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
    semResults,
    semScore,
    semCorrectCount,
    now,
    nowFmt,
    CORRECT_LABELS,
    SEM_CORRECT_LABELS,
  } = r;

  const totalAutoScore = (parseFloat(mcqScore) + parseFloat(semScore)).toFixed(
    1,
  );
  document.getElementById("results-score-num").textContent = totalAutoScore;
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
    "Définition CLS",
    "Attribut rel nofollow",
    "Open Graph / partage social",
    "Métrique INP / Core Web Vitals",
  ];

  const SEM_LABELS = [
    "Balise <main>",
    "<article> vs <section>",
    "Balise <nav>",
    "<figure> + <figcaption>",
    "Attribut lang",
    "<strong> vs <b>",
    "Listes de définitions <dl>",
    "ARIA aria-label",
    "Balise <footer>",
    "JSON-LD / Schema.org",
    "Bouton sémantique",
    "Balise <title>",
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

  // Part 4 results table
  const semTbody = document.getElementById("sem-results-body");
  if (semTbody && semResults) {
    semTbody.innerHTML = semResults
      .map(
        (r) => `
    <tr>
      <td><strong>Q${r.q}</strong> <span style="color:var(--text-muted);font-size:12px;">— ${SEM_LABELS[r.q - 1]}</span></td>
      <td><span style="font-family:var(--font-mono);font-weight:600;">${r.ans.toUpperCase()}</span></td>
      <td>${r.correct ? '<span class="badge-correct">✓ Correct</span>' : '<span class="badge-wrong">✗ Incorrect</span>'}</td>
      <td>${!r.correct ? `<span class="badge-pending">${SEM_CORRECT_LABELS[r.q - 1].toUpperCase()}</span>` : '<span style="color:var(--text-muted);">—</span>'}</td>
    </tr>
  `,
      )
      .join("");
  }

  // Update results score display
  const scoreLabel = document.getElementById("results-score-label");
  if (scoreLabel)
    scoreLabel.textContent = `Score automatique (P1 + P4) : ${totalAutoScore} / 8 pts`;

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
