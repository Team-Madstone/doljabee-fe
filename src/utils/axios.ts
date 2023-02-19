import axios from 'axios';
import { SERVER_DOMAIN } from '../constances/domain';

export const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN,
  withCredentials: true,
});
