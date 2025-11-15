import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/clinics/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await db.query(
      'SELECT id, name, address, phone FROM clinics WHERE id = ? AND state = 1 LIMIT 1',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Clinic not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('DB error /clinics/:id:', err);
    res.status(500).json({ error: 'DB error', detail: err.message });
  }
});

export default router;