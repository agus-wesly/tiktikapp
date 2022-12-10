import create from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: {
    _id: string;
    _type: string;
    userName: string;
    profile: string;
  } | null;
  setUser: (newUser: any) => void;
  logOut: () => void;
}

//Auth State
const authState = (set: any): AuthState => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  logOut: () => set({ user: null }),
});

// define the store
const useStore = create(persist(authState, { name: "auth" }));

export default useStore;
