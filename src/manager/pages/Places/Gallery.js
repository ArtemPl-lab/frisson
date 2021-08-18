import styles from './Places.module.css';
import { useParams } from "react-router-dom";
import { Content, Headline, NewImage } from "../../components";
import { useStore } from "../../store";
import api from '../../api';
import { Load } from '../Load';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Toggle from '../../components/Toggle/Toggle';

export const PlaceGallery = observer(props => {
    const { id } = useParams();
    const { places } = useStore();
    const loadFile = e => {
        const fd = new FormData();
        fd.append('photos', e.target.files[0]);
        api.post(`/managers/places/${places.current.id}/images`, {}, fd)
    }
    // useEffect(() => {
    //     if(places.current) places.current.image_ids.forEach(el => api.get(`/images/${el}`));
        
    // }, [places.current]);
    if(!places.current) return <Load />
    return(
        <Content>
            <div className={styles.info__header}>
                <Headline>
                    {
                        id !== 'new' ? 
                        places.current.name : 'Новое место'
                    }
                </Headline>
                <div className={styles.info__id}>
                    (№{places.current.id})
                </div>
            </div>

            <br />
            <div className={styles.info__label}>
                Фото и видео
            </div>
            <div className={styles.photoes_desc}>
                Для корректного отображения фотографий в приложении мы рекомендуем использовать снимки и видео с вертикальной ориентацией.
            </div>
            <div className={styles.images_grid}>
                {
                    places.current.image_ids.map(el => {
                        return(
                            <div className={styles.image_card}>
                                <div className={styles.lbl}>
                                    Фото
                                </div>
                                <img src={`${api.address}/images/${el}`} />
                                <div className={styles.bulk}>
                                    Удалить фотографию
                                </div>
                            </div>
                        );
                    })
                }
                <div className={styles.image_card}>
                    <div className={styles.lbl}>
                        Добавить
                    </div>
                    <NewImage onChange={loadFile}/>
                </div>
            </div>
        </Content>
    );
});