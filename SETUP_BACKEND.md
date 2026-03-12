# MySkillCert — Setup Backend (Neon + Vercel)

Durée estimée : **15-20 minutes**

---

## 1. Créer la base de données Neon (gratuit)

1. Aller sur [neon.tech](https://neon.tech) → **Sign up** (GitHub ou email)
2. Créer un nouveau projet : nom `myskillcert`, région `eu-west-2` (Paris)
3. Une fois le projet créé, cliquer sur **SQL Editor**
4. Coller le contenu de `schema.sql` et cliquer **Run**
5. Vérifier que les tables `submissions` et la vue `submissions_summary` ont été créées

---

## 2. Récupérer la connection string

Dans le dashboard Neon :
- Aller dans **Dashboard → Connection Details**
- Sélectionner **Pooled connection** (recommandé pour serverless)
- Copier la chaîne qui ressemble à :
  ```
  postgresql://user:password@ep-xxx.eu-west-2.aws.neon.tech/neondb?sslmode=require
  ```

---

## 3. Configurer les variables d'environnement Vercel

Sur [vercel.com](https://vercel.com), dans ton projet MySkillCert :

**Settings → Environment Variables**, ajouter :

| Nom | Valeur | Environnements |
|-----|--------|----------------|
| `DATABASE_URL` | la chaîne Neon copiée ci-dessus | Production, Preview |
| `ADMIN_TOKEN` | un mot de passe fort de ton choix | Production, Preview |

> `ADMIN_TOKEN` est le mot de passe que tu utiliseras pour accéder à `/admin`.
> Choisis quelque chose de robuste : `MySkillCert@2025!` par exemple.

---

## 4. Installer la dépendance et déployer

Dans le dossier du projet :

```bash
npm install
npm run build
git add -A
git commit -m "feat: add Neon Postgres backend + admin dashboard"
git push
```

Vercel détectera automatiquement les fonctions dans `/api` et les déploiera.

---

## 5. Accès à l'interface formateur

Une fois déployé :
- **Examen élèves** → `https://ton-projet.vercel.app/`
- **Dashboard formateur** → `https://ton-projet.vercel.app/admin`

Sur `/admin`, entrer le `ADMIN_TOKEN` configuré à l'étape 3.

---

## Structure des endpoints API

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| `POST` | `/api/submit` | Aucune | Soumettre une copie (appelé par l'app élève) |
| `GET` | `/api/submissions` | Bearer token | Lister toutes les copies |
| `GET` | `/api/submissions/:id` | Bearer token | Détail complet d'une copie |
| `PATCH` | `/api/submissions/:id` | Bearer token | Saisir les notes manuelles (P2/P3/P5) |

---

## Comportement en cas d'erreur DB

Si la base de données est indisponible ou mal configurée, **la soumission continue normalement** via FormSubmit.co + mailto. La base est toujours en complément, jamais en blocage.

---

## Variables d'environnement (résumé)

```env
DATABASE_URL=postgresql://...@...neon.tech/neondb?sslmode=require
ADMIN_TOKEN=ton_mot_de_passe_admin
```
