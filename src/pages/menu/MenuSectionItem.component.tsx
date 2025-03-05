import { useTranslation } from "react-i18next";
import { Section } from "../../types";
import { FunctionComponent } from "react";

interface Props {
  section: Section;
  activeSectionId: number | null;
  onClick: () => void;
}

export const MenuSectionItem: FunctionComponent<Props> = ({
  section,
  onClick,
  activeSectionId,
}) => {
  const { t } = useTranslation("menu");
  const tSectionName = t(`itemType.${section.name.toLowerCase()}`);

  return (
    <div
      className="menu-list-header-option"
      key={section.id}
      onClick={onClick}
      data-isactive={section.id === activeSectionId ? true : null}
    >
      <img src={section.images?.[0].image} alt={tSectionName} />
      <span>{tSectionName}</span>
    </div>
  );
};
