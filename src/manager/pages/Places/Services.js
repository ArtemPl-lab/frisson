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
            });
        }
        places.getPlace(id);
    }
    const createService = async () => {
        const res = await api.post(`/managers/places/${state.id}/amenities/`, {}, JSON.stringify({
            "name": "Название услуги",
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
                            "name": "Название услуги",
                            id: amenity_id,
                            "description": "Описание услуги",
                            "cost_value": 0,
                            "cost_currency": "₽"
                        }
                    ]
                });
            })
        }
        places.getPlace(id);
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
        places.getPlace(id);
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
        places.getPlace(id);
    }
    const handleDiscount = async (disId, e) => {
        setState(prev => {
            const res = {
                ...prev,
                discounts: prev.discounts.map(el => {
                    if(el.id === disId){
                        changes.add(`update_discount_${disId}`, ()=>{
                            api.put(`/managers/places/${state.id}/discounts/${disId}`, {}, {
                                ...el,
                                [e.target.name]: e.target.value
                            })
                            places.getPlace(id);
                        })
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
                        changes.add(`update_service_${srviceId}`, async ()=>{
                            await api.put(`/managers/places/${state.id}/amenities/`, {
                                amenity_id: srviceId
                            }, {
                                ...el,
                                [e.target.name]: e.target.value
                            })
                            places.getPlace(id);
                        })
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
    const handleDiscountWithoutChanges = async (disId, e) => {
        setState(prev => {
            const res = {
                ...prev,
                discounts: prev.discounts.map(el => {
                    if(el.id === disId){
                        // changes.add(`update_discount_${disId}`, ()=>api.put(`/managers/places/${state.id}/discounts/${disId}`, {}, {
                        //     ...el,
                        //     [e.target.name]: e.target.value
                        // }))
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
    const handleImage = async (disId, e) => {
        console.log(e);
        const fd = new FormData();
        fd.append('photo', e.target.files[0])
        const res = await fetch(`${api.address}/managers/places/${state.id}/discounts/${disId}/image`, {
            method: 'POST',
            headers: api.authHeaders,
            body: fd
        });
        if(res.ok){
            const { id: image_id } = await res.json();
            handleDiscountWithoutChanges(disId, {
                target: {
                    name: 'image_id',
                    value: image_id
                }
            })
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
                                        <NewImage height="160px" image_id={discount.image_id} onChange={(e) => handleImage(discount.id, e)}/>
                                    </div>
                                    <div className={styles.bulk} onClick={()=>removeDiscount(discount.id)}>
                                        Удалить акцию
                                    </div>
                                    <hr
                                        size="10px"
                                        style={{
                                            width: "338px",
                                            height: "3px",
                                            backgroundColor: "#0E2F56",
                                            opacity: ".95",
                                            marginTop: "40px",
                                            marginBottom: "40px"
                                        }}
                                    />
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
                                    <div className={styles.info__label}>
                                        Стоимость услуги
                                    </div>
                                    <Input value={el.cost_value} name="cost_value" onChange={(e) => handleService(el.id, e)}/>
                                    <div className={styles.bulk} onClick={()=>removeService(el.id)}>
                                        Удалить услугу
                                    </div>
                                    <hr style={{
                                        width: "338px",
                                        height: "3px",
                                        backgroundColor: "#0E2F56",
                                        opacity: ".95",
                                        marginTop: "40px",
                                        marginBottom: "40px"
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