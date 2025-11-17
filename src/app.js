import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import departmentsRoutes from './routes/departaments.js';
import citiesRoutes from './routes/cities.js';
import clinicsByCityRoutes from './routes/clinic.js';
import clinicByIdRoutes from './routes/clinics.js';
import doctorsRoutes from './routes/doctors.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use('/api/departments', departmentsRoutes); // GET /api/departments
app.use('/api/departments', citiesRoutes);      // GET /api/departments/:id/cities
app.use('/api/cities', clinicsByCityRoutes);    // GET /api/cities/:id/clinics
app.use('/api/clinics', clinicByIdRoutes);      // GET /api/clinics/:id
app.use('/api/clinics', doctorsRoutes);         // GET /api/clinics/:id/doctors

// health
app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 15234;
app.listen(port, () => console.log(`Server running on http://mysql-130f1eb7-moisessolis-5a83.c.aivencloud.com:${port}`));
