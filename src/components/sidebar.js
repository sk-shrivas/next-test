"use client";
import FolderBg from "@/assets/Icons/FolderBg";
import FolderBorder from "@/assets/Icons/FolderBorder";
import MenuBg from "@/assets/Icons/MenuBg";
import MenuBorder from "@/assets/Icons/MenuBorder";
import MenuIcon from "@/assets/Icons/MenuIcon";
import MenuIconRight from "@/assets/Icons/MenuIconRight";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar({ isOpen, setIsOpen }) {
    const [menuOpen, setMenu] = useState("");
    const { subMenusById } = useSelector((state) => state.menus);
    const pathName = usePathname();

    const handleMenu = (activeMenu) => {
        if (activeMenu === menuOpen) {
            setMenu("");
        } else {
            setMenu(activeMenu);
        }
    };

    return (
        <>
            <button
                type="button"
                className="mt-2"
                onClick={() => setIsOpen(!isOpen)}>
                <MenuIconRight fill="#000" />
            </button>

            <aside
                className={`fixed w-[240px] z-[9999] top-[24px] h-[calc(100vh_-_48px)] bg-gray-800 rounded-[24px] transition-all duration-300 ${
                    isOpen
                        ? "-left-[500px] md:left-[24px]"
                        : "left-[24px] md:-left-[500px]"
                }`}>
                <div className="flex items-center justify-between p-[32px]">
                    <div className="max-w-[70px]">
                        <Image
                            src={"/logo.svg"}
                            height={30}
                            width={100}
                            alt=""
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
                <div className="h-[calc(100vh_-_165px)] py-2.5 px-4 overflow-y-auto">
                    <ul className="font-medium">
                        {subMenusById?.map((item, index) => (
                            <li
                                key={index}
                                className={
                                    menuOpen === item.id
                                        ? "bg-slate-700 rounded-2xl py-2"
                                        : ""
                                }>
                                <button
                                    type="button"
                                    className={`flex items-center w-full p-3 text-base font-bold hover:text-white/75 ${
                                        menuOpen === item.id
                                            ? "text-white"
                                            : "text-[#667085]"
                                    }`}
                                    onClick={() => handleMenu(item.id)}>
                                    {menuOpen === item.id ? (
                                        item.subMenu.length > 0 ? (
                                            <FolderBg fill="#fff" />
                                        ) : (
                                            <MenuBg fill="#101828" />
                                        )
                                    ) : item.subMenu.length > 0 ? (
                                        <FolderBorder fill="#475467" />
                                    ) : (
                                        <MenuBorder fill="#667085" />
                                    )}
                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                        {item.name}
                                    </span>
                                </button>
                                {menuOpen === item.id && (
                                    <ul
                                        id="dropdown-example"
                                        className={`py-2 space-y-2`}>
                                        {item.subMenu.map((subItem, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={subItem.href || "#"}
                                                    className={`flex items-center p-3 rounded-[16px] group font-bold ${
                                                        pathName ===
                                                        subItem.href
                                                            ? "text-[#101828] bg-[#9FF443]"
                                                            : "text-[#667085] hover:text-white"
                                                    }`}>
                                                    {pathName ===
                                                    subItem.href ? (
                                                        <MenuBg fill="#101828" />
                                                    ) : (
                                                        <MenuBorder fill="#667085" />
                                                    )}
                                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                                        {subItem.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}
