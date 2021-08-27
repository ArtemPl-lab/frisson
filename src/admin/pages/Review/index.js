import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewImage, TextArea } from '../../../manager/components';
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
        rating: 1,
        image_ids: []
    });
    const loadData = async () => {
        const res = await api.get(`/places/${id}/reviews/frisson`);
        if(res.ok){
            const json = await res.json();
            setState(json);
        }
    }
    useEffect(() => {
        loadData();
    }, [id]);
    const handleChange = (key, value) => {
        setState(prev => {
            changes.add(`changes_fr_${id}`, async ()=>await saver({
                ...prev,
                [key]: value
            }));
            return({
                ...prev,
                [key]: value
            });

        });
    }
    const loadImage = (e) => {
        saver(state, e.target.files[0])
    }
    const deleteImg = img_id => {
        handleChange('image_ids', state.image_ids.filter(imid => imid !== img_id));
    }
    const saver = async (data, loadphoto = null) => {
        const fd = new FormData();
        for(let i = 0; i < data.image_ids.length; i++){
            const res = await api.get(`/images/${data.image_ids[i]}`);
            const photo = await res.blob();
            fd.append('photos', photo)
        }
        if(loadphoto) fd.append('photos', loadphoto)
        await fetch(`${api.address}/places/${id}/reviews?text=${data.text}&rating=${data.rating}`, {
            method: 'POST',
            headers: {
                'X-Auth-Token': '6afe1fa001bf11ecaa7b8df35910910bb01901953fd8b7aace11fb100af1efa6'
            },
            body: fd
        });
        loadData();
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
                    width: "604px",
                    height: "166px",
                    marginBottom: "32px"
                }}
            />
            <div className={styles.images}>
                {
                    state.image_ids.map(img_id => {
                        return(
                            <div className={styles.img_wrapper}>
                                <img src={`${api.address}/images/${img_id}`} className={styles.image}/>
                                <div className={styles.img_delete} onClick={()=>deleteImg(img_id)}>
                                    Удалить
                                </div>
                            </div>
                        );
                    })
                }
                <NewImage 
                    height={186}
                    onChange={loadImage}
                />
            </div>
        </div>
    );
}