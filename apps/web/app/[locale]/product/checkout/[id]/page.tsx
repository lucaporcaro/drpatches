"use client";

import {getPatchTypes} from "@app/actions/patch-type";
import {getProduct} from "@app/actions/product";
import Button from "@app/components/Button";
import {backingItems} from "@app/components/CreateProduct/ProductEditor";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import {httpClient} from "@app/lib/axios";
import {useQueries} from "@tanstack/react-query";
import Image from "next/image";
import {useEffect, useMemo} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {timer} from "rxjs";
import {getUnixTime} from "date-fns";

type Props = {
    params: {
        id: string;
    };
};

let toastShowed = false;

export default function CheckoutProductPage({params: {id}}: Props) {
    // Hooks
    const jwt = useJwt();
    const router = useRouter()

    // Queries
    const [{data: product}, {data: patchTypes}] = useQueries({
        queries: [
            {
                queryKey: ["product", id, getUnixTime(new Date)],
                queryFn: () => getProduct(id, jwt as string),
            },
            {
                queryKey: ["patch_types"],
                queryFn: () => getPatchTypes(),
            },
        ],
    });

    // Effects
    useEffect(() => {
        if (!toastShowed && product && !product.isReadyForPayment) {
            router.replace(`/product/editor/${id}`)
            toast.error('Product is not completed, fill the informations')
            toastShowed = true;
        }
        return () => {
            timer(1000).subscribe(() => {
                toastShowed = false;
            })
        }
    }, [product]);

    // Memos
    const perItemPrice = useMemo(() => {
        if (!product) return "0";
        return (parseFloat(product.price as string) / product.quantity).toFixed(2);
    }, [product]);

    const backingType = useMemo(() => {
        if (!product) return null;
        return backingItems.filter(({id}) => id === product.backingType)[0];
    }, [product]);

    const selectedPatchType = useMemo(() => {
        if (!patchTypes || !product || !product.patchType) return null;
        return patchTypes.filter(({id}) => id === product.patchType)[0];
    }, [patchTypes, product]);

    // Conditions
    if (!product || !patchTypes) return <Loading/>;

    return (
        <form
            action={`/product/checkout/${id}/payment`}
            method="POST"
            className="w-full flex-auto p-6 flex flex-col lg:flex-row items-start justify-center gap-6"
        >
            <div
                className="w-full h-full flex-auto bg-black border-primary-1 border-[1px] rounded-lg text-primary-1 flex flex-col items-center gap-10">
                <div className="w-full flex items-center justify-start px-6 py-5 border-b-primary-1 border-b-[1px]">
                    <span className="font-bold text-2xl">Product #{product.id}</span>
                </div>
                <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-5 lg:py-10 gap-20">
                    <div className="w-full h-max flex flex-col items-start justify-center gap-10 font-bold">
            <span>
              Patch with
                {product.type
                    ? " " + product.type[0]?.toUpperCase() + product.type?.slice(1)
                    : ""}
            </span>
                        <div className="w-full flex flex-row items-center justify-between gap-4">
                            <span>Backing Type: </span>
                            <div className="bg-primary-1 w-max p-2 rounded-lg">
                                <Image
                                    src={backingType?.image || ""}
                                    width={52}
                                    height={52}
                                    alt="Backing Type Image"
                                />
                            </div>
                        </div>
                        {selectedPatchType && selectedPatchType.image ? (
                            <div className="w-full flex flex-row items-center justify-between gap-4">
                                <span>Patch Type: </span>
                                <div className="bg-primary-1 w-max p-2 rounded-lg">
                                    <Image
                                        src={selectedPatchType?.image || ""}
                                        width={52}
                                        height={52}
                                        alt="Patch Type Image"
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {product.type === "image" ? (
                        <div className="flex flex-col items-start justify-start gap-4">
                            <span className="font-bold">Selected Image</span>
                            <Image
                                src={httpClient.defaults.baseURL + (product.image as any) ?? ""}
                                width={240}
                                height={240}
                                alt="Product Selected Image"
                                className="rounded-lg border-primary-1 border-[1px]"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-max flex flex-col items-start justify-center gap-10">
                            <ShoppingItem
                                label="Text"
                                value={product.text ?? "No text provided"}
                            />
                            <ShoppingItem
                                label="Border Color"
                                isColor
                                value={product.borderColor}
                            />
                            <ShoppingItem
                                label="Background Color"
                                isColor
                                value={product.backgroundColor}
                            />
                            <ShoppingItem
                                label="Text Color"
                                isColor
                                value={product.textColor}
                            />
                        </div>
                    )}
                    <div className="w-full h-max flex flex-col items-start justify-center gap-10">
                        <ShoppingItem label="Width" value={`${product.patchWidth} cm`}/>
                        <ShoppingItem label="Height" value={`${product.patchHeight} cm`}/>
                    </div>
                </div>
            </div>
            <div
                className="w-full min-w-[220px] lg:w-max h-max bg-black border-[1px] border-primary-1 rounded-lg py-6 px-4 flex flex-col items-center justify-center gap-10">
                <div className="w-full h-max flex flex-col items-center justify-center gap-4">
                    <ShoppingItem
                        label={`${product.quantity} Items`}
                        value={"€" + product.price.toString()}
                    />
                    <ShoppingItem label={`Per item`} value={"€" + perItemPrice}/>
                </div>
                <div className="w-full h-0.5 bg-primary-1"/>
                <Button className="bg-primary-1 mx-auto" style={{color: "black"}}>
                    Proceed to checkout
                </Button>
            </div>
            <input hidden name="jwt" value={jwt || undefined}/>
        </form>
    );
}

type ShoppingItemProps = {
    label?: string;
    value?: string;
    isColor?: boolean;
};

const ShoppingItem = ({label, value, isColor = false}: ShoppingItemProps) => {
    return (
        <div
            data-color={isColor}
            className="w-full flex flex-row data-[color=true]:items-start items-center gap-6 justify-between text-primary-1"
        >
            <span className="font-bold">{label}</span>
            {isColor ? (
                <div
                    className="w-10 h-10 rounded-lg border-primary-1 border-[1px]"
                    style={{backgroundColor: value}}
                />
            ) : (
                <span className="font-light">{value}</span>
            )}
        </div>
    );
};
