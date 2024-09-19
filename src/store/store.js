import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from '../store/loader/loaderSlice';
import cartReducer from '../store/cart/cartSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    cart: cartReducer,
  },
});
