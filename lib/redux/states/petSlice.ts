import { DogData } from "@/constants/interface";
import { createSlice } from "@reduxjs/toolkit";

export const petSlice = createSlice({
    name: 'pet',
    initialState: {
        pets: [] as Array<DogData>,
        isSet: false,
    },
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload;
            state.isSet = true;
        },
        addPet: (state, action) => {
            const pets = state.pets;
            pets.push(action.payload);
            state.pets = [...pets];
        }
    }
});

export const { setPets, addPet } = petSlice.actions;
export default petSlice.reducer;