import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sensible length limits (anti-spam)
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message payload too large' },
        { status: 400 }
      );
    }

    // The sender email should ideally be a verified domain on Resend (e.g. notifications@yourdomain.com)
    // If CONTACT_FROM_EMAIL is not set, we default to a generic onboarding address for Resend testing,
    // though in production it requires a verified domain.
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    // Send the email
    const data = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: ['kartikphulwari01@gmail.com'],
      replyTo: email,
      subject: `Portfolio Contact — ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nTime: ${new Date().toISOString()}\n\nMessage:\n${message.trim()}`
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { error: 'Failed to send email via Resend' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
