import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  secondary?: boolean;
  buttonClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  text,
  buttonClassName,
  disabled,
  secondary,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.button, buttonClassName, {
        [String(styles.buttonSecondary)]: secondary,
        [String(styles.buttonDisabled)]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
