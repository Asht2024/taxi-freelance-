// app/api/booking/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { userId, carName, amount, paymentStatus, tripData, costomername,
    costomemail,
    costomercontact,
    paid, } = await req.json();

  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        carName,
        amount,
        paymentStatus,
        tripData,
        costomername,
        costomemail,
        costomercontact,
        paid,
      },
    });
    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create booking",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
