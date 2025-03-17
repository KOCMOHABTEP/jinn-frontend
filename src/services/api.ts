'use client';

import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : API_BASE_URL;

const $api = axios.create({
  baseURL: API_URL,
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
