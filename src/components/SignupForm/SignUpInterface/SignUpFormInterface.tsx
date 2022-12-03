export interface SignupFormPropsInterface {
  handleSignupOrLogin: () => void;
  updateMessage: (message: string) => void;
}
export interface SignupFormInterface {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}
