import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Navigation } from "../../components"
import { useStore } from "../../store";

export const SinglePlace = observer(props => {
    const { places } = useStore();
    const { id } = useParams();
    useEffect(() => places.getPlace(id), [id]);
    return(
        <>
            <Navigation />
        </>
    );
});