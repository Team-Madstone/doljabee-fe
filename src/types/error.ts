import { AxiosErrorType } from '../constances/axios';

export type TErrorState = {
  type: AxiosErrorType;
  status?: number;
  message?: string;
};
