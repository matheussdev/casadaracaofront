import React from "react";
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const NotificationIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 20}
      height={(22 / 20) * (props.size || 22)}
      viewBox="0 0 20 22"
      fill="none"
    >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 16.8478C15.6392 16.8478 18.2481 16.1243 18.5 13.2206C18.5 10.3189 16.6812 10.5055 16.6812 6.94523C16.6812 4.16426 14.0452 1.00012 10 1.00012C5.95477 1.00012 3.31885 4.16426 3.31885 6.94523C3.31885 10.5055 1.5 10.3189 1.5 13.2206C1.75295 16.1353 4.36177 16.8478 10 16.8478Z"
          stroke={props.color || "#222222"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.3889 19.8573C11.0247 21.372 8.89672 21.39 7.51953 19.8573"
          stroke={props.color || "#222222"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
  );
};
