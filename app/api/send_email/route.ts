// app/api/send_email/route.ts
import { NextResponse } from "next/server";
import { SMTPClient } from "emailjs";
import { createOrder } from "@/lib/db";
import {sendEmail} from "@/lib/email"

export async function POST(request: Request) {
  const data = await request.json();

  const client = new SMTPClient({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    ssl: true,
  });

  try {
    let order = await createOrder(data);
    if (!order)
      return NextResponse.json(
        { error: "Failed to create order." },
        { status: 500 }
      );
    // send to user and company
    await sendEmail(data);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed :", error);
    return NextResponse.json(
      { error: "Something wrong:" + error },
      { status: 500 }
    );
  }
}
