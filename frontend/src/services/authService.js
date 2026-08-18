// Servicio que centraliza las peticiones HTTP al backend para autenticación
import axios from 'axios';

// URL base de la API de autenticación
const API_URL = 'http://localhost:5000/api/auth';

// Registrar un nuevo usuario
export const registrarUsuario = async (datos) => {
    const response = await axios.post(`${API_URL}/register`, datos);
    return response.data;
};

// Iniciar sesión
export const iniciarSesion = async (datos) => {
    const response = await axios.post(`${API_URL}/login`, datos);
    return response.data;
};

// Obtener todos los usuarios registrados
export const obtenerUsuarios = async () => {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
};