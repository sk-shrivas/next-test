'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  menus: [],
  subMenusById: []
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.menus = action.payload
    },
    setSubMenus: (state, action) => {
      state.subMenus = action.payload
    },
    setSubMenusById: (state, action) => {
      state.subMenusById = action.payload
    }
  }
});

export const { setMenus, setSubMenus, setSubMenusById } = menuSlice.actions;
export default menuSlice.reducer;