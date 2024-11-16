import { User } from "@/constants/interface";
import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        error: {
            show: false,
            message: ''
        },
        success: {
            show: false,
            message: ''
        },
        modal: {
          show: false,
        }
    },
    reducers: {
        showError: (state, action) => {
            state.error.message = action.payload;
            state.error.show = true;
        },
        hideError: state => {state.error.show = false;},

        showSuccess: (state, action) => {
            state.success.message = action.payload;
            state.success.show = true;
        },
        hideSuccess: state => {state.success.show = false;},

        showModal: (state) => {
          state.modal.show = true;
        },
        hideModal: state => {state.modal.show = false;},
    }
});

export const { showError, hideError, showSuccess, hideSuccess, showModal, hideModal } = messageSlice.actions;
export default messageSlice.reducer;