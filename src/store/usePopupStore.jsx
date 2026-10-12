import { create } from "zustand";
const isDev = import.meta.env.DEV; // Vite

export const usePopupStore = create((set) => ({
  activePopup: isDev ? null : "register",
  openPopup: (id) => set({ activePopup: id }),
  closePopup: () => set({ activePopup: null }),
}));
