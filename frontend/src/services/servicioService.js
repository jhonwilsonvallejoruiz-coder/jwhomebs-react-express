// Servicio que centraliza todas las peticiones HTTP al backend para servicios
import axios from 'axios';

// URL base de la API de servicios
const API_URL = 'http://localhost:5000/api/servicios';

// Obtener todos los servicios
export const obtenerServicios = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Obtener un servicio por ID
export const obtenerServicioPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Crear un nuevo servicio
export const crearServicio = async (servicio) => {
    const response = await axios.post(API_URL, servicio);
    return response.data;
};

// Actualizar un servicio existente
export const actualizarServicio = async (id, servicio) => {
    const response = await axios.put(`${API_URL}/${id}`, servicio);
    return response.data;
};

// Eliminar un servicio
export const eliminarServicio = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};