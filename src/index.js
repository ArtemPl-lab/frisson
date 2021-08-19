import ReactDOM from 'react-dom';
import React from 'react';
import Manager from './manager';
import Admin from './admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider as AdminStore } from './admin/store';
import { StoreProvider as ManagerStore } from './manager/store';
import HomePage from './desktop/HomeAlt'; // Home || HomeAlt
import './index.css';
import { ScrollToTop } from './common';
import About from './desktop/AboutAlt'; // About || AboutAlt
import Help from './desktop/Help';

ReactDOM.render(
    <React.StrictMode>
        <AdminStore>
            <ManagerStore>
                <BrowserRouter>
                    <ScrollToTop />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/about" exact component={About} />
                        <Route path="/help" exact component={Help} />
                        <Route path="/manager/*" component={Manager} />
                        <Route path="/admin/*" component={Admin} />
                    </Switch>
                </BrowserRouter>
            </ManagerStore>
        </AdminStore>
    </React.StrictMode>,
    document.getElementById('root')
);