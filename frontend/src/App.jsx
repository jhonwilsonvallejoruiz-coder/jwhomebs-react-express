// Componente principal que gestiona la navegación entre todos los módulos
import { useState } from 'react';

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
    // Estado que controla el módulo activo en el menú
    const [moduloActivo, setModuloActivo] = useState('clientes');

    // Estado que controla la vista dentro de cada módulo
    const [vista, setVista] = useState('lista');

    // Estado para guardar el ID del registro a editar o reagendar
    const [idActivo, setIdActivo] = useState(null);

    // Función para navegar a la lista de cualquier módulo
    const irALista = () => setVista('lista');

    // Función para navegar al formulario de nuevo registro
    const irANuevo = () => setVista('nuevo');

    // Función para navegar al formulario de edición
    const irAEditar = (id) => {
        setIdActivo(id);
        setVista('editar');
    };

    // Función para navegar al formulario de reagendamiento
    const irAReagendar = (id) => {
        setIdActivo(id);
        setVista('reagendar');
    };

    // Función para cambiar de módulo y resetear la vista
    const cambiarModulo = (modulo) => {
        setModuloActivo(modulo);
        setVista('lista');
        setIdActivo(null);
    };

    // Renderizar el componente según el módulo y vista activos
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
            </nav>

            {/* Contenido del módulo activo */}
            <main style={estilos.main}>
                {renderizarVista()}
            </main>
        </div>
    );
};

// Estilos con la paleta visual de JW HOMEBS
const estilos = {
    app:      { fontFamily: 'Arial, sans-serif', minHeight: '100vh',
                backgroundColor: '#f5ede0' },
    navbar:   { backgroundColor: '#1a0f08', padding: '12px 24px',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center' },
    logo:     { color: '#c49a4a', fontSize: '20px', fontWeight: 'bold' },
    navLinks: { display: 'flex', gap: '8px' },
    btnNav:   { backgroundColor: 'transparent', color: '#f5ede0',
                border: '1px solid #c49a4a', padding: '8px 16px',
                borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
    btnActivo:{ backgroundColor: '#c49a4a', color: '#1a0f08',
                border: '1px solid #c49a4a', padding: '8px 16px',
                borderRadius: '4px', cursor: 'pointer', fontSize: '14px',
                fontWeight: 'bold' },
    main:     { padding: '0' },
};

export default App;