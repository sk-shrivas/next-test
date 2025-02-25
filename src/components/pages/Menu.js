"use client";
import Arrow from "@/assets/Icons/Arrow";
import Delete from "@/assets/Icons/Delete";
import Edit from "@/assets/Icons/Edit";
import FolderBg from "@/assets/Icons/FolderBg";
import MenuBg from "@/assets/Icons/MenuBg";
import Plus from "@/assets/Icons/Plus";
import Form from "@/components/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    findMenus,
    findSubMenus,
    findSubMenusById,
} from "../../../store/Action/Menu/menu";

export default function Menu() {
    const dispatch = useDispatch();
    const { menus, subMenus } = useSelector((state) => state.menus);

    const [expandedItems, setExpandedItems] = useState({});
    const [addMenus, setAddMenus] = useState("");
    const [selectedSubMenu, setSelectedSubMenu] = useState({});

    const [selectedMenu, setSelectedMenu] = useState("");
    const [menuPayload, setMenuPayload] = useState({});

    const getSubMenus = async (id) => {
        dispatch(findSubMenus(id));
    };
    const getMenus = async () => {
        dispatch(findMenus());
    };

    const getMenuByParentId = async (id) => {
        try {
            const response = await fetch(`/api/menu/parent/${id}`);
            const { data } = await response.json();
            return data;
        } catch {
            return {};
        }
    };

    useEffect(() => {
        getMenus();
    }, []);

    useEffect(() => {
        if (menus?.length > 0 && selectedMenu === "") {
            handleSelectChange(menus[0]?.id);
        }
    }, [menus]);

    const traverse = (items, allExpanded, value) => {
        items?.forEach((item) => {
            allExpanded[item.id] = value;
            if (item.subMenu.length) traverse(item.subMenu, allExpanded, value);
        });
    };

    const toggleItem = (id, subMenu) => {
        const allExpanded = {};
        if (subMenu) {
            traverse(subMenu, allExpanded, false);
        }
        setExpandedItems((prev) => ({
            ...prev,
            ...allExpanded,
            [id]: !prev[id],
        }));
    };

    const expandAll = () => {
        const allExpanded = {};
        traverse(subMenus, allExpanded, true);
        setExpandedItems(allExpanded);
    };

    const collapseAll = () => {
        setExpandedItems({});
    };
    const handleSubMenuEvent = async (eventType, item) => {
        setMenuPayload({});
        setAddMenus(eventType);
        let data = {};
        if (item.parentId) {
            data = await getMenuByParentId(item.parentId);
        }
        if (eventType === "Update" || eventType === "Delete") {
            setMenuPayload({ name: item?.name, id: item?.id });
            setSelectedSubMenu({
                parentName: data?.name,
                ...item,
            });
        } else {
            setSelectedSubMenu({
                parentName: item.parentId
                    ? item.name
                    : eventType === "Save"
                    ? item.name
                    : "",
                ...item,
            });
        }
    };

    const addMensAndSubMenu = async (payload) => {
        if (addMenus === "Save" || addMenus === "Add Menu") {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}menu`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
        } else if (addMenus === "Update") {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}menu/${payload?.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
        } else {
            if (addMenus === "Delete") {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}menu/${payload?.id}`,
                    {
                        method: "DELETE",
                    }
                );
            }
            if (selectedSubMenu.parentId === null) {
                setSelectedMenu("");
            }
        }

        getMenus();
        if (
            selectedMenu &&
            (addMenus !== "Delete" || selectedSubMenu.parentId !== null)
        ) {
            getSubMenus(selectedMenu);
            dispatch(findSubMenusById(selectedMenu));
        }
        setMenuPayload({});
        setAddMenus("");
        setSelectedSubMenu({});
    };

    const handleChange = (value) => {
        if (addMenus === "Save") {
            setMenuPayload({
                depth: selectedSubMenu?.depth + 1,
                parentId: selectedSubMenu.id,
            });
        }
        setMenuPayload((pre) => {
            return { ...pre, name: value };
        });
    };

    const handleSelectChange = (value) => {
        getSubMenus(value);
        setSelectedMenu(value);
        dispatch(findSubMenusById(value));
        collapseAll();
        setMenuPayload({});
        setAddMenus("");
        setSelectedSubMenu({});
    };

    const renderMenu = (data) => {
        return (
            <>
                {data?.map((item) => (
                    <li
                        key={item?.id}
                        className={expandedItems[item.id] ? "expanded" : ""}>
                        <div
                            className={`flex gap-1 relative group whitespace-nowrap`}>
                            {item?.subMenu?.length > 0 && (
                                <div
                                    onClick={() => {
                                        item?.subMenu?.length > 0 &&
                                            toggleItem(item.id, item.subMenu);
                                    }}
                                    className={`relative transition-all duration-300 cursor-pointer ${
                                        expandedItems[item.id]
                                            ? ""
                                            : "-rotate-90"
                                    }`}>
                                    <Arrow fill="#101828" />
                                </div>
                            )}
                            {item?.name}
                            <div className="opacity-0 transition-all duration-150 group-hover:opacity-100 flex items-center gap-2">
                                <button
                                    className="bg-blue-600 rounded-full p-[2px] h-[24px] w-[24px] flex items-center justify-center ml-auto"
                                    onClick={() => {
                                        handleSubMenuEvent("Save", item);
                                    }}>
                                    <Plus fill="#fff" width="20" height="20" />
                                </button>
                                <button
                                    className="bg-gray-600 rounded-full p-[4px] h-[24px] w-[24px] flex items-center justify-center ml-auto"
                                    onClick={() => {
                                        handleSubMenuEvent("Update", item);
                                    }}>
                                    <Edit fill="#fff" width="14" height="14" />
                                </button>
                                <button
                                    className="bg-red-600 rounded-full p-[4px] h-[24px] w-[24px] flex items-center justify-center ml-auto"
                                    onClick={() => {
                                        handleSubMenuEvent("Delete", item);
                                    }}>
                                    <Delete
                                        fill="#fff"
                                        width="18"
                                        height="18"
                                    />
                                </button>
                            </div>
                        </div>
                        {expandedItems[item.id] && (
                            <ul>{renderMenu(item?.subMenu)}</ul>
                        )}
                    </li>
                ))}
            </>
        );
    };
    return (
        <>
            <div className="flex items-center gap-x-[8px] py-[25px]">
                <FolderBg fill="#e1e1e2" />
                <span>/</span>
                <p className="capitalize text-[#101828] text-[14px]">Menus</p>
            </div>

            <div className="flex items-center gap-x-[16px] py-[20px] lg:max-w-[350px] xl:max-w-[450px]">
                <button className="bg-blue-600 rounded-full p-2 h-[52px] w-[52px] flex items-center justify-center">
                    <MenuBg fill="#fff" width="24" height="24" />
                </button>
                <h1 className="capitalize text-[#101828] text-[32px] font-extrabold">
                    Menus
                </h1>
                <button
                    className="bg-blue-600 rounded-full p-2 h-[52px] w-[52px] flex items-center justify-center ml-auto"
                    onClick={() => {
                        handleSubMenuEvent("Add Menu", {});
                    }}>
                    <Plus fill="#fff" width="30" height="30" />
                </button>
            </div>

            <div className="flex flex-wrap">
                <div className="lg:max-w-[350px] xl:max-w-[450px] w-full">
                    <div className="mb-5">
                        <h3 className="capitalize text-[#475467]">Menus</h3>
                        <select
                            className="bg-[#F9FAFB] text-[#101828] text-[16px] rounded-[16px] outline-none shadow-none block w-full capitalize"
                            defaultValue={selectedMenu}
                            onChange={(e) => {
                                handleSelectChange(e.target.value);
                            }}>
                            {menus?.map((item) => (
                                <option key={item.id} value={item?.id}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={expandAll}
                            type="button"
                            className={`py-3 px-[32px] border rounded-full text-[14px] font-bold ${
                                Object.keys(expandedItems).length > 0
                                    ? "text-white bg-[#1D2939] border-[#1D2939]"
                                    : "text-[#475467] bg-white border-[#D0D5DD]"
                            }`}>
                            Expand All
                        </button>
                        <button
                            type="button"
                            onClick={collapseAll}
                            className={`py-3 px-[32px] border rounded-full text-[14px] font-bold ${
                                Object.keys(expandedItems).length === 0
                                    ? "text-white bg-[#1D2939] border-[#1D2939]"
                                    : "text-[#475467] bg-white border-[#D0D5DD]"
                            }`}>
                            Collapse All
                        </button>
                    </div>

                    <div className="menu-listing">
                        <ul className="first">{renderMenu(subMenus)}</ul>
                    </div>
                </div>
                {addMenus && (
                    <Form
                        selectedSubMenu={selectedSubMenu}
                        addMenus={addMenus}
                        menuPayload={menuPayload}
                        handleChange={handleChange}
                        addMensAndSubMenu={addMensAndSubMenu}
                    />
                )}
            </div>
        </>
    );
}
