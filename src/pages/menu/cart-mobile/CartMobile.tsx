import { FunctionComponent } from "react";
import { createPortal } from "react-dom";

import { useBreakpoints } from "@/hooks";
import { CloseIcon, LeftArrowIcon } from "@/assets/icons";
import { CartItem as CartItemType, RootState } from "@/types";
import { CartItem } from "../CartItem.component";
import { formatPrice } from "@/utils";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { cartRemoveAllItems } from "@/reducers/slices/cartSlice";

import "./cart-mobile.css";

interface Props {
  isOpen?: boolean;
  closeCart: VoidFunction;
  cartItems: CartItemType[];
}

const CartMobileContainer: FunctionComponent<Props> = ({
  isOpen,
  closeCart,
  cartItems,
}) => {
  const dispatch = useDispatch();

  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const { isMobileOrTablet } = useBreakpoints();

  function handleCheckout() {
    dispatch(cartRemoveAllItems());
    closeCart();
    alert("Simulating checkout...");
  }

  return (
    isOpen &&
    isMobileOrTablet && (
      <div className="cart-mobile-container">
        <div className="cart-mobile-header">
          <div className="icon-container">
            <LeftArrowIcon style={{ visibility: "hidden" }} />
          </div>
          <h1 className="label">Basket</h1>

          <div className="icon-container" onClick={closeCart}>
            <CloseIcon aria-label="Close Cart" />
          </div>
        </div>
        <div className="cart-mobile-body">
          {cartItems.map((item) => (
            <CartItem
              key={`${item.id}-${item.selectedModifierId}`}
              item={item}
            />
          ))}
        </div>
        <div className="cart-mobile-values">
          <div className="subtotal">
            <span className="label">Sub total</span>
            <span className="price">{formatPrice(totalPrice)}</span>
          </div>
          <hr />
          <div className="total">
            <span className="label">Total</span>
            <span className="price">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <div className="cart-mobile-checkout">
          <PrimaryButton label="Checkout now" onClick={handleCheckout} />
        </div>
      </div>
    )
  );
};

export const CartMobile: FunctionComponent<Props> = (props) =>
  createPortal(<CartMobileContainer {...props} />, document.body);
