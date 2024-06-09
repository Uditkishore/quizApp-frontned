import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.userData = {};
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.userData;

export default userSlice.reducer;
