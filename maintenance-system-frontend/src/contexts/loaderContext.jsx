import React, { createContext, useState, useContext, useCallback } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
    const [isGlobalLoading, setIsGlobalLoading] = useState(true);
    const [activeLocalLoaders, setActiveLocalLoaders] = useState([]);

    const showGlobalLoader = useCallback(() => setIsGlobalLoading(true), []);
    const hideGlobalLoader = useCallback(() => setIsGlobalLoading(false), []);

    const showLocalLoader = useCallback((id) => {
        setActiveLocalLoaders(prev => [...prev, id]);
    }, []);

    const hideLocalLoader = useCallback((id) => {
        setActiveLocalLoaders(prev => prev.filter(loaderId => loaderId !== id));
    }, []);

    const isLocalLoading = useCallback((id) => {
        return activeLocalLoaders.includes(id);
    }, [activeLocalLoaders]);

    const value = {
        isGlobalLoading,
        showGlobalLoader,
        hideGlobalLoader,
        showLocalLoader,
        hideLocalLoader,
        isLocalLoading,
    };

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
};
