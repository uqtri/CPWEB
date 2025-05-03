import { AppStore } from "./type.ts";
import { createUserSlice } from "./slices/userSlice.ts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
export const useAppStore = create<AppStore>()(
  persist(
    immer((...a) => ({
      ...createUserSlice(...a),
    })),
    {
      name: "user-storage",
    }
  )
);
