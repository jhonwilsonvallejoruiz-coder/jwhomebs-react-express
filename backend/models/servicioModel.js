// Modelo de servicios: contiene todas las consultas SQL a la base de datos
import pool from '../config/db.js';

// Obtener todos los servicios
export const obtenerTodos = async () => {
    const [rows] = await pool.query('SELECT * FROM servicios');
    return rows;
};

// Obtener un servicio por su ID
export const obtenerPorId = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM servicios WHERE id_servicio = ?', [id]
    );
    return rows[0];
};

// Insertar un nuevo servicio
export const insertar = async (nombreServicio, precioServicio, duracionServicio) => {
    const [result] = await pool.query(
        'INSERT INTO servicios (nombre_servicio, precio_servicio, duracion_servicio) VALUES (?, ?, ?)',
        [nombreServicio, precioServicio, duracionServicio]
    );
    return result;
};

// Actualizar un servicio existente por su ID
export const actualizar = async (id, nombreServicio, precioServicio, duracionServicio) => {
    const [result] = await pool.query(
        'UPDATE servicios SET nombre_servicio = ?, precio_servicio = ?, duracion_servicio = ? WHERE id_servicio = ?',
        [nombreServicio, precioServicio, duracionServicio, id]
    );
    return result;
};

// Eliminar un servicio por su ID
export const eliminar = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM servicios WHERE id_servicio = ?', [id]
    );
    return result;
};