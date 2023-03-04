import { TCommentForm, TDeleteCommentForm } from '../types/comment';
import { axiosInstance } from '../utils/axios';

export const createComment = ({ _id, text }: TCommentForm) => {
  return axiosInstance.post(`/comment`, {
    feedId: _id,
    text,
  });
};

export const deleteComment = ({ _id }: TDeleteCommentForm) => {
  return axiosInstance.delete(`/comment`, { data: { _id } });
};
