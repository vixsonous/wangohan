import {configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "./states/counterSlice";
import { recipeSlice } from "./states/recipeSlice";
import {userSlice} from "./states/userSlice";
import {messageSlice} from "./states/messageSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice.reducer,
            recipeSlice: recipeSlice.reducer,
            user: userSlice.reducer,
            message: messageSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];