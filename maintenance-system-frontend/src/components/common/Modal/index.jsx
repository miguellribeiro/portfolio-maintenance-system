import React, { useEffect } from 'react';
import { useModal } from '../../../contexts';
import styles from './styles.module.css';

export const Modal = ({
    id,
    title,
    children,
    closeOnOutsideClick = true,
    closeOnEsc = true
}) => {
    const { isModalOpen, closeModal } = useModal();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isModalOpen(id) && closeOnEsc) {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [id, isModalOpen, closeModal, closeOnEsc]);

    if (!isModalOpen(id)) {
        return null;
    }

    const handleBackdropClick = () => {
        if (closeOnOutsideClick) {
            closeModal();
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={closeModal}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};
