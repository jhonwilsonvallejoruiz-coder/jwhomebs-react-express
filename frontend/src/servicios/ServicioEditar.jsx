// Componente formulario para editar un servicio existente con validaciones
import { useState, useEffect } from 'react';
import { obtenerServicioPorId, actualizarServicio } from '../services/servicioService';

const ServicioEditar = ({ idServicio, onVolver }) => {
    const [formulario, setFormulario] = useState({
        nombreServicio:   '',
        precioServicio:   '',
        duracionServicio: '',
    });

    // Estado para almacenar los errores de validación por campo
    const [errores, setErrores] = useState({});

    // Cargar los datos actuales del servicio al montar el componente
    useEffect(() => {
        const cargarServicio = async () => {
            const data = await obtenerServicioPorId(idServicio);
            setFormulario({
                nombreServicio:   data.nombre_servicio,
                precioServicio:   data.precio_servicio,
                duracionServicio: data.duracion_servicio,
            });
        };
        cargarServicio();
    }, [idServicio]);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
    };

    // Función que valida todos los campos antes de enviar
    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formulario.nombreServicio.trim()) {
            nuevosErrores.nombreServicio = 'El nombre del servicio es obligatorio.';
        } else if (formulario.nombreServicio.trim().length < 3) {
            nuevosErrores.nombreServicio = 'El nombre debe tener mínimo 3 caracteres.';
        }

        if (!formulario.precioServicio) {
            nuevosErrores.precioServicio = 'El precio es obligatorio.';
        } else if (isNaN(formulario.precioServicio) || Number(formulario.precioServicio) <= 0) {
            nuevosErrores.precioServicio = 'El precio debe ser un número mayor a 0.';
        }

        if (!formulario.duracionServicio) {
            nuevosErrores.duracionServicio = 'La duración es obligatoria.';
        } else if (!Number.isInteger(Number(formulario.duracionServicio)) ||
                   Number(formulario.duracionServicio) <= 0) {
            nuevosErrores.duracionServicio = 'La duración debe ser un número entero positivo en minutos.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        await actualizarServicio(idServicio, formulario);
        onVolver();
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Editar Servicio</h2>
            <form onSubmit={handleSubmit} style={estilos.form}>

                <label style={estilos.label}>Nombre del servicio:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="nombreServicio"
                    value={formulario.nombreServicio}
                    onChange={handleChange}
                />
                {errores.nombreServicio &&
                    <p style={estilos.error}>{errores.nombreServicio}</p>}

                <label style={estilos.label}>Precio (COP):</label>
                <input
                    style={estilos.input}
                    type="number"
                    name="precioServicio"
                    value={formulario.precioServicio}
                    onChange={handleChange}
                />
                {errores.precioServicio &&
                    <p style={estilos.error}>{errores.precioServicio}</p>}

                <label style={estilos.label}>Duración (minutos):</label>
                <input
                    style={estilos.input}
                    type="number"
                    name="duracionServicio"
                    value={formulario.duracionServicio}
                    onChange={handleChange}
                />
                {errores.duracionServicio &&
                    <p style={estilos.error}>{errores.duracionServicio}</p>}

                <button type="submit" style={estilos.btnActualizar}>
                    Actualizar Servicio
                </button>
            </form>

            <button style={estilos.btnVolver} onClick={onVolver}>
                ← Volver a la lista
            </button>
        </div>
    );
};

const estilos = {
    contenedor:    { padding: '24px', backgroundColor: '#f5ede0', minHeight: '100vh' },
    titulo:        { color: '#1a0f08', borderBottom: '2px solid #c49a4a', paddingBottom: '8px' },
    form:          { backgroundColor: 'white', padding: '24px', borderRadius: '8px',
                     maxWidth: '480px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    label:         { display: 'block', marginBottom: '4px', color: '#1a0f08', fontWeight: 'bold' },
    input:         { width: '100%', padding: '8px', marginBottom: '4px',
                     border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    error:         { color: '#bf3d3d', fontSize: '12px', marginBottom: '12px', marginTop: '2px' },
    btnActualizar: { backgroundColor: '#3d7ebf', color: 'white', padding: '10px 20px',
                     border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px',
                     marginTop: '8px' },
    btnVolver:     { backgroundColor: 'transparent', color: '#c49a4a', border: 'none',
                     cursor: 'pointer', marginTop: '12px', fontSize: '14px' },
};

export default ServicioEditar;