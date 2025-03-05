import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBreakpoints, useMenuDetails } from "../../hooks";

import {
  CartItem as CartItemType,
  Item,
  RootState,
  Section,
} from "../../types";
import { cartSetSelectedItem } from "../../reducers/slices/cartSlice";
import { formatPrice } from "../../utils";

import { CartMobile } from "./cart-mobile/CartMobile";
import { Page } from "../../components/page-section";
import { Spinner } from "../../components/spinner/Spinner";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { Accordion } from "../../components/accordion/Accordion";
import { PrimaryButton } from "../../components/primary-button/PrimaryButton";
import { CartItem } from "./CartItem.component";
import { Modal } from "../../components/selected-item-modal/SelectedItemModal";
import { MenuItem } from "./MenuItem.component";
import { MenuSectionItem } from "./MenuSectionItem.component";

import { useTranslation } from "react-i18next";

import "./menu.css";

const MenuPage = () => {
  const { isMenuLoading, menuDetails } = useMenuDetails();
  const dispatch = useDispatch();
  const { cart, venue } = useSelector((state: RootState) => state);

  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [isCartMobileOpen, setIsCartMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation(["cart", "common", "menu"]);
  const { isLaptopOrDesktop } = useBreakpoints();

  useEffect(() => {
    const firstSection = menuDetails?.sections.find(
      (section: Section) => section.id
    );

    if (!firstSection) return;

    setActiveSectionId(firstSection.id);
  }, [menuDetails]);

  if (isMenuLoading) {
    return (
      <div style={{ marginTop: 48, width: "100%" }}>
        <Spinner />
      </div>
    );
  }

  const setSelectedItem = (item: Item) => {
    dispatch(cartSetSelectedItem(item));
    setIsModalOpen(true);
  };

  const renderAccordion = (section: Section) => (
    <Accordion
      key={section.id}
      title={t(`menu:itemType.${section.name.toLowerCase()}`)}
      defaultOpen
    >
      <div className="menu-list-items">
        {section.items.map((item: Item) => {
          if (
            search &&
            !item.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return;
          }

          const cartItem = cart.items.filter(
            (cartItem: CartItemType) => cartItem.id === item.id
          );
          const cartItemQuantity =
            cartItem.length > 1
              ? cartItem.reduce(
                  (acc: number, currentValue: CartItemType) =>
                    acc + currentValue.quantity,
                  0
                )
              : cartItem[0]?.quantity;

          return (
            <MenuItem
              onClick={() => setSelectedItem(item)}
              key={`menu-option-${item.id}`}
              item={item}
              quantityAdded={cartItemQuantity}
            />
          );
        })}
      </div>
    </Accordion>
  );

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && <Modal closeModal={handleCloseModal} />}

      <SearchBar
        onSearch={setSearch}
        placeholder={t("common:searchPlaceholder")}
      />

      <div className="page-menu-container">
        <Page.Root
          style={{
            maxWidth: isLaptopOrDesktop ? 600 : "100%",
          }}
        >
          <div className="menu-list-header">
            {menuDetails
              ? menuDetails.sections.map((section: Section) => (
                  <MenuSectionItem
                    activeSectionId={activeSectionId}
                    onClick={() => setActiveSectionId(section.id)}
                    section={section}
                    key={section.id}
                  />
                ))
              : t("common:nothingAvailable")}
          </div>
          <div className="menu-list-sections">
            {menuDetails?.sections.map((section: Section) => {
              const isSectionActive = section.id === activeSectionId;

              if (isSectionActive) {
                return renderAccordion(section);
              }

              return null;
            })}
          </div>
          <div className="view-allergy-link">
            <span>{t("menu:viewAllergyInformation")}</span>
          </div>
        </Page.Root>
        {isLaptopOrDesktop && (
          <Page.Root
            style={{
              minWidth: 320,
              maxWidth: 320,
              height: "min-content",
            }}
          >
            <Page.Header title={t("cart:cart")} />
            {!cart.items.length ? (
              <div className="empty-cart">{t("cart:emptyCart")}</div>
            ) : (
              <div className="cart-list-items">
                {cart.items.map((item: CartItemType) => (
                  <CartItem
                    key={`${item.id}-${item.selectedModifierId}`}
                    item={item}
                  />
                ))}
              </div>
            )}

            {cart.items.length > 0 && (
              <Page.Footer>
                <div className="cart-total-price-container">
                  <span className="label">{t("cart:total")}</span>{" "}
                  <span className="price">
                    {formatPrice(cart.totalPrice, venue.data?.ccySymbol)}
                  </span>
                </div>
              </Page.Footer>
            )}
          </Page.Root>
        )}
      </div>

      {!isLaptopOrDesktop && cart.items.length > 0 && (
        <div className="basket-shortcut-container">
          <PrimaryButton
            label={t("cart:yourCart", { count: cart.items.length })}
            onClick={() => setIsCartMobileOpen(true)}
          />
        </div>
      )}

      <CartMobile
        isOpen={isCartMobileOpen}
        closeCart={() => setIsCartMobileOpen(false)}
        cartItems={cart.items}
      />
    </>
  );
};

export default MenuPage;
