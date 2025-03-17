'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from '@/components/ui/Icon';
import { ICON_NAME } from '@/components/ui/Icon/Icon.library';
import { SidebarItem } from '@/components/ui/Sidebar/SidebarItem';
import { AppRoutesConfig } from '@/config/app-routes.config';
import { getSidebarCollapsed } from '@/lib/redux/app/app.selectors';
import { sidebarCollapseToggle } from '@/lib/redux/app/app.slice';
import { getUserAuth } from '@/lib/redux/auth/auth.selector';
import { useAppSelector } from '@/lib/redux/store';
import Logo from '@/public/logo-jinn.svg';
import styles from './Sidebar.module.scss';

interface SidebarListItem {
  title: string;
  icon: ICON_NAME;
  href: string;
  dropdown?: {
    title: string;
    href: string;
  }[];
}

const initialSidebarItems: SidebarListItem[] = [
  {
    title: 'Дашборд',
    icon: 'home',
    href: AppRoutesConfig.HOME,
  },
  {
    title: 'Структура',
    icon: 'human',
    href: AppRoutesConfig.STRUCTURE,
  },
  {
    title: 'О проекте',
    icon: 'picture',
    href: AppRoutesConfig.ABOUT,
  },
];

export const Sidebar = () => {
  const sidebarCollapsed = useSelector(getSidebarCollapsed);
  const isAuth = useAppSelector(getUserAuth);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleSidebarCollapse = () => {
    dispatch(sidebarCollapseToggle(!sidebarCollapsed));
  };

  const checkActiveRoute = (href: string) => {
    const isHomePage = Boolean(pathname === '/' && href === '/');

    if (isHomePage) {
      return true;
    }

    const dynamicRoutePath = pathname.substring(1);
    const dynamicRouteHref = href.substring(1);

    if (
      !isHomePage &&
      dynamicRouteHref.length > 1 &&
      dynamicRoutePath.startsWith(dynamicRouteHref)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div
      className={clsx(styles.sidebar, {
        [String(styles.sidebarCollapsed)]: sidebarCollapsed,
      })}
    >
      <div className={styles.sidebarToggle} onClick={handleSidebarCollapse}>
        <Icon
          className={styles.sidebarToggleIcon}
          name={sidebarCollapsed ? 'arrow_right' : 'arrow_left'}
          size={24}
        />
      </div>
      <div
        className={clsx(styles.logo, {
          [String(styles.logoCollapsed)]: sidebarCollapsed,
        })}
      >
        <div className={styles.logoInner}>
          <Link href={AppRoutesConfig.HOME}>
            <div
              className={clsx(styles.logoDefault, {
                [String(styles.logoSmall)]: sidebarCollapsed,
                [String(styles.logoLarge)]: !sidebarCollapsed,
              })}
            >
              <Logo />
            </div>
          </Link>
        </div>
      </div>
      {isAuth && (
        <ul className={styles.sidebarList}>
          {initialSidebarItems.map((item) => (
            <li className={styles.sidebarListItem} key={item.title}>
              <Link href={item.href}>
                <SidebarItem
                  title={item.title}
                  icon={item.icon}
                  active={checkActiveRoute(item.href)}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
