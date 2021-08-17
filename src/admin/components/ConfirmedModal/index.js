import { Button } from '../Button';
import { Modal } from '../Modal';
import styles from './ConfirmedModal.module.css';

export const ConfirmedModal = ({ message, callback }) => {
    return(
        <Modal>
            <div className={styles.title}>
                {message}
            </div>
            <div className={styles.footer}>
                <Button onClick={()=>callback(false)}>
                    Сохранить
                </Button>
                <Button color="red" onClick={()=>callback(true)}>
                    Не сохранять
                </Button>
            </div>
        </Modal>
    );
}