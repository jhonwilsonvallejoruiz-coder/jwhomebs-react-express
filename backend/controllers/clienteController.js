// Controlador de clientes: gestiona la lógica entre las rutas y el modelo
import * as clienteModel from '../models/clienteModel.js';

// GET - Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.obtenerTodos();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener clientes', error });
    }
};

// GET - Obtener un cliente por ID
export const obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await clienteModel.obtenerPorId(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cliente', error });
    }
};

// POST - Crear un nuevo cliente
export const crearCliente = async (req, res) => {
    try {
        const { nombreCliente, correoCliente, telefonoCliente } = req.body;
        await clienteModel.insertar(nombreCliente, correoCliente, telefonoCliente);
        res.status(201).json({ mensaje: 'Cliente creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear cliente', error });
    }
};

// PUT - Actualizar un cliente existente
export const actualizarCliente = async (req, res) => {
    try {
        const { nombreCliente, correoCliente, telefonoCliente } = req.body;
        await clienteModel.actualizar(
            req.params.id, nombreCliente, correoCliente, telefonoCliente
        );
        res.json({ mensaje: 'Cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar cliente', error });
    }
};

// DELETE - Eliminar un cliente
export const eliminarCliente = async (req, res) => {
    try {
        await clienteModel.eliminar(req.params.id);
        res.json({ mensaje: 'Cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar cliente', error });
    }
};