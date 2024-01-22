import React from "react";
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const LeftIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 10}
      height={(16 / 10) * (props.size || 16)}
      viewBox="0 0 10 16"
      fill="none"
    >
      <path
        d="M8.5 15.0001L1.5 8.00012L8.5 1.00012"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
