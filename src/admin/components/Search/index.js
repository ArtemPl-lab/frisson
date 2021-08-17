import styles from './Search.module.css';

export const Search = props => {
    return (
        <form onSubmit={props.onSubmit} className={styles.form}>
            <input {...props} className={`${styles.input} ${props.className}`} />
            <button className={styles.submit}>
                <img src="/loup.svg" alt="Искать" />
            </button>
        </form>
    );
}