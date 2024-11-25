import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  console.log(user);

  const {
    category,
    title,
    description,
    price,
    startTime,
    endTime,
    location,
    imageUrl,
    url,
  } = await req.json();

  try {
    const event = await db.event.create({
      data: {
        userId: user?.id!,
        createdBy: user?.name! ,
        category,
        title,
        description,
        price,
        startTime,
        endTime,
        location,
        imageUrl,
        url,
      },
    });
    console.log(JSON.stringify(event));

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
