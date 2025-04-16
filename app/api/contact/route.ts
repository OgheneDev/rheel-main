import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, country, email, phone } = body;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "hello@rheelestate.com",
      subject: "New Mailing List Subscription",
      text: `
        Contact Information:
        Name: ${firstName} ${lastName}
        Country: ${country}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
       `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
