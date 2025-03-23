import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const lat = searchParams.get("lat")
        const lon = searchParams.get("lon")

        if (!lat || !lon) {
            return NextResponse.json(
                { error: "Latitude and Longitude required" },
                { status: 400 }
            )
        }

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: "restaurant",
                    format: "json",
                    lat,
                    lon,
                    radius: 5000,
                },
                headers: {
                    "User-Agent": "foodInquiryApp/1.0", // Required by Nominatim
                },
            }
        )

        return NextResponse.json(response.data, { status: 200 })
        
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch restaurants" },
            { status: 500 }
        )
    }
}
