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

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content for admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Your email address
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

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}