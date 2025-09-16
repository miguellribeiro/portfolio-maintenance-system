import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { routesMap } from '../../utils/routesMap';
import layout from '../layout.module.css';
import styles from './styles.module.css';

const TechnicianLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="client-layout">
            <header className="client-header">
                <div className="logo">Painel do Técnico</div>
                <nav className="client-nav">
                    <NavLink to={routesMap.TECHNICIAN_DASHBOARD.path}>Início</NavLink>
                    <NavLink to={routesMap.TECHNICIAN_KANBAN.path}>Quadro de Chamados</NavLink>
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

export default TechnicianLayout;
