import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isNew: false,
    isAdmin: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.user = null;
    },

    SetTrue: (state) => {
      state.isAdmin = true
    },

    SetFalse: (state) => {
      state.isAdmin = false
    },

    setNew: (state) => {
      state.isNew = true;
    }

  },
});

export const { login, logout, SetTrue, SetFalse, setNew } = userSlice.actions;


export const selectUser = state => state.user.user;
export const selectAdmin = state => state.user.isAdmin;
export const selectNew = state => state.user.isNew;

export default userSlice.reducer;
