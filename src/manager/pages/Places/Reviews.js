import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Content, Headline, Tabs, Tab } from "../../components";
import { Review } from "../../components/Review";
import { useStore } from "../../store";
import { Load } from "../Load";
import styles from './Places.module.css';

export const PlaceReviews = observer(props => {
    const { places } = useStore();
    const { id } = useParams();
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
            <Tabs>
                <Tab name={`Все отзывы (${places.current.reviews.length})`}>
                    {
                        places.current.reviews.length ?
                        places.current.reviews.map(review => <Review {...review}/>):
                        <div className={styles.no_reeviews}>
                            У этой активности пока что нет отзывов
                        </div>
                    }
                </Tab>
                <Tab name="Оценка Frisson">
                    {
                        places.current.frisson_review ?
                        <Review {...places.current.frisson_review}/> :
                        <div className={styles.no_reeviews}>
                            У данной активности пока что нет оценки Frisson
                        </div>
                    }
                </Tab>
            </Tabs>
        </Content>
    );
});