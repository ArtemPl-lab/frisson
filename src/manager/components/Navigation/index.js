import styles from './Navigation.module.css';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';

const links = [
    {
        path: '/info',
        text: 'Информация'
    },
    {
        path: '/services',
        text: 'Услуги'
    },
    {
        path: '/gallery',
        text: 'Галлерея'
    },
    {
        path: '/reviews',
        text: 'Отзывы'
    },
];
const getLink = (pathname, link) => {
    for(let loc of links){
        pathname = pathname.replace(loc.path, '');
    }
    return pathname+link;
};
export const Navigation = props => {
    const { pathname } = useLocation();
    const { id } = useParams();
    return(
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <Link to="/home" className={styles.home}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.03324C12 6.61815 11.5258 7.09232 10.9409 7.09232L3.53989 7.09232L5.84182 10.3574C6.37459 11.1131 5.82735 12 4.82834 12C4.32043 12 3.82757 11.7585 3.55398 11.3755L0.419228 6.9872C0.367209 6.91438 0.324963 6.8395 0.292185 6.76367C0.111142 6.57364 -1.23778e-08 6.31642 0 6.03324C1.13972e-08 5.77251 0.0942145 5.53379 0.250455 5.34926C0.285553 5.23493 0.341478 5.12147 0.419233 5.01262L3.55379 0.624581C3.8274 0.24156 4.32028 7.86623e-06 4.82823 0C5.82732 -1.01755e-05 6.37459 0.887034 5.84176 1.64278L3.49298 4.97415L10.9409 4.97415C11.5258 4.97415 12 5.44832 12 6.03324Z" fill="#96A4AE"/>
                    </svg>
                    &nbsp;
                    Главная страница
                </Link> 
                <ul className={styles.menu}>
                    {
                        (id === 'new' ? [] : links).map(link => {
                            return(
                                <li className={styles.item}>
                                    <NavLink to={getLink(pathname, link.path)} className={styles.link}>
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