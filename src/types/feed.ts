import { TComment } from './comment';

export type TLike = {
  feed: string;
  user: string;
  _id: string;
};

export type TOwner = {
  _id: string;
  email: string;
  name: string;
  password: string;
  username: string;
  verifyEmail: boolean;
};

export type TFeed = {
  _id: string;
  title: string;
  text: string;
  photo?: string;
  createdAt: string;
  likes: TLike[];
  comments: TComment[];
  owner: TOwner;
  koreaTime: string;
};

export type TFeedMutaionBase = {
  _id: string;
};

export type TGetFeedMutation = TFeedMutaionBase;
export type TDeleteFeedMutation = TFeedMutaionBase;
export type TToggleLikeFeedMutation = TFeedMutaionBase;

export type TUploadFeedMutation = {
  title: string;
  text: string;
  photoFile?: File;
};

export type TUpdateFeedMutation = TFeedMutaionBase & TUploadFeedMutation;

export type TFormValue = {
  title: string;
  text: string;
  photoFile?: File[];
};

export type TError = {
  response: {
    status: number;
    message: string;
  };
};
