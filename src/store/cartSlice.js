import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      state.totalQuantity -= 1;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    deleteFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        const quantityDifference = quantity - item.quantity;
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.price;
        state.totalQuantity += quantityDifference;
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
 