import { TSignToken, TSignupMutation, TUser } from '../types/user';
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
