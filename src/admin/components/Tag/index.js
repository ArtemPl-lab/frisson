import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Input } from '../Input';
import styles from './Tag.module.css';

export const Tag = observer(props => {
    const { tags } = useStore();
    const handleChange = (e) => {
        tags.change({
            id: props.id,
            name: e.target.value
        });
    }
    const bulk = () => {
        tags.delete(props.id);
    }
    return(
        <div className={styles.wrapper}>
            <Input value={props.name} onChange={handleChange}/>
            <div className={styles.bulk} onClick={bulk}>Удалить</div>
        </div>
    );
});