import { observer } from 'mobx-react-lite';
import { ComeBack, Headline, Input } from '../../components';
import { useStore } from '../../store';
import { generate } from 'generate-password';
import styles from './Settings.module.css';
import { useHistory } from 'react-router-dom';

export const Settings = observer(props => {
    const { manager } = useStore();
    const history = useHistory();
    const generatePassword = () => {
        manager.update({
            password: generate({
                length: 10,
                numbers: true
            })
        });
    }
    const handleSave = (e) => {
        // if(manager.data.phone){
            history.push(`${history.location.pathname}/confirm_phone/+79055675532`);
        // }
    }
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <br />
            <br />
            <Headline>
                Настройки профиля
            </Headline>
            <br />
            <div className={styles.info__label}>
                Основная информация
            </div>
            <Input 
                value={manager.data.full_name}
                name="full_name"
                onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                })}
            />
            <Input 
                placeholder="Номер телефона"
                value={manager.data.phone}
                name="phone"
                onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                })}
            />
            <Input 
                value={manager.data.email}
                name="email"
                onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                })}
            />
            <Input 
                value={manager.data.password}
                placeholder="Пароль"
                name="password"
                onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                })}
            />
            <div className={styles.generate_pass} onClick={generatePassword}>Сгенерировать пароль</div>
            <button onClick={handleSave}>
                Подтвердить
            </button>
            <div className={styles.bulk}>
                Удалить аккаунт
            </div>
        </div>
    );
});