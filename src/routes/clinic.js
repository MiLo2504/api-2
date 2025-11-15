import { Router } from 'express';
import db from '../db.js';
const router = Router();

router.get('/:id/clinics', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await db.query('SELECT id, name, address, phone FROM clinics WHERE id_city = ? AND state=1 ORDER BY name;', [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;