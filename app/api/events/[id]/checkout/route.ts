import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request, {params}: {params: {id: string}}) {
try {
    const user = await currentUser()
    if(!user || !user.id || !user.email) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    const event = await db.event.findUnique({
        where: {
            id: params.id,
        }
    })

    const purchase = await db.purchase.findUnique({
        where: {
            userId: user.id,
            eventId: params.id
        }
    })

    if(purchase){
        return new NextResponse("Already Purchased", {status: 400})
    }

    if(!event){
        return new NextResponse("Event not found", {status: 404})
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: event.title,
                },
                unit_amount: Math.round(parseInt(event.price)) * 100,
            },
            quantity: 1,
        }
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
        where: {
            userId: user.id
        },
        select: {
            stripeCustomerId: true
        }
    })

    if(!stripeCustomer){
        const customer = await stripe.customers.create({
            email: user.email,
        })

        stripeCustomer = await db.stripeCustomer.create({
            data: {
                userId: user.id,
                stripeCustomerId: customer.id
            }
        })
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${params.id}?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${params.id}?canceled=1`,
        metadata: {
            userId: user.id,
            eventId: params.id
        }
    })

    return NextResponse.json({url: session.url})
} catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", {status: 500})
}
}