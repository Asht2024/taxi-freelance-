import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const { lat1, lng1, lat2, lng2 } = await req.json();
        const GOOGLE_MAPS_API_KEY = 'AIzaSyBv0kNWVgU4H3dHz67CuQppiMS5-opfVWI';

        if (!lat1 || !lng1 || !lat2 || !lng2) {
            return NextResponse.json({ success: false, message: "All coordinates are required" }, { status: 400 });
        }

        const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

        const requestBody = {
            origin: { location: { latLng: { latitude: parseFloat(lat1), longitude: parseFloat(lng1) } } },
            destination: { location: { latLng: { latitude: parseFloat(lat2), longitude: parseFloat(lng2) } } },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_AWARE",
            computeAlternativeRoutes: false,
            languageCode: "en-US",
            units: "METRIC",
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
                "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
            return NextResponse.json({ success: false, message: "No route found" }, { status: 400 });
        }

        const distanceKm = data.routes[0].distanceMeters / 1000; // Convert meters to kilometers
        const duration = data.routes[0].duration;

        return NextResponse.json({
            success: true,
            distance: distanceKm, // Now returning distance as a number (not string)
            duration: duration,
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error", error: error }, { status: 500 });
    }
}
