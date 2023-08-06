import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import api from '../../api';
import { generate } from 'generate-password';
import { ComeBack, Headline, Input, Search } from '../../components';
import { Load } from '../Load';
import styles from './User.module.css';
import { observer } from 'mobx-react-lite';
import { ActivityCard } from '../../components/ActivityCard';
import InputMask from 'react-input-mask';

const getManagerToken = async (id) => {
    const res = await api.get(`/admins/managers/${id}/token`);
    const { auth_token } = await res.json();
    return (res.ok ? auth_token : null);
}

const getData = async id => {
    const res = await api.get(`/admins/managers/${id}`);
    return (res.ok ? await res.json() : null);
}


export const UserPage = observer(props => {
    const { changes, managers } = useStore();
    const history = useHistory();
    const { id } = useParams();
    const [ loading, setLoading ] = useState(false);
    const [state, setState] = useState({
        full_name: '',
        phone: '',
        email: '',
        password: '',
        places: []
    });
    const [search, setSearch] = useState('');
    const enable = (id, val) => {
        const newPlaces = state.places.map(place => {
            if(place.id === id)
                return ({
                    ...place,
                    disabled_by_admin: val
                });
            return place;
        });
        setState(prev => ({
            ...prev,
            places: newPlaces
        }));
    }
    const registerUser = async creds => {
        const res = await api.post('/admins/managers', creds);
        const { id } = await res.json();
        history.replace(`/users/${id}`);
        managers.init();
    }
    useEffect(async () => {
        setLoading(true);
        if(id !== 'new'){
            const data = await getData(id);
            if(data) setState(data);
        }
        setLoading(false);
    }, []);
    const manageAccount = async () => {
        setLoading(true);
        const token = await getManagerToken(id);
        localStorage.managerToken = token;
        window.location.href = '/manager/home';
    }
    const bulkAccount = async () => {
        history.replace(`${history.location.pathname}/confirm_delete`);
    }
    const handleChange = e => {
        setState(prev => {
            const res = {
                ...prev,
                [e.target.name]: e.target.value
            };
            if(res.full_name) changes.add(`change_usr${id}`, async () => {
                if(id !== 'new'){
                    api.patch(`/admins/managers/${id}`, res);
                }
                else {
                    registerUser(res);
                }
            });
            else changes.remove(`change_usr${id}`);
            return(res);
        });

    }
    const generatePassword = () => {
        handleChange({
            target:{
                name: "password",
                value: generate({
                    length: 10,
                    numbers: true
                })
            }
        });
    }
    // if(loading) return <Load />
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <br />
            <br />
            <Headline>
                {
                    id === 'new' ?
                    'Новый профиль':
                    `Настройки профиля (ID: ${id})`
                }

            </Headline>
            <br />
            <div className={styles.label}>
                Основная информация
            </div>
            <div className={styles.info__grid}>
                <Input placeholder="Имя Фамилия / Название компании" onChange={handleChange} name="full_name" value={state.full_name}/>
                <Input placeholder="Почта" onChange={handleChange}  name="email" value={state.email}/>
                <InputMask mask="+7 (999) 999-99-99" value={state.phone} onChange={handleChange} name="phone">
                    {
                        (inputProps) => <Input placeholder="Номер телефона"  name="phone" {...inputProps}/>
                    }
                </InputMask>
                <div>
                    <Input placeholder="Пароль" onChange={handleChange} name="password" value={state.password}/>
                    <div className={styles.generate} onClick={generatePassword}>
                        Сгенерировать новый пароль
                    </div>
                </div>
            </div>
            {
                id !== 'new' ?
                <>
                    <div className={styles.cnt}>
                        Управление активностями
                    </div>
                    {
                        state.places.length ?
                        <div className={styles.activity_search}>
                            <Search placeholder="Поиск по названию или Уникальному номеру активности" onChange={(e)=>setSearch(e.target.value)}/>
                            <div className={styles.places_grid}>

                                    {state.places.map(place => {
                                        if(search === '' || place.id.toString().includes(search) || place.name.includes(search)){
                                            return <ActivityCard {...place} enable={enable} />
                                        }
                                    })}

                            </div>
                        </div> :
                        <div className={styles.no_places}>
                            Пока не добавлено ни одной активности
                        </div>
                    }
                    <footer className={styles.footer}>
                        <Link to={`${history.location.pathname}/confirm_delete`} push className={styles.bulk}>
                            Удалить аккаунт
                        </Link>
                        <div className={styles.controlling} onClick={manageAccount}>
                            Управлять этим аккаунтом
                        </div>
                    </footer>
                </> :
                ''
            }
        </div>
    );
});
