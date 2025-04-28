// import nodemailer from "nodemailer";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return Response.json({ message: "Missing email or password" }, { status: 400 });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your Login Details",
//       html: `<p><strong>Email:</strong> ${email}</p><p><strong>Password:</strong> ${password}</p>`,
//     });

//     return Response.json({ message: "Email sent successfully!" });
//   } catch (err) {
//     console.error("Email send error:", err);
//     return Response.json({ message: "Failed to send email" }, { status: 500 });
//   }
// }




import nodemailer from "nodemailer";
import connectMongo from '@/app/lib/mongodb.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '@/models/User';

export async function POST(req) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, message: "Email and password are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await connectMongo();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log password values for debugging
    console.log("Entered password:", password);
    console.log("Stored hashed password:", user.password);

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create JWT token with user data
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send login notification email (without sensitive data)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `Your App <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Successful Login Notification",
        html: `
          <p>Hello ${user.name || 'there'},</p>
          <p>You've successfully logged in to your account at ${new Date().toLocaleString()}.</p>
          <p>If this wasn't you, please secure your account immediately.</p>
          <p><strong>Note:</strong> For security reasons, we never include your password in these emails.</p>
        `,
      });
    } catch (emailError) {
      console.error("Email notification error:", emailError);
      // Continue with login even if email fails
    }

    // Return success response with token and user data
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
