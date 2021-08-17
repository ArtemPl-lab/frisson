import styles from './Headline.module.css';

export const Headline = props => {
    return(
        <h2 className={styles.headline}>{props.children}</h2>
    );
}