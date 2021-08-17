import styles from './Directions.module.css';
import { Button, Content, Headline } from "../../components";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

export const Directions = observer(props => {
    const { activities } = useStore();
    console.log(activities.list);
    return(
        <Content>
            <header className={styles.header}>
                <Headline>
                    Направления
                </Headline>
                <Button>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" width="2" height="12" rx="1" fill="white"/>
                        <rect y="5" width="12" height="2" rx="1" fill="white"/>
                    </svg>
                    &nbsp;
                    Добавить группу
                </Button>

            </header>
            {
                !activities.list.length ?
                <div className={styles.no_directions}>
                    Направления отсутствуют
                </div> :
                ''
            }
        </Content>
    );
});