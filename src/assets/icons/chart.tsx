import React from "react";
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const ChartIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 24}
      height={(24 / 24) * (props.size || 24)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.37145 9.20184V16.062"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0382 5.91925V16.062"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6285 12.827V16.062"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6857 1.00012H6.31429C3.04762 1.00012 1 3.31221 1 6.58528V15.415C1 18.688 3.0381 21.0001 6.31429 21.0001H15.6857C18.9619 21.0001 21 18.688 21 15.415V6.58528C21 3.31221 18.9619 1.00012 15.6857 1.00012Z"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
