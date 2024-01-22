import React from "react";
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const MenuIcon = (props: IconProps) => {
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
        d="M10.0002 0.750214C15.1082 0.750214 19.2502 4.89121 19.2502 10.0002C19.2502 15.1082 15.1082 19.2502 10.0002 19.2502C4.89124 19.2502 0.750244 15.1082 0.750244 10.0002C0.750244 4.89221 4.89224 0.750214 10.0002 0.750214Z"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9395 10.0131H13.9485"
        stroke={props.color || "#222222"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.93044 10.0131H9.93944"
        stroke={props.color || "#222222"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.9214 10.0131H5.9304"
        stroke={props.color || "#222222"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
