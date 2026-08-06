// Servicio que centraliza todas las peticiones HTTP al backend para citas
import axios from 'axios';

// URL base de la API de citas
const API_URL = 'http://localhost:5000/api/citas';

// Obtener todas las citas
export const obtenerCitas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Obtener una cita por ID
export const obtenerCitaPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Obtener citas de un cliente específico
export const obtenerCitasPorCliente = async (idCliente) => {
    const response = await axios.get(`${API_URL}/cliente/${idCliente}`);
    return response.data;
};

// Crear una nueva cita
export const crearCita = async (cita) => {
    const response = await axios.post(API_URL, cita);
    return response.data;
};

// Actualizar estado de una cita
export const actualizarEstadoCita = async (id, estadoCita) => {
    const response = await axios.put(`${API_URL}/${id}/estado`, { estadoCita });
    return response.data;
};

// Reagendar una cita
export const reagendarCita = async (id, fechaCita, horaCita) => {
    const response = await axios.put(`${API_URL}/${id}/reagendar`, { fechaCita, horaCita });
    return response.data;
};

// Eliminar una cita
export const eliminarCita = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};