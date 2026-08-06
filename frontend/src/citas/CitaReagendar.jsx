// Componente para reagendar una cita existente cambiando fecha y hora
import { useState, useEffect } from 'react';
import { obtenerCitaPorId, reagendarCita } from '../services/citaService';

const CitaReagendar = ({ idCita, onVolver }) => {
    const [citaActual, setCitaActual] = useState(null);
    const [formulario, setFormulario] = useState({
        fechaCita: '',
        horaCita:  '',
    });

    // Estado para almacenar los errores de validación
    const [errores, setErrores] = useState({});

    // Cargar los datos actuales de la cita al montar el componente
    useEffect(() => {
        const cargarCita = async () => {
            const data = await obtenerCitaPorId(idCita);
            setCitaActual(data);
            setFormulario({
                fechaCita: data.fecha_cita?.split('T')[0],
                horaCita:  data.hora_cita,
            });
        };
        cargarCita();
    }, [idCita]);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
    };

    // Función que valida los campos de fecha y hora
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validación de fecha: obligatoria y no puede ser en el pasado
        if (!formulario.fechaCita) {
            nuevosErrores.fechaCita = 'La fecha es obligatoria.';
        } else if (new Date(formulario.fechaCita) < new Date().setHours(0, 0, 0, 0)) {
            nuevosErrores.fechaCita = 'La nueva fecha no puede ser en el pasado.';
        }

        // Validación de hora: obligatoria
        if (!formulario.horaCita) {
            nuevosErrores.horaCita = 'La hora es obligatoria.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        await reagendarCita(idCita, formulario.fechaCita, formulario.horaCita);
        onVolver();
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Reagendar Cita</h2>

            {/* Información actual de la cita */}
            {citaActual && (
                <div style={estilos.infoActual}>
                    <p><strong>Fecha actual:</strong> {citaActual.fecha_cita?.split('T')[0]}</p>
                    <p><strong>Hora actual:</strong> {citaActual.hora_cita}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} style={estilos.form}>

                <label style={estilos.label}>Nueva Fecha:</label>
                <input
                    style={estilos.input}
                    type="date"
                    name="fechaCita"
                    value={formulario.fechaCita}
                    onChange={handleChange}
                />
                {errores.fechaCita &&
                    <p style={estilos.error}>{errores.fechaCita}</p>}

                <label style={estilos.label}>Nueva Hora:</label>
                <input
                    style={estilos.input}
                    type="time"
                    name="horaCita"
                    value={formulario.horaCita}
                    onChange={handleChange}
                />
                {errores.horaCita &&
                    <p style={estilos.error}>{errores.horaCita}</p>}

                <button type="submit" style={estilos.btnReagendar}>
                    Confirmar Reagendamiento
                </button>
            </form>

            <button style={estilos.btnVolver} onClick={onVolver}>
                ← Volver a la lista
            </button>
        </div>
    );
};

const estilos = {
    contenedor:  { padding: '24px', backgroundColor: '#f5ede0', minHeight: '100vh' },
    titulo:      { color: '#1a0f08', borderBottom: '2px solid #c49a4a', paddingBottom: '8px' },
    infoActual:  { backgroundColor: 'white', padding: '16px', borderRadius: '8px',
                   maxWidth: '480px', marginBottom: '16px', border: '1px solid #c49a4a' },
    form:        { backgroundColor: 'white', padding: '24px', borderRadius: '8px',
                   maxWidth: '480px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    label:       { display: 'block', marginBottom: '4px', color: '#1a0f08', fontWeight: 'bold' },
    input:       { width: '100%', padding: '8px', marginBottom: '4px',
                   border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    error:       { color: '#bf3d3d', fontSize: '12px', marginBottom: '12px', marginTop: '2px' },
    btnReagendar:{ backgroundColor: '#f0ad4e', color: 'white', padding: '10px 20px',
                   border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px',
                   marginTop: '8px' },
    btnVolver:   { backgroundColor: 'transparent', color: '#c49a4a', border: 'none',
                   cursor: 'pointer', marginTop: '12px', fontSize: '14px' },
};

export default CitaReagendar;