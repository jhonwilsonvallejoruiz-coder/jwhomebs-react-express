// Componente formulario para registrar un nuevo usuario en JW HOMEBS
import { useState } from 'react';
import { registrarUsuario } from '../services/authService';

const Registro = ({ onIrALogin }) => {
    const [formulario, setFormulario] = useState({
        nombre:   '',
        correo:   '',
        password: '',
        rol:      'cliente',
    });

    // Estado para mensajes de éxito o error
    const [mensaje,  setMensaje]  = useState('');
    const [esError,  setEsError]  = useState(false);
    const [errores,  setErrores]  = useState({});
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
    };

    // Función que valida todos los campos antes de enviar
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validación del nombre: solo letras y espacios
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
        if (!formulario.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        } else if (!regexNombre.test(formulario.nombre)) {
            nuevosErrores.nombre = 'El nombre solo debe contener letras (mínimo 3 caracteres).';
        }

        // Validación del correo: formato válido
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formulario.correo.trim()) {
            nuevosErrores.correo = 'El correo es obligatorio.';
        } else if (!regexCorreo.test(formulario.correo)) {
            nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
        }

        // Validación del password: mínimo 6 caracteres
        if (!formulario.password) {
            nuevosErrores.password = 'La contraseña es obligatoria.';
        } else if (formulario.password.length < 6) {
            nuevosErrores.password = 'La contraseña debe tener mínimo 6 caracteres.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setCargando(true);
        try {
            const respuesta = await registrarUsuario(formulario);
            setMensaje(respuesta.mensaje);
            setEsError(false);
            // Limpiar formulario después del registro exitoso
            setFormulario({ nombre: '', correo: '', password: '', rol: 'cliente' });
        } catch (error) {
            // Mostrar mensaje de error del backend
            setMensaje(error.response?.data?.mensaje || 'Error al registrar el usuario.');
            setEsError(true);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.card}>
                <h2 style={estilos.titulo}>✂ JW Home Barber Studio</h2>
                <h3 style={estilos.subtitulo}>Crear cuenta</h3>

                {/* Mensaje de éxito o error */}
                {mensaje && (
                    <p style={esError ? estilos.error : estilos.exito}>
                        {mensaje}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={estilos.label}>Nombre completo:</label>
                    <input
                        style={estilos.input}
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre completo"
                        value={formulario.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre &&
                        <p style={estilos.errorCampo}>{errores.nombre}</p>}

                    <label style={estilos.label}>Correo electrónico:</label>
                    <input
                        style={estilos.input}
                        type="text"
                        name="correo"
                        placeholder="correo@ejemplo.com"
                        value={formulario.correo}
                        onChange={handleChange}
                    />
                    {errores.correo &&
                        <p style={estilos.errorCampo}>{errores.correo}</p>}

                    <label style={estilos.label}>Contraseña:</label>
                    <input
                        style={estilos.input}
                        type="password"
                        name="password"
                        placeholder="Mínimo 6 caracteres"
                        value={formulario.password}
                        onChange={handleChange}
                    />
                    {errores.password &&
                        <p style={estilos.errorCampo}>{errores.password}</p>}

                    <label style={estilos.label}>Rol:</label>
                    <select
                        style={estilos.input}
                        name="rol"
                        value={formulario.rol}
                        onChange={handleChange}>
                        <option value="cliente">Cliente</option>
                        <option value="barbero">Barbero</option>
                        <option value="admin">Administrador</option>
                    </select>

                    <button
                        type="submit"
                        style={estilos.btnPrincipal}
                        disabled={cargando}>
                        {cargando ? 'Registrando...' : 'Crear cuenta'}
                    </button>
                </form>

                <p style={estilos.textoLink}>
                    ¿Ya tienes cuenta?{' '}
                    <span style={estilos.link} onClick={onIrALogin}>
                        Inicia sesión
                    </span>
                </p>
            </div>
        </div>
    );
};

const estilos = {
    contenedor:  { minHeight: '100vh', backgroundColor: '#1a0f08',
                   display: 'flex', justifyContent: 'center', alignItems: 'center' },
    card:        { backgroundColor: '#f5ede0', padding: '40px', borderRadius: '12px',
                   width: '100%', maxWidth: '420px',
                   boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
    titulo:      { color: '#1a0f08', textAlign: 'center', marginBottom: '4px', fontSize: '22px' },
    subtitulo:   { color: '#3d2010', textAlign: 'center', marginBottom: '20px',
                   fontWeight: 'normal', fontSize: '16px' },
    label:       { display: 'block', marginBottom: '4px', color: '#1a0f08', fontWeight: 'bold',
                   fontSize: '14px' },
    input:       { width: '100%', padding: '10px', marginBottom: '4px',
                   border: '1px solid #ccc', borderRadius: '4px',
                   boxSizing: 'border-box', fontSize: '14px' },
    errorCampo:  { color: '#bf3d3d', fontSize: '12px', marginBottom: '10px', marginTop: '2px' },
    exito:       { backgroundColor: '#d4edda', color: '#155724', padding: '10px',
                   borderRadius: '4px', marginBottom: '16px', textAlign: 'center' },
    error:       { backgroundColor: '#f8d7da', color: '#721c24', padding: '10px',
                   borderRadius: '4px', marginBottom: '16px', textAlign: 'center' },
    btnPrincipal:{ width: '100%', backgroundColor: '#c49a4a', color: 'white',
                   padding: '12px', border: 'none', borderRadius: '4px',
                   cursor: 'pointer', fontSize: '16px', marginTop: '8px',
                   fontWeight: 'bold' },
    textoLink:   { textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#3d2010' },
    link:        { color: '#c49a4a', cursor: 'pointer', fontWeight: 'bold' },
};

export default Registro;