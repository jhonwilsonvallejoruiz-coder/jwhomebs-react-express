// Definición de rutas del módulo de barberos
import express from 'express';
import {
    obtenerBarberos,
    obtenerBarberoPorId,
    crearBarbero,
    actualizarBarbero,
    eliminarBarbero
} from '../controllers/barberoController.js';

const router = express.Router();

// GET    /api/barberos        → obtener todos los barberos
router.get('/',       obtenerBarberos);
// GET    /api/barberos/:id    → obtener un barbero por ID
router.get('/:id',    obtenerBarberoPorId);
// POST   /api/barberos        → crear nuevo barbero
router.post('/',      crearBarbero);
// PUT    /api/barberos/:id    → actualizar barbero
router.put('/:id',    actualizarBarbero);
// DELETE /api/barberos/:id    → eliminar barbero
router.delete('/:id', eliminarBarbero);

export default router;