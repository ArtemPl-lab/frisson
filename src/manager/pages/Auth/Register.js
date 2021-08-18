import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../desktop/Header';
import { useStore } from '../../store';
import styles from './Login.module.css';
export const Register = observer(props => {
    const [validation, setValidation] = useState(false);
    const [state, setState] = useState({
        full_name: '',
        phone: '',
        email: '',
        password: ''
    });
    const { manager } = useStore();
    const handleChange = e => setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = e => {
        e.preventDefault();
        if(e.target.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            manager.register(state);
        }
        setValidation(true);
    }
    return(
        <>
            <Header />
            <section id="registration" className={`${styles.fullscreen} ${styles.formPage}`}>
                <div className={styles.wrapper}>
                    <h2>Регистрация</h2>
                    <form onSubmit={handleSubmit} className={validation ? 'was-valid' : ''} noValidate>
                        <div className={styles.formGroup}>
                            <input 
                                type="text" 
                                placeholder="Имя и фамилия" 
                                name="full_name" 
                                value={state.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input 
                                type="tel" 
                                placeholder="Номер телефона" 
                                className={styles.phoneMask} 
                                name="phone" 
                                value={state.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input 
                                type="email"
                                placeholder="Электронная почта" 
                                name="email" 
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input 
                                type="password"
                                placeholder="Пароль" 
                                id="password"
                                name="password" 
                                value={state.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input 
                                type="password"
                                placeholder="Повторите пароль" 
                                name="confirm"
                                pattern={state.password}
                                required
                            />
                        </div>
                        <div className={styles.checkbox}>
                            <label>
                                <input type="checkbox" name="policy" required/>
                                <span>Нажимая на кнопку Зарегистрироваться, я соглашаюсь c <a href="#">Политикой конфидециальности</a></span>
                            </label>
                        </div>
                        <button className={styles.button} type="submit">Зарегистрироваться</button>
                    </form>
                    <div className={styles.buttons}>
                        <Link to="/login">
                            Войти в аккаунт
                        </Link>
                    </div>
                </div>
            </section>
            <div id="desktopOnly">
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <img src="img/blue-logo.svg" alt="" className={styles.logo} />
                        <img src="img/desktop-only.png" alt="" className={`${styles.dec} ${styles.portrait}`} />
                        <p>Раздел для организаторов и владельцев бизнеса доступен только на большом экране.</p>
                        <a href="#" className={styles.shop}>
                            <img src="img/app.png" alt="" />
                        </a>
                        <a href="#" className={styles.shop}>
                            <img src="img/google.png" alt="" />
                        </a>
                    </div>
                    <img src="img/desktop-only.png" alt="" className={`${styles.dec} ${styles.landscape}`} />
                </div>
            </div>
        </>
    );
});