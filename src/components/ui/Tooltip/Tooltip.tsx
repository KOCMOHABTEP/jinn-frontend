import { CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styles from './Tooltip.module.scss';

interface TooltipProps {
  customRef: any;
  visible: boolean;
  label: string;
  attributes: any;
  customStyles?: CSSProperties;
}

export const Tooltip = ({
  customRef,
  label,
  visible,
  customStyles,
  attributes,
}: TooltipProps) => {
  if (!visible) {
    return null;
  }

  const mountElement = document.getElementById('tooltip-root') as HTMLElement;

  return createPortal(
    (
      <div
        ref={customRef}
        className={styles.component}
        style={customStyles}
        {...attributes}
      >
        <div className={styles.label}>{label}</div>
      </div>
    ) as ReactNode,
    mountElement
  );
};
