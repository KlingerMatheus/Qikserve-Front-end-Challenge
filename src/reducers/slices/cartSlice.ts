import { CartState, Item } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  selectedItem: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAddNewItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    cartRemoveItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    cartRemoveAllItems: (state) => {
      state.items = [];
    },
    cartSetSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const {
  cartAddNewItem,
  cartRemoveItem,
  cartRemoveAllItems,
  cartSetSelectedItem,
} = cartSlice.actions;

export default cartSlice.reducer;
