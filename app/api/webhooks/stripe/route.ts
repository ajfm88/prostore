import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order.actions";

// Define the POST handler function for the Stripe webhook
export async function POST(req: NextRequest) {
  let event: Stripe.Event;
  try {
    event = await Stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  // charge.succeeded indicates a successful payment
  if (event.type === "charge.succeeded") {
    // Retrieve the order ID from the payment metadata
    const { object } = event.data;

    // Update the order status to paid
    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });

    return NextResponse.json({
      message: "updateOrderToPaid was successful",
    });
  }
  return NextResponse.json({
    message: "event is not charge.succeeded",
  });
}
