import { AxiosResponse } from 'axios';

import { AuthLoginParams } from '@/lib/redux/auth/auth.types';
import $api from '@/services/api';
import { IUser } from '@/types/IUser';

export default class AuthService {
  static async login(params: AuthLoginParams): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>('/auth/login', params);
  }

  static async logout(): Promise<unknown> {
    return $api.get('/auth/logout');
  }

  static async refresh(): Promise<AxiosResponse<{ accessToken: string }>> {
    return $api.get('/auth/refresh');
  }
}
