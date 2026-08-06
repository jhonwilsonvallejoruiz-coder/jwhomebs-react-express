// Servicio que centraliza todas las peticiones HTTP al backend para barberos
import axios from 'axios';

// URL base de la API de barberos
const API_URL = 'http://localhost:5000/api/barberos';

// Obtener todos los barberos
export const obtenerBarberos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Obtener un barbero por ID
export const obtenerBarberoPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Crear un nuevo barbero
export const crearBarbero = async (barbero) => {
    const response = await axios.post(API_URL, barbero);
    return response.data;
};

// Actualizar un barbero existente
export const actualizarBarbero = async (id, barbero) => {
    const response = await axios.put(`${API_URL}/${id}`, barbero);
    return response.data;
};

// Eliminar un barbero
export const eliminarBarbero = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};