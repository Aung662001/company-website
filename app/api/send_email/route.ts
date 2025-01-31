// app/api/send_email/route.ts
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/db";
import {sendEmail} from "@/lib/email"

export async function POST(request: Request) {
  const data = await request.json();
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
    return NextResponse.json(
      { error: "Something wrong:" + error },
      { status: 500 }
    );
  }
}
