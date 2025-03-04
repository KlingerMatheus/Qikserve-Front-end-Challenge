import { FunctionComponent, PropsWithChildren } from "react";

import "./accordion.css";
import { ChevronUpIcon } from "../../assets/icons";

interface RootProps {
  title: string;
  defaultOpen?: boolean;
}

export const Accordion: FunctionComponent<PropsWithChildren<RootProps>> = ({
  title,
  children,
  defaultOpen,
}) => {
  return (
    <details open={defaultOpen}>
      <summary>
        {title}
        <span>
          <ChevronUpIcon />
        </span>
      </summary>
      {children}
    </details>
  );
};
