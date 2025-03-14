// app/api/places/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');
  const type = searchParams.get('type');

  if (!input) {
    return NextResponse.json(
      { error: 'Missing input parameter' },
      { status: 400 }
    );
  }

  const API_KEY = 'AIzaSyBv0kNWVgU4H3dHz67CuQppiMS5-opfVWI';
  const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  const url = `${endpoint}?input=${encodeURIComponent(input)}&key=${API_KEY}&types=${type || 'geocode'}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Google Places API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}