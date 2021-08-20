import { Link } from 'react-router-dom';
import api from '../../../admin/api';
import NewCardContent from './NewCardContent';
import styles from './PlaceCard.module.css';
export const PlaceCard = props => {
    // console.log(props.image_ids);
    return(
        <Link className={`${props.id ? styles.linear : '' } ${styles.wrapper}`} to={props.id ? `/places/${props.id}/info` : '/places/new/info'}>
            {
                props.image_ids && props.image_ids.length ?
                <img src={`${api.address}/images/${props.image_ids[0]}`} alt="Изображение активности"/> :
                ''
            }
            {
                props.disabled_by_manager || props.disabled_by_admin ?
                <>
                    <div className={styles.dark_bg} />
                    <div className={styles.disable_text}>
                        Эта активность отключена администратором. Для восстановления доступа напишите на почту <a href="mailto:admin@frissonapp.com">admin@frissonapp.com</a>
                    </div>
                </> :
                ''
            }
            {
                props.id ?
                <div className={styles.name}>
                    {props.name}
                </div> : 
                <NewCardContent /> 
            }
        </Link>
    );
}