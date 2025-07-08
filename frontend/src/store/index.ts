import { AppStore } from "./type.ts";
import { createUserSlice } from "./slices/userSlice.ts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
export const useAppStore = create<AppStore>()(
  immer((...a) => ({
    ...createUserSlice(...a),
  }))
);
