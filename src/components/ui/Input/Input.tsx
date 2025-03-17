import clsx from 'clsx';
import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from 'react';

import { Icon } from '@/components/ui/Icon';
import { ICON_NAME } from '@/components/ui/Icon/Icon.library';
import styles from './Input.module.scss';

interface InputProps {
  name?: string;
  label?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  icon?: ICON_NAME;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputWithRef(props, forwardedRef) {
    const {
      name,
      required,
      hint,
      error,
      type = 'text',
      disabled,
      label,
      ...rest
    } = props;

    return (
      <label className={styles.inputLabel} htmlFor={name}>
        {hint && (
          <div className={styles.hint}>
            <Icon name="hint" size={16} className={styles.hintIcon} />
            <div className={styles.hintMessage}>{hint}</div>
          </div>
        )}
        <div className={styles.inputContainer}>
          <input
            ref={forwardedRef}
            className={clsx(styles.input, {
              [String(styles.disabled)]: disabled,
              [String(styles.error)]: error,
            })}
            type={type}
            name={name}
            placeholder={' '}
            required={required}
            disabled={disabled}
            {...rest}
          />
          <div className={styles.placeholder}>
            {required && <span className={styles.placeholderRequired}>* </span>}
            {label}
          </div>
        </div>
        {error && (
          <div className={styles.errorContainer}>
            <Icon name="error" size={16} className={styles.errorIcon} />
            <div className={styles.errorMessage}>{error}</div>
          </div>
        )}
      </label>
    );
  }
);
