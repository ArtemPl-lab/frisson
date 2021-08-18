import { Route, Redirect } from "react-router-dom"
import * as Pages from './pages';

export const BaseRoutes = props => {
    return(
        <>
            <Route path="/home" component={Pages.PlacesList}/>
            <Route path="/places/:id" component={Pages.SinglePlace}/>
            <Route path="/places/:id/info" component={Pages.PlaceInfo} />
            <Route path="/places/:id/gallery" component={Pages.PlaceGallery} />
            <Route path="/settings" component={Pages.Settings}/>
            <Route path="*/logout" component={Pages.LogoutConfirm}/>
            <Route path="*/confirm_phone/:phone" component={Pages.ConfirmPhone}/>
            {/* <Route render={() => <Redirect to="/home" />} /> */}
        </>
    );
}
export const AuthRoutes = props => {
    return(
        <>
            <Route path="/login" component={Pages.Login} />
            <Route path="/register" component={Pages.Register} />
            {/* <Route render={() => <Redirect to="/login" />} /> */}
        </>
    );
}
