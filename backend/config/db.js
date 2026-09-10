// Configuración de la conexión a MySQL mediante mysql2
import mysql  from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno según el entorno actual
dotenv.config({
    path:  process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    quiet: true
});

// Pool de conexiones para manejar múltiples solicitudes eficientemente
const pool = mysql.createPool({
    host:               process.env.DB_HOST     || 'localhost',
    user:               process.env.DB_USER     || 'root',
    password:           process.env.DB_PASSWORD || '',
    database:           process.env.DB_NAME     || 'jwhomebs',
    waitForConnections: true,
    connectionLimit:    10,
});

export default pool;