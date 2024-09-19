import {configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "./states/counterSlice";
import { createRecipeSlice } from "./states/createRecipe";

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice.reducer,
            createRecipe: createRecipeSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];