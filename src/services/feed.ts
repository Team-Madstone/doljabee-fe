import axios from 'axios';
import { DOLJABEE_DOMAIN } from '../constances/domain';
import { TFeed } from '../types/feed';

const axiosInstance = axios.create({
  baseURL: DOLJABEE_DOMAIN,
});

export const getFeeds = () => axiosInstance.get<TFeed[]>('/feed');
