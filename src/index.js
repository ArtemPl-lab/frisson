import ReactDOM from 'react-dom';
import React from 'react';
import Manager from './manager';
import Admin from './admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider as AdminStore } from './admin/store';
import { StoreProvider as ManagerStore } from './manager/store';
import HomePage from './desktop/HomeAlt'; // Home || HomeAlt
import './index.css';
import About from './desktop/AboutAlt'; // About || AboutAlt
import Help from './desktop/Help';
import { YMaps } from 'react-yandex-maps';
import Politice from './desktop/Politice';
import Terms from './desktop/Terms';

ReactDOM.render(
    <React.StrictMode>
        <YMaps modules={['geocode']}>
            <AdminStore>
                <ManagerStore>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/about" exact component={About} />
                            <Route path="/data-processing-policy" exact component={Politice} />
                            <Route path="/terms-of-use" exact component={Terms} />
                            <Route path="/help" exact component={Help} />
                            <Route path="/manager/*" component={Manager} />
                            <Route path="/admin/*" component={Admin} />
                        </Switch>
                    </BrowserRouter>
                </ManagerStore>
            </AdminStore>
        </YMaps>
    </React.StrictMode>,
    document.getElementById('root')
);