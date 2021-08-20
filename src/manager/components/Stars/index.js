import { Star } from "./Star";
import styles from './Stars.module.css';

export const Stars = props => {
    const length = props.length || 5;
    const active = props.active || 0;
    const stars = Array(length).fill(true, 0, active).fill(false, active, length);
    return(
        <div className={`${styles.stars} ${props.className}`}>
            {stars.map(active => <Star active={active} />)}
        </div>
    );
}