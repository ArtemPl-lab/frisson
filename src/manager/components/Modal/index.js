import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Modal.module.css';

const modalContext = createContext();

 export class Modal extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    componentDidMount(){
        const [_, setModal] = this.context;
        setModal(prev => ({
            ...prev,
            options: {
                ...prev.options,
                show: true,
                ...this.props.options
            },
            children: this.props.children
        }));
    }
    componentWillUnmount(){
        const [_, setModal] = this.context;
        setModal(prev => ({
            ...prev,
            options: {
                ...prev.options,
                show: false
            }
        }));
    }
    render(){
        return <></>;
    }
}
Modal.contextType = modalContext;

export const ModalProvider = ({ children }) => {
    const state = useState({
        options: {
            show: false,
            width: "auto",
            height: "auto"
        },
        children: null
    });
    return(
        <modalContext.Provider value={state}>
            {children}
            <ModalWrapper />
        </modalContext.Provider>
    );
}

export const useModal = ({ children, options = {}  }) => {
    const [_, setModal] = useContext(modalContext);
    setModal(prev => ({
        ...prev,
        options: {
            ...prev.options,
            show: true,
            ...options
        },
        children: children
    }))
}

const ModalWrapper = () => {
    const history = useHistory();
    const [modal, setModal] = useContext(modalContext);
    const hide = () => {
        setModal(prev => ({
            ...prev,
            options: {
                ...prev.options,
                show: false
            }
        }));
        history.goBack();
    }
    if(!modal.options.show) return <></>
    return(
        <>
            <div 
                className={`
                    ${styles.background} 
                    ${modal.options.show ? styles.active : ''}
                `} 
                onClick={hide} 
            />
            <div className={`
                    ${styles.modal}
                    ${modal.options.show ? styles.show : styles.hidden}
                `}
                style={{
                    width: modal.options.width || 240,
                    height: modal.options.height || 144
                }}
            >
                {modal.children}
            </div>
        </>
    );
}