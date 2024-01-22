import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const FilterIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 20}
      height={(20 / 20) * (props.size || 20)}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.56517 1.00012C1.70108 1.00012 1 1.71299 1 2.59052V3.52656C1 4.17659 1.24719 4.8017 1.68936 5.27189L6.5351 10.4244L6.53723 10.4212C7.47271 11.3789 7.99905 12.6735 7.99905 14.0234V18.5953C7.99905 18.9008 8.31869 19.0958 8.58399 18.9517L11.3436 17.448C11.7602 17.2205 12.0201 16.7785 12.0201 16.2985V14.0115C12.0201 12.6692 12.539 11.38 13.466 10.4244L18.3117 5.27189C18.7528 4.8017 19 4.17659 19 3.52656V2.59052C19 1.71299 18.3 1.00012 17.4359 1.00012H2.56517Z"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
