import { PageSection } from "@/components/page-section";
import PageSectionFooter from "@/components/page-section/PageSectionFooter";
import PageSectionHeader from "@/components/page-section/PageSectionHeader";
import { Spinner } from "@/components/spinner";
import { useMenuDetails } from "@/hooks";
import { useEffect, useState } from "react";
import { MenuItem } from "./MenuItem.component";
import { Accordion } from "@/components/accordion";
import "./style.css";
import { MenuSectionItem } from "./MenuSectionItem.component";

const MenuPage = () => {
  const { isMenuLoading, menuDetails } = useMenuDetails();
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [search] = useState("");

  useEffect(() => {
    const firstSection = menuDetails?.sections.find((section) => section.id);

    if (!firstSection) return;

    setActiveSectionId(firstSection.id);
  }, [menuDetails]);

  if (isMenuLoading) {
    return <Spinner />;
  }

  return (
    <>
      <PageSection style={{ maxWidth: 600 }} className="page-section-menu-list">
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
              return (
                <Accordion key={section.id} title={section.name} defaultOpen>
                  <div className="menu-list-items">
                    {section.items.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </div>
                </Accordion>
              );
            }

            if (search) {
              return (
                <Accordion key={section.id} title={section.name} defaultOpen>
                  <div className="menu-list-items">
                    {section.items.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </div>
                </Accordion>
              );
            }
          })}
        </div>
        <div className="view-allergy-link">
          <span>View allergy information</span>
        </div>
      </PageSection>
      <PageSection
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
    </>
  );
};

export default MenuPage;
