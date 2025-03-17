'use client';

import axios, { AxiosResponse } from 'axios';

const $api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.NEXT_PUBLIC_API_KEY,
});

$api.interceptors.request.use((config) => {
  // if (config.headers) {
  //   config.headers.Authorization = `Bearer ${StoreService.getState().auth.token2fa}`;
  // }

  return config;
});

$api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    // const { status } = error.response;

    // if (status === 401) {
    //   StoreService.dispatch(signOut());
    // }

    throw error;
  }
);

export default $api;
