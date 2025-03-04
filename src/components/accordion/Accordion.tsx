import { FunctionComponent, PropsWithChildren } from "react";

import { ChevronUpIcon } from "@/assets/icons";

import "./accordion.css";

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
