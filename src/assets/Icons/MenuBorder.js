import React from "react";

export default function MenuBorder({
  width = "24",
  height = "24",
  fill = "#667085",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.65625"
        y="3.66992"
        width="6.69214"
        height="6.69336"
        rx="1"
        stroke={fill}
      />
      <rect
        x="3.65625"
        y="13.6523"
        width="6.69214"
        height="6.69336"
        rx="1"
        stroke={fill}
      />
      <rect
        x="13.6539"
        y="13.6523"
        width="6.69214"
        height="6.69336"
        rx="1"
        stroke={fill}
      />
      <circle cx="16.9871" cy="7.04102" r="3.69067" stroke={fill} />
    </svg>
  );
}
