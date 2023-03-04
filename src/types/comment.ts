export type TCommentForm = {
  _id: string;
  text: string;
};

export type TComment = {
  _id: string;
  createdAt: string;
  feed: string;
  text: string;
  user: string;
  username: string;
};
