import { useState } from "react";
import { useParams } from "react-router-dom";
import { Content, Headline } from "../../components";

export const PlaceGallery = props => {
    const { id } = useParams();
    const [state, setState] = useState({});
    return(
        <Content>
            <Headline>
                {
                    id !== 'new' ? 
                    state.name : 'Новое место'
                }
            </Headline>
        </Content>
    );
}