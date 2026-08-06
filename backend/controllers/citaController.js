// Controlador de citas: gestiona la lógica entre las rutas y el modelo
import * as citaModel from '../models/citaModel.js';

// GET - Obtener todas las citas
export const obtenerCitas = async (req, res) => {
    try {
        const citas = await citaModel.obtenerTodos();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener citas', error });
    }
};

// GET - Obtener una cita por ID
export const obtenerCitaPorId = async (req, res) => {
    try {
        const cita = await citaModel.obtenerPorId(req.params.id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cita', error });
    }
};

// GET - Obtener citas de un cliente específico
export const obtenerCitasPorCliente = async (req, res) => {
    try {
        const citas = await citaModel.obtenerPorCliente(req.params.idCliente);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener citas del cliente', error });
    }
};

// POST - Crear una nueva cita
export const crearCita = async (req, res) => {
    try {
        const { fechaCita, horaCita, idCliente, idBarbero, idServicio } = req.body;
        await citaModel.insertar(fechaCita, horaCita, idCliente, idBarbero, idServicio);
        res.status(201).json({ mensaje: 'Cita creada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear cita', error });
    }
};

// PUT - Actualizar estado de una cita
export const actualizarEstadoCita = async (req, res) => {
    try {
        const { estadoCita } = req.body;
        await citaModel.actualizarEstado(req.params.id, estadoCita);
        res.json({ mensaje: 'Estado de cita actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estado', error });
    }
};

// PUT - Reagendar una cita
export const reagendarCita = async (req, res) => {
    try {
        const { fechaCita, horaCita } = req.body;
        await citaModel.reagendar(req.params.id, fechaCita, horaCita);
        res.json({ mensaje: 'Cita reagendada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al reagendar cita', error });
    }
};

// DELETE - Eliminar una cita
export const eliminarCita = async (req, res) => {
    try {
        await citaModel.eliminar(req.params.id);
        res.json({ mensaje: 'Cita eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar cita', error });
    }
};