import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal } from '../../components';
import { useStore } from '../../store';
import styles from './DeleteConfirm.module.css';

export const DeleteConfirm = props => {
    const history = useHistory();
    const { places } = useStore();
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
                <Button color="red" onClick={async ()=>{ 
                    await places.delete_current();
                    history.push('/home');
                }}>
                    Удалить
                </Button>
            </div>
        </Modal>
    );
}