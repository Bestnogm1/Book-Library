export interface LoginInterface {
  handleSignupOrLogin: () => void;
  updateMessage: (arg: string) => void;
}

export interface LoginFromDataInterface {
  email: string;
  pw: string;
}
