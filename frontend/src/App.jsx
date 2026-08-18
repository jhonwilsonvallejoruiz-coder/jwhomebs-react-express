// Componente principal que gestiona autenticación y navegación entre módulos
import { useState } from 'react';

// Importar componentes de autenticación
import Login   from './components/Login';
import Registro from './components/Registro';

// Importar componentes del módulo de clientes
import ClienteLista      from './components/ClienteLista';
import ClienteFormulario from './components/ClienteFormulario';
import ClienteEditar     from './components/ClienteEditar';

// Importar componentes del módulo de barberos
import BarberoLista      from './barberos/BarberoLista';
import BarberoFormulario from './barberos/BarberoFormulario';
import BarberoEditar     from './barberos/BarberoEditar';

// Importar componentes del módulo de servicios
import ServicioLista      from './servicios/ServicioLista';
import ServicioFormulario from './servicios/ServicioFormulario';
import ServicioEditar     from './servicios/ServicioEditar';

// Importar componentes del módulo de citas
import CitaLista      from './citas/CitaLista';
import CitaFormulario from './citas/CitaFormulario';
import CitaReagendar  from './citas/CitaReagendar';

const App = () => {
    // Estado de autenticación
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [vistaAuth, setVistaAuth]         = useState('login');

    // Estado de navegación del sistema
    const [moduloActivo, setModuloActivo] = useState('clientes');
    const [vista, setVista]               = useState('lista');
    const [idActivo, setIdActivo]         = useState(null);

    // Manejar login exitoso
    const handleLoginExitoso = (usuario) => {
        setUsuarioActivo(usuario);
    };

    // Cerrar sesión
    const handleCerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuarioActivo(null);
        setVistaAuth('login');
        setModuloActivo('clientes');
        setVista('lista');
    };

    // Funciones de navegación entre vistas
    const irALista     = ()   => setVista('lista');
    const irANuevo     = ()   => setVista('nuevo');
    const irAEditar    = (id) => { setIdActivo(id); setVista('editar'); };
    const irAReagendar = (id) => { setIdActivo(id); setVista('reagendar'); };

    const cambiarModulo = (modulo) => {
        setModuloActivo(modulo);
        setVista('lista');
        setIdActivo(null);
    };

    // Renderizar vista de autenticación si no hay usuario activo
    if (!usuarioActivo) {
        return vistaAuth === 'login'
            ? <Login
                onIrARegistro={() => setVistaAuth('registro')}
                onLoginExitoso={handleLoginExitoso}
              />
            : <Registro
                onIrALogin={() => setVistaAuth('login')}
              />;
    }

    // Renderizar el módulo activo
    const renderizarVista = () => {
        if (moduloActivo === 'clientes') {
            if (vista === 'lista')  return <ClienteLista onNuevo={irANuevo} onEditar={irAEditar} />;
            if (vista === 'nuevo')  return <ClienteFormulario onVolver={irALista} />;
            if (vista === 'editar') return <ClienteEditar idCliente={idActivo} onVolver={irALista} />;
        }
        if (moduloActivo === 'barberos') {
            if (vista === 'lista')  return <BarberoLista onNuevo={irANuevo} onEditar={irAEditar} />;
            if (vista === 'nuevo')  return <BarberoFormulario onVolver={irALista} />;
            if (vista === 'editar') return <BarberoEditar idBarbero={idActivo} onVolver={irALista} />;
        }
        if (moduloActivo === 'servicios') {
            if (vista === 'lista')  return <ServicioLista onNuevo={irANuevo} onEditar={irAEditar} />;
            if (vista === 'nuevo')  return <ServicioFormulario onVolver={irALista} />;
            if (vista === 'editar') return <ServicioEditar idServicio={idActivo} onVolver={irALista} />;
        }
        if (moduloActivo === 'citas') {
            if (vista === 'lista')     return <CitaLista onNueva={irANuevo} onReagendar={irAReagendar} />;
            if (vista === 'nuevo')     return <CitaFormulario onVolver={irALista} />;
            if (vista === 'reagendar') return <CitaReagendar idCita={idActivo} onVolver={irALista} />;
        }
    };

    return (
        <div style={estilos.app}>
            {/* Barra de navegación principal */}
            <nav style={estilos.navbar}>
                <span style={estilos.logo}>✂ JW Home Barber Studio</span>
                <div style={estilos.navLinks}>
                    <button
                        style={moduloActivo === 'clientes' ? estilos.btnActivo : estilos.btnNav}
                        onClick={() => cambiarModulo('clientes')}>
                        Clientes
                    </button>
                    <button
                        style={moduloActivo === 'barberos' ? estilos.btnActivo : estilos.btnNav}
                        onClick={() => cambiarModulo('barberos')}>
                        Barberos
                    </button>
                    <button
                        style={moduloActivo === 'servicios' ? estilos.btnActivo : estilos.btnNav}
                        onClick={() => cambiarModulo('servicios')}>
                        Servicios
                    </button>
                    <button
                        style={moduloActivo === 'citas' ? estilos.btnActivo : estilos.btnNav}
                        onClick={() => cambiarModulo('citas')}>
                        Citas
                    </button>
                </div>
                {/* Info del usuario y botón cerrar sesión */}
                <div style={estilos.userInfo}>
                    <span style={estilos.nombreUsuario}>
                        {usuarioActivo.nombre} ({usuarioActivo.rol})
                    </span>
                    <button style={estilos.btnCerrarSesion} onClick={handleCerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            {/* Contenido del módulo activo */}
            <main>
                {renderizarVista()}
            </main>
        </div>
    );
};

const estilos = {
    app:             { fontFamily: 'Arial, sans-serif', minHeight: '100vh',
                       backgroundColor: '#f5ede0' },
    navbar:          { backgroundColor: '#1a0f08', padding: '12px 24px',
                       display: 'flex', justifyContent: 'space-between',
                       alignItems: 'center', flexWrap: 'wrap', gap: '8px' },
    logo:            { color: '#c49a4a', fontSize: '18px', fontWeight: 'bold' },
    navLinks:        { display: 'flex', gap: '8px' },
    btnNav:          { backgroundColor: 'transparent', color: '#f5ede0',
                       border: '1px solid #c49a4a', padding: '8px 16px',
                       borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
    btnActivo:       { backgroundColor: '#c49a4a', color: '#1a0f08',
                       border: '1px solid #c49a4a', padding: '8px 16px',
                       borderRadius: '4px', cursor: 'pointer', fontSize: '14px',
                       fontWeight: 'bold' },
    userInfo:        { display: 'flex', alignItems: 'center', gap: '12px' },
    nombreUsuario:   { color: '#f5ede0', fontSize: '13px' },
    btnCerrarSesion: { backgroundColor: '#bf3d3d', color: 'white', padding: '6px 12px',
                       border: 'none', borderRadius: '4px', cursor: 'pointer',
                       fontSize: '13px' },
};

export default App;