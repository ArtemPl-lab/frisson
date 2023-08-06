import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { Load } from '../Load';
import styles from './Login.module.css';
import InputMask from 'react-input-mask';
export const Login = props => {
    const { admin } = useStore();
    const [load, setLoad] = useState(false);
    const [state, setState] = useState({
        phone: '',
        password: ''
    });
    const handleChange = e => {
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const onSubmit = async  e => {
        e.preventDefault();
        setLoad(true);
        await admin.auth(state);
        setLoad(false);
    }
    if(load) return <Load />
    return(
        <>
            <section id="enter" className={`${styles.fullscreen} ${styles.formPage}`}>
                <div className={styles.wrapper}>
                    <h2>Вход в личный кабинет Frisson</h2>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formGroup}>
                            <InputMask mask="+7 (999) 999-99-99" value={state.phone} onChange={handleChange} name="phone"
                                       placeholder="Номер телефона"
                                       className={styles.input}
                            >
                                {
                                    (inputProps) => <input
                                        {...inputProps}
                                    />
                                }
                            </InputMask>
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
                </div>
            </section>
        </>
    );
}
