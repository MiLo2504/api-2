import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.LOCATION_DB_HOST || '',
  user: process.env.LOCATION_DB_USER || '',
  password: process.env.LOCATION_DB_PASS || '',
  database: process.env.LOCATION_DB_NAME || '',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
});

export default pool;