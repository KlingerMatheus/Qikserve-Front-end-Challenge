import { FunctionComponent } from "react";

interface Props {
  title: string;
}

const PageSectionHeader: FunctionComponent<Props> = ({ title }) => {
  return <div className="page-section-header">{title}</div>;
};

export default PageSectionHeader;
