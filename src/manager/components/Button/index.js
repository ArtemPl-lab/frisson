import styles from './Button.module.css';

export const Button = props => {
    const color = props.color ? styles[props.color] : styles.dark;
    return <button {...props} className={`${styles.btn} ${color}`}/>
}