export type UserSlice = {
  user: any;
  login: (user: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: any) => void;
};

export type AppStore = UserSlice;
