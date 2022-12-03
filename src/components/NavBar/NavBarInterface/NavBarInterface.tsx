export interface NavBarInterface {
  handleLogout: () => void;
  user: {
    name: string;
    email: string;
    profile?: string;
    _v: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}
