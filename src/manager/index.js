import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './components';
import { Alert } from './components/Alert';
import { SavePanel } from './components/';

export default function(){
  return(
        <BrowserRouter basename="/manager">
          <ModalProvider>
            <Alert />
            <App />
            <SavePanel />
          </ModalProvider>
        </BrowserRouter>
  );
}
