import { FunctionComponent } from "react";
import { createPortal } from "react-dom";

import { useBreakpoints } from "../../../hooks";
import { CloseIcon, LeftArrowIcon } from "../../../assets/icons";
import { CartItem as CartItemType, RootState } from "../../../types";
import { CartItem } from "../CartItem.component";
import { formatPrice } from "../../../utils";
import { PrimaryButton } from "../../../components/primary-button/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { cartRemoveAllItems } from "../../../reducers/slices/cartSlice";

import "./cart-mobile.css";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen?: boolean;
  closeCart: () => void;
  cartItems: CartItemType[];
}

const CartMobileContainer: FunctionComponent<Props> = ({
  isOpen,
  closeCart,
  cartItems,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("cart");

  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const currency = useSelector(
    (state: RootState) => state.venue.data?.ccySymbol
  );

  const { isMobileOrTablet } = useBreakpoints();

  function handleCheckout() {
    dispatch(cartRemoveAllItems());
    closeCart();
  }

  return (
    isOpen &&
    cartItems.length > 0 &&
    isMobileOrTablet && (
      <div className="cart-mobile-container">
        <div className="cart-mobile-header">
          <div className="icon-container">
            <LeftArrowIcon style={{ visibility: "hidden" }} />
          </div>
          <h1 className="label">{t("cart")}</h1>

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
            <span className="label">{t("subtotal")}</span>
            <span className="price">{formatPrice(totalPrice, currency)}</span>
          </div>
          <hr />
          <div className="total">
            <span className="label">{t("total")}</span>
            <span className="price">{formatPrice(totalPrice, currency)}</span>
          </div>
        </div>
        <div className="cart-mobile-checkout">
          <PrimaryButton label={t("checkoutNow")} onClick={handleCheckout} />
        </div>
      </div>
    )
  );
};

export const CartMobile: FunctionComponent<Props> = (props) =>
  createPortal(<CartMobileContainer {...props} />, document.body);
