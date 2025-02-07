import prisma, { createOrder } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    prisma.$connect();

    let user = await prisma.user.findFirstOrThrow({
      where: { email: data.email },
    });
    if (user) {
      let match = await bcrypt.compare(data.password, user.password);
      if (match) {
        return NextResponse.json({ user }, { status: 200 });
      } else {
        return NextResponse.json(
          {
            error: "User Name or Password is incorrect!",
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: "User Name or Password is incorrect!",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    // console.log(error.stack)
    return NextResponse.json(
      { error: "Something wrong:" + error },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
