import React from 'react';
import { Toast } from './Toast';
import styles from './styles.module.css';

const POSITIONS = {
    'top-left': styles.topLeft,
    'top-center': styles.topCenter,
    'top-right': styles.topRight,
    'bottom-left': styles.bottomLeft,
    'bottom-center': styles.bottomCenter,
    'bottom-right': styles.bottomRight 
}

const ToastContainer = ({ toasts }) => {
    const toastsByPosition = toasts.reduce((groups, toastItem) => {
        const { position = 'top-right' } = toastItem;
        if (!groups[position]) {
            groups[position] = [];
        }
        groups[position].push(toastItem);
        return groups;
    }, {});

    return (
        <>
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
                <div key={position} className={`${styles.container} ${POSITIONS[position]}`}>
                    {positionToasts.map(toastProps => (
                        <Toast key={toastProps.id} {...toastProps} />
                    ))}
                </div>
            ))}
        </>
    );
};

export default ToastContainer;