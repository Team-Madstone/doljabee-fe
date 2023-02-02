import axios from 'axios';
import { SERVER_DOMAIN } from '../constances/domain';
import {
  TDeleteFeedMutation,
  TFeed,
  TGetFeedMutation,
  TUpdateFeedMutation,
  TUploadFeedMutation,
} from '../types/feed';

const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN,
});

export const getFeeds = () => axiosInstance.get<TFeed[]>('/feed');

export const getFeed = ({ _id }: TGetFeedMutation) =>
  axiosInstance.get<TFeed>(`/feed/${_id}`);

export const uploadFeed = async ({
  title,
  text,
  photoFile,
}: TUploadFeedMutation) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', text);
  photoFile && formData.append('photo', photoFile);

  return axiosInstance.post(`/feed`, formData);
};

export const updateFeed = async ({
  _id,
  title,
  text,
  photoFile,
}: TUpdateFeedMutation) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', text);
  photoFile && formData.append('photo', photoFile);
  return await axiosInstance.put(`/feed/${_id}`, formData);
};

export const deleteFeed = ({ _id }: TDeleteFeedMutation) =>
  axiosInstance.delete(`/feed`, {
    data: { _id },
  });
