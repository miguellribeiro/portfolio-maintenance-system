import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { routesMap } from '../../utils/routesMap';

/**
 * Componente para proteger rotas.
 * Verifica se o usuário está autenticado e se tem a permissão (role) necessária.
 * @param {object} props
 * @param {string[]} props.allowedRoles - Um array com os papéis que podem aceder à rota (ex: ['ADMIN', 'TECNICO']).
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={routesMap.LOGIN.path} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={routesMap.ACCESS_DENIED.path} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
