// Componente que muestra la lista de todas las citas registradas
import { useEffect, useState } from 'react';
import { obtenerCitas, actualizarEstadoCita, eliminarCita } from '../services/citaService';

const CitaLista = ({ onNueva, onReagendar }) => {
    const [citas, setCitas]     = useState([]);
    const [mensaje, setMensaje] = useState('');

    // Cargar citas al montar el componente
    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarCitas = async () => {
        const data = await obtenerCitas();
        setCitas(data);
    };

    // Actualizar el estado de una cita
    const handleEstado = async (id, nuevoEstado) => {
        await actualizarEstadoCita(id, nuevoEstado);
        setMensaje(`Estado actualizado a: ${nuevoEstado}`);
        cargarCitas();
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Deseas eliminar esta cita?')) {
            await eliminarCita(id);
            setMensaje('Cita eliminada correctamente.');
            cargarCitas();
        }
    };

    // Definir color del estado de la cita
    const colorEstado = (estado) => {
        const colores = {
            pendiente:   '#f0ad4e',
            confirmada:  '#5cb85c',
            cancelada:   '#d9534f',
            completada:  '#5bc0de',
        };
        return colores[estado] || '#999';
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>JW Home Barber Studio — Citas</h2>

            {mensaje && <p style={estilos.mensaje}>{mensaje}</p>}

            <button style={estilos.btnNuevo} onClick={onNueva}>
                + Nueva Cita
            </button>

            <table style={estilos.tabla}>
                <thead>
                    <tr>
                        <th style={estilos.th}>ID</th>
                        <th style={estilos.th}>Fecha</th>
                        <th style={estilos.th}>Hora</th>
                        <th style={estilos.th}>Cliente</th>
                        <th style={estilos.th}>Barbero</th>
                        <th style={estilos.th}>Servicio</th>
                        <th style={estilos.th}>Estado</th>
                        <th style={estilos.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.length > 0 ? (
                        citas.map((c) => (
                            <tr key={c.id_cita}>
                                <td style={estilos.td}>{c.id_cita}</td>
                                <td style={estilos.td}>{c.fecha_cita?.split('T')[0]}</td>
                                <td style={estilos.td}>{c.hora_cita}</td>
                                <td style={estilos.td}>{c.nombre_cliente}</td>
                                <td style={estilos.td}>{c.nombre_barbero}</td>
                                <td style={estilos.td}>{c.nombre_servicio}</td>
                                <td style={estilos.td}>
                                    <span style={{
                                        ...estilos.badge,
                                        backgroundColor: colorEstado(c.estado_cita)
                                    }}>
                                        {c.estado_cita}
                                    </span>
                                </td>
                                <td style={estilos.td}>
                                    {/* Selector de estado */}
                                    <select
                                        style={estilos.select}
                                        value={c.estado_cita}
                                        onChange={(e) => handleEstado(c.id_cita, e.target.value)}>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="confirmada">Confirmada</option>
                                        <option value="cancelada">Cancelada</option>
                                        <option value="completada">Completada</option>
                                    </select>
                                    <button
                                        style={estilos.btnReagendar}
                                        onClick={() => onReagendar(c.id_cita)}>
                                        Reagendar
                                    </button>
                                    <button
                                        style={estilos.btnEliminar}
                                        onClick={() => handleEliminar(c.id_cita)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={estilos.td}>
                                No hay citas registradas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const estilos = {
    contenedor:   { padding: '24px', backgroundColor: '#f5ede0', minHeight: '100vh' },
    titulo:       { color: '#1a0f08', borderBottom: '2px solid #c49a4a', paddingBottom: '8px' },
    mensaje:      { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px' },
    btnNuevo:     { backgroundColor: '#c49a4a', color: 'white', padding: '10px 20px',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' },
    tabla:        { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' },
    th:           { backgroundColor: '#1a0f08', color: '#c49a4a', padding: '10px', textAlign: 'center' },
    td:           { padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'center' },
    badge:        { padding: '4px 8px', borderRadius: '12px', color: 'white',
                    fontSize: '12px', fontWeight: 'bold' },
    select:       { padding: '4px', borderRadius: '4px', border: '1px solid #ccc',
                    marginRight: '6px', fontSize: '12px' },
    btnReagendar: { backgroundColor: '#f0ad4e', color: 'white', padding: '4px 8px',
                    border: 'none', borderRadius: '4px', cursor: 'pointer',
                    marginRight: '6px', fontSize: '12px' },
    btnEliminar:  { backgroundColor: '#bf3d3d', color: 'white', padding: '4px 8px',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
};

export default CitaLista;