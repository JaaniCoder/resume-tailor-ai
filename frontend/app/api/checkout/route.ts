import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-06-24.dahlia",
});

export async function POST() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment", // "payment" for one-time, "subscription" for recurring
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
            client_reference_id: userId, // We need this later to credit the right user!
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Pro Tier - 50 ATS Resume Generations",
                            description: "Instantly unlock 50 AI resume optimizations.",
                        },
                        unit_amount: 900, // $9.00 in cents
                    },
                    quantity: 1,
                },
            ],
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("STRIPE_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}