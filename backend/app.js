// Archivo principal del servidor Express - JW Home Barber Studio
import express        from 'express';
import cors           from 'cors';
import dotenv         from 'dotenv';
import clienteRoutes  from './routes/clienteRoutes.js';
import barberoRoutes  from './routes/barberoRoutes.js';
import servicioRoutes from './routes/servicioRoutes.js';
import citaRoutes     from './routes/citaRoutes.js';
import authRoutes     from './routes/authRoutes.js';

dotenv.config({ quiet: true });

const app  = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales de la API
app.use('/api/clientes',  clienteRoutes);
app.use('/api/barberos',  barberoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/citas',     citaRoutes);
app.use('/api/auth',      authRoutes);

// Ruta de verificación del servidor
app.get('/', (req, res) => {
    res.json({ mensaje: 'API JW Home Barber Studio funcionando correctamente' });
});

// Iniciar el servidor solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

export default app;