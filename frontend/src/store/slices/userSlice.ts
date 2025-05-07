import { create, StateCreator } from "zustand";
import { UserSlice } from "../type";
import { io } from "socket.io-client";

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
    console.log("LOGIN FUNCTION");
    try {
      const response = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      }).then((res) => res.json());

      console.log("response", response.data.user);
      if (response.success) {
        set((state) => {
          state.user = response.data.user;
        });
      }
    } catch (error) {
      // toast.error("Login failed. Please try again.");
    }
  },
  logout: () => {
    set((state) => {
      state.user = null;
      state.socket = null;
    });
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
    console.log("user", user);
    console.log(get().socket);
    // if (get().socket) return;
    if (!user) return;
    const socket = io("http://localhost:5000", {
      query: {
        userId: user.id,
      },
    });
    socket.connect();
    console.log("Socket connected", socket);
    set((state) => {
      state.socket = socket;
    });
    console.log(socket, "@@");
  },
});
