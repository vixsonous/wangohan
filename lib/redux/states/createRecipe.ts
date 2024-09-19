import { createSlice } from "@reduxjs/toolkit";

export const createRecipeSlice = createSlice({
    name: 'createRecipeShow',
    initialState: {
        value: false
    },
    reducers: {
        show: state => {
            state.value = true;
            const html = document.querySelector("html");
            if(html) html.style.overflow = "hidden";
            
        },
        hide: state => {
            state.value = false;
            const html = document.querySelector("html");
            if(html) html.style.overflow = "scroll";
        }
    }
});

export const { show, hide } = createRecipeSlice.actions;
export default createRecipeSlice.reducer;