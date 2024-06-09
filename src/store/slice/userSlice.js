import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        loading : true
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
            state.loading = false
        },
        clearUser: (state) => {
            state.userData = {};
            state.loading = false
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.userData;

export default userSlice.reducer;
