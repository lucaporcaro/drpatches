import { getProduct } from "@app/actions/product";
import { httpClient } from "@app/lib/axios";
import { ulid } from "ulid";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import {
  catchError,
  from,
  lastValueFrom,
  map,
  of,
  switchMap,
  throwError,
} from "rxjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  return lastValueFrom(
    from(request.formData()).pipe(
      switchMap((formData) => {
        const jwt = formData.get("jwt") as string;
        if (!jwt) return throwError(() => new Error("Not authorized"));
        return from(
          getProduct(
            request.url.replace("/payment", "").split("/").pop() as any,
            jwt
          )
        ).pipe(
          switchMap((product) => {
            const origin = (request.url.match(/^https?:\/\/[^/]+/) as any)[0];
            return from(
              stripe.checkout.sessions.create({
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
                success_url: `${process.env.FRONTEND_URL}/?success=true`,
                cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`,
              })
            ).pipe(
              switchMap((session) => {
                const payload = new FormData();
                payload.append(
                  "stripeId",
                  session.client_reference_id as string
                );
                return from(
                  httpClient.patchForm(`/v1/product/${product.id}`, payload, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${jwt}`,
                    },
                  })
                ).pipe(
                  map(() => Response.redirect(session.url as string)),
                  catchError((e) => throwError(() => e))
                );
              }),
              catchError((e) => throwError(() => e))
            );
          }),
          catchError((e) => throwError(() => e))
        );
      }),
      catchError((e) => of(Response.json(e.message)))
    )
  );
}
