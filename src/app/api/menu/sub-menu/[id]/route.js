import { NextResponse } from "next/server";

function extractLevelTwoMenus(menuData) {
    return menuData.flatMap((menu) => menu.subMenu || []);
}

export async function GET(req, { params }) {
    try {
        if (!params?.id) {
            return NextResponse.json(
                { error: "Missing ID parameter" },
                { status: 400 }
            );
        }

        const { id } = params;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}menu/sub-menu/${id}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch sub menu" },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            ...data,
            data: extractLevelTwoMenus(data.data),
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
