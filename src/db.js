import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.LOCATION_DB_HOST || '127.0.0.1',
  user: process.env.LOCATION_DB_USER || 'root',
  password: process.env.LOCATION_DB_PASS || '',
  database: process.env.LOCATION_DB_NAME || 'location_service',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
});

export default pool;