import React from 'react';
import { useLoader } from '../../../contexts/LoaderContext';
import styles from './styles.module.css';

export const LocalLoader = ({ id, children }) => {
    const { isLocalLoading } = useLoader();
    const isLoading = isLocalLoading(id);

    return (
        <div className={styles.localLoaderContainer}>
            {isLoading && (
                <div className={styles.localLoaderOverlay}>
                    <div className={styles.spinner}></div>
                </div>
            )}
            <div className={isLoading ? styles.blurredContent : ''}>
                {children}
            </div>
        </div>
    );
};
