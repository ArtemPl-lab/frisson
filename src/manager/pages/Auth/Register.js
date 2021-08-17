import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './Login.module.css';
export const Register = observer(props => {
    const history = useHistory();
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
            <header>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <img src="img/top-bubbles.svg" alt="" className={styles.topBubbles} />
                        <span id="back" className={styles.back} onClick={history.goBack}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L10.5607 12L14.0303 15.4697C14.3232 15.7626 14.3232 16.2374 14.0303 16.5303C13.7374 16.8232 13.2626 16.8232 12.9697 16.5303L8.96967 12.5303C8.67678 12.2374 8.67678 11.7626 8.96967 11.4697L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z" fill="#0E2F56"/>
                            </svg>
                            <p>Назад</p>
                        </span>
                        <a href="/" className={styles.logo}>
                            <img src="img/white-logo.svg" alt="" className={styles.white} />
                            <img src="img/blue-logo.svg" alt="" className={styles.blue} />
                        </a>
                        <div className={styles.menu}>
                            <ul>
                                <li><a href="about.html">О приложении</a></li>
                                <li><a href="help.html">Помощь</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
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