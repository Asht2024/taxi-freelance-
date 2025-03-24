import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, message }: EmailRequestBody = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Configure Nodemailer with Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.HOSTINGER_EMAIL!, // example: Info@ashtcabservices.in
        pass: process.env.HOSTINGER_PASS!,   // the real password from Hostinger
      },
    });

    // Email content for admin
    const adminMailOptions = {
      from: `"Asht Cab Services" <${process.env.HOSTINGER_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!, // Your email to receive feedback
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2 style="color: #2563eb;">New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280;">This message was sent from your website contact form</p>
      `,
    };

    // Send email
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
