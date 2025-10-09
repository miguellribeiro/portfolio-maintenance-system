import React, { createContext, useState, useContext, useCallback } from 'react';
import ToastContainer from '../components/common/Toast';

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback((text, options = {}) => {
        const id = idCounter++;
        setToasts(prevToasts => [...prevToasts, { id, text, ...options }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prevToasts => prevToasts.filter(t => t.id !== id));
    }, []);

    const value = { toast, removeToast };

    return (
        <ToastContext.Provider value={value}>
            <ToastContainer toasts={toasts} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
};
