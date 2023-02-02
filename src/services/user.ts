import axios from 'axios';
import { SERVER_DOMAIN } from '../constances/domain';
import { TSignupMutation } from '../types/user';

const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN,
});

export const signup = (data: TSignupMutation) => {
  return axiosInstance.post('/user', data);
};

export const signToken = (token: string) => {
  return axiosInstance.get('/user/signToken', { params: { token } });
};
