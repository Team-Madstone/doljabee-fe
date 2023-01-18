import { AxiosError } from 'axios';
import { AxiosErrorType } from '../constances/axios';
import { TErrorState } from '../types/error';

export const getErrorState = (error: unknown): TErrorState => {
  if (error instanceof AxiosError) {
    return {
      type: AxiosErrorType.NETWORK,
      status: error.response?.status,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      type: AxiosErrorType.CLIENT,
      message: error.message,
    };
  }

  return {
    type: AxiosErrorType.CLIENT,
  };
};
