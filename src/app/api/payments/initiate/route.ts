import { NextResponse } from "next/server";
import crypto from "crypto";
import { Buffer } from "buffer";

export const runtime = "nodejs"; // Ensure Node.js runtime

export async function POST(req: Request) {
  try {
    const { transactionId, amount, contact, email, name } = await req.json();

    // Validate input
    if (!transactionId || !amount || !contact || !email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create payload
    const payload = {
      merchantId: process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: contact,
      amount: amount, // Amount in paise (e.g., ₹100 = 10000 paise)
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/callback`,
      redirectMode: "POST",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/callback`,
      mobileNumber: contact,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    // Convert payload to base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    // Generate X-VERIFY header
    const salt = process.env.PHONEPE_SALT_KEY!;
    const stringToHash = base64Payload + "/pg/v1/pay" + salt;
    const sha256Hash = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest("hex");
    const xVerify = sha256Hash + "###" + process.env.PHONEPE_KEY_INDEX;

    // Send request to PhonePe API
    const response = await fetch(
      "https://api.phonepe.com/apis/hermes/pg/v1/pay", // Production endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
        },
        body: JSON.stringify({ request: base64Payload }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("PhonePe API Error:", data);
      return NextResponse.json(
        { error: "Payment initiation failed", details: data },
        { status: 500 }
      );
    }

    // Return payment URL
    return NextResponse.json({ url: data.data.instrumentResponse.redirectInfo.url });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}