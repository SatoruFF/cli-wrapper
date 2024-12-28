import { create } from "zustand";

type Store = {
  command: string;
  setCommand: (command: string) => void;
};

const useStore = create<Store>()((set) => ({
  command: "",
  setCommand: (command) => set(() => ({ command })),
}));

export default useStore;
