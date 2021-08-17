import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Button } from '../Button';
import styles from './SavePanel.module.css';

export const SavePanel = observer(props => {
    const { changes } = useStore();
    return(
        <div className={`${styles.panel} ${changes.hasChanges ? styles.active : ''}`}>
            <Button color="green" className={styles.btn} onClick={()=>changes.save()}>
                Сохранить
            </Button>
        </div>
    );
});