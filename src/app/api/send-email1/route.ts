// src/app/api/send-email1/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, tripData } = await request.json();

    // 1. Environment variables validation
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.error('Missing email configuration in environment variables');
      return NextResponse.json(
        { error: 'Server email configuration error' },
        { status: 500 }
      );
    }

    // 2. Data validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (
      !tripData?.carDetails?.model ||
      !tripData?.rentalPackage?.hours ||
      typeof tripData?.totalPrice !== 'number'
    ) {
      console.error('Invalid tripData structure:', tripData);
      return NextResponse.json(
        { error: 'Invalid trip data format' },
        { status: 400 }
      );
    }

    // 3. Configure transporter with TypeScript typing
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 4. Configure email templates with fallbacks
    const userMailOptions = {
      from: `Taxi Service <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'आपकी बुकिंग पुष्टि हुई है ✅',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">बुकिंग सफल! 🎉</h2>
          <p>नमस्ते ${name || 'ग्राहक'},</p>
          <p>आपकी बुकिंग सफलतापूर्वक पंजीकृत की गई है। यहां आपकी यात्रा का विवरण है:</p>
          
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
            <h3 style="color: #3b82f6;">कार का विवरण</h3>
            <p>मॉडल: ${tripData.carDetails.model || 'N/A'}</p>
            
            <h3 style="color: #3b82f6; margin-top: 1rem;">पैकेज</h3>
            <p>समय: ${tripData.rentalPackage.hours} घंटे</p>
            <p>दूरी: ${tripData.rentalPackage.km || 0} किमी</p>
            
            <h3 style="color: #3b82f6; margin-top: 1rem;">भुगतान</h3>
            <p>कुल राशि: ₹${tripData.totalPrice.toLocaleString('en-IN')}</p>
          </div>

          <p style="margin-top: 1.5rem;">हमें चुनने के लिए धन्यवाद! 🚕</p>
        </div>
      `
    };

    const adminMailOptions = {
      from: `Taxi Service <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `नई बुकिंग - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #ef4444;">नई बुकिंग प्राप्त हुई 🔔</h2>
          <p><strong>ग्राहक:</strong> ${name} (${email})</p>
          
          <h3 style="color: #3b82f6;">यात्रा विवरण</h3>
          <pre style="
            background: #f3f4f6;
            padding: 1rem;
            border-radius: 0.5rem;
            white-space: pre-wrap;
          ">
${JSON.stringify(tripData, null, 2)}
          </pre>
        </div>
      `
    };

    // 5. Send emails with error handling
    const userResult = await transporter.sendMail(userMailOptions);
    console.log('User email sent:', userResult.messageId);

    const adminResult = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent:', adminResult.messageId);

    return NextResponse.json({ 
      success: true,
      message: 'Both emails sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send emails',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}