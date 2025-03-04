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

const MenuPage = () => {
  const { isMenuLoading, menuDetails } = useMenuDetails();
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [search] = useState("");
  const device = useBreakpoints();
  const isLaptopOrDesktop = ["laptop", "desktop"].includes(device);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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
        {section.items.map((item) => (
          <MenuItem
            onClick={() => setSelectedItem(item)}
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </Accordion>
  );

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && <Modal closeModal={handleCloseModal} />}
      <PageSection
        style={{ maxWidth: isLaptopOrDesktop ? 600 : "100%" }}
        className="page-section-menu-list"
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

            if (!search && isSectionActive) {
              return renderAccordion(section);
            } else if (search) {
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
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* <PageSectionFooter /> */}
        </PageSection>
      )}
    </>
  );
};

export default MenuPage;
