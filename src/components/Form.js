import React from "react";

export default function Form({
    selectedSubMenu,
    addMenus,
    menuPayload,
    handleChange,
    addMensAndSubMenu,
}) {
    return (
        <div className="w-full lg:max-w-[calc(100%_-_350px)] xl:max-w-[calc(100%_-_450px)] pt-[20px] md:pl-[20px] lg:pl-[40px] xl:pl-[80px] lg:pt-[40px] xl:pt-[80px]">
            <div className="max-w-[500px]">
                <div className="mb-[25px] pb-2">
                    <label className="text-[14px] text-[#475467] block mb-1">
                        Menu ID
                    </label>
                    <input
                        disabled
                        type="text"
                        defaultValue={selectedSubMenu.id}
                        placeholder="Enter menu id"
                        className="bg-[#F9FAFB] text-[#667085] rounded-[16px] placeholder:text-[667085]/60 w-full p-[12px_25px] outline-none shadow-none"
                    />
                </div>
                <div className="mb-[25px] pb-2">
                    <label className="text-[14px] text-[#475467] block mb-1">
                        Depth
                    </label>
                    <input
                        disabled
                        type="text"
                        placeholder="3"
                        defaultValue={selectedSubMenu.depth || 0}
                        className="bg-[#F9FAFB] text-[#667085] rounded-[16px] placeholder:text-[667085]/60 w-full p-[12px_25px] outline-none shadow-none disabled:cursor-not-allowed disabled:bg-[#EAECF0]"
                    />
                </div>

                <div className="mb-[25px] pb-2">
                    <label className="text-[14px] text-[#475467] block mb-1">
                        Parent Data
                    </label>
                    <input
                        type="text"
                        disabled
                        placeholder="Enter submenu"
                        defaultValue={selectedSubMenu.parentName}
                        className="bg-[#F9FAFB] text-[#667085] rounded-[16px] placeholder:text-[667085]/60 w-full p-[12px_25px] outline-none shadow-none"
                    />
                </div>
                <div className="mb-[25px] pb-2">
                    <label className="text-[14px] text-[#475467] block mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter submenu"
                        value={menuPayload?.name || ""}
                        className="bg-[#F9FAFB] text-[#667085] rounded-[16px] placeholder:text-[667085]/60 w-full p-[12px_25px] outline-none shadow-none"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-[#253BFF] outline-none shadow-none text-[14px] text-white capitalize w-full p-[12px_35px] text-center rounded-full"
                        onClick={() => addMensAndSubMenu(menuPayload)}>
                        {addMenus}
                    </button>
                </div>
            </div>
        </div>
    );
}
