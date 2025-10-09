import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../../../contexts';
import styles from './styles.module.css';

// Configurações Padrão
const DEFAULT_OPTIONS = {
    type: 'default',
    position: 'top-right',
    timeOut: 5000,
    timeOutExtended: 1000, // Reintroduzido para ser configurável
    closeButton: true,
    progressBar: true,
    icon: null,
    color: null,
    onClick: () => {},
    onClose: () => {},
    onOpen: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
};

// Ícones e cores padrão por tipo
const typeDefaults = {
    success: { icon: 'fas fa-check-circle', color: 'var(--color-success)' },
    error: { icon: 'fas fa-times-circle', color: 'var(--color-danger)' },
    warning: { icon: 'fas fa-exclamation-triangle', color: 'var(--color-warning)' },
    info: { icon: 'fas fa-info-circle', color: 'var(--color-info)' },
    default: { icon: null, color: 'var(--color-dark)' }
};

export const Toast = (props) => {
    const { removeToast } = useToast();
    const [isPaused, setIsPaused] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [remainingTime, setRemainingTime] = useState(props.timeOut ?? DEFAULT_OPTIONS.timeOut);
    const [animationDuration, setAnimationDuration] = useState(props.timeOut ?? DEFAULT_OPTIONS.timeOut);
    const [animationKey, setAnimationKey] = useState(0);

    const timerRef = useRef(null);
    const exitTimerRef = useRef(null);
    const startTimeRef = useRef(null);

    const options = { ...DEFAULT_OPTIONS, ...props };
    const { id, text, type, timeOut, timeOutExtended, closeButton, progressBar, onClick, onClose, onOpen, onMouseEnter, onMouseLeave } = options;

    const finalIcon = options.icon ?? typeDefaults[type]?.icon;
    const finalColor = options.color ?? typeDefaults[type]?.color;

    const handleClose = useCallback(() => {
        if (isExiting) return;
        setIsExiting(true);
        exitTimerRef.current = setTimeout(() => {
            removeToast(id);
            onClose();
        }, 400);
    }, [id, isExiting, onClose, removeToast]);

    const startTimer = useCallback((duration) => {
        if (duration === Infinity) return;
        startTimeRef.current = Date.now();
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(handleClose, duration);
    }, [handleClose]);

    const pauseTimer = useCallback(() => {
        if (isExiting) return;
        clearTimeout(timerRef.current);
        const elapsed = Date.now() - startTimeRef.current;
        const newRemainingTime = Math.max(remainingTime - elapsed, 0);
        setRemainingTime(newRemainingTime);
        setIsPaused(true);
    }, [isExiting, remainingTime]);

    useEffect(() => {
        onOpen();
        startTimer(remainingTime);
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(exitTimerRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        pauseTimer();
        onMouseEnter();
    };
    
    const handleMouseLeave = () => {
        if (isExiting) return;
        setIsPaused(false);
        startTimer(timeOutExtended);
        setAnimationDuration(timeOutExtended);
        setAnimationKey(prevKey => prevKey + 1);
        onMouseLeave();
    };

    return (
        <div
            className={`${styles.toast} ${isExiting ? styles.exiting : ''}`}
            style={{ backgroundColor: finalColor }}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {finalIcon && <i className={`${finalIcon} ${styles.icon}`}></i>}
            <p className={styles.text}>{text}</p>
            {closeButton && <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className={styles.closeButton}>&times;</button>}
            {progressBar && timeOut !== Infinity && (
                <div className={styles.progressBarContainer}>
                    <div
                        key={animationKey}
                        className={styles.progressBar}
                        style={{
                            animationDuration: `${animationDuration}ms`,
                            animationPlayState: isPaused || isExiting ? 'paused' : 'running',
                            animationTimingFunction: isPaused ? 'step-end' : 'linear' 
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
};

