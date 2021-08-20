import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from './Places.module.css';
import { Content, Headline, Input, TextArea, Button, SelectMap, NewImage } from "../../components";
import { Load } from "../Load";
import Toggle from "../../components/Toggle/Toggle";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

export const PlaceServices = props => {
    const { id } = useParams();
    const { places, directions, changes } = useStore();
    const [state, setState] = useState(null);
    const history = useHistory();
    useEffect(() => setState(places.current), [places.current]);
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
                    <Input />
                    <Input />
                    <div className={styles.info__label}>
                        Развернутое описание
                    </div>
                    <TextArea 
                        style={{
                            width: "338px",
                            height: "100px",
                            marginBottom: "10px"

                        }}
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
                    <br />
                    <Button color="stroke">
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
                    <Input />
                    <div className={styles.info__label}>
                        Описание
                    </div>
                    <TextArea 
                        style={{
                            width: "338px",
                            height: "100px",
                            marginBottom: "10px"
                        }}
                    />
                    <br />
                    <Input />
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
}