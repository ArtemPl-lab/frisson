import styles from './PlaceCard.module.css';

export default function () {
    return(
        <div className={styles.new}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.plus}>
                <path d="M12 17V7" stroke="#0E2F56" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7 12L17 12" stroke="#0E2F56" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div className={styles.newTitle}>
                Добавить новое место
            </div>
        </div>
    );
}