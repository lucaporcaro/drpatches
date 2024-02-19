/** @format */

import { getCart } from "@app/actions/product";
import { httpClient } from "@app/lib/axios";
import { ulid } from "ulid";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import {
  catchError,
  concatMap,
  defer,
  from,
  lastValueFrom,
  map,
  of,
  throwError,
} from "rxjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {

 // let cartId;
  let jwt: string;

    console.log("==========================================------+++++===============================")
  const formData$ = from(request.formData());
 
  
  const product$ = defer(() =>
    formData$.pipe(
      concatMap((formData) => {
        jwt = formData.get("jwt") as string;
        return from(getCart(jwt)).pipe(
          map((product) => {
          //  cartId = product.products[0].id as string;
            return product;
          })
        );
      })
    )
  );
  const session$ = defer(() =>
    product$.pipe(
      concatMap((product) => {
        const sessionOptions: Stripe.Checkout.SessionCreateParams = {
          
          
          client_reference_id: ulid(),
          payment_method_types: ["card", "paypal"],
          line_items: [
            {
              price_data: {
                product_data: { name: `Custom Patch ${product.products[0].cart}` },
                currency: "eur",
                unit_amount: parseFloat(
                  ((product.totalPrice as number) * 100).toFixed(2)
                ),
              },
              quantity: 1,
            },
          ],
          tax_id_collection: {
            enabled: true,
          },
          custom_fields: [
            {
              key: "codice_fiscale",
              label: { type: "custom", custom: "Codice Fiscale" },
              type: "text",
            },
          ],
          shipping_address_collection: { allowed_countries: ["IT", "GB"] },
          shipping_options: [
            { shipping_rate: "shr_1Oc5aDFJwOikE4dcmUmPmDkp" },
            { shipping_rate: "shr_1Oc4z5FJwOikE4dciXDG0n4L" },
          ],
          mode: "payment",
          success_url: `${process.env.FRONTEND_URL}/payment?success=true`,
          cancel_url: `${process.env.FRONTEND_URL}/payment?canceled=true`,
        };

        // Conditionally add custom field when tax_id_collection is enabled
        if (sessionOptions?.tax_id_collection?.enabled) {
          // Manually specify the type for custom_fields
          const customField: Stripe.Checkout.SessionCreateParams.CustomField = {
            key: "sdi",
            label: { type: "custom", custom: "Codice univoco/SDI" },
            type: "text",
            optional: true,
          };
          sessionOptions?.custom_fields?.push(customField);
        }
        return from(stripe.checkout.sessions.create(sessionOptions));
      })
    )
  );

  const redirectUrl$ = defer(() =>
    session$.pipe(
      concatMap((session) => {
        const payload = { stripeId: session.client_reference_id as string };
        return from(
          httpClient.putForm(`/v1/cart`, payload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          })
        ).pipe(
          map(() => session),
          catchError((e) =>
            throwError(() => {
              console.dir(e.response.data);
              return new Error();
            })
          )
        );
      }),
      concatMap((session) => {
        return of(Response.redirect(session.url as string));
      })
    )
  );

  return lastValueFrom(redirectUrl$);
}
