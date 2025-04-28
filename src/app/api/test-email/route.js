import nodemailer from 'nodemailer';

export async function GET() {
  return sendTestEmail();
}

export async function POST() {
  return sendTestEmail();
}

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: '"Test From Next.js" <yashveersingh7648@gmail.com>',
      to: 'yashveersingh7648@gmail.com',
      subject: 'Test Email from Next.js API',
      text: 'This is a test email sent via Next.js API route',
      html: '<b>This is a test email sent via Next.js API route</b>'
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    }), {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {'Content-Type': 'application/json'}
    });
  }
}