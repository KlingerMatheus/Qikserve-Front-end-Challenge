import { Section } from "@/types";
import { FunctionComponent } from "react";

interface Props {
  section: Section;
  activeSectionId: number | null;
  onClick: VoidFunction;
}

export const MenuSectionItem: FunctionComponent<Props> = ({
  section,
  onClick,
  activeSectionId,
}) => {
  return (
    <div
      className="menu-list-header-option"
      key={section.id}
      onClick={onClick}
      data-isactive={section.id === activeSectionId ? true : null}
    >
      <img src={section.images?.[0].image} alt={section.name} />
      <span>{section.name}</span>
    </div>
  );
};
