"use client";

import { combineReducers } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";

export const combinedReducer = combineReducers({
    menus: menuSlice,
});
