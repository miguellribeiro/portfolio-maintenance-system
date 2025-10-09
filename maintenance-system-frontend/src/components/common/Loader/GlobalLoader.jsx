import React from 'react';
import { useLoader } from '../../../contexts/LoaderContext';
import styles from './styles.module.css';

export const GlobalLoader = () => {
    const { isGlobalLoading } = useLoader();

    if (!isGlobalLoading) {
        return null;
    }

    return (
        <div className={styles.globalLoaderOverlay}>
            <div className={styles.spinner}></div>
            <p>A carregar...</p>
        </div>
    );
};
