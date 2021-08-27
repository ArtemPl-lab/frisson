import { Route, Redirect, Switch } from "react-router-dom"
import * as Pages from './pages';

export const BaseRoutes = props => {
    return(
        <>
            <Switch>
                <Route path="/home" component={Pages.PlacesList}/>
                <Route path="/places/:id" component={Pages.SinglePlace}/>
                <Route path="/settings" component={Pages.Settings}/>
                <Route render={() => <Redirect to="/home" />} />
            </Switch>
            <Route path="*/logout" component={Pages.LogoutConfirm}/>
            <Route path="*/confirm_phone/:phone" component={Pages.ConfirmPhone}/>
            <Route path="*/confirm_delete_place" component={Pages.DeleteConfirm} />
            <Route path="*/confirm_delete_account" component={Pages.AccountDeleteConfirm} />
        </>
    );
}
export const AuthRoutes = props => {
    return(
        <Switch>
            <Route path="/login" component={Pages.Login} />
            <Route path="/register" component={Pages.Register} />
            <Route render={() => <Redirect to="/login" />} />
        </Switch>
    );
}
