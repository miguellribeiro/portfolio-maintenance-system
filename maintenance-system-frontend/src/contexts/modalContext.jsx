import React, { createContext, useState, useContext, useCallback } from 'react';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [openModalId, setOpenModalId] = useState(null);

    const openModal = useCallback((id) => {
        setOpenModalId(id);
    }, []);

    const closeModal = useCallback(() => {
        setOpenModalId(null);
    }, []);

    const isModalOpen = useCallback((id) => {
        return openModalId === id;
    }, [openModalId]);

    const value = {
        openModal,
        closeModal,
        isModalOpen,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal deve ser usado dentro de um ModalProvider');
    }
    return context;
};
