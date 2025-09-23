import { useAuth, useModal } from '../../../contexts';
import { Modal } from '../../../components/ui/Modal';
import styles from './styles.module.css'
import { useInput, Input } from '../../../components/ui/Input';
import Planta01 from '/svg/Planta_01.svg';
import Planta02 from '/svg/Planta_02.svg';

const LoginPage = () => {
    const [loginProps] = useInput();
    const [passwordProps] = useInput();
    const [emailProps] = useInput();
    const { login } = useAuth();
    const { openModal, closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginProps.value, passwordProps.value);
        } catch (err) {

        }
    };

    return (
        <>
            <main className={styles.loginContainer}>
                <div className={styles.loginBackground}>
                    <section className={styles.loginImage}>
                    </section>
                    <section className={styles.loginContent}>
                        <div className={styles.formContainer}>
                            <h1 className={styles.formTitle}>Login</h1>
                            <form onSubmit={handleSubmit} className={styles.formContent}>
                                <Input
                                    id="login"
                                    label="Login"
                                    icon="far fa-user"
                                    {...loginProps}
                                />
                                <Input
                                    id="senha"
                                    label="Senha"
                                    type="password"
                                    icon="far fa-lock"
                                    {...passwordProps}
                                />
                                <button type="submit" className={styles.loginButton}>Entrar</button>
                                <a onClick={() => openModal('forgot-password')} className={styles.forgotPasswordLink}>Esqueci minha senha</a>
                            </form>
                        </div>
                        <img src={Planta01} alt="Planta 01" className={styles.planta01} />
                        <img src={Planta02} alt="Planta 02" className={styles.planta02} />
                    </section>
                </div>
                <div className={styles.bola1}></div>
                <div className={styles.bola2}></div>
            </main>
            <Modal
                id="forgot-password"
                title="Recuperar Senha"
            >
                <div className={styles.forgotPasswordContainer}>
                    <p className={styles.forgotPasswordText}>Digite o email cadastrado para recuperar sua senha</p>
                    <Input
                        id="email"
                        label="E-mail cadastrado"
                        type="email"
                        icon="far fa-envelope"
                        {...emailProps}
                    />
                    <button onClick={closeModal} className={styles.forgotPasswordButton}>OK</button>
                </div>
            </Modal>
        </>
    );
};

export default LoginPage;
