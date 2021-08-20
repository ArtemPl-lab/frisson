import React from 'react';
import './index.css';
import App from './App';
import { useStore } from './store';
import { BrowserRouter, Prompt } from 'react-router-dom';
import { ModalProvider, SavePanel } from './components';
import { observer } from 'mobx-react-lite';



export default observer(function(){
  const { changes } = useStore();
  return(
      <BrowserRouter basename="/admin" getUserConfirmation={(message, callback) => {
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
          <App />
          <SavePanel />
        </ModalProvider>
      </BrowserRouter>
  );
});