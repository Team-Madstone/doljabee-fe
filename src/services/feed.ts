import axios from 'axios';
import { DOLJABEE_DOMAIN } from '../constances/domain';
import {
  TDeleteFeedMutation,
  TFeed,
  TGetFeedMutation,
  TUpdateFeedMutation,
  TUploadFeedMutation,
} from '../types/feed';

const axiosInstance = axios.create({
  baseURL: DOLJABEE_DOMAIN,
});

export const getFeeds = () => axiosInstance.get<TFeed[]>('/feed');

export const getFeed = ({ id }: TGetFeedMutation) =>
  axiosInstance.get<TFeed>(`/feed/${id}`);

export const uploadFeed = async ({
  title,
  text,
  photo,
}: TUploadFeedMutation) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', text);
  photo && formData.append('photo', photo);

  return axiosInstance.post(`/feed`, formData);
};

export const updateFeed = async ({
  id,
  title,
  text,
  photo,
}: TUpdateFeedMutation) => {
  const formData = new FormData();
  console.log(id, title, text, photo);
  formData.append('title', title);
  formData.append('text', text);
  photo && formData.append('photo', photo);
  return await axiosInstance.put(`/feed/${id}`, formData);
};

export const deleteFeed = ({ id }: TDeleteFeedMutation) =>
  axiosInstance.delete(`/feed`, {
    data: { id },
  });
