import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const ShieldIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 21}
      height={(18 / 21) * (props.size || 18)}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.98457 19.6061C8.98457 19.6061 16.6566 17.2831 16.6566 10.8791C16.6566 4.47412 16.9346 3.97412 16.3196 3.35812C15.7036 2.74212 9.99057 0.750122 8.98457 0.750122C7.97857 0.750122 2.26557 2.74212 1.65057 3.35812C1.03457 3.97412 1.31257 4.47412 1.31257 10.8791C1.31257 17.2831 8.98457 19.6061 8.98457 19.6061Z"
        stroke={props.color || "#222222"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.38599 9.87475L8.27799 11.7698L12.176 7.86975"
        stroke={props.color || "#222222"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
