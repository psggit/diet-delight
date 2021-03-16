import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        resetToken: (state) => {
            state.token = null;
        }
    }
});

export const { setToken, resetToken } = tokenSlice.actions;

export const selectToken = state => state.token.token;

export default tokenSlice.reducer;