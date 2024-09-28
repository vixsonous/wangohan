import { User } from "@/constants/interface";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            user_id: 0,
            user_image: '',
            user_codename: ''
        } as User,
        isLoggedIn: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        test: state => {
            setTimeout(() => {
                alert(state.user);
            });
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;