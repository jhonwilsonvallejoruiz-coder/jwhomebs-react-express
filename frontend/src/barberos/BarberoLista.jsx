// Componente que muestra la lista de todos los barberos registrados
import { useEffect, useState } from 'react';
import { obtenerBarberos, eliminarBarbero } from '../services/barberoService';

const BarberoLista = ({ onEditar, onNuevo }) => {
    const [barberos, setBarberos] = useState([]);
    const [mensaje, setMensaje]   = useState('');

    // Cargar barberos al montar el componente
    useEffect(() => {
        cargarBarberos();
    }, []);

    const cargarBarberos = async () => {
        const data = await obtenerBarberos();
        setBarberos(data);
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Deseas eliminar este barbero?')) {
            await eliminarBarbero(id);
            setMensaje('Barbero eliminado correctamente.');
            cargarBarberos();
        }
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>JW Home Barber Studio — Barberos</h2>

            {mensaje && <p style={estilos.mensaje}>{mensaje}</p>}

            <button style={estilos.btnNuevo} onClick={onNuevo}>
                + Nuevo Barbero
            </button>

            <table style={estilos.tabla}>
                <thead>
                    <tr>
                        <th style={estilos.th}>ID</th>
                        <th style={estilos.th}>Nombre</th>
                        <th style={estilos.th}>Correo</th>
                        <th style={estilos.th}>Especialidad</th>
                        <th style={estilos.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {barberos.length > 0 ? (
                        barberos.map((b) => (
                            <tr key={b.id_barbero}>
                                <td style={estilos.td}>{b.id_barbero}</td>
                                <td style={estilos.td}>{b.nombre_barbero}</td>
                                <td style={estilos.td}>{b.correo_barbero}</td>
                                <td style={estilos.td}>{b.especialidad_barbero}</td>
                                <td style={estilos.td}>
                                    <button
                                        style={estilos.btnEditar}
                                        onClick={() => onEditar(b.id_barbero)}>
                                        Editar
                                    </button>
                                    <button
                                        style={estilos.btnEliminar}
                                        onClick={() => handleEliminar(b.id_barbero)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={estilos.td}>
                                No hay barberos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const estilos = {
    contenedor:  { padding: '24px', backgroundColor: '#f5ede0', minHeight: '100vh' },
    titulo:      { color: '#1a0f08', borderBottom: '2px solid #c49a4a', paddingBottom: '8px' },
    mensaje:     { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px' },
    btnNuevo:    { backgroundColor: '#c49a4a', color: 'white', padding: '10px 20px',
                   border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' },
    tabla:       { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' },
    th:          { backgroundColor: '#1a0f08', color: '#c49a4a', padding: '10px', textAlign: 'center' },
    td:          { padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' },
    btnEditar:   { backgroundColor: '#3d7ebf', color: 'white', padding: '6px 12px',
                   border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' },
    btnEliminar: { backgroundColor: '#bf3d3d', color: 'white', padding: '6px 12px',
                   border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default BarberoLista;