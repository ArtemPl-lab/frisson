import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from './Places.module.css';
import { Content, Headline, Input, TextArea, Button, SelectMap, Rubles } from "../../components";
import { Load } from "../Load";
import Toggle from "../../components/Toggle/Toggle";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import Select from "react-dropdown-select";
import api from "../../api";
import InputMask from 'react-input-mask';


const times = [
    {
        label: '--:--',
        value: '--:--'
    },
    {
        label: '00:00',
        value: '00:00'
    },
    {
        label: '01:00',
        value: '01:00'
    },
    {
        label: '02:00',
        value: '02:00'
    },
    {
        label: '03:00',
        value: '03:00'
    },
    {
        label: '04:00',
        value: '04:00'
    },
    {
        label: '05:00',
        value: '05:00'
    },
    {
        label: '06:00',
        value: '06:00'
    },
    {
        label: '07:00',
        value: '07:00'
    },
    {
        label: '08:00',
        value: '08:00'
    },
    {
        label: '09:00',
        value: '09:00'
    },
    {
        label: '10:00',
        value: '10:00'
    },
    {
        label: '11:00',
        value: '11:00'
    },    {
        label: '12:00',
        value: '12:00'
    },    {
        label: '13:00',
        value: '13:00'
    },
    {
        label: '14:00',
        value: '14:00'
    },    {
        label: '15:00',
        value: '15:00'
    },    {
        label: '16:00',
        value: '16:00'
    },
    {
        label: '17:00',
        value: '17:00'
    },    {
        label: '18:00',
        value: '18:00'
    },    {
        label: '19:00',
        value: '19:00'
    },    {
        label: '20:00',
        value: '20:00'
    },    {
        label: '21:00',
        value: '21:00'
    },  {
        label: '22:00',
        value: '22:00'
    }, {
        label: '23:00',
        value: '23:00'
    },
];
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const short_days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const workTimeToString = (dayIndex, from, to) => {
    return `${days[dayIndex]} ${from === '--:--' && to === '--:--' ? ' - не рабочий день' : `c ${from} до ${to}`}`;
}
const parseWorkTime = (index, string = "") => {
    if(string.includes('не рабочий день')) return ({
        from: '--:--',
        to: '--:--'
    });
    let removedDayName = string.replace(days[index], '');
    const removedPrepos = removedDayName.replace('c', '');
    const removedSpaces = removedPrepos.split(' ').filter(str => str !== '').join('');
    const times = removedSpaces.split('до');
    if(times.length === 2){
        return({
            from: times[0],
            to: times[1]
        });
    }
    return ({
        from: '--:--',
        to: '--:--'
    });
}
const TimeRow = props => {
    const [state, setState] = useState(props.value);
    return(
        <div className={styles.time_grid}>
            <span className={styles.day}>
                {props.day}
            </span>
            <Select 
                placeholder="--:--"
                options={times}
                searchable={false}
                keepSelectedInList={false}
                dropdownGap={0}
                placeholder=""
                values={times.filter(el => el.value === state.from)}
                onChange={([ item ]) => setState(prev => {
                    let res = {
                        ...state,
                        from: item.value
                    }
                    console.log(state);
                    if(item.value === '--:--') res['to'] = '--:--';
                    else if(res.to === '--:--') res['to'] = '00:00';
                    props.onChange(res)
                    return res;

                })}
            />
            <Select 
                placeholder="00:00"
                searchable={false}
                options={times}
                keepSelectedInList={false}
                dropdownGap={0}
                placeholder=""
                values={times.filter(el => el.value === state.to)}
                onChange={([ item ]) => setState(prev => {
                    let res = {
                        ...state,
                        to: item.value
                    }
                    if(item.value === '--:--') res['from'] = '--:--';
                    else if(res.from === '--:--') res['from'] = '00:00';
                    props.onChange(res)
                    return res;

                })}
            />
        </div>
    );
}
function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
export const PlaceInfo = observer(props => {
    const { id } = useParams();
    const { places, directions, changes, tags, cities} = useStore();
    const [state, setState] = useState(null);
    const history = useHistory();

    const handleTimeChange = (index, val) => {
        const res = workTimeToString(index, val.from, val.to);
        if(Array.isArray(state.work_time) && state.work_time.length === 7){
            handleChange({
                target: {
                    name: 'work_time',
                    value: state.work_time.map((_, ind) => ind === index ? res : _)
                }
            });
        } else {
            handleChange({
                target: {
                    name: 'work_time',
                    value: Array.apply(0, new Array(7)).map((_, ind) => ind === index ? res : workTimeToString(ind, '--:--', '--:--'))
                }
            });
        }
    }
    const handleChange = e => {
        setState(prev => {
            const res = {
                ...prev,
                [e.target.name]: e.target.value 
            };
            if(id === 'new'){
                if(res.name && res.phones && res.phones.length && res.description && res.city_id && res.address && res.price){
                    changes.add(`create_place`, async ()=>{
                        const { id: place_id } = await places.create(res);
                        history.push(`/places/${place_id}/info`);
                    });
                }
            } else {
                changes.add(`update_place_${id}`, ()=>places.update(res));
            }
            return res;
        });
    }
    const addPhone = () => {
        setState(prev => {
            return({
                ...prev,
                phones: [
                    ...prev.phones,
                    ''
                ]
            });
        });
    }
    const handlePhoneChange = (index, e) => {
        setState(prev => {
            const res = {
                ...prev,
                phones: prev.phones.map((el, ind) => index === ind ? e.target.value : el)
            };
            if(id === 'new'){
                if(res.name && res.phones && res.phones.length && res.description && res.city_id && res.address && res.price){
                    changes.add(`create_place`, async ()=>{
                        const { id: place_id } = await places.create(res);
                        history.push(`/places/${place_id}/info`);
                    });
                }
            } else {
                changes.add(`update_place_${id}`, ()=>places.update(res));
            }
            return res; 
        });
    }
    const handleMapChange = ([ latitude, longitude ]) => {
        setState(prev => {
            const res = {
                ...prev,
                latitude,
                longitude
            };
            if(id === 'new'){
                if(res.name && res.phones && res.phones.length && res.description && res.city_id && res.address && res.price){
                    changes.add(`create_place`, async ()=>{
                        const { id: place_id } = await places.create(res);
                        history.push(`/places/${place_id}/info`);
                    });
                }
            } else {
                changes.add(`update_place_${id}`, ()=>places.update(res));
            }
            return res;
        });
    }
    useEffect(() => setState(places.current), [places.current]);
    if(!state || places.loading) return <Load />
    return(
        <Content>
            {
                id !== 'new' ?
                <div className={styles.info__header}>
                    {
                        state.disabled_by_admin ?
                        <div className={styles.admined_dis}>
                            Это место было отключено администратором. <br />
                            Для восстановления напишите на почту <a href="mailto:admin@frissonapp.com">admin@frissonapp.com</a>
                        </div> :
                        <div className={styles.disabled}>
                            <Toggle 
                                active={!(state.disabled_by_manager || state.disabled_by_admin)}
                                onChange={async (e) =>  {
                                    setState(prev => ({
                                        ...prev,
                                        disabled_by_manager: !e.target.checked
                                    }))
                                    const ds = e.target.checked ? 'enabled' : 'disabled';
                                    await api.post(`/managers/places/${state.id}/${ds}`);
                                    places.load();
                                }}
                            />
                            {
                                !(state.disabled_by_manager || state.disabled_by_admin) ?
                                <div className={styles.text}>
                                    Ваш место активно
                                </div> :
                                <div className={styles.text_disable}>
                                    Ваш место отключено
                                </div>
                            }
                        </div>
                    }
                    <div className={styles.info__id}>
                        (№{id})
                    </div>
                </div> :
                ''
            }
            <Headline>
                {state.name}
            </Headline>
            <div className={styles.info__grid}>
                <div>
                    <div className={styles.info__label}>
                        Основная информация
                    </div>
                    <Input value={state.name} name="name" onChange={handleChange} placeholder="Название активности"/>
                    <select 
                        onChange={handleChange} 
                        name="activity_type_id" 
                        value={state.activity_type_id}
                        className={styles.select}
                    >
                        {
                            directions.list.map(dir => dir.types.map(type => type)).reduce((prev, curr) => prev.concat(curr), []).sort(compare).map(type => <option value={type.id}>{type.name}</option>)
                        }
                    </select>
                    <br />
                    <div className={styles.info__label}>
                        Теги
                    </div>
                    <Select 
                        multi
                        options={
                            tags.list.slice().sort(compare).map(tag => ({
                                label: tag.name,
                                value: tag.id
                            }))
                        }
                        values={state.search_tag_ids.map(tag_id => tags.list.find(el => el.id === tag_id)).map(tag => ({
                            label: tag.name,
                            value: tag.id
                        }))}
                        searchable={false}
                        keepSelectedInList={false}
                        dropdownGap={0}
                        placeholder=""
                        onChange={(values) => {
                            handleChange({
                                target: {
                                    name: 'search_tag_ids',
                                    value: values.map(val => val.value)
                                }
                            })
                        }}
                    />
                    <br />
                    <div className={styles.info__label}>
                        Описание
                    </div>
                    <TextArea 
                        style={{
                            width: "337px",
                            height: "165px"
                        }}
                        value={state.description} 
                        name="description" 
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <div className={styles.info__label}>
                        Как добраться
                    </div>
                    <select 
                        onChange={handleChange} 
                        name="city_id" 
                        value={state.city_id}
                        className={styles.select}
                    >
                        {
                            cities.list.map(city => <option value={city.id}>{city.name}</option>)
                        }
                    </select>
                    <br />
                    <Input 
                        value={state.address} 
                        name="address" 
                        placeholder="Адрес активности"
                        onChange={handleChange}
                    />
                    <SelectMap 
                        coords={[state.latitude, state.longitude]}
                        onChange={handleMapChange}
                    />
                    <br />
                    <br />
                    <div className={styles.info__label}>
                        Особенности
                    </div>
                    <TextArea 
                        style={{
                            width: "337px",
                            height: "165px"
                        }}
                        value={state.feature} 
                        name="feature" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className={styles.info__label}>
                        Контактная информация
                    </div>
                    {
                        state.phones.map((phone, index) => {
                            return(
                                <InputMask mask="+7(999) 999-99-99" value={phone} key={index} onChange={(e)=>handlePhoneChange(index, e)}>
                                    {
                                        (inputProps) => <Input {...inputProps}/>
                                    }
                                </InputMask>
                            );
                        })
                    }
                    <Button color="stroke" onClick={addPhone}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" width="2" height="12" rx="1" fill="#0E2F56"/>
                            <rect y="5" width="12" height="2" rx="1" fill="#0E2F56"/>
                        </svg>
                        Добавить телефон
                    </Button>
                    <br />
                    <div className={styles.row}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00004C14.6666 4.31814 11.6818 1.33337 7.99992 1.33337C4.31802 1.33337 1.33325 4.31814 1.33325 8.00004C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667ZM4.22868 4.2288C5.22888 3.22861 6.58543 2.66671 7.99992 2.66671C9.41441 2.66671 10.771 3.22861 11.7712 4.2288C12.7713 5.229 13.3333 6.58555 13.3333 8.00004C13.3333 9.41453 12.7713 10.7711 11.7712 11.7713C10.771 12.7715 9.41441 13.3334 7.99992 13.3334C6.58543 13.3334 5.22888 12.7715 4.22868 11.7713C3.22849 10.7711 2.66659 9.41453 2.66659 8.00004C2.66659 6.58555 3.22849 5.229 4.22868 4.2288ZM4.81177 8.403H3.32436C3.37175 8.95791 3.51826 9.49982 3.75696 10.003H5.03696C4.91073 9.47797 4.83547 8.94226 4.81177 8.403ZM8.40288 3.37189V5.203L10.0384 5.19708C9.94718 4.97663 9.83992 4.76271 9.71844 4.55708C9.44321 4.01167 8.97395 3.58891 8.40288 3.37189ZM10.554 7.603C10.5303 7.06256 10.4485 6.52626 10.311 6.003H8.40288V7.603H10.554ZM7.59695 5.203V3.37189C7.02486 3.59036 6.55546 4.01536 6.2814 4.563C6.15975 4.76851 6.05281 4.98238 5.9614 5.203H7.59695ZM7.59695 7.603V6.003H5.69473C5.55725 6.52626 5.47547 7.06256 5.45177 7.603H7.59695ZM3.32436 7.59708H4.81177C4.83508 7.05773 4.91049 6.5219 5.03696 5.99708H3.75696C3.51826 6.50026 3.37175 7.04217 3.32436 7.59708ZM7.59695 8.403H5.45177C5.47583 8.94344 5.55727 9.47979 5.69473 10.003H7.59695V8.403ZM7.60288 12.6045V10.7734L5.96733 10.7793C6.05874 10.9999 6.16567 11.2138 6.28733 11.4193C6.56255 11.9647 7.03181 12.3875 7.60288 12.6045ZM8.40288 10.803V12.6045V12.6282C8.97395 12.4112 9.44321 11.9884 9.71844 11.443C9.84009 11.2375 9.94702 11.0236 10.0384 10.803H8.40288ZM8.40288 8.37337V9.97337H10.3051C10.4426 9.45016 10.524 8.91381 10.5481 8.37337H8.40288ZM12.6814 8.37337H11.194L11.1881 8.403C11.1626 8.93219 11.0873 9.45782 10.9629 9.97337H12.2488C12.4875 9.47019 12.634 8.92828 12.6814 8.37337ZM10.9629 6.003C11.0895 6.51796 11.1669 7.04378 11.194 7.57337L12.6755 7.603C12.6281 7.04834 12.4817 6.50671 12.2429 6.003H10.9629ZM10.7258 5.203H11.7629C11.2801 4.55474 10.6396 4.04068 9.90214 3.70967C10.2557 4.15958 10.5339 4.66392 10.7258 5.203ZM5.27399 5.203C5.46592 4.66392 5.74411 4.15958 6.0977 3.70967C5.36028 4.04068 4.71975 4.55474 4.23696 5.203H5.27399ZM4.25007 10.8208H5.27399C5.46592 11.3599 5.74411 11.8642 6.0977 12.3141C5.36495 11.9812 4.72914 11.4672 4.25007 10.8208ZM9.92135 12.2819C10.648 11.9572 11.2814 11.4548 11.7629 10.8208H10.7199C10.5326 11.347 10.263 11.8402 9.92135 12.2819Z" fill="#C8C8C8"/>
                        </svg>
                        &nbsp;
                        <Input 
                            value={state.site_web} 
                            name="site_web" 
                            onChange={handleChange}
                            placeholder="Ссылка на ваш вебсайт"
                        />
                    </div>
                    <div className={styles.row}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.46658 1.91663C8.64883 1.91663 7.86458 2.24148 7.28634 2.81971C6.7081 3.39795 6.38325 4.18221 6.38325 4.99996V6.71663H4.73325C4.65041 6.71663 4.58325 6.78378 4.58325 6.86663V9.13329C4.58325 9.21613 4.65041 9.28329 4.73325 9.28329H6.38325V13.9333C6.38325 14.0161 6.45041 14.0833 6.53325 14.0833H8.79992C8.88276 14.0833 8.94992 14.0161 8.94992 13.9333V9.28329H10.6145C10.6834 9.28329 10.7434 9.23645 10.7601 9.16967L11.3267 6.90301C11.3504 6.80833 11.2788 6.71663 11.1812 6.71663H8.94992V4.99996C8.94992 4.86293 9.00435 4.73151 9.10125 4.63462C9.19814 4.53773 9.32956 4.48329 9.46658 4.48329H11.1999C11.2828 4.48329 11.3499 4.41614 11.3499 4.33329V2.06663C11.3499 1.98378 11.2828 1.91663 11.1999 1.91663H9.46658Z" fill="#C8C8C8"/>
                        </svg>
                        &nbsp;
                        <Input 
                            value={state.site_facebook} 
                            name="site_facebook" 
                            onChange={handleChange}
                            placeholder="Ссылка на facebook"
                        />
                    </div>
                    <div className={styles.row}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3356 12.254H12.8146C12.2392 12.254 12.0661 11.788 11.034 10.7559C10.1333 9.88751 9.75282 9.77909 9.52451 9.77909C9.20967 9.77909 9.12315 9.86561 9.12315 10.3003V11.6681C9.12315 12.0382 9.00326 12.255 8.03686 12.255C7.09897 12.192 6.18948 11.907 5.38329 11.4237C4.5771 10.9403 3.89728 10.2723 3.39983 9.47468C2.21886 8.00475 1.39713 6.27956 1 4.43628C1 4.20798 1.08653 4.00156 1.52125 4.00156H3.04121C3.43215 4.00156 3.57289 4.17566 3.72613 4.57702C4.46422 6.74959 5.72356 8.63859 6.23438 8.63859C6.43037 8.63859 6.51586 8.55207 6.51586 8.06313V5.82593C6.45122 4.80533 5.90912 4.7188 5.90912 4.34975C5.91609 4.25242 5.96069 4.16162 6.03348 4.09661C6.10627 4.03161 6.20151 3.99752 6.29902 4.00156H8.68842C9.01473 4.00156 9.12315 4.16419 9.12315 4.55513V7.5742C9.12315 7.90051 9.26388 8.00892 9.36188 8.00892C9.55787 8.00892 9.70903 7.9005 10.0676 7.54189C10.8379 6.60254 11.4672 5.55601 11.9358 4.43524C11.9837 4.30062 12.0743 4.18536 12.1939 4.10705C12.3134 4.02875 12.4552 3.9917 12.5978 4.00156H14.1188C14.5744 4.00156 14.6713 4.22987 14.5744 4.55513C14.0213 5.79406 13.337 6.97012 12.5332 8.06313C12.3695 8.31333 12.3038 8.44365 12.5332 8.73659C12.6843 8.9649 13.217 9.41004 13.5757 9.8333C14.0968 10.3531 14.5296 10.9546 14.8569 11.6139C14.9872 12.0371 14.7693 12.254 14.3356 12.254Z" fill="#C8C8C8"/>
                        </svg>
                        &nbsp;
                        <Input 
                            value={state.site_vk} 
                            name="site_vk" 
                            onChange={handleChange}
                            placeholder="Ссылка на VK"
                        />
                    </div>
                    <div className={styles.row}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00012 5.83328C6.8035 5.83328 5.83346 6.80333 5.83346 7.99995C5.83346 9.19657 6.8035 10.1666 8.00012 10.1666C9.19674 10.1666 10.1668 9.19657 10.1668 7.99995C10.1668 6.80333 9.19674 5.83328 8.00012 5.83328Z" fill="#C8C8C8"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51315 2.05426C6.81189 1.79734 9.18837 1.79734 11.4871 2.05426C12.7527 2.19571 13.7735 3.1929 13.922 4.46293C14.1969 6.81293 14.1969 9.18696 13.922 11.537C13.7735 12.807 12.7527 13.8042 11.4871 13.9456C9.18837 14.2026 6.8119 14.2026 4.51315 13.9456C3.24755 13.8042 2.22675 12.807 2.07821 11.537C1.80336 9.18696 1.80336 6.81293 2.07821 4.46293C2.22675 3.1929 3.24755 2.19571 4.51315 2.05426ZM11.3335 3.99995C10.9653 3.99995 10.6668 4.29843 10.6668 4.66662C10.6668 5.03481 10.9653 5.33328 11.3335 5.33328C11.7016 5.33328 12.0001 5.03481 12.0001 4.66662C12.0001 4.29843 11.7016 3.99995 11.3335 3.99995ZM4.83346 7.99995C4.83346 6.25105 6.25122 4.83328 8.00012 4.83328C9.74902 4.83328 11.1668 6.25105 11.1668 7.99995C11.1668 9.74885 9.74902 11.1666 8.00012 11.1666C6.25122 11.1666 4.83346 9.74885 4.83346 7.99995Z" fill="#C8C8C8"/>
                        </svg>
                        &nbsp;
                        <Input 
                            value={state.site_instagram} 
                            name="site_instagram" 
                            onChange={handleChange}
                            placeholder="Ссылка на Instagram"
                        />
                    </div>
                    <div className={styles.row}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.65926 3.26037C6.88304 3.08639 9.117 3.08639 11.3408 3.26037L12.8346 3.37723C13.6666 3.44233 14.3473 4.06593 14.4849 4.88911C14.829 6.94877 14.829 9.05127 14.4849 11.1109C14.3473 11.9341 13.6666 12.5577 12.8346 12.6228L11.3408 12.7397C9.117 12.9137 6.88303 12.9137 4.65925 12.7397L3.16545 12.6228C2.33341 12.5577 1.65272 11.9341 1.51518 11.1109C1.17105 9.05127 1.17105 6.94877 1.51518 4.88911C1.65272 4.06593 2.33341 3.44233 3.16545 3.37723L4.65926 3.26037ZM6.66667 9.64678V6.35326C6.66667 6.1978 6.83626 6.10178 6.96957 6.18176L9.71417 7.82852C9.84364 7.9062 9.84364 8.09384 9.71417 8.17152L6.96957 9.81828C6.83626 9.89826 6.66667 9.80224 6.66667 9.64678Z" fill="#C8C8C8"/>
                        </svg>
                        &nbsp;
                        <Input 
                            value={state.site_youtube} 
                            name="site_youtube" 
                            onChange={handleChange}
                            placeholder="Ссылка на Youtube"
                        />
                    </div>
                    <div className={styles.row}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5398 4.15157C14.5785 4.09773 14.5214 4.0282 14.4596 4.05215C14.0205 4.22237 13.5615 4.33722 13.0934 4.39381C13.6146 4.0824 14.0169 3.60835 14.2399 3.0471C14.2627 2.98993 14.2002 2.93887 14.1464 2.96862C13.6619 3.23617 13.1394 3.42884 12.5966 3.5398C12.5739 3.54444 12.5505 3.53671 12.5345 3.51988C12.1272 3.09009 11.5911 2.80394 11.0066 2.70505C10.4098 2.60409 9.79638 2.70405 9.26255 2.98927C8.72871 3.2745 8.30464 3.72884 8.05685 4.28104C7.82124 4.80608 7.75766 5.39135 7.87387 5.95344C7.88289 5.99705 7.84875 6.03822 7.8043 6.03546C6.74826 5.96987 5.71646 5.68899 4.77246 5.20972C3.83085 4.73168 2.99703 4.06663 2.32178 3.25561C2.29181 3.21962 2.23501 3.22428 2.21318 3.26571C2.00306 3.66442 1.89305 4.10882 1.89335 4.56048C1.8925 5.01007 2.00283 5.45289 2.21452 5.84952C2.42621 6.24616 2.7327 6.58429 3.10669 6.83381C2.71007 6.82302 2.32118 6.72497 1.96752 6.5472C1.92194 6.52429 1.86727 6.55691 1.86964 6.60786C1.89722 7.20069 2.11485 7.79584 2.49156 8.25246C2.89244 8.73837 3.44886 9.07091 4.06669 9.19381C3.82886 9.26619 3.58194 9.30435 3.33335 9.30715C3.19806 9.30557 3.06303 9.29558 2.92904 9.27727C2.87936 9.27047 2.8388 9.31766 2.85619 9.36469C3.04047 9.86302 3.36602 10.2978 3.79407 10.6153C4.2517 10.9546 4.80374 11.1428 5.37335 11.1538C4.41149 11.9107 3.22394 12.3237 2.00002 12.3271C1.87426 12.3276 1.74855 12.3235 1.62314 12.3149C1.55247 12.3101 1.51996 12.4043 1.58088 12.4404C2.77339 13.1481 4.13641 13.5222 5.52669 13.5205C6.55315 13.5311 7.57144 13.3372 8.5221 12.9499C9.47275 12.5626 10.3367 11.9897 11.0635 11.2648C11.7903 10.5399 12.3653 9.67741 12.7551 8.72775C13.1448 7.7781 13.3414 6.7603 13.3334 5.73381V5.41393C13.3334 5.39288 13.3433 5.37309 13.3601 5.3604C13.8123 5.01898 14.21 4.61135 14.5398 4.15157Z" fill="#C8C8C8"/>
                        </svg>
                        &nbsp;
                        <Input 
                            value={state.site_twitter} 
                            name="site_twitter" 
                            onChange={handleChange}
                            placeholder="Ссылка на Twitter"
                        />
                    </div>
                    <br />
                    <div className={styles.info__label}>
                        Уровень цен
                    </div>
                    <Rubles active={state.price} onChange={(val) => {
                        handleChange({
                            target: {
                                name: 'price',
                                value: val
                            }
                        });
                    }}/>
                    {
                        state.price === 4 ?
                        <div className={styles.price_desc}>
                            Больше 8 000 ₽ <br />
                            В среднем, на одного человека
                        </div> :
                        (
                            state.price === 3 ?
                            <div className={styles.price_desc}>
                                5 000 - 8 000 ₽ <br />
                                В среднем, на одного человека
                            </div> :
                            (
                                state.price === 2 ?
                                <div className={styles.price_desc}>
                                    3 000 - 5 000 ₽ <br />
                                    В среднем, на одного человека
                                </div> :
                                (
                                    state.price === 1 ?
                                    <div className={styles.price_desc}>
                                        Меньше 3 000 ₽ <br />
                                        В среднем, на одного человека
                                    </div> :
                                    <></>
                                )
                            )
                        )
                    }
                    <br />
                    <div className={styles.info__label}>
                        Время работы
                    </div>
                    {
                        days.map((_, index) => <TimeRow 
                                                    onChange={(val) => 
                                                    handleTimeChange(index, val)} 
                                                    value={parseWorkTime(index, Array.isArray(state.work_time) && state.work_time.length === 7 ? state.work_time[index] : "")}
                                                    day={short_days[index]}
                                                />)
                    }
                </div>
            </div>
            {
                id !== 'new' ?
                <Link to={`${history.location.pathname}/confirm_delete_place`} className={styles.bulk_place} >
                    Удалить активность
                </Link> :
                ''
            }
        </Content>
    );
});