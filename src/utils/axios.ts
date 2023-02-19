import axios, { AxiosResponse } from 'axios';
import { SERVER_DOMAIN } from '../constances/domain';
import { refreshAccessToken } from '../services/user';

export const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.config.retry || error.response.status !== 401) {
      error.config.retry = false;
      return Promise.reject(error);
    }

    try {
      const result = await refreshAccessToken();
      const newAccessToken = result.data.accessToken;

      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      error.config.retry = true;

      return axiosInstance.request(error.config);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
);

export const onLoginSuccess = (response: AxiosResponse) => {
  const accessToken = response.data.accessToken;
  axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

export const onLogoutSuccess = () => {
  axiosInstance.defaults.headers.Authorization = '';
};
