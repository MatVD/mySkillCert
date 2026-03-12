-- ============================================================
-- MySkillCert — Schéma de base de données PostgreSQL (Neon)
-- À exécuter une seule fois depuis le SQL Editor de Neon
-- ============================================================

CREATE TABLE IF NOT EXISTS submissions (
  id               SERIAL PRIMARY KEY,

  -- Identité de l'élève
  first_name       TEXT    NOT NULL,
  last_name        TEXT    NOT NULL,

  -- Métadonnées de session
  exam_date        TEXT,                          -- ex: "12/03/2026"
  start_time_str   TEXT,                          -- ex: "09:00"
  submit_time_str  TEXT,                          -- ex: "11:12"
  duration_min     INTEGER,

  -- Partie 1 — QCM SEO (auto-corrigé, max 5 pts)
  p1_answers       JSONB   NOT NULL DEFAULT '{}', -- { "1":"b", "2":"a", ... }
  p1_results       JSONB   NOT NULL DEFAULT '[]', -- [{ q:1, ans:"b", correct:true }, ...]
  p1_score         NUMERIC(4,2)     DEFAULT 0,    -- ex: 3.75
  p1_correct       INTEGER          DEFAULT 0,    -- nb bonnes réponses

  -- Partie 2 — Analyse code HTML (correction manuelle, max 4 pts)
  p2_answers       JSONB   NOT NULL DEFAULT '{}', -- { "1":{ element, problem, fix }, ... }
  p2_score         NUMERIC(4,2),                  -- NULL = non corrigé

  -- Partie 3 — Réécriture HTML (correction manuelle, max 4 pts)
  p3_answer        TEXT    NOT NULL DEFAULT '',
  p3_score         NUMERIC(4,2),

  -- Partie 4 — QCM Sémantique HTML (auto-corrigé, max 3 pts)
  p4_answers       JSONB   NOT NULL DEFAULT '{}',
  p4_results       JSONB   NOT NULL DEFAULT '[]',
  p4_score         NUMERIC(4,2)     DEFAULT 0,
  p4_correct       INTEGER          DEFAULT 0,

  -- Partie 5 — sitemap.wml & robot.txt (correction manuelle, max 4 pts)
  p5_answers       JSONB   NOT NULL DEFAULT '{}',
  p5_score         NUMERIC(4,2),

  -- Scores calculés
  total_auto_score NUMERIC(4,2)     DEFAULT 0,    -- P1 + P4 (max 8)
  total_score      NUMERIC(4,2),                  -- NULL = pas encore total final

  -- Correction
  grading_notes    TEXT,
  graded_at        TIMESTAMPTZ,

  -- Timestamps
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les tris les plus courants
CREATE INDEX IF NOT EXISTS submissions_created_at_idx
  ON submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS submissions_name_idx
  ON submissions (last_name, first_name);

-- Vue pratique pour le dashboard formateur
CREATE OR REPLACE VIEW submissions_summary AS
SELECT
  id,
  first_name,
  last_name,
  exam_date,
  submit_time_str,
  duration_min,
  p1_score,
  p4_score,
  total_auto_score,
  p2_score,
  p3_score,
  p5_score,
  total_score,
  graded_at,
  CASE
    WHEN p2_score IS NOT NULL AND p3_score IS NOT NULL AND p5_score IS NOT NULL THEN 'graded'
    WHEN p2_score IS NOT NULL OR  p3_score IS NOT NULL OR  p5_score IS NOT NULL THEN 'partial'
    ELSE 'pending'
  END AS grading_status,
  created_at
FROM submissions
ORDER BY created_at DESC;
