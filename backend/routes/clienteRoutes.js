// Definición de rutas del módulo de clientes
import express from 'express';
import {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from '../controllers/clienteController.js';

const router = express.Router();

// Ruta GET    /api/clientes        → obtener todos los clientes
router.get('/',       obtenerClientes);

// Ruta GET    /api/clientes/:id    → obtener un cliente por ID
router.get('/:id',    obtenerClientePorId);

// Ruta POST   /api/clientes        → crear nuevo cliente
router.post('/',      crearCliente);

// Ruta PUT    /api/clientes/:id    → actualizar cliente existente
router.put('/:id',    actualizarCliente);

// Ruta DELETE /api/clientes/:id    → eliminar cliente
router.delete('/:id', eliminarCliente);

export default router;