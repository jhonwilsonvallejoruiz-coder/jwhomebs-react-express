// Modelo de clientes: contiene todas las consultas SQL a la base de datos
import pool from '../config/db.js';

// Obtener todos los clientes
export const obtenerTodos = async () => {
    const [rows] = await pool.query('SELECT * FROM clientes');
    return rows;
};

// Obtener un cliente por su ID
export const obtenerPorId = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM clientes WHERE id_cliente = ?', [id]
    );
    return rows[0];
};

// Insertar un nuevo cliente
export const insertar = async (nombreCliente, correoCliente, telefonoCliente) => {
    const [result] = await pool.query(
        'INSERT INTO clientes (nombre_cliente, correo_cliente, telefono_cliente) VALUES (?, ?, ?)',
        [nombreCliente, correoCliente, telefonoCliente]
    );
    return result;
};

// Actualizar un cliente existente por su ID
export const actualizar = async (id, nombreCliente, correoCliente, telefonoCliente) => {
    const [result] = await pool.query(
        'UPDATE clientes SET nombre_cliente = ?, correo_cliente = ?, telefono_cliente = ? WHERE id_cliente = ?',
        [nombreCliente, correoCliente, telefonoCliente, id]
    );
    return result;
};

// Eliminar un cliente por su ID
export const eliminar = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM clientes WHERE id_cliente = ?', [id]
    );
    return result;
};