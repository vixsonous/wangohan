import { createSlice } from "@reduxjs/toolkit";

export const createRecipeSlice = createSlice({
    name: 'createRecipeShow',
    initialState: {
        value: false,
        uploading: false,
    },
    reducers: {
        show: state => {
            state.value = true;
            const html = document.querySelector("html");
            if(html) html.style.overflowY = "hidden";
            
        },
        hide: state => {
            state.value = false;
            const html = document.querySelector("html");
            if(html) html.style.overflowY = "scroll";
        },
    }
});

export const { show, hide } = createRecipeSlice.actions;
export default createRecipeSlice.reducer;