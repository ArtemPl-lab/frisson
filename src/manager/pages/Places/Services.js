import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from './Places.module.css';
import { Content, Headline, Input, TextArea, Button, NewImage } from "../../components";
import { Load } from "../Load";
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
    const createService = async () => {
        const res = await api.post(`/managers/places/${state.id}/amenities/`, {}, JSON.stringify({
            "name": "Новая услуга",
            "description": "Описание услуги",
            "cost_value": 0,
            "cost_currency": "₽"
        }));
        if(res.ok){
            const { id: amenity_id } = await res.json();
            setState(prev => {
                return({
                    ...prev,
                    amenities: [
                        ...prev.amenities,
                        {
                            "name": "Новая услуга",
                            id: amenity_id,
                            "description": "Описание услуги",
                            "cost_value": 0,
                            "cost_currency": "₽"
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
                    discounts: prev.discounts.filter(el => el.id !== disId)
                });
            });
        }
    }
    const removeService = async (srviceId) => {
        const res = await api.delete(`/managers/places/${state.id}/amenities/`, {
            amenity_id: srviceId
        });
        if(res.ok){
            setState(prev => {
                return({
                    ...prev,
                    amenities: prev.amenities.filter(el => el.id !== srviceId)
                });
            });
        }
    }
    const handleDiscount = async (disId, e) => {
        setState(prev => {
            const res = {
                ...prev,
                discounts: prev.discounts.map(el => {
                    if(el.id === disId){
                        changes.add(`update_discount_${disId}`, ()=>api.put(`/managers/places/${state.id}/discounts/${disId}`, {}, {
                            ...el,
                            [e.target.name]: e.target.value
                        }))
                        return({
                            ...el,
                            [e.target.name]: e.target.value
                        });
                    }
                    return el;
                })
            };
            return res;
        });
    }
    const handleService = async (srviceId, e) => {
        setState(prev => {
            const res = {
                ...prev,
                amenities: prev.amenities.map(el => {
                    if(el.id === srviceId){
                        changes.add(`update_service_${srviceId}`, ()=>api.put(`/managers/places/${state.id}/amenities/`, {
                            amenity_id: srviceId
                        }, {
                            ...el,
                            [e.target.name]: e.target.value
                        }))
                        return({
                            ...el,
                            [e.target.name]: e.target.value
                        });
                    }
                    return el;
                })
            };
            return res;
        });
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
                                    <Input placeholder="Название" name="name" value={discount.name} onChange={(e)=>handleDiscount(discount.id, e)}/>
                                    <Input placeholder="Короткое описание" name="short_description" value={discount.short_description} onChange={(e)=>handleDiscount(discount.id, e)}/>
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
                                        name="full_description"
                                        onChange={(e)=>handleDiscount(discount.id, e)}
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
                                    <Input value={el.name} name="name" onChange={(e) => handleService(el.id, e)}/>
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
                                        name="description" 
                                        onChange={(e) => handleService(el.id, e)}
                                    />
                                    <br />
                                    <Input value={el.cost_value} name="cost_value" onChange={(e) => handleService(el.id, e)}/>
                                    <div className={styles.bulk} onClick={()=>removeService(el.id)}>
                                        Удалить услугу
                                    </div>
                                    <hr style={{
                                        width: "338px"
                                    }}/>
                                    <br />
                                </>
                            );
                        })
                    }
                    <Button color="stroke" onClick={createService}>
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