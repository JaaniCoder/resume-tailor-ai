import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-06-24.dahlia",
});

export async function POST(req:Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, signature, process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;

        if (userId) {
            try {
                await prisma.user.update({
                where: { id: userId },
                data: { credits: { increment: 50 },
                        isPro: true },
            });
            console.log(`Successfully added 50 credits to user: ${userId}`);
            } catch (dbError) {
                console.error("Database update failed during webhook:", dbError);
                return new NextResponse("Database Error", { status: 500 });
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}