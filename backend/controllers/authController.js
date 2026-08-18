// Controlador de autenticación: gestiona registro e inicio de sesión
import bcrypt       from 'bcryptjs';
import jwt          from 'jsonwebtoken';
import * as usuarioModel from '../models/usuarioModel.js';

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'jwHomebs_secret_2026';

// POST /api/auth/register — Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        // Verificar si el correo ya está registrado
        const usuarioExistente = await usuarioModel.buscarPorCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El correo ya está registrado en el sistema.'
            });
        }

        // Encriptar la contraseña antes de guardarla
        const passwordHash = await bcrypt.hash(password, 10);

        // Registrar el usuario en la base de datos
        await usuarioModel.registrar(nombre, correo, passwordHash, rol || 'cliente');

        res.status(201).json({
            exito:   true,
            mensaje: 'Usuario registrado exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            exito:   false,
            mensaje: 'Error al registrar el usuario.',
            error:   error.message
        });
    }
};

// POST /api/auth/login — Iniciar sesión
export const iniciarSesion = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Verificar si el usuario existe
        const usuario = await usuarioModel.buscarPorCorreo(correo);
        if (!usuario) {
            return res.status(401).json({
                exito:   false,
                mensaje: 'Correo o contraseña incorrectos.'
            });
        }

        // Verificar si la contraseña es correcta
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({
                exito:   false,
                mensaje: 'Correo o contraseña incorrectos.'
            });
        }

        // Generar token JWT con los datos del usuario
        const token = jwt.sign(
            {
                id:     usuario.id_usuario,
                correo: usuario.correo,
                rol:    usuario.rol
            },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            exito:   true,
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id:     usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol:    usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            exito:   false,
            mensaje: 'Error al iniciar sesión.',
            error:   error.message
        });
    }
};

// GET /api/auth/usuarios — Obtener todos los usuarios (sin password)
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerTodos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            exito:   false,
            mensaje: 'Error al obtener usuarios.',
            error:   error.message
        });
    }
};