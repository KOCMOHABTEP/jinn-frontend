import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthLoginParams } from '@/lib/redux/auth/auth.types';
import AuthService from '@/services/auth.service';
import { IUser } from '@/types/IUser';

export const tryLogin = createAsyncThunk<IUser, AuthLoginParams>(
  'auth/tryLogin',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.login({
        login,
        password,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
