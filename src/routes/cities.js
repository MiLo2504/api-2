import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/departments/:id/cities
router.get('/:id/cities', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await db.query(
      'SELECT id, name FROM cities WHERE id_department = ? AND state = 1 ORDER BY name;',
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error('DB error /departments/:id/cities:', err.message);
    res.status(500).json({ error: 'DB error', detail: err.message });
  }
});

export default router;