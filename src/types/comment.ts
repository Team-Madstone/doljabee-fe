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
  koreaTime: string;
};

export type TDeleteCommentForm = {
  _id: string;
};

export type TEditCommentForm = {
  editComment: string;
  chosenCommentId: string;
};
