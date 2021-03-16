import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import tokenReducer from '../features/tokenSlice';
import adminReducer from '../features/adminSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    admin: adminReducer,
  },
});
