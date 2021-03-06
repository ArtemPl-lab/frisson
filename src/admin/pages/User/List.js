import styles from './User.module.css';
import { useInView } from 'react-intersection-observer';
import { Button, Content, Headline, Search } from "../../components";
import { Load } from '../Load';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { ManagerCard } from '../../components/ManagerCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const UsersList = observer(props => {
    const { managers } = useStore();
    const { ref, inView} = useInView({ threshold: 0 });
    if(inView && !managers.loading && !managers.loadingEnd){
        managers.load();
    }
    const onSearch = (e) => {
        e.preventDefault();
        managers.search();
    }
    return(
        <Content>
            <header className={styles.header}>
                <Headline>
                    Менеджеры
                </Headline>
                <Link to="/users/new">
                    <Button>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" width="2" height="12" rx="1" fill="white"/>
                            <rect y="5" width="12" height="2" rx="1" fill="white"/>
                        </svg>
                        &nbsp;
                        Добавить пользователя
                    </Button>
                </Link>
            </header>
            <Search 
                placeholder="Поиск по ID менеджера или Уникальному номеру активности" 
                value={managers.queryString} 
                onChange={(e) => {
                    managers.updateQuery(e.target.value);
                    if(!e.target.value){
                        managers.search('');
                    }
                }}
                onSubmit={onSearch}
            />
            <div className={styles.cards}>
                {
                    managers.searched && managers.list.length ?
                    <ManagerCard {...managers.list[0]}/> :
                    managers.list.map(manager => <ManagerCard {...manager}/>)
                }
            </div>
            {
                !managers.loadingEnd ? 
                <div ref={ref} className={styles.load_wrapper}>
                    <Load /> 
                </div> : ''
            }
        </Content>
    );
});