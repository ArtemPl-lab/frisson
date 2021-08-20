import styles from './TextArea.module.css';

export const TextArea = props => {
    return(
        <textarea {...props} className={`${styles.textarea} ${props.className}`}/>
    );
}