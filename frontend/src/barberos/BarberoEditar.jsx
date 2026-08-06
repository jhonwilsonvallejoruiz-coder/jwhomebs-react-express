// Componente formulario para editar un barbero existente con validaciones
import { useState, useEffect } from 'react';
import { obtenerBarberoPorId, actualizarBarbero } from '../services/barberoService';

const BarberoEditar = ({ idBarbero, onVolver }) => {
    const [formulario, setFormulario] = useState({
        nombreBarbero:       '',
        correoBarbero:       '',
        especialidadBarbero: '',
    });

    // Estado para almacenar los errores de validación por campo
    const [errores, setErrores] = useState({});

    // Cargar los datos actuales del barbero al montar el componente
    useEffect(() => {
        const cargarBarbero = async () => {
            const data = await obtenerBarberoPorId(idBarbero);
            setFormulario({
                nombreBarbero:       data.nombre_barbero,
                correoBarbero:       data.correo_barbero,
                especialidadBarbero: data.especialidad_barbero,
            });
        };
        cargarBarbero();
    }, [idBarbero]);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
    };

    // Función que valida todos los campos antes de enviar
    const validarFormulario = () => {
        const nuevosErrores = {};

        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
        if (!formulario.nombreBarbero.trim()) {
            nuevosErrores.nombreBarbero = 'El nombre es obligatorio.';
        } else if (!regexNombre.test(formulario.nombreBarbero)) {
            nuevosErrores.nombreBarbero = 'El nombre solo debe contener letras y espacios.';
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formulario.correoBarbero.trim()) {
            nuevosErrores.correoBarbero = 'El correo es obligatorio.';
        } else if (!regexCorreo.test(formulario.correoBarbero)) {
            nuevosErrores.correoBarbero = 'Ingrese un correo electrónico válido.';
        }

        if (!formulario.especialidadBarbero.trim()) {
            nuevosErrores.especialidadBarbero = 'La especialidad es obligatoria.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        await actualizarBarbero(idBarbero, formulario);
        onVolver();
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Editar Barbero</h2>
            <form onSubmit={handleSubmit} style={estilos.form}>

                <label style={estilos.label}>Nombre:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="nombreBarbero"
                    value={formulario.nombreBarbero}
                    onChange={handleChange}
                />
                {errores.nombreBarbero &&
                    <p style={estilos.error}>{errores.nombreBarbero}</p>}

                <label style={estilos.label}>Correo:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="correoBarbero"
                    value={formulario.correoBarbero}
                    onChange={handleChange}
                />
                {errores.correoBarbero &&
                    <p style={estilos.error}>{errores.correoBarbero}</p>}

                <label style={estilos.label}>Especialidad:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="especialidadBarbero"
                    value={formulario.especialidadBarbero}
                    onChange={handleChange}
                />
                {errores.especialidadBarbero &&
                    <p style={estilos.error}>{errores.especialidadBarbero}</p>}

                <button type="submit" style={estilos.btnActualizar}>
                    Actualizar Barbero
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

export default BarberoEditar;