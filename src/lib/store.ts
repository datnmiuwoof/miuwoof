import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import  userSlice  from './userSlice';
import checkoutSlice from './checkoutSlice';
import favoriteSlice from './favoriteSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    checkout: checkoutSlice,
    favorite: favoriteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
