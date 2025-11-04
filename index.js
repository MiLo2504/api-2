const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para recibir datos en formato JSON
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_city_service'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.log('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

// =====================
//      RUTAS
// =====================

// Obtener todas las ciudades
app.get('/cities', (req, res) => {
  const query = 'SELECT * FROM city WHERE active = 1';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener ciudades:', err);
      res.status(500).json({ error: 'Error al obtener ciudades' });
    } else {
      res.json(result);
    }
  });
});

// Obtener lugares de una ciudad específica
app.get('/cities/:id/places', (req, res) => {
  const cityId = req.params.id;
  const query = 'SELECT * FROM place WHERE id_city = ? AND active = 1';
  db.query(query, [cityId], (err, result) => {
    if (err) {
      console.error('Error al obtener lugares:', err);
      res.status(500).json({ error: 'Error al obtener lugares' });
    } else {
      res.json(result);
    }
  });
});

// Agregar una nueva ciudad
app.post('/cities', (req, res) => {
  const { name, state, country } = req.body;
  const query = 'INSERT INTO city (name, state, country) VALUES (?, ?, ?)';
  db.query(query, [name, state, country], (err, result) => {
    if (err) {
      console.error('Error al agregar ciudad:', err);
      res.status(500).json({ error: 'Error al agregar ciudad' });
    } else {
      res.json({ message: 'Ciudad agregada correctamente', id: result.insertId });
    }
  });
});

// Agregar un nuevo lugar
app.post('/places', (req, res) => {
  const { id_city, name, address } = req.body;
  const query = 'INSERT INTO place (id_city, name, address) VALUES (?, ?, ?)';
  db.query(query, [id_city, name, address], (err, result) => {
    if (err) {
      console.error('Error al agregar lugar:', err);
      res.status(500).json({ error: 'Error al agregar lugar' });
    } else {
      res.json({ message: 'Lugar agregado correctamente', id: result.insertId });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
