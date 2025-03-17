import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const salt = process.env.PHONEPE_SALT_KEY!;
    const xVerify = req.headers.get("X-VERIFY")!;

    // Verify checksum
    const checksum = CryptoJS.SHA256(`${body.response}${salt}`).toString();
    if (xVerify !== `${checksum}###${process.env.PHONEPE_KEY_INDEX}`) {
      return NextResponse.json({ error: "Invalid checksum" }, { status: 400 });
    }

    // Decode response
    const decodedResponse = JSON.parse(
      Buffer.from(body.response, "base64").toString("utf-8")
    );

    // Handle payment status
    if (decodedResponse.code === "PAYMENT_SUCCESS") {
      // Save to database or update order status
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`
    );
  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`
    );
  }
}