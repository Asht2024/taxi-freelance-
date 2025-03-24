import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch total users
    const totalUsers = await prisma.user.count();

    // Fetch total bookings
    const totalBookings = await prisma.booking.count();

    // Fetch total earnings
    const totalEarnings = await prisma.booking.aggregate({
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json(
      {
        totalUsers,
        totalBookings,
        totalEarnings: totalEarnings._sum.amount || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
