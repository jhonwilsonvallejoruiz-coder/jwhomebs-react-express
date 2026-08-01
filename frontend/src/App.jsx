// Componente principal que gestiona la navegación entre vistas
import { useState } from 'react';
import ClienteLista      from './components/ClienteLista';
import ClienteFormulario from './components/ClienteFormulario';
import ClienteEditar     from './components/ClienteEditar';

const App = () => {
    // Vista actual: 'lista', 'nuevo', 'editar'
    const [vista, setVista]           = useState('lista');
    const [idClienteEditar, setIdClienteEditar] = useState(null);

    const mostrarNuevo = () => setVista('nuevo');
    const mostrarLista = () => setVista('lista');

    const mostrarEditar = (id) => {
        setIdClienteEditar(id);
        setVista('editar');
    };

    return (
        <div>
            {vista === 'lista' && (
                <ClienteLista
                    onNuevo={mostrarNuevo}
                    onEditar={mostrarEditar}
                />
            )}
            {vista === 'nuevo' && (
                <ClienteFormulario onVolver={mostrarLista} />
            )}
            {vista === 'editar' && (
                <ClienteEditar
                    idCliente={idClienteEditar}
                    onVolver={mostrarLista}
                />
            )}
        </div>
    );
};

export default App;