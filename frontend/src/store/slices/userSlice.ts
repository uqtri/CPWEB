import { StateCreator } from "zustand";
import { UserSlice } from "../type";
import { io } from "socket.io-client";
import { login, logout } from "@/api/auth.api";
import { toast } from "react-toastify";
import { updateUser } from "@/api/user.api";
import { AxiosError } from "axios";

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set, get) => ({
  user: null,
  socket: null,
  isUserLoading: true,
  // setSocket: (socket) => {
  //   set((state) => {
  //     state.socket = socket;
  //   });
  // },

  updateUser: async (formData: FormData) => {
    if (!get().user) {
      return;
    }
    set((state) => {
      state.isUserLoading = true;
    });
    try {
      const newUser = await updateUser(get().user?.id, formData);
      console.log(newUser);
      set((state) => {
        state.user = newUser;
      });
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
    }
    set((state) => {
      state.isUserLoading = false;
    });
  },
  login: async (user) => {
    const empty = user.email === "" && user.password === "";
    try {
      set((state) => {
        state.isUserLoading = true;
      });
      const response = await login(user || {});
      set((state) => {
        state.user = response.data;
      });
      console.log("Login response:", response);
      if (!empty) toast.success("Đăng nhập thành công!");
    } catch (error) {
      console.error("Login error:", error);
      if (!empty)
        if (error instanceof AxiosError) {
          toast.error(
            error?.response?.data?.message ||
              "Đăng nhập thất bại. Vui lòng thử lại sau."
          );
        } else {
          toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
        }
    }
    set((state) => {
      state.isUserLoading = false;
    });
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
  connectSocket: () => {
    const user = get().user;
    // console.log(get().socket, "!");
    if (!user) return;
    const existingSocket = get().socket;
    if (existingSocket && existingSocket.connected) {
      existingSocket.disconnect();
    }
    const socket = io(import.meta.env.VITE_BACKEND_SOCKET, {
      query: {
        userId: user.id,
      },
    });
    console.log(socket, "!!");
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // toast.success("Kết nối đến máy chủ thành công!");
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      // toast.error("Mất kết nối với máy chủ. Vui lòng thử lại sau.");
    });
    set((state) => {
      state.socket = socket;
    });
  },
});
