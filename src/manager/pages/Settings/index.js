import { observer } from 'mobx-react-lite';
import { ComeBack, Headline, Input } from '../../components';
import { useStore } from '../../store';
import { generate } from 'generate-password';
import styles from './Settings.module.css';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

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
            history.replace(`${history.location.pathname}/confirm_phone/+79055675532`);
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
                }, history)}
            />
            <InputMask mask="+7(999) 999-99-99" value={manager.data.phone} onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                }, history)} name="phone">
                {
                    (inputProps) => <Input placeholder="Номер телефона"  name="phone" {...inputProps}/>
                }
            </InputMask>
            <Input 
                value={manager.data.email}
                name="email"
                placeholder="Email"
                onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                }, history)}
            />
            <Input 
                value={manager.data.password}
                placeholder="Придумайте пароль"
                name="password"
                onChange={(e) => manager.update({
                    [e.target.name]: e.target.value
                }, history)}
            />
            <div className={styles.generate_pass} onClick={generatePassword}>Или сгенерировать пароль</div>
            {/* <button onClick={handleSave}>
                Подтвердить
            </button> */}
            <Link className={styles.bulk} to={`${history.location.pathname}/confirm_delete_account`}>
                Удалить аккаунт
            </Link>
        </div>
    );
});