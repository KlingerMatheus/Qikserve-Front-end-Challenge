import {
  CartItem,
  CartState,
  Item,
  RemoveItemAction,
  UpdateQuantityAction,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  selectedItem: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAddNewItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    cartRemoveItem: (state, action: PayloadAction<RemoveItemAction>) => {
      state.items = state.items.filter((item) => {
        const { id, modifierId } = action.payload;

        return item.id !== id || item.selectedModifierId !== modifierId;
      });
    },
    cartRemoveAllItems: (state) => {
      state.items = [];
    },
    cartSetSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<UpdateQuantityAction>
    ) => {
      state.items = state.items.map((item) => {
        const isSelectedItem =
          item.id === action.payload.id ||
          item.selectedModifierId === action.payload.modifierId;

        if (isSelectedItem) {
          return {
            ...item,
            quantity:
              action.payload.type === "increment"
                ? item.quantity + 1
                : item.quantity - 1,
          };
        }

        return item;
      });
    },
  },
});

export const {
  cartAddNewItem,
  cartRemoveItem,
  cartRemoveAllItems,
  cartSetSelectedItem,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
