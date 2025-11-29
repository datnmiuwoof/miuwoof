import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import  userSlice  from './userSlice';
import checkoutSlice from './checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    checkout: checkoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
