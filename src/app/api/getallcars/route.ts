import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cars = await prisma.car.findMany();
    return NextResponse.json({ success: true, data: cars }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
