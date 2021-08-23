import api from '../../api';
import styles from './NewImage.module.css';
export const NewImage = props => {
    return(
        <label className={styles.wrapper} style={{
            height: props.height
        }}>
            {
                props.image_id ?
                <img src={`${api.address}/images/${props.image_id}`} className={styles.image}/> :
                ''
            }
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="0.5" width="2" height="12" rx="1" fill="#0E2F56"/>
                <rect y="5.5" width="12" height="2" rx="1" fill="#0E2F56"/>
            </svg>
            <input type="file" {...props}/>
        </label>
    );
}