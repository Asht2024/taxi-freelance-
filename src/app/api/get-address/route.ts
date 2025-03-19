import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = await request.json();
    console.log("Received coords:", latitude, longitude);

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Missing coordinates" },
        { status: 400 }
      );
    }

    const API_KEY = 'AIzaSyBv0kNWVgU4H3dHz67CuQppiMS5-opfVWI';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" || !data.results.length) {
      return NextResponse.json(
        { error: "No address found" },
        { status: 404 }
      );
    }

    // Extract city from address components
    const cityComponent = data.results?.[0]?.address_components?.find(
        (component: { types: string[] }) => component.types.includes("locality")
      );
      

    return NextResponse.json({
      address: data.results[0].formatted_address,
      city: cityComponent?.long_name || "Unknown City",
      lat: latitude,
      lng: longitude,
    });
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
