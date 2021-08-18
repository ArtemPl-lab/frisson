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
                <img src={`${api.address}/images/${props.image_ids[0]}`} alt="Изображение активности"/>:
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