import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const WalletIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 21}
      height={(20 / 21) * (props.size || 20)}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8886 12.8957H15.8406C13.9436 12.8957 12.3996 11.3527 12.3986 9.45672C12.3986 7.55872 13.9426 6.01472 15.8406 6.01372H19.8886C20.3026 6.01372 20.6386 6.34972 20.6386 6.76372C20.6386 7.17772 20.3026 7.51372 19.8886 7.51372H15.8406C14.7696 7.51472 13.8986 8.38572 13.8986 9.45572C13.8986 10.5247 14.7706 11.3957 15.8406 11.3957H19.8886C20.3026 11.3957 20.6386 11.7317 20.6386 12.1457C20.6386 12.5597 20.3026 12.8957 19.8886 12.8957Z"
        fill={props.color || "#222222"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2982 10.1437H15.9862C15.5722 10.1437 15.2362 9.80772 15.2362 9.39372C15.2362 8.97972 15.5722 8.64372 15.9862 8.64372H16.2982C16.7122 8.64372 17.0482 8.97972 17.0482 9.39372C17.0482 9.80772 16.7122 10.1437 16.2982 10.1437Z"
        fill={props.color || "#222222"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.99751 1.50012C3.51751 1.50012 1.49951 3.51812 1.49951 5.99812V13.1751C1.49951 15.6551 3.51751 17.6731 5.99751 17.6731H14.6415C17.1215 17.6731 19.1385 15.6551 19.1385 13.1751V5.99812C19.1385 3.51812 17.1215 1.50012 14.6415 1.50012H5.99751ZM14.6415 19.1731H5.99751C2.69051 19.1731 -0.000488281 16.4821 -0.000488281 13.1751V5.99812C-0.000488281 2.69012 2.69051 0.00012207 5.99751 0.00012207H14.6415C17.9485 0.00012207 20.6385 2.69012 20.6385 5.99812V13.1751C20.6385 16.4821 17.9485 19.1731 14.6415 19.1731Z"
        fill={props.color || "#222222"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6845 6.03822H5.28551C4.87151 6.03822 4.53551 5.70222 4.53551 5.28822C4.53551 4.87422 4.87151 4.53822 5.28551 4.53822H10.6845C11.0985 4.53822 11.4345 4.87422 11.4345 5.28822C11.4345 5.70222 11.0985 6.03822 10.6845 6.03822Z"
        fill={props.color || "#222222"}
      />
    </svg>
  );
};
