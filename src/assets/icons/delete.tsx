import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
export const DeleteIcon = (props: IconProps) => {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconly/Regular/Light/Delete">
        <g id="Delete">
          <path
            id="Stroke 1"
            d="M19.325 9.46832C19.325 9.46832 18.782 16.2033 18.467 19.0403C18.317 20.3953 17.48 21.1893 16.109 21.2143C13.5 21.2613 10.888 21.2643 8.28003 21.2093C6.96103 21.1823 6.13803 20.3783 5.99103 19.0473C5.67403 16.1853 5.13403 9.46832 5.13403 9.46832"
            stroke={props.color || "#222222"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Stroke 3"
            d="M20.7082 6.23981H3.75024"
            stroke={props.color || "#222222"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Stroke 5"
            d="M17.4406 6.23979C16.6556 6.23979 15.9796 5.68479 15.8256 4.91579L15.5826 3.69979C15.4326 3.13879 14.9246 2.75079 14.3456 2.75079H10.1126C9.53358 2.75079 9.02558 3.13879 8.87558 3.69979L8.63258 4.91579C8.47858 5.68479 7.80258 6.23979 7.01758 6.23979"
            stroke={props.color || "#222222"}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
