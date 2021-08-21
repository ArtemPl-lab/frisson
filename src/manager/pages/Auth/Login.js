import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../../desktop/Header';
import { useStore } from '../../store';
import { Load } from '../Load';
import styles from './Login.module.css';
import DesktopOnly from '../../../desktop/DesktopOnly';

export const Login = props => {
    const { manager } = useStore();
    const [load, setLoad] = useState(false);
    const [state, setState] = useState({
        manager_id: '',
        password: ''
    });
    const handleChange = e => {
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const onSubmit = async e => {
        e.preventDefault();
        setLoad(true);
        await manager.auth(state);
        setLoad(false);
    }
    if (load) return <Load />
    if (manager.data) return <Redirect to="/places" />
    return (
        <>
            <Header />
            <section id="enter" className={`${styles.fullscreen} ${styles.formPage}`}>
                <div className={styles.wrapper}>
                    <h2>Вход в личный кабинет Frisson</h2>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="manager_id"
                                placeholder="+7 999 999 99 99"
                                className={styles.phoneMask}
                                onChange={handleChange}
                                value={state.manager_id}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={handleChange}
                                value={state.password}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.checkbox}>
                            <label>
                                <input type="checkbox" name="remember" />
                                Запомнить меня с этого устройства
                            </label>
                        </div>
                        <button className={styles.button} type="submit">Войти</button>
                    </form>
                    <div className={styles.buttons}>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#forgetModal">Забыли пароль?</button>
                        <Link to="/register">
                            Регистрация
                        </Link>
                    </div>
                </div>
            </section>
            <DesktopOnly />
        </>
    );
}