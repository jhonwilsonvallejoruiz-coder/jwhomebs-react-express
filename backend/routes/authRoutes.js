// Definición de rutas del módulo de autenticación
import express from 'express';
import {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarios
} from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register → registrar nuevo usuario
router.post('/register', registrarUsuario);

// POST /api/auth/login → iniciar sesión
router.post('/login',    iniciarSesion);

// GET  /api/auth/usuarios → obtener todos los usuarios sin password
router.get('/usuarios',  obtenerUsuarios);

export default router;