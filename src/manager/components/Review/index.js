import api from '../../api';
import { Avatar } from '../Avatar';
import { Stars } from '../Stars';
import styles from './Review.module.css';

export const Review = props => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Avatar id={props.user_avatar_id} />
                <div className={styles.header_info}>
                    <div className={styles.username}>
                        {props.user_name}
                    </div>
                    <div className={styles.date}>
                        {props.date}
                    </div>
                    <Stars active={props.rating} />
                </div>
            </div>
            <div className={styles.content}>
                {props.text}
            </div>
            <div className={styles.images}>
                {props.image_ids.map(id => <img src={`${api.address}/images/${id}`} alt="Приложение" className={styles.review_img}/>)}
            </div>
        </div>
    );
}