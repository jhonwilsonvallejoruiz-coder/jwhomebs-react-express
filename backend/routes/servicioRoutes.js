// Definición de rutas del módulo de servicios
import express from 'express';
import {
    obtenerServicios,
    obtenerServicioPorId,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} from '../controllers/servicioController.js';

const router = express.Router();

// GET    /api/servicios        → obtener todos los servicios
router.get('/',       obtenerServicios);
// GET    /api/servicios/:id    → obtener un servicio por ID
router.get('/:id',    obtenerServicioPorId);
// POST   /api/servicios        → crear nuevo servicio
router.post('/',      crearServicio);
// PUT    /api/servicios/:id    → actualizar servicio
router.put('/:id',    actualizarServicio);
// DELETE /api/servicios/:id    → eliminar servicio
router.delete('/:id', eliminarServicio);

export default router;