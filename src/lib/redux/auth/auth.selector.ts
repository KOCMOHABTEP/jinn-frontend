import { RootState } from '@/lib/redux/store';

export const getUserAuth = (state: RootState) => state.auth.isAuth;
export const getUserData = (state: RootState) => state.auth.user;
