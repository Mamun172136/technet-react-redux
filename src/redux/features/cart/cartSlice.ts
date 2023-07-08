// import { IProduct } from '@/types/globalTypes';
// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// export interface ICart {
//   products: IProduct[];
// }

// const initialState: ICart = {
//   products: [],
// };

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<IProduct>) => {
//       state.products.push(action.payload);
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { addToCart } = cartSlice.actions;

// export default cartSlice.reducer;
import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

export default cartSlice.reducer;