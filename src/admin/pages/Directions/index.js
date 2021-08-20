import styles from './Directions.module.css';
import { Button, Content, Headline, Input } from "../../components";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

export const Directions = observer(props => {
    const { directions } = useStore();
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
                !directions.list.length ?
                <div className={styles.no_directions}>
                    Направления отсутствуют
                </div> :
                <div className={styles.wrapper}>
                    <br />
                    {
                        directions.list.map(direction => {
                            return(
                                <div className={styles.direction}>
                                    <div className={styles.direction_name}>
                                        Группа активностей
                                    </div>
                                    <Input value={direction.name}/>

                                    <div className={styles.direction_types_label}>
                                        Активности в группе
                                    </div>
                                    <div className={styles.direction_types}>
                                        {
                                            direction.types.map(type => {
                                                return(
                                                    <div className={styles.type_wrapper}>
                                                        <Input value={type.name}/>
                                                        <div className={styles.bulk_type}>
                                                            Удалить
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <Button>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5" width="2" height="12" rx="1" fill="white"/>
                                            <rect y="5" width="12" height="2" rx="1" fill="white"/>
                                        </svg>
                                        &nbsp;
                                        &nbsp;
                                        Добавить активность
                                    </Button>
                                    <hr />
                                </div>
                            );
                        })
                    }
                </div>
            }
        </Content>
    );
});