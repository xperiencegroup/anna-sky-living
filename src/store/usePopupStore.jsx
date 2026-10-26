import { create } from "zustand";

export const usePopupStore = create((set) => ({
  activePopup: null,
  openPopup: (id) => set({ activePopup: id }),
  closePopup: () => set({ activePopup: null }),
}));
