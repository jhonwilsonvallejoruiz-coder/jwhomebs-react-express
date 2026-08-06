// Componente que muestra la lista de todos los servicios registrados
import { useEffect, useState } from 'react';
import { obtenerServicios, eliminarServicio } from '../services/servicioService';

const ServicioLista = ({ onEditar, onNuevo }) => {
    const [servicios, setServicios] = useState([]);
    const [mensaje, setMensaje]     = useState('');

    // Cargar servicios al montar el componente
    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        const data = await obtenerServicios();
        setServicios(data);
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Deseas eliminar este servicio?')) {
            await eliminarServicio(id);
            setMensaje('Servicio eliminado correctamente.');
            cargarServicios();
        }
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>JW Home Barber Studio — Servicios</h2>

            {mensaje && <p style={estilos.mensaje}>{mensaje}</p>}

            <button style={estilos.btnNuevo} onClick={onNuevo}>
                + Nuevo Servicio
            </button>

            <table style={estilos.tabla}>
                <thead>
                    <tr>
                        <th style={estilos.th}>ID</th>
                        <th style={estilos.th}>Nombre</th>
                        <th style={estilos.th}>Precio (COP)</th>
                        <th style={estilos.th}>Duración (min)</th>
                        <th style={estilos.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.length > 0 ? (
                        servicios.map((s) => (
                            <tr key={s.id_servicio}>
                                <td style={estilos.td}>{s.id_servicio}</td>
                                <td style={estilos.td}>{s.nombre_servicio}</td>
                                <td style={estilos.td}>$ {Number(s.precio_servicio).toLocaleString('es-CO')}</td>
                                <td style={estilos.td}>{s.duracion_servicio} min</td>
                                <td style={estilos.td}>
                                    <button
                                        style={estilos.btnEditar}
                                        onClick={() => onEditar(s.id_servicio)}>
                                        Editar
                                    </button>
                                    <button
                                        style={estilos.btnEliminar}
                                        onClick={() => handleEliminar(s.id_servicio)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={estilos.td}>
                                No hay servicios registrados.
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

export default ServicioLista;