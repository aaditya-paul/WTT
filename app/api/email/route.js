import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  // console.log(process.env.GMAIL_PASS);
  return NextResponse.json({message: "GET request not allowed!"});
}

export async function POST(req) {
  try {
    const {to, subject, text} = await req.json();

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // use Gmail as the SMTP service
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_PASS, // your Gmail password or App Password
      },
    });

    // Set up email data
    let mailOptions = {
      from: process.env.GMAIL_USER, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    return NextResponse.json({message: "Email sent successfully"});
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      message: "Email not sent. Error: " + error.message,
    });
  }
}
