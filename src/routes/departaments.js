import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

export default router;