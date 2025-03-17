'use client';

import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { getSidebarCollapsed } from '@/lib/redux/app/app.selectors';
import styles from './Container.module.scss';

export const Container = ({ children }: { children: ReactNode }) => {
  const sidebarCollapsed = useSelector(getSidebarCollapsed);

  return (
    <div
      className={clsx(styles.root, {
        [String(styles.rootFull)]: sidebarCollapsed,
      })}
    >
      <div
        className={clsx(styles.content, {
          [String(styles.contentFull)]: sidebarCollapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};
