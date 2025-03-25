// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    if (email === 'aadeshconsultancy2@gmail.com') {
      // Admin email: return all bookings
      const allBookings = await prisma.booking.findMany({
        include: { user: true }, // Include user details if needed
      });
      return NextResponse.json(allBookings);
    } else {
      // Regular user: return only their bookings
      const user = await prisma.user.findUnique({
        where: { email },
        include: { bookings: true },
      });

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user.bookings);
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}