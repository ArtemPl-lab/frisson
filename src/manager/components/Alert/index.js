import { observer } from 'mobx-react-lite';
import { useStore } from '../../../admin/store';
import styles from './Alert.module.css';

export const Alert = observer(props => {
    const { admin } = useStore();
    if(!admin.data) return <></>;
    return(
        <div className={styles.wrapper}>
            Хотите вернуться в панель администратора?&nbsp; <a href="/admin/">Нажмите сюда</a>
        </div>
    );
});