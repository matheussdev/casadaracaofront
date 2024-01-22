import React from "react";
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const UsersIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 22}
      height={(18 / 22) * (props.size || 18)}
      viewBox="0 0 22 18"
      fill="none"
    >
      <path
        d="M16.8877 7.89679C18.2827 7.70079 19.3567 6.50479 19.3597 5.05579C19.3597 3.62779 18.3187 2.44379 16.9537 2.21979"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7285 11.2504C20.0795 11.4524 21.0225 11.9254 21.0225 12.9004C21.0225 13.5714 20.5785 14.0074 19.8605 14.2814"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8867 11.6639C7.67273 11.6639 4.92773 12.1509 4.92773 14.0959C4.92773 16.0399 7.65573 16.5409 10.8867 16.5409C14.1007 16.5409 16.8447 16.0589 16.8447 14.1129C16.8447 12.1669 14.1177 11.6639 10.8867 11.6639Z"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8867 8.888C12.9957 8.888 14.7057 7.179 14.7057 5.069C14.7057 2.96 12.9957 1.25 10.8867 1.25C8.77766 1.25 7.06766 2.96 7.06766 5.069C7.05966 7.171 8.75666 8.881 10.8587 8.888H10.8867Z"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.88472 7.89679C3.48872 7.70079 2.41572 6.50479 2.41272 5.05579C2.41272 3.62779 3.45372 2.44379 4.81872 2.21979"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.04388 11.2504C1.69288 11.4524 0.749878 11.9254 0.749878 12.9004C0.749878 13.5714 1.19388 14.0074 1.91188 14.2814"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
