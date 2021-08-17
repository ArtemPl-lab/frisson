import styles from './Navigation.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../../store';

const links = [
    {
        path: '/users',
        text: 'Менеджеры'
    },
    {
        path: '/tags',
        text: 'Теги'
    },
    {
        path: '/directions',
        text: 'Направления'
    }
];
export const Navigation = props => {
    return(
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    {
                        links.map(link => {
                            return(
                                <li className={styles.item}>
                                    <NavLink to={link.path} className={styles.link}>
                                        {link.text}
                                    </NavLink>
                                </li>
                            );
                        })
                    }
                </ul>
                <img src="/logo.svg" alt="" className={styles.logo}/>
            </nav>
        </div>
    );
}