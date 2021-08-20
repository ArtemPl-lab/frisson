import api from "../../api"
import styles from './Avatar.module.css';

export const Avatar = props => {
    if(props.id) return <img src={`${api.address}/images/${props.id}`} alt="Аватарка" className={styles.ava}/>
    return <img src="/ava.svg" alt="ava" height="64" width="64" />;
}