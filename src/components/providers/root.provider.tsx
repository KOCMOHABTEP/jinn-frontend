'use client';

import { ReactNode } from 'react';

import ReduxProvider from '@/components/providers/ReduxProvider/ReduxProvider';

const RootProvider = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default RootProvider;
