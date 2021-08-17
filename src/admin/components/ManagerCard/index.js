import { Link } from 'react-router-dom';
import styles from './ManagerCard.module.css';
import { Toggle } from '../';
import { useStore } from '../../store';
import api from '../../api';
import { observer } from 'mobx-react-lite';
export const ManagerCard = observer(props => {
    const { managers } = useStore();
    const setEnabled = async val => {
        const res = await api.post(`/managers/${props.manager_id}/by-admin`);
        const { current_state } = await res.json();
        managers.update(props.manager_id, {
            manager_disabled_by_admin: current_state
        });
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.info__wrapper}>
                <img src="/hamburger.svg" />
                <div className={styles.info}>
                    <div className={styles.user}>
                        <div className={styles.name}>
                            {props.manager_full_name}
                        </div>
                        <div className={styles.id}>
                            id: {props.manager_id}
                        </div>
                    </div>
                    {
                        props.main_place_name ? 
                        <div className={styles.place}>
                            <div className={styles.name}>
                                {props.main_place_name}
                            </div>
                            <div className={styles.other}>
                                {
                                    props.other_places_count && props.other_places_count !== -1  ?
                                    `и ещё ${props.other_places_count} активностей` : ''
                                }
                            </div>
                        </div> : ''
                    }

                </div>
            </div>
            <div className={styles.control}>
                <div className={`${styles.status} ${props.manager_disabled_by_manager || props.manager_disabled_by_admin ? styles.disabled : styles.enabled}`}></div>
                <Link className={styles.controling} to={`/users/${props.manager_id}`}>
                    Управлять
                </Link>
                <Toggle active={!(props.manager_disabled_by_manager || props.manager_disabled_by_admin)} onChange={setEnabled}/>
            </div>
        </div>
    );
})