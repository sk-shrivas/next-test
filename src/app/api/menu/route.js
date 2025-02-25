import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}menu`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch menu" },
                { status: 500 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
