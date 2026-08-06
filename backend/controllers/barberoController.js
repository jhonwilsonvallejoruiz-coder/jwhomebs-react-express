// Controlador de barberos: gestiona la lógica entre las rutas y el modelo
import * as barberoModel from '../models/barberoModel.js';

// GET - Obtener todos los barberos
export const obtenerBarberos = async (req, res) => {
    try {
        const barberos = await barberoModel.obtenerTodos();
        res.json(barberos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener barberos', error });
    }
};

// GET - Obtener un barbero por ID
export const obtenerBarberoPorId = async (req, res) => {
    try {
        const barbero = await barberoModel.obtenerPorId(req.params.id);
        if (!barbero) {
            return res.status(404).json({ mensaje: 'Barbero no encontrado' });
        }
        res.json(barbero);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener barbero', error });
    }
};

// POST - Crear un nuevo barbero
export const crearBarbero = async (req, res) => {
    try {
        const { nombreBarbero, correoBarbero, especialidadBarbero } = req.body;
        await barberoModel.insertar(nombreBarbero, correoBarbero, especialidadBarbero);
        res.status(201).json({ mensaje: 'Barbero creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear barbero', error });
    }
};

// PUT - Actualizar un barbero existente
export const actualizarBarbero = async (req, res) => {
    try {
        const { nombreBarbero, correoBarbero, especialidadBarbero } = req.body;
        await barberoModel.actualizar(
            req.params.id, nombreBarbero, correoBarbero, especialidadBarbero
        );
        res.json({ mensaje: 'Barbero actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar barbero', error });
    }
};

// DELETE - Eliminar un barbero
export const eliminarBarbero = async (req, res) => {
    try {
        await barberoModel.eliminar(req.params.id);
        res.json({ mensaje: 'Barbero eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar barbero', error });
    }
};