import styles from './LogoutConfirm.module.css';
import { Button, Modal } from "../../components"
import { useHistory } from 'react-router';
import { useStore } from '../../store';

export const LogoutConfirm = props => {
    const history = useHistory();
    const { manager } = useStore();
    return(
        <Modal options={{
            width: "240px",
            height: "144px"
        }}>
            <div className={styles.title}>
                Выйти?
            </div>
            <div className={styles.footer}>
                <Button onClick={history.goBack}>
                    Остаться
                </Button>
                <Button color="red" onClick={manager.logout}>
                    Выйти
                </Button>
            </div>
        </Modal>
    );
}