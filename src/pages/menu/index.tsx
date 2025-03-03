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
import { Section } from "@/types";

const MenuPage = () => {
  const { isMenuLoading, menuDetails } = useMenuDetails();
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [search] = useState("");
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

  const renderAccordion = (section: Section) => (
    <Accordion key={section.id} title={section.name} defaultOpen>
      <div className="menu-list-items">
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </Accordion>
  );

  return (
    <>
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
          className=""
          style={{
            minWidth: 320,
            maxWidth: 320,
            height: "min-content",
          }}
        >
          <PageSectionHeader title="Carrinho" />
          <div className="empty-cart">Seu carrinho está vazio</div>
          {/* <PageSectionFooter /> */}
        </PageSection>
      )}
    </>
  );
};

export default MenuPage;
