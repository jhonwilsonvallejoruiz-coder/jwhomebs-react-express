// Componente formulario para registrar un nuevo cliente con validaciones
import { useState } from 'react';
import { crearCliente } from '../services/clienteService';

const ClienteFormulario = ({ onVolver }) => {
    const [formulario, setFormulario] = useState({
        nombreCliente:   '',
        correoCliente:   '',
        telefonoCliente: '',
    });

    // Estado para almacenar los errores de validación por campo
    const [errores, setErrores] = useState({});

    // Actualiza el estado del formulario al escribir en cada campo
    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        // Limpiar el error del campo cuando el usuario empieza a corregir
        setErrores({ ...errores, [e.target.name]: '' });
    };

    // Función que valida todos los campos antes de enviar
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validación del nombre: solo letras y espacios, entre 3 y 50 caracteres
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
        if (!formulario.nombreCliente.trim()) {
            nuevosErrores.nombreCliente = 'El nombre es obligatorio.';
        } else if (!regexNombre.test(formulario.nombreCliente)) {
            nuevosErrores.nombreCliente = 'El nombre solo debe contener letras y espacios (mínimo 3, máximo 50 caracteres).';
        }

        // Validación del correo: formato válido con @ y dominio
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formulario.correoCliente.trim()) {
            nuevosErrores.correoCliente = 'El correo es obligatorio.';
        } else if (!regexCorreo.test(formulario.correoCliente)) {
            nuevosErrores.correoCliente = 'Ingrese un correo electrónico válido (ejemplo: correo@dominio.com).';
        }

        // Validación del teléfono: solo números, exactamente 10 dígitos
        const regexTelefono = /^[0-9]{10}$/;
        if (!formulario.telefonoCliente.trim()) {
            nuevosErrores.telefonoCliente = 'El teléfono es obligatorio.';
        } else if (!regexTelefono.test(formulario.telefonoCliente)) {
            nuevosErrores.telefonoCliente = 'El teléfono debe contener exactamente 10 dígitos numéricos.';
        }

        setErrores(nuevosErrores);
        // Retorna true si no hay errores
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Solo envía si todas las validaciones pasan
        if (!validarFormulario()) return;
        await crearCliente(formulario);
        onVolver();
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Registrar Nuevo Cliente</h2>
            <form onSubmit={handleSubmit} style={estilos.form}>

                <label style={estilos.label}>Nombre:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="nombreCliente"
                    placeholder="Nombre completo (solo letras)"
                    value={formulario.nombreCliente}
                    onChange={handleChange}
                />
                {/* Mensaje de error del campo nombre */}
                {errores.nombreCliente &&
                    <p style={estilos.error}>{errores.nombreCliente}</p>}

                <label style={estilos.label}>Correo:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="correoCliente"
                    placeholder="correo@ejemplo.com"
                    value={formulario.correoCliente}
                    onChange={handleChange}
                />
                {/* Mensaje de error del campo correo */}
                {errores.correoCliente &&
                    <p style={estilos.error}>{errores.correoCliente}</p>}

                <label style={estilos.label}>Teléfono:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="telefonoCliente"
                    placeholder="10 dígitos numéricos"
                    value={formulario.telefonoCliente}
                    onChange={handleChange}
                />
                {/* Mensaje de error del campo teléfono */}
                {errores.telefonoCliente &&
                    <p style={estilos.error}>{errores.telefonoCliente}</p>}

                <button type="submit" style={estilos.btnGuardar}>
                    Guardar Cliente
                </button>
            </form>

            <button style={estilos.btnVolver} onClick={onVolver}>
                ← Volver a la lista
            </button>
        </div>
    );
};

const estilos = {
    contenedor: { padding: '24px', backgroundColor: '#f5ede0', minHeight: '100vh' },
    titulo:     { color: '#1a0f08', borderBottom: '2px solid #c49a4a', paddingBottom: '8px' },
    form:       { backgroundColor: 'white', padding: '24px', borderRadius: '8px',
                  maxWidth: '480px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    label:      { display: 'block', marginBottom: '4px', color: '#1a0f08', fontWeight: 'bold' },
    input:      { width: '100%', padding: '8px', marginBottom: '4px',
                  border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    error:      { color: '#bf3d3d', fontSize: '12px', marginBottom: '12px', marginTop: '2px' },
    btnGuardar: { backgroundColor: '#c49a4a', color: 'white', padding: '10px 20px',
                  border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px',
                  marginTop: '8px' },
    btnVolver:  { backgroundColor: 'transparent', color: '#c49a4a', border: 'none',
                  cursor: 'pointer', marginTop: '12px', fontSize: '14px' },
};

export default ClienteFormulario;