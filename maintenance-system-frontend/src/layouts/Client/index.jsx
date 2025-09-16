import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { routesMap } from '../../utils/routesMap';
import layout from '../layout.module.css';
import styles from './styles.module.css';

const ClientLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="client-layout">
            <header className="client-header">
                <div className="logo">Portal do Cliente</div>
                <nav className="client-nav">
                    <NavLink to={routesMap.CLIENT_DASHBOARD.path}>Início</NavLink>
                    <NavLink to={routesMap.CLIENT_TICKETS_LIST.path}>Meus Chamados</NavLink>
                    <NavLink to={routesMap.CLIENT_TICKET_NEW.path} className="new-ticket-link">Abrir Chamado</NavLink>
                </nav>
                <div className="user-info">
                    <span>Olá, {user?.nome}</span>
                    <button onClick={logout} className="logout-button">Sair</button>
                </div>
            </header>
            <main className="client-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;
