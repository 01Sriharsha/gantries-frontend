import { User } from "@/types";
import { create } from "zustand";

type MessageStore = {
  selectedUser: string;
  updateSelectedUser: (username:string) => void;
};

export const useMessageStote = create<MessageStore>((set) => ({
  selectedUser: "",
  updateSelectedUser: (username) => {
    set({ selectedUser: username });
  },
}));
