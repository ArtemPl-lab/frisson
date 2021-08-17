import { useHistory } from "react-router-dom";
import styles from './ComeBack.module.css';

export const ComeBack = props => {
    const history = useHistory();
    return(
        <div className={styles.back} onClick={history.goBack}>
            Назад
        </div>
    );
}