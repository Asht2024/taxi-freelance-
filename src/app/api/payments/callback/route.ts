import { NextResponse } from "next/server";
import crypto from "crypto";
import { Buffer } from "buffer";

export const runtime = "nodejs"; // Ensure Node.js runtime

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const salt = process.env.PHONEPE_SALT_KEY!;
    const xVerify = req.headers.get("X-VERIFY")!;

    // Verify checksum
    const checksum = crypto
      .createHash("sha256")
      .update(`${body.response}${salt}`)
      .digest("hex");
    const expectedVerify = `${checksum}###${process.env.PHONEPE_KEY_INDEX}`;
    if (xVerify !== expectedVerify) {
      return NextResponse.json({ error: "Invalid checksum" }, { status: 400 });
    }

    // Decode response
    const decodedResponse = JSON.parse(
      Buffer.from(body.response, "base64").toString("utf-8")
    );

    // Handle payment status
    const redirectURL =
      decodedResponse.code === "PAYMENT_SUCCESS"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`;

    // Use 303 See Other to force a GET request
    return NextResponse.redirect(redirectURL, 303);
  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      303
    );
  }
}