import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { Icon } from '@/components/ui/Icon';
import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  description: string;
  children: ReactNode;
  visibility: boolean;
  onClose: () => void;
}

export const Modal = ({
  title,
  description,
  children,
  visibility,
  onClose,
}: ModalProps) => {
  const modalContainerRef = useRef<any | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!visibility) {
    return null;
  }

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.target !== modalContainerRef.current &&
      !modalContainerRef?.current?.contains(event.target)
    ) {
      onClose();
    }
  };

  const ModalContent = () => {
    return (
      <div onClick={handleClickOutside} className={styles.overlay}>
        <div ref={modalContainerRef} className={styles.item}>
          <div className={styles.itemClose} onClick={onClose}>
            <Icon className={styles.itemCloseIcon} name="close" />
          </div>
          <div className={styles.head}>
            <div className={styles.headTitle}>{title}</div>
            <div className={styles.headDescription}>{description}</div>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <ModalContent />,
      document.getElementById('modal-root') as HTMLElement
    );
  }
  return null;
};
