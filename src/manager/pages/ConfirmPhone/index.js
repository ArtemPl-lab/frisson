import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import api from "../../api";
import { Modal } from "../../components/Modal";
import { objectToUrl } from "../../helpers";
import { useStore } from "../../store";
import styles from './ConfirmPhone.module.css';

export const ConfirmPhone = props => {
    const { phone } = useParams();
    return(
        <Modal options={{
            width: "420px",
            height: "252px"
        }}
        >
            <Modify phone={phone}/>
        </Modal>
    );
}
const Modify = ({ phone }) => {
    const { manager } = useStore();
    const [state, setState] = useState({
        code: ''
    });
    const handleChange = e => {
        setState(prev => ({
            ...prev,
            code: e.target.value
        }))
    }
    const history = useHistory();
    useEffect(() => {
        api.post(`/phones/verification-code/${phone}`);
    }, [phone]);
    const validate = async () => {
        try{
            const res = await api.post(`/managers/one-time-token`, {
                phone, 
                verification_code_digits: parseInt(state.code)
            });
            if(!res.ok) throw res.status;
            const { auth_token } = await res.json();
            const r = await fetch(`${api.address}/managers/secret-fields/${objectToUrl(manager.data)}`, {
                method: 'PATCH',
                headers: {
                    'X-One-Time-Manager-Token': auth_token
                }
            });
            if(r.ok){
                manager.update_callback();
            }
            else{
                throw r.status;
            }
        }
        catch(e){
            alert(`Произошла ошибка ${e}`)
        }
    }
    return(
        <form className={styles.content} onSubmit={e => e.preventDefault()}>
            <div className={styles.title}>
                Подтвердите действие
            </div>
            <input placeholder="Код из смс" value={state.code} onChange={handleChange} />
            <button type="submit" onClick={validate}>
                Отправить код
            </button>
            <div onClick={history.goBack} className={styles.close}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00012 17.0005L17 7.00067" stroke="#0E2F56" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7.00012 6.99939L17 16.9993" stroke="#0E2F56" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </div>
        </form>
    );
}