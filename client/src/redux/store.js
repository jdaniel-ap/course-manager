import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import moduleSlice from './slices/module'



export default configureStore({
  reducer: {
    user: userSlice,
    module: moduleSlice
  }
});
