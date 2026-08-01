// Componente formulario para editar un cliente existente
import { useState, useEffect } from 'react';
import { obtenerClientePorId, actualizarCliente } from '../services/clienteService';

const ClienteEditar = ({ idCliente, onVolver }) => {
    const [formulario, setFormulario] = useState({
        nombreCliente:   '',
        correoCliente:   '',
        telefonoCliente: '',
    });

    // Cargar los datos actuales del cliente al montar el componente
    useEffect(() => {
        const cargarCliente = async () => {
            const data = await obtenerClientePorId(idCliente);
            setFormulario({
                nombreCliente:   data.nombre_cliente,
                correoCliente:   data.correo_cliente,
                telefonoCliente: data.telefono_cliente,
            });
        };
        cargarCliente();
    }, [idCliente]);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actualizarCliente(idCliente, formulario);
        onVolver();
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Editar Cliente</h2>
            <form onSubmit={handleSubmit} style={estilos.form}>

                <label style={estilos.label}>Nombre:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="nombreCliente"
                    value={formulario.nombreCliente}
                    onChange={handleChange}
                    required
                />

                <label style={estilos.label}>Correo:</label>
                <input
                    style={estilos.input}
                    type="email"
                    name="correoCliente"
                    value={formulario.correoCliente}
                    onChange={handleChange}
                    required
                />

                <label style={estilos.label}>Teléfono:</label>
                <input
                    style={estilos.input}
                    type="text"
                    name="telefonoCliente"
                    value={formulario.telefonoCliente}
                    onChange={handleChange}
                    required
                />

                <button type="submit" style={estilos.btnActualizar}>
                    Actualizar Cliente
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
    input:         { width: '100%', padding: '8px', marginBottom: '16px',
                     border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    btnActualizar: { backgroundColor: '#3d7ebf', color: 'white', padding: '10px 20px',
                     border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' },
    btnVolver:     { backgroundColor: 'transparent', color: '#c49a4a', border: 'none',
                     cursor: 'pointer', marginTop: '12px', fontSize: '14px' },
};

export default ClienteEditar;