import { ButtonHTMLAttributes, FunctionComponent, JSX } from "react";

import "./primary-button.css";

interface Props {
  label: string;
  startIcon?: JSX.Element;
  onClick: () => void;
}

type PrimaryButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
  startIcon,
  label,
  onClick,
  ...rest
}) => {
  return (
    <button onClick={onClick} {...rest}>
      {startIcon}
      {label}
    </button>
  );
};
