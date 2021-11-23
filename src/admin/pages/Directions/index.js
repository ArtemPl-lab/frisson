import styles from './Directions.module.css';
import { Button, Content, Headline, Input } from "../../components";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import Select from 'react-dropdown-select';
import { TextArea } from '../../components/TextArea';

const options = [
    {
        label: <i class="fas fa-water" />,
        value: 'water'
    },
    {
        label: <i class="fas fa-wind" />,
        value: 'wind'
    },
    {
        label: <i class="fas fa-mountain" />,
        value: 'mountain'
    },
    {
        label: <i class="fas fa-tachometer-alt" />,
        value: 'tachometer-alt'
    },
    {
        label: <i class="fas fa-smile-wink" />,
        value: 'smile-wink'
    },
    {
        label: <i class="fas fa-tree" />,
        value: 'tree'
    },
    {
        label: <i class="fas fa-basketball-ball" />,
        value: 'basketball-ball'
    },
    {
        label: <i class="fas fa-trophy" />,
        value: 'trophy'
    },
    // {
    //     label: 'Самолёт',
    //     value: 'air'
    // },
    // {
    //     label: 'Камера',
    //     value: 'camera'
    // },
    // {
    //     label: 'Сердце',
    //     value: 'heart'
    // },
    // {
    //     label: 'Телефон',
    //     value: 'phone'
    // },
    // {
    //     label: 'Деревья',
    //     value: 'trees'
    // },
    // {
    //     label: 'Знак вопроса',
    //     value: 'unknown'
    // },
    // {
    //     label: 'Спорт',
    //     value: 'sport'
    // },
    // {
    //     label: 'Глобус',
    //     value: 'globe'
    // },
    // {
    //     label: 'Горы',
    //     value: 'mountains'
    // },
    // {
    //     label: 'Цель',
    //     value: 'target'
    // },

]

export const Directions = observer(props => {
    const { directions } = useStore();
    return(
        <Content>
            <header className={styles.header}>
                <Headline>
                    Направления
                </Headline>
                {/* <Button onClick={()=>directions.createGroup()}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" width="2" height="12" rx="1" fill="white"/>
                        <rect y="5" width="12" height="2" rx="1" fill="white"/>
                    </svg>
                    &nbsp;
                    Добавить группу
                </Button> */}

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
                                    <div className={styles.sel_row}>
                                        <Input 
                                            value={direction.name} 
                                            onChange={(e) => directions.updateGroup({
                                                ...direction,
                                                name: e.target.value
                                            })}
                                        />
                                        <Select
                                            values={[options.find(opt => opt.value === direction.icon)]}
                                            options={options}
                                            searchable={false}
                                            dropdownGap={0}
                                            onChange={([item]) => directions.updateGroup({
                                                ...direction,
                                                icon: item.value
                                            })}
                                        />
                                    </div>
                                    {/* <br /> */}
                                    {/* <div className={styles.direction_name}>
                                        Иконка
                                    </div>
                                    <div className={styles.select_wrapper}>
                                        <Select
                                            values={[options.find(opt => opt.value === direction.icon)]}
                                            options={options}
                                            searchable={false}
                                            dropdownGap={0}
                                            onChange={([item]) => directions.updateGroup({
                                                ...direction,
                                                icon: item.value
                                            })}
                                        />
                                    </div> */}
                                    <div className={styles.direction_types_label}>
                                        Активности в группе
                                    </div>
                                    <div className={styles.direction_types}>
                                        {
                                            direction.types.map(type => {
                                                return(
                                                    <>
                                                                                                            <div className={styles.type_wrapper}>
                                                        <Input value={type.name} onChange={(e)=>directions.updateType({
                                                            ...type,
                                                            name: [e.target.value]
                                                        })}/>
                                                        <div className={styles.bulk_type} onClick={() => directions.deleteType(type.id)}>
                                                            Удалить
                                                        </div>
                                                    </div>
                                                    <TextArea 
                                                        value={type.multiline_name} onChange={(e)=>directions.updateType({
                                                            ...type,
                                                            multiline_name: [e.target.value]
                                                        })}
                                                    />
                                                    </>
                                                );
                                            })
                                        }
                                    </div>
                                    <Button onClick={() => directions.createType(direction.id)}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5" width="2" height="12" rx="1" fill="white"/>
                                            <rect y="5" width="12" height="2" rx="1" fill="white"/>
                                        </svg>
                                        &nbsp;
                                        &nbsp;
                                        Добавить активность
                                    </Button>
                                    <hr style={{
                                        height: "2px",
                                        backgroundColor: "#0E2F56",
                                        opacity: ".95",
                                        marginTop: "40px",
                                        marginBottom: "40px",
                                        width: "40%"
                                    }}/>
                                </div>
                            );
                        })
                    }
                </div>
            }
        </Content>
    );
});