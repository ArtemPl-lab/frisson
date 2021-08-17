import { observer } from "mobx-react-lite";
import { Button, Content, Headline, Tag } from "../../components";
import { useStore } from "../../store";
import styles from './Tags.module.css';
export const Tags = observer(props => {
    const { tags } = useStore();
    return(
        <Content>
            <Headline>
                Теги
            </Headline>
            <div className={styles.wrapper}>
                {tags.list.map((tag, index) => <Tag key={index} {...tag}/>)}
            </div>
            <Button onClick={()=>tags.create()}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" width="2" height="12" rx="1" fill="white"/>
                    <rect y="5" width="12" height="2" rx="1" fill="white"/>
                </svg>
                &nbsp;
                Добавить новый тег
            </Button>
        </Content>
    );
});