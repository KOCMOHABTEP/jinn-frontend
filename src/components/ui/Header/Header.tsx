'use client';

import { Button } from '@/components/ui/Button';
import { getUserAuth } from '@/lib/redux/auth/auth.selector';
import { logout } from '@/lib/redux/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getUserAuth);

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        {isAuth && <Button text={'Выход'} onClick={() => dispatch(logout())} />}
      </div>
    </div>
  );
};
