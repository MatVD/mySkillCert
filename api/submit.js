// POST /api/submit
// Reçoit la copie complète d'un élève et la stocke en base Neon.
// Endpoint public (pas d'authentification — les élèves soumettent ici).

const { neon } = require('@neondatabase/serverless');

module.exports = async function handler(req, res) {
  // CORS minimal (même domaine Vercel)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.DATABASE_URL) {
    console.error('[submit] DATABASE_URL not configured');
    return res.status(503).json({ error: 'Database not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const body = req.body;

    // Validation minimale
    if (!body || !body.meta || !body.meta.student) {
      return res.status(400).json({ error: 'Invalid payload: missing meta.student' });
    }

    const { meta, part1, part2, part3, part4, part5, totalAutoScore } = body;
    const { firstName, lastName } = meta.student;

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'Missing student name' });
    }

    const result = await sql`
      INSERT INTO submissions (
        first_name, last_name,
        exam_date, start_time_str, submit_time_str, duration_min,

        p1_answers, p1_results, p1_score, p1_correct,

        p2_answers,

        p3_answer,

        p4_answers, p4_results, p4_score, p4_correct,

        p5_answers,

        total_auto_score
      ) VALUES (
        ${firstName}, ${lastName},
        ${meta.examDate   || null},
        ${meta.startTime  || null},
        ${meta.submitTime || null},
        ${meta.durationMin != null ? parseInt(meta.durationMin, 10) : null},

        ${JSON.stringify(part1?.answers  || {})},
        ${JSON.stringify(part1?.results  || [])},
        ${part1?.score != null ? parseFloat(part1.score) : 0},
        ${part1?.correctCount != null ? parseInt(part1.correctCount, 10) : 0},

        ${JSON.stringify(part2?.answers  || {})},

        ${part3?.answer || ''},

        ${JSON.stringify(part4?.answers  || {})},
        ${JSON.stringify(part4?.results  || [])},
        ${part4?.score != null ? parseFloat(part4.score) : 0},
        ${part4?.correctCount != null ? parseInt(part4.correctCount, 10) : 0},

        ${JSON.stringify(part5?.answers  || {})},

        ${totalAutoScore != null ? parseFloat(totalAutoScore) : 0}
      )
      RETURNING id, created_at
    `;

    return res.status(201).json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    });

  } catch (err) {
    console.error('[submit] DB error:', err.message);
    return res.status(500).json({
      error: 'Database error',
      message: err.message,
    });
  }
};
