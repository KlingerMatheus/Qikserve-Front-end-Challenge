import { SVGAttributes } from "react";

const LeftArrowIcon = (props: SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9732 6.08204H3.50393L8.51468 1.5799C8.91513 1.2201 8.91513 0.629654 8.51468 0.269852C8.11423 -0.0899506 7.46735 -0.0899506 7.0669 0.269852L0.300337 6.34959C-0.100112 6.70939 -0.100112 7.29061 0.300337 7.65041L7.0669 13.7301C7.46735 14.09 8.11423 14.09 8.51468 13.7301C8.91513 13.3703 8.91513 12.7891 8.51468 12.4293L3.50393 7.92718H14.9732C15.5379 7.92718 16 7.51203 16 7.00461C16 6.4972 15.5379 6.08204 14.9732 6.08204Z"
      fill="currentColor"
    />
  </svg>
);

export default LeftArrowIcon;
