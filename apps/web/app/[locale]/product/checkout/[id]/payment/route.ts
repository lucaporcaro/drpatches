import {getProduct} from "@app/actions/product";
import {httpClient} from "@app/lib/axios";
import {ulid} from "ulid";
import {NextRequest} from "next/server";
import Stripe from "stripe";
import {catchError, concatMap, defer, from, lastValueFrom, map, of, throwError,} from "rxjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
    let productId: string;
    let jwt: string;

    const formData$ = from(request.formData());
    const product$ = defer(() => formData$.pipe(
        concatMap((formData) => {
            jwt = formData.get('jwt') as string;
            if (!jwt) return throwError(() => new Error('Not Authorized'))
            return from(
                getProduct(
                    request.url.replace("/payment", "").split("/").pop() as any,
                    jwt
                )
            ).pipe(map((product) => {
                productId = product.id as string;
                return product
            }))
        })
    ))
    const session$ = defer(() => product$.pipe(
        concatMap((product) => {
            return from(stripe.checkout.sessions.create({
                client_reference_id: ulid(),
                line_items: [
                    {
                        price_data: {
                            product_data: {name: `Custom Patch ${product.id}`},
                            currency: "eur",
                            unit_amount:
                                parseFloat((product.price as number * 100).toFixed(2)),
                        },
                        quantity: 1,
                    },
                ],
                shipping_address_collection: {allowed_countries: ["IT"]},
                mode: "payment",
                success_url: `${process.env.FRONTEND_URL}/payment?success=true`,
                cancel_url: `${process.env.FRONTEND_URL}/payment?canceled=true`,
            }))
        })
    ))
    const redirectUrl$ = defer(() => session$.pipe(
            concatMap((session) => {
                const payload = new FormData;
                payload.append(
                    "stripeId",
                    session.client_reference_id as string
                )
                return from(httpClient.patchForm(`/v1/product/${productId}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${jwt}`,
                    },
                })).pipe(map(() => session), catchError((e) => throwError(() => {
                    console.dir(e.response.data)
                    return new Error
                })))
            }),
            concatMap((session) => {
                return of(Response.redirect(session.url as string))
            })
        ),
    )
    return lastValueFrom(redirectUrl$);
}
