import axios from 'axios';
import { SERVER_DOMAIN } from '../constances/domain';
import { TSignToken, TSignupMutation, TUser } from '../types/user';

const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN,
});

export const signup = (data: TSignupMutation) => {
  return axiosInstance.post<TSignupMutation>('/user', data);
};

export const signToken = (token: string) => {
  return axiosInstance.get<TSignToken>('/user/signToken', {
    params: { token },
  });
};

export const getMyProfile = () => {
  return axiosInstance.get<TUser>('/user/get-my-profile');
};
