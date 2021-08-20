import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextArea } from '../../../manager/components';
import api from '../../api';
import { ComeBack, Headline } from '../../components';
import { Stars } from '../../components/Stars';
import { useStore } from '../../store';
import styles from './Review.module.css';

export const Review = props => {
    const { id } = useParams();
    const { changes } = useStore();
    const [ state, setState ] = useState({
        text: '',
        rating: 1
    });
    useEffect(async () => {
        const res = await api.get(`/places/${id}/reviews/frisson`);
        if(res.ok){
            const json = await res.json();
            setState(json);
        }
    }, [id]);
    const handleChange = (key, value) => {
        setState(prev => {
            changes.add(`changes_fr_${id}`, ()=>saver({
                ...prev,
                [key]: value
            }, {}));
            return({
                ...prev,
                [key]: value
            });

        });
    }
    const saver = (data, photoes) => {
        fetch(`${api.address}/places/${id}/reviews?text=${data.text}&rating=${data.rating}`, {
            method: 'POST',
            headers: {
                'X-Auth-Token': '6afe1fa001bf11ecaa7b8df35910910bb01901953fd8b7aace11fb100af1efa6'
            }
        });
    }
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <br />
            <br />
            <Headline>
                Отзыв от Frisson
            </Headline>
            <div className={styles.stars_title}>
                Количество звёзд
            </div>
            <Stars active={state.rating} onChange={(val)=>handleChange('rating', val)}/>
            <div className={styles.text_title}>
                Текст отзыва
            </div>
            <TextArea
                onChange={(e)=>handleChange('text', e.target.value)} 
                value={state.text}
                style={{
                    width: "574px",
                    height: "166px",
                    marginBottom: "32px"
                }}
            />
        </div>
    );
}