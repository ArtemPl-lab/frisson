import { Route, Redirect, Switch } from "react-router-dom"
import { Navigation } from "./components";
import * as Pages from './pages';

export const BaseRoutes = props => {
    return(
        <>
            <Switch>
                <Route path="/users" exact >
                    <Navigation />
                    <Pages.UsersList />
                </Route>
                <Route path="/places/:id/admin_reviews" exact component={Pages.Review}/>
                <Route path="/users/:id" component={Pages.UserPage}/>
                <Route path="/tags" >
                    <Navigation />
                    <Pages.Tags />
                </Route>
                <Route path="/directions">
                    <Navigation />
                    <Pages.Directions />
                </Route>
                <Route render={() => <Redirect to="/users" />} />
            </Switch>
            <Route path="/users/:id/confirm_delete" exact component={Pages.DeleteConfirm}/>
        </>
    );
}
export const AuthRoutes = props => {
    return(
        <Switch>
            <Route path="/login" component={Pages.Login} />
            <Route render={() => <Redirect to="/login" />} />
        </Switch>
    );
}
