import { useAuth } from '../../../contexts/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Bem-vindo ao Dashboard do Administrador!</h1>
            <button onClick={logout}>Sair</button>
        </div>
    );
};

export default AdminDashboard;
