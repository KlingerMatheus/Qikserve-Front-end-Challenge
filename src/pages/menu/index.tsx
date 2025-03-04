import { PageSection } from "@/components/page-section";
import PageSectionFooter from "@/components/page-section/PageSectionFooter";
import PageSectionHeader from "@/components/page-section/PageSectionHeader";
import { Spinner } from "@/components/spinner";
import { useBreakpoints, useMenuDetails } from "@/hooks";
import { useEffect, useState } from "react";
import { MenuItem } from "./MenuItem.component";
import { Accordion } from "@/components/accordion";
import "./style.css";
import { MenuSectionItem } from "./MenuSectionItem.component";
import { Item, RootState, Section } from "@/types";
import { Modal } from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import { cartSetSelectedItem } from "@/reducers/slices/cartSlice";
import { CartItem } from "./CartItem.component";
import { PrimaryButton } from "@/components/primary-button";
import { formatPrice } from "@/utils";
import { CartMobile } from "./cart-mobile";
import { SearchBar } from "@/components/search-bar";

const MenuPage = () => {
  const { isMenuLoading, menuDetails } = useMenuDetails();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [isCartMobileOpen, setIsCartMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const device = useBreakpoints();
  const isLaptopOrDesktop = ["laptop", "desktop"].includes(device);

  useEffect(() => {
    const firstSection = menuDetails?.sections.find((section) => section.id);

    if (!firstSection) return;

    setActiveSectionId(firstSection.id);
  }, [menuDetails]);

  if (isMenuLoading) {
    return <Spinner />;
  }

  const setSelectedItem = (item: Item) => {
    dispatch(cartSetSelectedItem(item));
    setIsModalOpen(true);
  };

  const renderAccordion = (section: Section) => (
    <Accordion key={section.id} title={section.name} defaultOpen>
      <div className="menu-list-items">
        {section.items.map((item) => {
          if (
            search &&
            !item.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return;
          }

          const cartItem = cartItems.filter(
            (cartItem) => cartItem.id === item.id
          );
          const cartItemQuantity =
            cartItem.length > 1
              ? cartItem.reduce(
                  (acc, currentValue) => acc + currentValue.quantity,
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

      <SearchBar onSearch={setSearch} placeholder="Search menu items" />

      <div className="page-menu-container">
        <PageSection
          style={{
            maxWidth: isLaptopOrDesktop ? 600 : "100%",
          }}
        >
          <div className="menu-list-header">
            {menuDetails
              ? menuDetails.sections.map((section) => (
                  <MenuSectionItem
                    activeSectionId={activeSectionId}
                    onClick={() => setActiveSectionId(section.id)}
                    section={section}
                    key={section.id}
                  />
                ))
              : "Nothing available"}
          </div>
          <div className="menu-list-sections">
            {menuDetails?.sections.map((section) => {
              const isSectionActive = section.id === activeSectionId;

              if (isSectionActive) {
                return renderAccordion(section);
              }

              return null;
            })}
          </div>
          <div className="view-allergy-link">
            <span>View allergy information</span>
          </div>
        </PageSection>
        {isLaptopOrDesktop && (
          <PageSection
            style={{
              minWidth: 320,
              maxWidth: 320,
              height: "min-content",
            }}
          >
            <PageSectionHeader title="Carrinho" />
            {!cartItems.length ? (
              <div className="empty-cart">Seu carrinho está vazio</div>
            ) : (
              <div className="cart-list-items">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.selectedModifierId}`}
                    item={item}
                  />
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <PageSectionFooter>
                <div className="cart-total-price-container">
                  <span className="label">Total:</span>{" "}
                  <span className="price">{formatPrice(totalPrice)}</span>
                </div>
              </PageSectionFooter>
            )}
          </PageSection>
        )}
      </div>

      {!isLaptopOrDesktop && cartItems.length > 0 && (
        <div className="basket-shortcut-container">
          <PrimaryButton
            label={`Your basket • ${cartItems.length} items`}
            onClick={() => setIsCartMobileOpen(true)}
          />
        </div>
      )}

      <CartMobile
        isOpen={isCartMobileOpen}
        closeCart={() => setIsCartMobileOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
};

export default MenuPage;
