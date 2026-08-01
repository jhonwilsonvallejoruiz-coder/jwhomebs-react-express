// Archivo principal del servidor Express - JW Home Barber Studio
import express    from 'express';
import cors       from 'cors';
import dotenv     from 'dotenv';
import clienteRoutes from './routes/clienteRoutes.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());           // Permite solicitudes desde React
app.use(express.json());   // Parsea el cuerpo de las solicitudes JSON

// Rutas principales de la API
app.use('/api/clientes', clienteRoutes);

// Ruta de bienvenida para verificar que el servidor está corriendo
app.get('/', (req, res) => {
    res.json({ mensaje: 'API JW Home Barber Studio funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});