// GET /api/submissions
// Liste toutes les copies (résumé). Protégé par ADMIN_TOKEN.

const { neon } = require('@neondatabase/serverless');

function checkAuth(req) {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7).trim();
  return token === process.env.ADMIN_TOKEN;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const rows = await sql`
      SELECT
        id,
        first_name,
        last_name,
        exam_date,
        start_time_str,
        submit_time_str,
        duration_min,
        p1_score,
        p1_correct,
        p4_score,
        p4_correct,
        total_auto_score,
        p2_score,
        p3_score,
        p5_score,
        total_score,
        graded_at,
        grading_status,
        created_at
      FROM submissions_summary
      ORDER BY created_at DESC
    `;

    return res.status(200).json({ submissions: rows });

  } catch (err) {
    console.error('[submissions] DB error:', err.message);
    return res.status(500).json({ error: 'Database error', message: err.message });
  }
};
