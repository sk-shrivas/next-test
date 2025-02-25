import React from "react";

export default function FolderIcon({
    width = "24",
    height = "24",
    fill = "#000",
    opacity = ''
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width={width} fiheight={height} fill={fill}><path d="M21,18c0,0.6-0.4,1-1,1H4c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h5.6l2,2H20c0.6,0,1,0.4,1,1V18z" opacity={opacity}/><path d="M20,20H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h6l2,2h8c1.1,0,2,0.9,2,2v10C22,19.1,21.1,20,20,20z M4,6v12h16V8h-8.8l-2-2H4z"/></svg>
    );
}
