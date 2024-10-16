import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isLoading: false
    },
    reducers: {
        showLoading: state => {
            state.isLoading = true;
        },

        hideLoading: state => {
            state.isLoading = false;
        }
    }
});

export const {showLoading, hideLoading} = globalSlice.actions;
export default globalSlice.reducer;