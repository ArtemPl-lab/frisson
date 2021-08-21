import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter, Prompt } from 'react-router-dom';
import { ModalProvider } from './components';
import { Alert } from './components/Alert';
import { SavePanel } from './components/';
import { observer } from 'mobx-react-lite';
import { useStore } from './store';

export default observer(function(){
  const { changes } = useStore();

  return(
        <BrowserRouter basename="/manager" getUserConfirmation={(message, callback) => {
          const allowTransition = window.confirm(message);
          if(allowTransition){
            changes.save();
          } else {
            changes.clear();
          }
          callback(allowTransition);
        }}>
          <Prompt
            when={changes.hasChanges}
            message="Сохранить изменения?"
          />
          <ModalProvider>
            <Alert />
            <App />
            <SavePanel />
          </ModalProvider>
        </BrowserRouter>
  );
});