import React from "react";
interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const EditSquareIconIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 21}
      height={(21 / 21) * (props.size || 21)}
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M9.49224 0.789124H5.75324C2.67824 0.789124 0.750244 2.96612 0.750244 6.04812V14.3621C0.750244 17.4441 2.66924 19.6211 5.75324 19.6211H14.5772C17.6622 19.6211 19.5812 17.4441 19.5812 14.3621V10.3341"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.82763 8.92105L14.3006 1.44805C15.2316 0.518049 16.7406 0.518049 17.6716 1.44805L18.8886 2.66505C19.8196 3.59605 19.8196 5.10605 18.8886 6.03605L11.3796 13.545C10.9726 13.952 10.4206 14.181 9.84463 14.181H6.09863L6.19263 10.401C6.20663 9.84505 6.43363 9.31505 6.82763 8.92105Z"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.165 2.60266L17.731 7.16866"
        stroke={props.color || "#222222"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
