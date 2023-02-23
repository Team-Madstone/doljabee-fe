import axios from 'axios';
import { SERVER_DOMAIN } from '../constances/domain';
import {
  TAccessAuth,
  TChangePassword,
  TChangeUsername,
  TLoginForm,
  TResendVerifyEmail,
  TSignToken,
  TSignupMutation,
  TUser,
} from '../types/user';
import { axiosInstance } from '../utils/axios';

export const signup = (data: TSignupMutation) => {
  return axiosInstance.post<TSignupMutation>('/user', data);
};

export const verifyEmail = (token: string) => {
  return axiosInstance.get<TSignToken>('/user/verify-email', {
    params: { token },
  });
};

export const getMyProfile = () => {
  return axiosInstance.get<TUser>('/user/get-my-profile');
};

export const refreshAccessToken = () => {
  return axios.post<TAccessAuth>(
    `${SERVER_DOMAIN}/user/refresh-access-token`,
    {},
    { withCredentials: true }
  );
};

export const loginUser = async (data: TLoginForm) => {
  return axiosInstance.post<TLoginForm>('/user/login', data);
};

export const logoutUser = () => {
  return axiosInstance.post('/user/logout');
};

export const changePassword = (data: TChangePassword) => {
  return axiosInstance.post<TChangePassword>('/user/change-password', data);
};

export const changeUsername = (data: TChangeUsername) => {
  return axiosInstance.post<TChangeUsername>('/user/change-username', data);
};

export const resendVerifyEmail = (data: TResendVerifyEmail) => {
  return axiosInstance.post<TResendVerifyEmail>(
    '/user/resend-verify-email',
    data
  );
};
