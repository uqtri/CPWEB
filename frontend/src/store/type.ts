export type UserSlice = {
  user: any;
  login: (user: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: any) => void;
  socket: any;
  // setSocket: (socket: any) => void;
  connectSocket: () => void;
};

export type AppStore = UserSlice;
