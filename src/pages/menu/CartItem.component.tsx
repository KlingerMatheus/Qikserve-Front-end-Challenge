import { useTranslation } from "react-i18next";
import {
  cartRemoveItem,
  updateCartItemQuantity,
} from "../../reducers/slices/cartSlice";
import {
  CartItem as CartItemType,
  RemoveItemAction,
  RootState,
} from "../../types";
import { findMatchingModifier, formatPrice } from "../../utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  item: CartItemType;
}

export const CartItem: FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const modifierDetails = findMatchingModifier(
    item.selectedModifierId,
    item.modifiers
  );
  const currency = useSelector(
    (state: RootState) => state.venue.data?.ccySymbol
  );
  const { t } = useTranslation("cart");

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
      if (confirm(t("dialogRemoveItem", { name: item.name }))) {
        handleRemoveItem({ id: item.id, modifierId: item.selectedModifierId });
        alert(t("itemRemoved", { name: item.name }));
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
        <span className="item-price">
          {formatPrice(item.unitPrice, currency)}
        </span>
      </div>
      {modifierDetails && (
        <span className="cart-item-option-description">
          {modifierDetails.name}
        </span>
      )}
      <div className="quantity-control-buttons">
        <button onClick={decrementQuantity}>
          <MinusIcon />
        </button>
        <span className="quantity">{item.quantity}</span>
        <button onClick={incrementQuantity}>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
