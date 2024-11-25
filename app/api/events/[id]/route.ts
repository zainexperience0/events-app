import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, params: { params: { id: string } }) {
  const values = await req.json();

  try {
    const event = await db.event.update({
      where: { id: params.params.id },
      data: { ...values },
    });
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}


export async function DELETE(req: Request, params: { params: { id: string } }) {
  try {
    const event = await db.event.delete({
      where: { id: params.params.id },
    });
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}