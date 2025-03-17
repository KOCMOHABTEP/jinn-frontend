'use client';

import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { AppRoutesConfig } from '@/config/app-routes.config';
import { getUserAuth } from '@/lib/redux/auth/auth.selector';
import { useAppSelector } from '@/lib/redux/store';

export const PrivateRoute: FC<PropsWithChildren<any>> = ({ children }) => {
  const router = useRouter();
  const isAuth = useAppSelector(getUserAuth);

  let isRouteAvailable = false;

  if (isAuth) {
    isRouteAvailable = true;
  }

  useEffect(() => {
    if (!isRouteAvailable) {
      router.push(AppRoutesConfig.AUTH_LOGIN);
    }
  }, [isRouteAvailable, router]);

  if (!isRouteAvailable) {
    return null;
  }

  return children;
};
