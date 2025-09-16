import { useState, forwardRef, useRef } from 'react';
import styles from './styles.module.css';

const applyMask = (value, mask) => {
  const cleanValue = value.replace(/\D/g, '');
  let maskedValue = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (valueIndex >= cleanValue.length) break;

    if (mask[i] === '#') {
      maskedValue += cleanValue[valueIndex];
      valueIndex++;
    } else {
      maskedValue += mask[i];
    }
  }
  return maskedValue;
};

export const useInput = (initialValue = '', mask = null) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (mask) {
      newValue = applyMask(newValue, mask);
    }

    setValue(newValue);
  };

  return [
    {
      value,
      onChange: handleChange,
      ref,
    },
    setValue,
  ];
};

export const Input = forwardRef(({ label, id, type = 'text', icon = null, iconLeft = false, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <>
            <input
              id={id}
              ref={ref}
              type={isPasswordVisible ? 'text' : 'password'}
              className={styles.input}
              {...props}
            />
            <i
              type="button"
              className={`${isPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'} ${styles.passwordToggleButton}`}
              onClick={togglePasswordVisibility}
            />
          </>
        );

      default:
        return (
          <input
            id={id}
            ref={ref}
            type={type}
            className={styles.input}
            {...props}
          />
        );
    }
  };

  const contentClasses = [
    styles.inputContent,
    icon ? styles.hasIcon : '',
    icon && iconLeft ? styles.iconLeft : ''
  ].join(' ').trim();

  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={id} className={styles.inputLabel}>{label}</label>}
      <div className={contentClasses}>
        {icon && <i className={`${icon} ${styles.inputIcon}`}></i>}
        {renderInput()}
      </div>
    </div>
  );
});

Input.displayName = 'Input';