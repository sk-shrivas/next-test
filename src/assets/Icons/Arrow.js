import React from "react";

export default function Arrow({
  width = "22",
  height = "22",
  fill = "#101828",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.3335 16.6666L25.0002 33.3333L41.6668 16.6666"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
