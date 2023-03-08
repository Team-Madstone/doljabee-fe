import { TCursorPaging, TCursorPagingVariables } from '../types/common';
import {
  TDeleteFeedMutation,
  TFeed,
  TGetFeedMutation,
  TToggleLikeFeedMutation,
  TUpdateFeedMutation,
  TUploadFeedMutation,
} from '../types/feed';
import { axiosInstance } from '../utils/axios';

export const getFeeds = ({ cursor, limit }: TCursorPagingVariables) => {
  return axiosInstance.get<TCursorPagingVariables, TCursorPaging<TFeed>>(
    '/feed',
    {
      params: { cursor, limit },
    }
  );
};

export const getFeed = ({ _id }: TGetFeedMutation) => {
  return axiosInstance.get<TFeed>(`/feed/${_id}`);
};

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

export const deleteFeed = ({ _id }: TDeleteFeedMutation) => {
  return axiosInstance.delete(`/feed`, {
    data: { _id },
  });
};

export const toggleLikeFeed = ({ _id }: TToggleLikeFeedMutation) => {
  return axiosInstance.post(`/feed/like`, {
    feedId: _id,
  });
};
