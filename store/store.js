import { configureStore } from "@reduxjs/toolkit";
import { combinedReducer } from "./reducers";

export const reducer = (state, action) => {
    return combinedReducer(state, action);
};

export const makeStore = () =>
    configureStore({
        reducer,
        devTools: true,
    });
