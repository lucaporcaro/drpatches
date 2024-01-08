import { getProduct } from "@app/actions/product";
import { httpClient } from "@app/lib/axios";
import { ulid } from "ulid";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const jwt: string | null = formData.get("jwt") as string | null;

  if (!jwt) return new NextResponse("Not authorized", { status: 403 });

  try {
    const product = await getProduct(
      request.url.replace("/payment", "").split("/").pop() as any,
      jwt
    );
    const origin = (request.url.match(/^https?:\/\/[^/]+/) as any)[0];
    console.log("Reached");
    const session = await stripe.checkout.sessions.create({
      client_reference_id: ulid(),
      line_items: [
        {
          price_data: {
            product_data: { name: `Custom Patch ${product.id}` },
            currency: "eur",
            unit_amount: parseFloat(product.price as any) * 100,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: { allowed_countries: ["IT"] },
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });
    const payload = new FormData();
    payload.append("stripeId", session.client_reference_id as string);
    await httpClient.patchForm(`/v1/product/${product.id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    });
    return Response.redirect(session.url as string);
  } catch (e: any) {
    return NextResponse.json(e.message);
  }
}
