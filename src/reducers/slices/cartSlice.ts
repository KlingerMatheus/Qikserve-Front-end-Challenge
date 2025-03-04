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

function itemExists(state: CartState, item: CartItem): CartItem | undefined {
  return state.items.find(
    (cartItem) =>
      cartItem.id === item.id &&
      cartItem.selectedModifierId === item.selectedModifierId
  );
}

function updateExistingItem(state: CartState, action: PayloadAction<CartItem>) {
  const { id, selectedModifierId, quantity } = action.payload;

  cartSlice.caseReducers.updateCartItemQuantity(state, {
    type: cartSlice.actions.updateCartItemQuantity.type,
    payload: {
      id,
      quantity,
      type: "customIncrement",
      modifierId: selectedModifierId,
    },
  });
}

function updateQuantity(
  item: CartItem,
  action: PayloadAction<UpdateQuantityAction>
): number {
  const quantityMap: {
    [key: string]: (
      item: CartItem,
      action: PayloadAction<UpdateQuantityAction>
    ) => number;
  } = {
    customIncrement: (item, action) =>
      item.quantity + (action.payload.quantity || 0),
    decrement: (item) => item.quantity - 1,
    increment: (item) => item.quantity + 1,
  };

  const updateFn = quantityMap[action.payload.type];
  return updateFn ? updateFn(item, action) : item.quantity;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAddNewItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = itemExists(state, action.payload);

      if (existingItem) {
        updateExistingItem(state, action);
        return;
      }

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
          item.id === action.payload.id &&
          item.selectedModifierId === action.payload.modifierId;

        if (isSelectedItem) {
          return {
            ...item,
            quantity: updateQuantity(item, action),
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
