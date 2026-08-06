// Modelo de barberos: contiene todas las consultas SQL a la base de datos
import pool from '../config/db.js';

// Obtener todos los barberos
export const obtenerTodos = async () => {
    const [rows] = await pool.query('SELECT * FROM barberos');
    return rows;
};

// Obtener un barbero por su ID
export const obtenerPorId = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM barberos WHERE id_barbero = ?', [id]
    );
    return rows[0];
};

// Insertar un nuevo barbero
export const insertar = async (nombreBarbero, correoBarbero, especialidadBarbero) => {
    const [result] = await pool.query(
        'INSERT INTO barberos (nombre_barbero, correo_barbero, especialidad_barbero) VALUES (?, ?, ?)',
        [nombreBarbero, correoBarbero, especialidadBarbero]
    );
    return result;
};

// Actualizar un barbero existente por su ID
export const actualizar = async (id, nombreBarbero, correoBarbero, especialidadBarbero) => {
    const [result] = await pool.query(
        'UPDATE barberos SET nombre_barbero = ?, correo_barbero = ?, especialidad_barbero = ? WHERE id_barbero = ?',
        [nombreBarbero, correoBarbero, especialidadBarbero, id]
    );
    return result;
};

// Eliminar un barbero por su ID
export const eliminar = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM barberos WHERE id_barbero = ?', [id]
    );
    return result;
};