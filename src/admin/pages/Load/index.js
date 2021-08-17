import styles from './Load.module.css';

export const Load = props => {
    return(
        <div className={styles.wrapper}>
            <div class={styles.loader}><div></div><div></div><div></div></div>
        </div>
    );
}