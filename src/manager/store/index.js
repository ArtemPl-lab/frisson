import React, { createContext, useContext } from 'react';
import RootStore from './RootStore';

const storeContext = createContext();

export const StoreProvider = (props) => {
    return <storeContext.Provider value={RootStore}>{props.children}</storeContext.Provider>
}
export const useStore = () => {
    const store = useContext(storeContext)
    if (!store) {
        throw new Error('Придурок! Ты используешь этот хук за пределами StoreProvider и я не могу добраться до контекста')
    }
    return store
}