import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "PATCH") {
    try {
      const { paymentId } = req.query;
      const { paymentStatus } = req.body;

      if (!paymentId || typeof paymentId !== "string") {
        return res.status(400).json({ error: "Invalid payment ID" });
      }

      if (!["pending", "success", "failed"].includes(paymentStatus)) {
        return res.status(400).json({ error: "Invalid payment status" });
      }

      const updatedBooking = await prisma.booking.update({
        where: { paymentId },
        data: { paymentStatus },
      });

      return res.status(200).json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return res.status(404).json({ error: "Booking not found" });
        }
      }

      return res.status(500).json({ error: "Failed to update booking" });
    }
  }

  res.setHeader("Allow", ["PATCH"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}