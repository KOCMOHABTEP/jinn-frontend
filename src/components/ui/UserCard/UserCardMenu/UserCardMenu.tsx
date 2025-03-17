import { ReactNode } from 'react';

import styles from '@/components/ui/UserCard/UserCardMenu/UserCardMenu.module.scss';

interface UserCardMenuProps {
  children: ReactNode;
}

export const UserCardMenu = ({ children }: UserCardMenuProps) => {
  return <div className={styles.menu}>{children}</div>;
};
