import ReactDOM from 'react-dom';
import React from 'react';
import Manager from './manager';
import Admin from './admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoreProvider as AdminStore } from './admin/store';
import { StoreProvider as ManagerStore } from './manager/store';
import HomePage from './desktop/Home';
import './index.css';
import { ScrollToTop } from './common';

ReactDOM.render(
    <React.StrictMode>
        <AdminStore>
            <ManagerStore>
                <BrowserRouter>
                    <ScrollToTop />
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/manager/*" component={Manager}/>
                    <Route path="/admin/*" component={Admin}/>
                </BrowserRouter>
            </ManagerStore>
        </AdminStore>
    </React.StrictMode>,
    document.getElementById('root')
);