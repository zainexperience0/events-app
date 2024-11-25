import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature")!;
    let event: Stripe.Event;


    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const eventId = session?.metadata?.eventId;

    if(event.type === "checkout.session.completed") {
        if(!userId || !eventId) {
            return new NextResponse("Missing metadata", { status: 400 });
        }

        await db.purchase.create({
            data: {
                userId,
                eventId,
            }
        });
    }else{
        return new NextResponse("Missing metadata", { status: 400 });
    }

    return new NextResponse(null, { status: 200 });
}