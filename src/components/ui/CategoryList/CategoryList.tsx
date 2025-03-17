import { ReactNode } from 'react';

import styles from './CategoryList.module.scss';

interface CategoryListProps {
  children: ReactNode;
}

export const CategoryList = ({ children }: CategoryListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>{children}</div>
    </div>
  );
};
