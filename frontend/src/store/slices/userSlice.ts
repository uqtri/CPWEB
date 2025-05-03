import { create, StateCreator } from "zustand";
import { UserSlice } from "../type";
// import { immer } from "zustand/middleware/immer";

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  login: async (user) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    });
  },
  updateUser: (user) => {
    // set((state) => {
    //   state.username = user.username;
    //   state.imageUrl = user.imageUrl;
    // });
  },
});
