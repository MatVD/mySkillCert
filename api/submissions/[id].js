// GET  /api/submissions/:id  — Détail complet d'une copie
// PATCH /api/submissions/:id — Saisir les notes P2/P3/P5 + calcul total
// Protégé par ADMIN_TOKEN.

const { neon } = require('@neondatabase/serverless');

function checkAuth(req) {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7).trim();
  return token === process.env.ADMIN_TOKEN;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);
  const id = parseInt(req.query.id, 10);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  // ── GET ──────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT * FROM submissions WHERE id = ${id} LIMIT 1
      `;
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ submission: rows[0] });
    } catch (err) {
      console.error('[submissions/id GET] DB error:', err.message);
      return res.status(500).json({ error: 'Database error', message: err.message });
    }
  }

  // ── PATCH ─────────────────────────────────────────────────────────────────
  if (req.method === 'PATCH') {
    try {
      const { p2_score, p3_score, p5_score, grading_notes } = req.body || {};

      // Récupère le score automatique pour calculer le total
      const current = await sql`
        SELECT total_auto_score FROM submissions WHERE id = ${id} LIMIT 1
      `;
      if (!current.length) return res.status(404).json({ error: 'Not found' });

      const autoScore = parseFloat(current[0].total_auto_score) || 0;

      // Scores manuels (null si non fourni = non corrigé)
      const s2 = p2_score != null ? parseFloat(p2_score) : null;
      const s3 = p3_score != null ? parseFloat(p3_score) : null;
      const s5 = p5_score != null ? parseFloat(p5_score) : null;

      // Total final seulement si les 3 parties manuelles sont saisies
      const totalScore =
        s2 != null && s3 != null && s5 != null
          ? Math.round((autoScore + s2 + s3 + s5) * 100) / 100
          : null;

      const rows = await sql`
        UPDATE submissions SET
          p2_score      = COALESCE(${s2}, p2_score),
          p3_score      = COALESCE(${s3}, p3_score),
          p5_score      = COALESCE(${s5}, p5_score),
          grading_notes = COALESCE(${grading_notes ?? null}, grading_notes),
          total_score   = COALESCE(${totalScore}, total_score),
          graded_at     = NOW()
        WHERE id = ${id}
        RETURNING
          id, p1_score, p4_score, total_auto_score,
          p2_score, p3_score, p5_score,
          total_score, graded_at, grading_notes
      `;

      return res.status(200).json({ success: true, submission: rows[0] });

    } catch (err) {
      console.error('[submissions/id PATCH] DB error:', err.message);
      return res.status(500).json({ error: 'Database error', message: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
