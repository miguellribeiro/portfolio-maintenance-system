import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './styles.module.css'
import { useInput, Input } from '../../../components/ui/Input';

const LoginPage = () => {
    const [emailProps] = useInput();
    const [passwordProps] = useInput();
    const [error, setError] = useState();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err) {
            setError('Email ou senha inválidos.');
        }
    };

    return (
        <main className={styles.loginContainer}>
            <section className={styles.loginImage}>
                
            </section>
            <section className={styles.loginContent}>
                <div className={styles.formContainer}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            icon="far fa-envelope"
                            {...emailProps}
                        />
                        <Input
                            id="senha"
                            label="Senha"
                            type="password"
                            icon="far fa-lock"
                            {...passwordProps}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
