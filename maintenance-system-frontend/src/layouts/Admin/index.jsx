import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { routesMap } from '../../utils/routesMap';
import layout from '../layout.module.css';
import styles from './styles.module.css';

const AdminLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>PMS Admin</h2>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to={routesMap.ADMIN_DASHBOARD.path}>Dashboard</NavLink>
                    <NavLink to={routesMap.ADMIN_TICKETS_LIST.path}>Chamados</NavLink>
                    <NavLink to={routesMap.ADMIN_CLIENTS.path}>Clientes</NavLink>
                    <NavLink to={routesMap.ADMIN_TECHNICIANS.path}>Técnicos</NavLink>
                    <NavLink to={routesMap.ADMIN_LOGS.path}>Logs</NavLink>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <div className="user-info">
                        <span>Olá, {user?.nome}</span>
                        <button onClick={logout} className="logout-button">Sair</button>
                    </div>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
