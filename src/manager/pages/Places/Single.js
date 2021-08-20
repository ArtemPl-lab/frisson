import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom"
import { Navigation } from "../../components"
import { useStore } from "../../store";
import { Load } from "../Load";
import { PlaceGallery } from "./Gallery";
import { PlaceInfo } from "./Info";
import { PlaceReviews } from "./Reviews";
import { PlaceServices } from "./Services";

export const SinglePlace = observer(props => {
    const { places } = useStore();
    const { id } = useParams();
    useEffect(() => places.getPlace(id), [id]);
    if(!places.current) return <Load />;
    return(
        <>
            <Navigation />
            <Switch>
                <Route path="/places/:id/info" component={PlaceInfo} />
                <Route path="/places/:id/gallery" component={PlaceGallery} />
                <Route path="/places/:id/reviews" component={PlaceReviews} />
                <Route path="/places/:id/services" component={PlaceServices} />
            </Switch>
        </>
    );
});