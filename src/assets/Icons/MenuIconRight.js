import React from "react";

export default function MenuIconRight({
  width = "24",
  height = "24",
  fill = "#fff",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7H12.5M4 12H14.5M4 17H12.5"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 8.5L20 12L16.5 15.5"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
