import { FunctionComponent, PropsWithChildren } from "react";

const PageSectionFooter: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <div className="page-section-footer">{children}</div>;
};

export default PageSectionFooter;
