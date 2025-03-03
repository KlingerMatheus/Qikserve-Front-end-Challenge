import {
  Children,
  isValidElement,
  ReactNode,
  FunctionComponent,
  PropsWithChildren,
  CSSProperties,
} from "react";
import PageSectionHeader from "./PageSectionHeader";
import PageSectionFooter from "./PageSectionFooter";
import "./style.css";

interface Props {
  style?: CSSProperties;
  className?: string;
}

function separateChildren(children: ReactNode[]): {
  header: ReactNode[];
  footer: ReactNode[];
  body: ReactNode[];
} {
  const header: ReactNode[] = [];
  const footer: ReactNode[] = [];
  const body: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === PageSectionHeader) {
        header.push(child);
      } else if (child.type === PageSectionFooter) {
        footer.push(child);
      } else {
        body.push(child);
      }
    } else {
      body.push(child);
    }
  });

  return { header, footer, body };
}

export const PageSection: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  style,
  className,
}) => {
  const validChildren = Children.toArray(children);
  const { header, footer, body } = separateChildren(validChildren);
  const mergedClassName = className
    ? `page-section ${className}`
    : "page-section";

  return (
    <div className={mergedClassName} style={style}>
      {header}
      <div className="page-section-body">{body}</div>
      {footer}
    </div>
  );
};
