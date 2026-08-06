// Componente formulario para registrar una nueva cita con validaciones
import { useState, useEffect } from 'react';
import { crearCita } from '../services/citaService';
import { obtenerClientes } from '../services/clienteService';
import { obtenerBarberos } from '../services/barberoService';
import { obtenerServicios } from '../services/servicioService';

const CitaFormulario = ({ onVolver }) => {
    const [formulario, setFormulario] = useState({
        fechaCita:  '',
        horaCita:   '',
        idCliente:  '',
        idBarbero:  '',
        idServicio: '',
    });

    // Listas para los selectores
    const [clientes,  setClientes]  = useState([]);
    const [barberos,  setBarberos]  = useState([]);
    const [servicios, setServicios] = useState([]);
    const [errores,   setErrores]   = useState({});

    // Cargar datos de clientes, barberos y servicios al montar
    useEffect(() => {
        const cargarDatos = async () => {
            const [dataClientes, dataBarberos, dataServicios] = await Promise.all([
                obtenerClientes(),
                obtenerBarberos(),
                obtenerServicios(),
            ]);
            setClientes(dataClientes);
            setBarberos(dataBarberos);
            setServicios(dataServicios);
        };
        cargarDatos();
    }, []);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
    };

    // Función que valida todos los campos antes de enviar
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validación de fecha: obligatoria y no puede ser en el pasado
        if (!formulario.fechaCita) {
            nuevosErrores.fechaCita = 'La fecha es obligatoria.';
        } else if (new Date(formulario.fechaCita) < new Date().setHours(0, 0, 0, 0)) {
            nuevosErrores.fechaCita = 'La fecha no puede ser en el pasado.';
        }

        // Validación de hora: obligatoria
        if (!formulario.horaCita) {
            nuevosErrores.horaCita = 'La hora es obligatoria.';
        }

        // Validación de cliente: obligatorio
        if (!formulario.idCliente) {
            nuevosErrores.idCliente = 'Debe seleccionar un cliente.';
        }

        // Validación de barbero: obligatorio
        if (!formulario.idBarbero) {
            nuevosErrores.idBarbero = 'Debe seleccionar un barbero.';
        }

        // Validación de servicio: obligatorio
        if (!formulario.idServicio) {
            nuevosErrores.idServicio = 'Debe seleccionar un servicio.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        await crearCita(formulario);
        onVolver();
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Registrar Nueva Cita</h2>
            <form onSubmit={handleSubmit} style={estilos.form}>

                <label style={estilos.label}>Fecha:</label>
                <input
                    style={estilos.input}
                    type="date"
                    name="fechaCita"
                    value={formulario.fechaCita}
                    onChange={handleChange}
                />
                {errores.fechaCita &&
                    <p style={estilos.error}>{errores.fechaCita}</p>}

                <label style={estilos.label}>Hora:</label>
                <input
                    style={estilos.input}
                    type="time"
                    name="horaCita"
                    value={formulario.horaCita}
                    onChange={handleChange}
                />
                {errores.horaCita &&
                    <p style={estilos.error}>{errores.horaCita}</p>}

                <label style={estilos.label}>Cliente:</label>
                <select
                    style={estilos.input}
                    name="idCliente"
                    value={formulario.idCliente}
                    onChange={handleChange}>
                    <option value="">-- Seleccione un cliente --</option>
                    {clientes.map((c) => (
                        <option key={c.id_cliente} value={c.id_cliente}>
                            {c.nombre_cliente}
                        </option>
                    ))}
                </select>
                {errores.idCliente &&
                    <p style={estilos.error}>{errores.idCliente}</p>}

                <label style={estilos.label}>Barbero:</label>
                <select
                    style={estilos.input}
                    name="idBarbero"
                    value={formulario.idBarbero}
                    onChange={handleChange}>
                    <option value="">-- Seleccione un barbero --</option>
                    {barberos.map((b) => (
                        <option key={b.id_barbero} value={b.id_barbero}>
                            {b.nombre_barbero}
                        </option>
                    ))}
                </select>
                {errores.idBarbero &&
                    <p style={estilos.error}>{errores.idBarbero}</p>}

                <label style={estilos.label}>Servicio:</label>
                <select
                    style={estilos.input}
                    name="idServicio"
                    value={formulario.idServicio}
                    onChange={handleChange}>
                    <option value="">-- Seleccione un servicio --</option>
                    {servicios.map((s) => (
                        <option key={s.id_servicio} value={s.id_servicio}>
                            {s.nombre_servicio} — $ {Number(s.precio_servicio).toLocaleString('es-CO')}
                        </option>
                    ))}
                </select>
                {errores.idServicio &&
                    <p style={estilos.error}>{errores.idServicio}</p>}

                <button type="submit" style={estilos.btnGuardar}>
                    Guardar Cita
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

export default CitaFormulario;