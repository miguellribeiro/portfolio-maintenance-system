import { useAuth } from '../../../contexts/AuthContext';

const TechnicianDashboard = () => {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Bem-vindo ao Painel do Técnico!</h1>
            <button onClick={logout}>Sair</button>
        </div>
    );
};

export default TechnicianDashboard;
