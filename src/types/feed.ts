export type TFeed = {
  id: number;
  title: string;
  text: string;
  photo?: string;
  createdAt?: string;
  likes?: number;
};

export type TFeedMutaionBase = {
  id: number;
};

export type TGetFeedMutation = TFeedMutaionBase;
export type TDeleteFeedMutation = TFeedMutaionBase;

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
