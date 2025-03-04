import {
  cartRemoveItem,
  updateCartItemQuantity,
} from "@/reducers/slices/cartSlice";
import { CartItem as CartItemType, RemoveItemAction } from "@/types";
import { findMatchingModifier, formatPrice } from "@/utils";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

interface Props {
  item: CartItemType;
}

export const CartItem: FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const modifierDetails = findMatchingModifier(
    item.selectedModifierId,
    item.modifiers
  );

  function handleRemoveItem(props: RemoveItemAction) {
    dispatch(cartRemoveItem(props));
  }

  function incrementQuantity() {
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        type: "increment",
        modifierId: item.selectedModifierId,
      })
    );
  }

  function decrementQuantity() {
    if (item.quantity <= 1) {
      if (confirm("Tem certeza que deseja excluir este item?")) {
        handleRemoveItem({ id: item.id, modifierId: item.selectedModifierId });
        alert("Item excluído!");
        return;
      } else {
        return;
      }
    }

    dispatch(
      updateCartItemQuantity({
        id: item.id,
        type: "decrement",
        modifierId: item.selectedModifierId,
      })
    );
  }

  return (
    <div className="cart-list-items-item">
      <div className="item-details">
        <span className="item-name">{item.name}</span>
        <span className="item-price">{formatPrice(item.unitPrice)}</span>
      </div>
      {modifierDetails && (
        <span className="cart-item-option-description">
          {modifierDetails.name}
        </span>
      )}
      <div className="quantity-control-buttons">
        <button onClick={decrementQuantity}>-</button>
        <span className="quantity">{item.quantity}</span>
        <button onClick={incrementQuantity}>+</button>
      </div>
    </div>
  );
};
