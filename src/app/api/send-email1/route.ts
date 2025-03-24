import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  name: string;
  email: string;
  tripData: {
    pickupLocation: string;
    dropoffLocation: string;
    date: string;
    time: string;
    distance?: string;
    duration?: string;
    carType?: string;
  };
}

export async function POST(request: Request) {
  try {
    const { name, email, tripData }: EmailRequestBody = await request.json();

    // Log received data for debugging
    console.log('Email request data:', { name, email, tripData });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOSTINGER_EMAIL!,
        pass: process.env.HOSTINGER_PASS!,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: `"Asht Cab Services" <${process.env.HOSTINGER_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Booking Confirmation from ${name}`,
      html: `
        <h2 style="color: #2563eb;">New Booking Received</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3 style="color: #374151; margin-top: 20px;">Trip Details:</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Pickup Location:</strong> ${tripData.pickupLocation}</li>
          <li><strong>Dropoff Location:</strong> ${tripData.dropoffLocation}</li>
          <li><strong>Date:</strong> ${tripData.date}</li>
          <li><strong>Time:</strong> ${tripData.time}</li>
          ${tripData.distance ? `<li><strong>Distance:</strong> ${tripData.distance}</li>` : ''}
          ${tripData.duration ? `<li><strong>Duration:</strong> ${tripData.duration}</li>` : ''}
          ${tripData.carType ? `<li><strong>Service Type:</strong> ${tripData.carType}</li>` : ''}
        </ul>
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280;">This booking was made through the website</p>
      `,
    };

    // Email to user
    const userMailOptions = {
      from: `"Asht Cab Services" <${process.env.HOSTINGER_EMAIL}>`,
      to: email,
      subject: 'Booking Confirmed - Asht Cab Services',
      html: `
        <h2 style="color: #2563eb;">Thank you for your booking, ${name}!</h2>
        <p style="font-size: 16px; color: #374151;">Your trip details:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
          <p><strong>Pickup Location:</strong> ${tripData.pickupLocation}</p>
          <p><strong>Dropoff Location:</strong> ${tripData.dropoffLocation}</p>
          <p><strong>Date:</strong> ${tripData.date}</p>
          <p><strong>Time:</strong> ${tripData.time}</p>
          ${tripData.distance ? `<p><strong>Distance:</strong> ${tripData.distance}</p>` : ''}
          ${tripData.duration ? `<p><strong>Duration:</strong> ${tripData.duration}</p>` : ''}
          ${tripData.carType ? `<p><strong>Service Type:</strong> ${tripData.carType}</p>` : ''}
        </div>
        <p style="margin-top: 20px; color: #374151;">
          Need help? Contact us at ${process.env.HOSTINGER_EMAIL} or call +91-XXXXXXX
        </p>
        <p style="color: #6b7280; margin-top: 30px;">
          Safe travels with Asht Cab Services!
        </p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: 'Confirmation emails sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation emails. Please try again later.' },
      { status: 500 }
    );
  }
}