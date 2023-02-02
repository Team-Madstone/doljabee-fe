import { AxiosErrorType } from '../constances/axios';

export type TErrorState = {
  type: AxiosErrorType;
  status?: number;
  message?: string;
};

export type TReqError = {
  location: string;
  msg: string;
  param: string;
  value: string;
};
