import { SVGAttributes } from "react";

const MenuIcon = (props: SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}
  >
    <g clipPath="url(#clip0_15459_2577)">
      <rect width="16" height="2" rx="1" fill="currentColor" />
      <rect y="7" width="16" height="2" rx="1" fill="currentColor" />
      <rect y="14" width="16" height="2" rx="1" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_15459_2577">
        <rect width="16" height="16" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);

export default MenuIcon;
