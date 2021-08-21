import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from './Places.module.css';
import { Content, Headline, Input, TextArea, Button, SelectMap, NewImage } from "../../components";
import { Load } from "../Load";
import Toggle from "../../components/Toggle/Toggle";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import api from "../../api";

export const PlaceServices =observer(props => {
    const { id } = useParams();
    const { places, directions, changes } = useStore();
    const [state, setState] = useState(null);
    const history = useHistory();
    useEffect(() => setState(places.current), [places.current]);
    const createDiscount = async  () => {
        const res = await api.post(`/managers/places/${state.id}/discounts/`, {}, JSON.stringify({
            full_description: "Полное описание",
            image_id: null,
            name: "Название",
            short_description: "Короткое описание"
        }));
        if(res.ok){
            const { id: discount_id } = await res.json();
            setState(prev => {
                return({
                    ...prev,
                    discounts: [
                        ...prev.discounts,
                        {
                            full_description: "Полное описание",
                            id: discount_id,
                            image_id: null,
                            name: "Название",
                            short_description: "Короткое описание"
                        }
                    ]
                });
            })
        }

    }
    const removeDiscount = async (disId) => {
        const res = await api.delete(`/managers/places/${state.id}/discounts/${disId}`);
        if(res.ok){
            setState(prev => {
                return({
                    ...prev,
                    discounts: prev.discounts.filter(el => el.id === disId)
                });
            });
        }
    }
    if(!state || places.loading) return <Load />
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
            <div className={styles.info__grid}>
                <div>
                    <div className={styles.info__label}>
                        Акции
                    </div>
                    {
                        state.discounts.map(discount => {
                            return(
                                <>
                                    <Input placeholder="Название" value={discount.name}/>
                                    <Input placeholder="Короткое описание" value={discount.short_description}/>
                                    <div className={styles.info__label}>
                                        Развернутое описание
                                    </div>
                                    <TextArea 
                                        style={{
                                            width: "338px",
                                            height: "100px",
                                            marginBottom: "10px"
                                        }}
                                        value={discount.full_description}
                                    />
                                    <br />
                                    <div className={styles.info__label}>
                                        Фотография (320х160рх)
                                    </div>
                                    <div
                                    style={{
                                        width: "338px",
                                        height: "160px"
                                    }}
                                    >
                                        <NewImage height="160px"/>
                                    </div>
                                    <div className={styles.bulk} onClick={()=>removeDiscount(discount.id)}>
                                        Удалить акцию
                                    </div>
                                    <hr style={{
                                        width: "338px"
                                    }}/>
                                    <br />

                                </>
                            )
                        })
                    }
                    <Button color="stroke" onClick={createDiscount}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" width="2" height="12" rx="1" fill="#0E2F56"/>
                            <rect y="5" width="12" height="2" rx="1" fill="#0E2F56"/>
                        </svg>
                        Добавить акцию
                    </Button>
                </div>
                <div>
                    <div className={styles.info__label}>
                        Базовые услуги
                    </div>
                    {
                        state.amenities.map(el => {
                            return(
                                <>
                                    <Input value={el.name}/>
                                    <div className={styles.info__label}>
                                        Описание
                                    </div>
                                    <TextArea 
                                        style={{
                                            width: "338px",
                                            height: "100px",
                                            marginBottom: "10px"
                                        }}
                                        value={el.description}
                                    />
                                    <br />
                                    <Input value={el.cost_value}/>
                                </>
                            );
                        })
                    }
                    <Button color="stroke">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" width="2" height="12" rx="1" fill="#0E2F56"/>
                            <rect y="5" width="12" height="2" rx="1" fill="#0E2F56"/>
                        </svg>
                        Добавить услугу
                    </Button>
                </div>
            </div>
        </Content>
    );
});