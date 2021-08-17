import styles from './Content.module.css';

export const Content = props => {
    return(
        <div className={styles.wrapper}>
            {props.children}
        </div>
    );
}