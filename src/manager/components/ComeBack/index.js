import { Link } from "react-router-dom";
import styles from './ComeBack.module.css';

export const ComeBack = props => {
    return(
        <Link className={styles.back} to="/home">
            Назад
        </Link>
    );
}