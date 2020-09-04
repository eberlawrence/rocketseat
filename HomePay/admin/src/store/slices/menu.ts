import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MenuState = {
  isOpen: boolean;
};

const initialState: MenuState = {
  isOpen: true,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => ({
      isOpen: action.payload,
    }),
  },
});
export const { setIsOpen } = menuSlice.actions;
export default menuSlice;
