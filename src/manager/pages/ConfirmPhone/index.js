import { useHistory, useParams } from "react-router-dom"
import { Modal } from "../../components/Modal";
import styles from './ConfirmPhone.module.css';

export const ConfirmPhone = props => {
    const { phone } = useParams();
    const history = useHistory();
    return(
        <Modal options={{
            width: "420px",
            height: "252px"
        }}
        >
            <form className={styles.content}>
                <div className={styles.title}>
                    Подтвердите действие
                </div>
                <input placeholder="Код из смс"/>
                <button type="submit">
                    Отправить код
                </button>
                <div onClick={history.goBack} className={styles.close}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00012 17.0005L17 7.00067" stroke="#0E2F56" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M7.00012 6.99939L17 16.9993" stroke="#0E2F56" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
            </form>
        </Modal>
    );
}