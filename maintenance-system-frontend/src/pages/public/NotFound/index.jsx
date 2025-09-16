import { Link } from 'react-router-dom';
import { routesMap } from '../../../utils/routesMap';
import { useAuth } from '../../../contexts/AuthContext';

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

const NotFoundPage = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Página Nao Encontrada</h1>
            <p>A página que procurou nao foi encontrada.</p>
            <Link to={getDashboardPathForRole(user.role)}>Voltar para a página inicial</Link>
        </div>
    );
};

export default NotFoundPage;
