export type TSignupForm = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type TSignupMutation = TSignupForm & {
  callbackUrl: string;
};
