import { TCommentForm } from '../types/comment';
import { axiosInstance } from '../utils/axios';

export const createComment = ({ _id, text }: TCommentForm) => {
  return axiosInstance.post(`/comment`, {
    feedId: _id,
    text,
  });
};
