export type TSignupForm = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type TSignupMutation = TSignupForm & {
  callbackUrl: string;
};

export type TUser = {
  name: string;
  email: string;
  username: string;
  verifyEmail: boolean;
};

export type TSignToken = {
  token: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TAccessAuth = {
  accessToken: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};
