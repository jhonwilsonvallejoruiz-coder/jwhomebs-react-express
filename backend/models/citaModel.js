// Modelo de citas: contiene todas las consultas SQL a la base de datos
import pool from '../config/db.js';

// Obtener todas las citas con datos relacionados de cliente, barbero y servicio
export const obtenerTodos = async () => {
    const [rows] = await pool.query(`
        SELECT 
            c.id_cita,
            c.fecha_cita,
            c.hora_cita,
            c.estado_cita,
            cl.nombre_cliente,
            b.nombre_barbero,
            s.nombre_servicio,
            s.precio_servicio,
            c.id_cliente,
            c.id_barbero,
            c.id_servicio
        FROM citas c
        JOIN clientes cl ON c.id_cliente = cl.id_cliente
        JOIN barberos b  ON c.id_barbero  = b.id_barbero
        JOIN servicios s ON c.id_servicio  = s.id_servicio
        ORDER BY c.fecha_cita ASC, c.hora_cita ASC
    `);
    return rows;
};

// Obtener una cita por su ID
export const obtenerPorId = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM citas WHERE id_cita = ?`, [id]
    );
    return rows[0];
};

// Obtener citas de un cliente específico
export const obtenerPorCliente = async (idCliente) => {
    const [rows] = await pool.query(`
        SELECT 
            c.id_cita,
            c.fecha_cita,
            c.hora_cita,
            c.estado_cita,
            b.nombre_barbero,
            s.nombre_servicio,
            s.precio_servicio
        FROM citas c
        JOIN barberos b  ON c.id_barbero  = b.id_barbero
        JOIN servicios s ON c.id_servicio  = s.id_servicio
        WHERE c.id_cliente = ?
        ORDER BY c.fecha_cita ASC
    `, [idCliente]);
    return rows;
};

// Insertar una nueva cita
export const insertar = async (fechaCita, horaCita, idCliente, idBarbero, idServicio) => {
    const [result] = await pool.query(
        'INSERT INTO citas (fecha_cita, hora_cita, id_cliente, id_barbero, id_servicio) VALUES (?, ?, ?, ?, ?)',
        [fechaCita, horaCita, idCliente, idBarbero, idServicio]
    );
    return result;
};

// Actualizar el estado de una cita
export const actualizarEstado = async (id, estadoCita) => {
    const [result] = await pool.query(
        'UPDATE citas SET estado_cita = ? WHERE id_cita = ?',
        [estadoCita, id]
    );
    return result;
};

// Reagendar una cita: actualizar fecha y hora
export const reagendar = async (id, fechaCita, horaCita) => {
    const [result] = await pool.query(
        'UPDATE citas SET fecha_cita = ?, hora_cita = ? WHERE id_cita = ?',
        [fechaCita, horaCita, id]
    );
    return result;
};

// Eliminar una cita por su ID
export const eliminar = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM citas WHERE id_cita = ?', [id]
    );
    return result;
};