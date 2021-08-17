import { Link } from 'react-router-dom';
import api from '../../api';
import { Toggle } from '../Toggle/Toggle';
import styles from './ActivityCard.module.css';

export const ActivityCard = props => {
    const setEnabled = async e => {
        const state = e.target.checked ? 'enabled' : 'disabled';
        props.enable(props.id, e.target.checked);
        return await api.post(`/places/${props.id}/${state}`);
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.info__wrapper}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="1" width="12" height="2" rx="1" fill="#C8C8C8"/>
                    <rect y="5" width="12" height="2" rx="1" fill="#C8C8C8"/>
                    <rect y="9" width="12" height="2" rx="1" fill="#C8C8C8"/>
                </svg>
                <div className={styles.info}>
                    <div className={styles.info__numeric}>
                        Уникальный номер активности — {props.id}
                    </div>
                    <div className={styles.info__name}>
                        {props.name}
                    </div>
                </div>
            </div>
            <Link to={`/places/${props.id}/admin_reviews`} className={styles.review_frisson}>
                Отзыв от Frisson
            </Link>
            <Toggle 
                active={!(props.disabled_by_manager || props.disabled_by_admin)}
                onChange={setEnabled}
            />
        </div>
    );
}