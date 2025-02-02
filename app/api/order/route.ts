// app/api/send_email/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let order = await prisma.order.findMany();
    if (!order)
      return NextResponse.json(
        { error: "Failed to get order." },
        { status: 500 }
      );
      console.log(order)
    return NextResponse.json({ orders: order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something wrong:" + error },
      { status: 500 }
    );
  }
}
