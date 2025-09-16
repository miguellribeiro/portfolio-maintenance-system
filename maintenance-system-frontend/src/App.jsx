import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { routesMap } from './utils/routesMap';

// Componentes Essenciais
import ProtectedRoute from './components/common/ProtectedRoute';

// Páginas Públicas
import LoginPage from './pages/public/Login';
import AccessDeniedPage from './pages/public/AccessDenied';
import NotFoundPage from './pages/public/NotFound';

// Layouts das Áreas
import Admin_Layout from './layouts/Admin';
import Client_Layout from './layouts/Client';
import Technician_Layout from './layouts/Technician';

// Páginas do Administrador
import Admin_Dashboard from './pages/admin/Dashboard';
import Admin_Client from './pages/admin/Client';
import Admin_Technician from './pages/admin/Technician';

// Páginas do Cliente
import Client_Dashboard from './pages/client/Dashboard';

// Páginas do Técnico
import Technician_Dashboard from './pages/technician/Dashboard';

const getDashboardPathForRole = (role) => {
    switch (role) {
        case 'ADMIN':
            return routesMap.ADMIN_DASHBOARD.path;
        case 'CLIENTE':
            return routesMap.CLIENT_DASHBOARD.path;
        case 'TECNICO':
            return routesMap.TECHNICIAN_DASHBOARD.path;
        default:
            return routesMap.LOGIN.path;
    }
};

function App() {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>A carregar aplicação...</div>;
    }

    return (
        <Routes>
            <Route path="/"
                element={
                    isAuthenticated ? ( <Navigate to={getDashboardPathForRole(user.role)} replace /> ) : ( <Navigate to={routesMap.LOGIN.path} replace /> )
                }
            />

            {/* --- Rotas Públicas --- */}
            <Route path={routesMap.LOGIN.path}
                element={
                    isAuthenticated ? ( <Navigate to={getDashboardPathForRole(user.role)} replace /> ) : ( <LoginPage /> )
                }
            />
            <Route path={routesMap.ACCESS_DENIED.path} element={<AccessDeniedPage />} />
            <Route path="*" element={<NotFoundPage />} />


            {/* --- Rotas da Área do Administrador --- */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route element={<Admin_Layout />}>
                    <Route path={routesMap.ADMIN_DASHBOARD.path} element={<Admin_Dashboard />} />
                    <Route path={routesMap.ADMIN_CLIENTS.path} element={<Admin_Client />} />
                    <Route path={routesMap.ADMIN_TECHNICIANS.path} element={<Admin_Technician />} />
                </Route>
            </Route>

            {/* --- Rotas da Área do Cliente --- */}
            <Route element={<ProtectedRoute allowedRoles={['CLIENTE', 'ADMIN']} />}>
                <Route element={<Client_Layout />}>
                    <Route path={routesMap.CLIENT_DASHBOARD.path} element={<Client_Dashboard />} />
                </Route>
            </Route>

            {/* --- Rotas da Área do Técnico --- */}
            <Route element={<ProtectedRoute allowedRoles={['TECNICO', 'ADMIN']} />}>
                <Route element={<Technician_Layout />}>
                    <Route path={routesMap.TECHNICIAN_DASHBOARD.path} element={<Technician_Dashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;

