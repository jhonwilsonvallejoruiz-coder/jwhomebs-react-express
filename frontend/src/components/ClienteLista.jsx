// Componente que muestra la lista de todos los clientes registrados
import { useEffect, useState } from 'react';
import { obtenerClientes, eliminarCliente } from '../services/clienteService';

const ClienteLista = ({ onEditar, onNuevo }) => {
    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje]   = useState('');

    // Cargar clientes al montar el componente
    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        const data = await obtenerClientes();
        setClientes(data);
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Deseas eliminar este cliente?')) {
            await eliminarCliente(id);
            setMensaje('Cliente eliminado correctamente.');
            cargarClientes();
        }
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>JW Home Barber Studio — Clientes</h2>

            {mensaje && <p style={estilos.mensaje}>{mensaje}</p>}

            <button style={estilos.btnNuevo} onClick={onNuevo}>
                + Nuevo Cliente
            </button>

            <table style={estilos.tabla}>
                <thead>
                    <tr>
                        <th style={estilos.th}>ID</th>
                        <th style={estilos.th}>Nombre</th>
                        <th style={estilos.th}>Correo</th>
                        <th style={estilos.th}>Teléfono</th>
                        <th style={estilos.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((c) => (
                            <tr key={c.id_cliente}>
                                <td style={estilos.td}>{c.id_cliente}</td>
                                <td style={estilos.td}>{c.nombre_cliente}</td>
                                <td style={estilos.td}>{c.correo_cliente}</td>
                                <td style={estilos.td}>{c.telefono_cliente}</td>
                                <td style={estilos.td}>
                                    <button
                                        style={estilos.btnEditar}
                                        onClick={() => onEditar(c.id_cliente)}>
                                        Editar
                                    </button>
                                    <button
                                        style={estilos.btnEliminar}
                                        onClick={() => handleEliminar(c.id_cliente)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={estilos.td}>
                                No hay clientes registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Estilos con la paleta visual de JW HOMEBS
const estilos = {
    contenedor: { padding: '24px', backgroundColor: '#f5ede0', minHeight: '100vh' },
    titulo:     { color: '#1a0f08', borderBottom: '2px solid #c49a4a', paddingBottom: '8px' },
    mensaje:    { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px' },
    btnNuevo:   { backgroundColor: '#c49a4a', color: 'white', padding: '10px 20px',
                  border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' },
    tabla:      { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' },
    th:         { backgroundColor: '#1a0f08', color: '#c49a4a', padding: '10px', textAlign: 'center' },
    td:         { padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' },
    btnEditar:  { backgroundColor: '#3d7ebf', color: 'white', padding: '6px 12px',
                  border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' },
    btnEliminar:{ backgroundColor: '#bf3d3d', color: 'white', padding: '6px 12px',
                  border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default ClienteLista;