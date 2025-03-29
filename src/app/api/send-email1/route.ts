import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  name: string;
  email: string;
  car: string;
  estimatedfair: number;
  BookingTotal: number;
  Contact: string;
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
    const { name, email, tripData, car, estimatedfair, BookingTotal, Contact }: EmailRequestBody =
      await request.json();

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

    // Format prices
    const formattedPrice_e = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(estimatedfair);

    const formattedPrice_b = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(BookingTotal);

    const formattedPrice_r = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(estimatedfair - BookingTotal);

    // Email to admin
    const adminMailOptions = {
      from: `"Asht Cab Services" <${process.env.HOSTINGER_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Booking Confirmation from ${name}`,
      html: `
        <h2 style="color: #2563eb;">New Booking Received</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${Contact}</p>
        <p><strong>Car:</strong> ${car}</p>
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
        <h4 style="margin-top: 20px;">Pricing Summary:</h4>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Estimated Fare:</strong> ${formattedPrice_e}</li>
          <li><strong>Booking Advance:</strong> ${formattedPrice_b}</li>
          <li><strong>Remaining Amount:</strong> ${formattedPrice_r}</li>
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
        <p><strong>your Name:</strong> ${name}</p>
        <p><strong>your Email:</strong> ${email}</p>
        <p><strong>your Contact:</strong> ${Contact}</p>
        <p><strong>Car:</strong> ${car}</p>
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
        <h4 style="margin-top: 20px;">Pricing Summary:</h4>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Estimated Fare:</strong> ${formattedPrice_e}</li>
          <li><strong>Booking Advance:</strong> ${formattedPrice_b}</li>
          <li><strong>Remaining Amount:</strong> ${formattedPrice_r}</li>
        </ul>
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280;">This booking was made through the website</p>
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
