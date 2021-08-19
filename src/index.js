import ReactDOM from 'react-dom';
import React from 'react';
import Manager from './manager';
import Admin from './admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoreProvider as AdminStore } from './admin/store';
import { StoreProvider as ManagerStore } from './manager/store';
import HomePage from './desktop/HomeAlt';
import './index.css';
import { ScrollToTop } from './common';
import About from './desktop/About';

ReactDOM.render(
    <React.StrictMode>
        <AdminStore>
            <ManagerStore>
                <BrowserRouter>
                    <ScrollToTop />
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/manager/*" component={Manager}/>
                    <Route path="/admin/*" component={Admin}/>
                </BrowserRouter>
            </ManagerStore>
        </AdminStore>
    </React.StrictMode>,
    document.getElementById('root')
);