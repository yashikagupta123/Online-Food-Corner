import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.value[action.payload]) {
        state.value[action.payload] += 1;
      } else {
        state.value[action.payload] = 1;
      }
    },
    removeFromCart: (state, action) => {
      if (state.value[action.payload] > 1) {
        state.value[action.payload] -= 1; // cold coffee: 1,2,3,
      } else {
        delete state.value[action.payload];
      }
    },
    clearCart: (state) => {
      state.value = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
