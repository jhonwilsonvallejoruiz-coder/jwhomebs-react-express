// Controlador de servicios: gestiona la lógica entre las rutas y el modelo
import * as servicioModel from '../models/servicioModel.js';

// GET - Obtener todos los servicios
export const obtenerServicios = async (req, res) => {
    try {
        const servicios = await servicioModel.obtenerTodos();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener servicios', error });
    }
};

// GET - Obtener un servicio por ID
export const obtenerServicioPorId = async (req, res) => {
    try {
        const servicio = await servicioModel.obtenerPorId(req.params.id);
        if (!servicio) {
            return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener servicio', error });
    }
};

// POST - Crear un nuevo servicio
export const crearServicio = async (req, res) => {
    try {
        const { nombreServicio, precioServicio, duracionServicio } = req.body;
        await servicioModel.insertar(nombreServicio, precioServicio, duracionServicio);
        res.status(201).json({ mensaje: 'Servicio creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear servicio', error });
    }
};

// PUT - Actualizar un servicio existente
export const actualizarServicio = async (req, res) => {
    try {
        const { nombreServicio, precioServicio, duracionServicio } = req.body;
        await servicioModel.actualizar(
            req.params.id, nombreServicio, precioServicio, duracionServicio
        );
        res.json({ mensaje: 'Servicio actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar servicio', error });
    }
};

// DELETE - Eliminar un servicio
export const eliminarServicio = async (req, res) => {
    try {
        await servicioModel.eliminar(req.params.id);
        res.json({ mensaje: 'Servicio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar servicio', error });
    }
};