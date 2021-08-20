import styles from './Tag.module.css';

export const Tag = props => {
    return(
        <div className={styles.wrapper}>
            <select className={styles.select}>
                <option value="1">
                    lol
                </option>   
                <option value="2">
                    Для компаний
                </option>  
            </select>
            <button className={styles.delete}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.0001" cy="9.99996" r="8.33333" fill="white"/>
                    <path d="M7.05373 12.9463L12.9463 7.05371" stroke="#031523" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7.05373 7.05373L12.9463 12.9463" stroke="#031523" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    );
}