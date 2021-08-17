import styles from './Input.module.css';

export const Input = props => <input {...props} className={`${styles.input} ${props.className}`}/>