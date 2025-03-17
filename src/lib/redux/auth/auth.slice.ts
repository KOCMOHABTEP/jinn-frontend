import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tryLogin } from '@/lib/redux/auth/auth.action';
import { IUser } from '@/types/IUser';

export interface AuthState {
  isAuth: boolean;
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.token = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tryLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
