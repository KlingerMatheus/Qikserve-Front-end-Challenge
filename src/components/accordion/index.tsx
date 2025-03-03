import { ChevronUpIcon } from "@/assets/icons";
import { FunctionComponent, PropsWithChildren } from "react";
import "./style.css";

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
