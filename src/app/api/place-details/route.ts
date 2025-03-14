// app/api/place-details/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('place_id');

  if (!placeId) {
    return NextResponse.json(
      { error: 'Missing place_id parameter' },
      { status: 400 }
    );
  }

  const API_KEY = 'AIzaSyBv0kNWVgU4H3dHz67CuQppiMS5-opfVWI';
  const endpoint = `https://maps.googleapis.com/maps/api/place/details/json`;
  const url = `${endpoint}?place_id=${placeId}&key=${API_KEY}&fields=name,formatted_address,geometry,address_components`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Google Place Details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place details' },
      { status: 500 }
    );
  }
}