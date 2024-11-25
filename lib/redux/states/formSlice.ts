import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        isInView: false,
        barView: false,
    },
    reducers: {
        inView: (state) => {
          state.isInView = true;
          state.barView = false;
        },
        offView: (state) => {
          state.isInView = false;
          state.barView = true;
        }
    }
});

export const { inView, offView } = formSlice.actions;
export default formSlice.reducer;