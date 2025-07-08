import { StateCreator } from "zustand";
import { UserSlice } from "../type";
import { io } from "socket.io-client";
import { login, logout } from "@/api/auth.api";
import { toast } from "react-toastify";

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set, get) => ({
  user: null,
  socket: null,
  // setSocket: (socket) => {
  //   set((state) => {
  //     state.socket = socket;
  //   });
  // },
  login: async (user) => {
    try {
      const response = await login(user || {});

      set((state) => {
        state.user = response.data;
      });
      console.log("Login successful @@", response.data);
      toast.success("Đăng nhập thành công!");
      // }
    } catch (error) {
      console.log("Login failed", error);
      if (user)
        toast.error(
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
        );
    }
  },
  logout: async () => {
    try {
      await logout();
      set((state) => {
        state.user = null;
        state.socket = null;
      });
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      toast.error("Đăng xuất thất bại. Vui lòng thử lại sau.");
    }
  },
  updateUser: (user) => {
    // set((state) => {
    //   state.username = user.username;
    //   state.imageUrl = user.imageUrl;
    // });
  },
  connectSocket: () => {
    console.log("Connect to socket function");
    const user = get().user;
    console.log("User in connectSocket:", user);
    console.log(get().socket);
    if (!user) return;
    console.log("Connecting to socket...", import.meta.env.VITE_BACKEND_SOCKET);
    const socket = io(import.meta.env.VITE_BACKEND_SOCKET, {
      query: {
        userId: user.id,
      },
    });
    console.log("Socket connected:", socket);
    set((state) => {
      state.socket = socket;
    });
  },
});
