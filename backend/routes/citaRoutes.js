// Definición de rutas del módulo de citas
import express from 'express';
import {
    obtenerCitas,
    obtenerCitaPorId,
    obtenerCitasPorCliente,
    crearCita,
    actualizarEstadoCita,
    reagendarCita,
    eliminarCita
} from '../controllers/citaController.js';

const router = express.Router();

// GET    /api/citas                        → obtener todas las citas
router.get('/',                      obtenerCitas);
// GET    /api/citas/:id                    → obtener una cita por ID
router.get('/:id',                   obtenerCitaPorId);
// GET    /api/citas/cliente/:idCliente     → obtener citas de un cliente
router.get('/cliente/:idCliente',    obtenerCitasPorCliente);
// POST   /api/citas                        → crear nueva cita
router.post('/',                     crearCita);
// PUT    /api/citas/:id/estado             → actualizar estado de cita
router.put('/:id/estado',            actualizarEstadoCita);
// PUT    /api/citas/:id/reagendar          → reagendar cita
router.put('/:id/reagendar',         reagendarCita);
// DELETE /api/citas/:id                    → eliminar cita
router.delete('/:id',                eliminarCita);

export default router;