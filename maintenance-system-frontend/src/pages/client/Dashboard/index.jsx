import { useAuth } from '../../../contexts/AuthContext';

const ClientDashboard = () => {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Bem-vindo ao Portal do Cliente!</h1>
            <button onClick={logout}>Sair</button>
        </div>
    );
};

export default ClientDashboard;
