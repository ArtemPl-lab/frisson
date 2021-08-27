import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import { Button, Modal } from '../../components';
import { useStore } from '../../store';
import styles from './DeleteConfirm.module.css';

export const DeleteConfirm = props => {
    const history = useHistory();
    const { id } = useParams();
    const { managers } = useStore();
    const bulkAccount = async () => {
        await api.delete(`/admins/managers/${id}`);
        managers.delete(id);
        managers.init();
        history.replace('/users');
    }
    return(
        <Modal options={{
            width: "260px",
            height: "144px"
        }}>
            <div className={styles.title}>
                Удалить?
            </div>
            <div className={styles.footer}>
                <Button onClick={history.goBack}>
                    Оставить
                </Button>
                <Button color="red" onClick={bulkAccount}>
                    Удалить
                </Button>
            </div>
        </Modal>
    );
}