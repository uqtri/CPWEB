export type UserSlice = {
  user: any;
  login: (user: any) => Promise<void>;
  logout: () => void;
updateUser: (formData: FormData) => Promise<void>;
  socket: any;
  isUserLoading: boolean;
  // setSocket: (socket: any) => void;
  connectSocket: () => void;
};

export type AppStore = UserSlice;
