// Modelo de usuarios: contiene las consultas SQL para autenticación
import pool from '../config/db.js';

// Buscar un usuario por su correo electrónico
export const buscarPorCorreo = async (correo) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE correo = ?', [correo]
    );
    return rows[0];
};

// Registrar un nuevo usuario en la base de datos
export const registrar = async (nombre, correo, passwordHash, rol) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, correo, passwordHash, rol]
    );
    return result;
};

// Obtener todos los usuarios sin exponer el password
export const obtenerTodos = async () => {
    const [rows] = await pool.query(
        'SELECT id_usuario, nombre, correo, rol, fecha_registro FROM usuarios'
    );
    return rows;
};