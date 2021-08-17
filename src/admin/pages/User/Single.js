import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import api from '../../api';
import { generate } from 'generate-password';
import { ComeBack, Headline, Input, Search } from '../../components';
import { Load } from '../Load';
import styles from './User.module.css';
import { observer } from 'mobx-react-lite';
import { ActivityCard } from '../../components/ActivityCard';

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
        await api.delete(`/admins/managers/${id}`);
        managers.delete(id);
        history.replace('/users');
    }
    const handleChange = e => {
        setState(prev => {
            const res = {
                ...prev,
                [e.target.name]: e.target.value
            };
            if(res.full_name) changes.add(`change_usr${id}`, async () => {
                if(id !== 'new'){
                    api.patch(`/admins/managers/${id}`, state);
                }
                else {
                    registerUser(state);
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
    if(loading) return <Load />
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <br />
            <br />
            <Headline>
                {
                    id === 'new' ?
                    'Новый профиль': 
                    'Настройки профиля'
                }
                
            </Headline>
            <br />
            <div className={styles.label}>
                Основная информация
            </div>
            <div className={styles.info__grid}>
                <Input placeholder="Имя Фамилия / Название компании" onChange={handleChange} name="full_name" value={state.full_name}/>
                <Input placeholder="Почта" onChange={handleChange}  name="email" value={state.email}/>
                <Input placeholder="Номер телефона" onChange={handleChange} name="phone" value={state.phone}/>
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
                            <Search placeholder="Поиск по названию или Уникальному номеру активности"/>
                            <div className={styles.places_grid}>

                                    {state.places.map(place => <ActivityCard {...place} enable={enable}/>)}

                            </div>
                        </div> :
                        <div className={styles.no_places}>
                            Пока не добавлено ни одной активности
                        </div>
                    }
                    <footer className={styles.footer}>
                        <div className={styles.bulk} onClick={bulkAccount}>
                            Удалить аккаунт
                        </div>
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