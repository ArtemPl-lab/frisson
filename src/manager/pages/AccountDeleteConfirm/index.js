import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import { Button, Modal } from '../../components';
import { useStore } from '../../store';
import styles from './DeleteConfirm.module.css';

export const AccountDeleteConfirm = props => {
    const history = useHistory();
    const { places } = useStore();
    return(
        <Modal options={{
            width: "260px",
            height: "144px"
        }}>
            <div className={styles.title}>
                Удалить аккаунт?
            </div>
            <div className={styles.footer}>
                <Button onClick={history.goBack}>
                    Отмена
                </Button>
                <Button color="red" onClick={async ()=>{ 
                    await api.delete('/managers/');
                    localStorage.managerToken = "";
                    window.location.href = '/manager/register'
                }}>
                    Удалить
                </Button>
            </div>
        </Modal>
    );
}