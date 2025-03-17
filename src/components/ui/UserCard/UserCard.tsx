import clsx from 'clsx';
import Image from 'next/image';
import { MouseEvent, useRef, useState } from 'react';

import { useClickOutsideContainer } from '@/hooks/use-click-outside-container';
import styles from './UserCard.module.scss';

interface UserCardProps {
  employeeId: number;
  managerId: number | null;
  firstName: string;
  lastName: string;
  middleName?: string;
  isManager: boolean;
  onContextMenuSelect: (
    action: string,
    payload?: Record<string, unknown>
  ) => void;
}

type TMenuOption = {
  label: string;
  value: string;
};

const CONTEXT_MENU_OPTIONS: TMenuOption[] = [
  {
    label: 'Удалить пользователя',
    value: 'deleteUser',
  },
  {
    label: 'Изменить руководителя пользователю',
    value: 'assignManager',
  },
];

export const UserCard = ({
  employeeId,
  managerId,
  firstName,
  middleName,
  lastName,
  isManager,
  onContextMenuSelect,
}: UserCardProps) => {
  const cardRef = useRef(null);
  const [contextMenuOpened, setContextMenuOpened] = useState(false);

  useClickOutsideContainer(cardRef, () => setContextMenuOpened(false));

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenuOpened(true);
  };

  const handleSelectOption = (option: TMenuOption) => {
    setContextMenuOpened(false);
    onContextMenuSelect(option.value, { employeeId, managerId });
  };

  const renderOptions = () => {
    return CONTEXT_MENU_OPTIONS.map((option) => (
      <div
        key={option.value}
        className={styles.contextMenuItem}
        onClick={() => handleSelectOption(option)}
      >
        {option.label}
      </div>
    ));
  };

  return (
    <div
      ref={cardRef}
      className={clsx(styles.container, {
        [String(styles.containerActive)]: contextMenuOpened,
      })}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.containerHeader}>
        <div className={styles.containerHeaderAvatar}>
          <Image
            className={styles.containerHeaderAvatarImage}
            src={'/images/user.png'}
            alt={'image'}
            width={32}
            height={32}
          />
        </div>
        <div className={styles.containerHeaderAvatarBackdrop} />
      </div>
      <div className={styles.content}>
        {lastName} {firstName} {middleName}
        {isManager && (
          <div className={styles.contentCaption}>
            <div className={styles.contentCaptionLabel}>Руководитель</div>
          </div>
        )}
      </div>
      {contextMenuOpened && (
        <div className={styles.contextMenuContainer}>
          <div className={styles.contextMenu}>{renderOptions()}</div>
        </div>
      )}
    </div>
  );
};
