import { Router } from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Conexión a la base de datos principal (medical_project)
const createMainDbConnection = async () => {
  return await mysql.createConnection({
    host: process.env.MAIN_DB_HOST || '127.0.0.1',
    user: process.env.MAIN_DB_USER || 'root',
    password: process.env.MAIN_DB_PASS || '',
    database: process.env.MAIN_DB_NAME || 'medical_project'
  });
};

// GET /api/clinics/:id/doctors - Obtener doctores de una clínica específica
router.get('/:id/doctors', async (req, res) => {
  let connection;
  try {
    const clinicId = Number(req.params.id);
    connection = await createMainDbConnection();
    
    // Consultar doctores que están asociados a esta clínica
    // Asumiendo que hay una columna id_clinic en la tabla user
    const [rows] = await connection.query(
      `SELECT id, full_name, last_name, num_document, email 
       FROM user 
       WHERE id_rol = 2 AND state = 1 AND id_clinic = ? 
       ORDER BY full_name`,
      [clinicId]
    );
    
    res.json(rows);
  } catch (err) {
    console.error('Error /clinics/:id/doctors:', err);
    res.status(500).json({ error: 'DB error', detail: err.message });
  } finally {
    if (connection) await connection.end();
  }
});

export default router;
