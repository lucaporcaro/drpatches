/** @format */

"use client";

import { getPatchTypes } from "@app/actions/patch-type";
import { getProductInCart } from "@app/actions/product";
import Button from "@app/components/Button";

import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { useTranslations } from "next-intl";
import { httpClient } from "@app/lib/axios";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { timer } from "rxjs";
import { getUnixTime } from "date-fns";
import { SelectItem } from "@app/components/Select";
import DaCucireImage from "@app/assets/images/backing/1.png";
import TermoadesivaImage from "@app/assets/images/backing/2.png";
import VelcroAImage from "@app/assets/images/backing/3.png";
import VelcroBImage from "@app/assets/images/backing/4.png";
import VelcroABImage from "@app/assets/images/backing/5.png";

import Link from "@app/components/Link";
type Props = {
  params: {
    id: string;
  };
};

// const backingItems: SelectItem[] = [
//   { id: "da_cucire", image: DaCucireImage.src },
//   { id: "termoadesiva", image: TermoadesivaImage.src },
//   { id: "velcro_a", image: VelcroAImage.src },
//   { id: "velcro_b", image: VelcroBImage.src },
//   { id: "velcro_a_b", image: VelcroABImage.src },
// ];
// let toastShowed = false;

export default function CheckoutProductPage({ params: { id } }: Props) {
  // Hooks
  const jwt = useJwt();
  console.log("CheckoutProductPage  jwt:", jwt);
  const router = useRouter();
  const t = useTranslations("components.fillInformation");
  const [ts, stt] = useState(false);
  // Queries
  const [
    { data: products, refetch: refetchProduct, isFetched },
    { data: patchTypes },
  ] = useQueries({
    queries: [
      {
        queryKey: ["product", getUnixTime(new Date())],
        queryFn: () => getProductInCart(jwt as string),
      },
      {
        queryKey: ["patch_types"],
        queryFn: () => getPatchTypes(),
      },
    ],
  });
  console.log("CheckoutProductPage  products:", products);
  // Effects
  // useEffect(() => {

  //   if (!toastShowed && product && !product.isReadyForPayment) {
  //     router.replace(`/product/editor/${id}`);
  //     toast.error(t("title"));
  //     toastShowed = true;
  //   }
  //   return () => {
  //     timer(1000).subscribe(() => {
  //       toastShowed = false;
  //     });
  //   };
  // }, [product]);

  // Memos
  // const perItemPrice = useMemo(() => {
  //   if (!product) return "0";
  //   return (parseFloat(product.price as string) / product.quantity).toFixed(2);
  // }, [product]);

  // const backingType = useMemo(() => {
  //   if (!product) return null;
  //   return backingItems.filter(({ id }) => id === product.backingType)[0];
  // }, [product]);

  // const selectedPatchType = useMemo(() => {
  //   if (!patchTypes || !product || !product.patchType) return null;
  //   return patchTypes.filter(({ id }) => id === product.patchType)[0];
  // }, [patchTypes, product]);

  // // Conditions
  if (!products || !patchTypes || !isFetched) {
    return <Loading />;
  }

  return (
    <div className='w-full flex'>
      <form
        action={ `/product/checkout/zz/payment`}
        method='POST'
        className='  w-full flex-auto p-6 flex flex-col lg:flex-row items-start justify-center gap-6'>
        <div className='flex w-full flex-col gap-5'>
          {products.products &&
            products.products.map((product: any , index: number) => {
              return (
                <div key={index}>
                  <Product product={product} refetch={refetchProduct}></Product>
                </div>
                
              );
            })}
        </div>

        <div className='w-full min-w-[220px] lg:w-max h-max bg-black border-[1px] border-primary-1 rounded-lg py-6 px-4 flex flex-col items-center justify-center gap-10'>
          <div className='w-full h-0.5 bg-primary-1' />
          <div>
            <Button className='bg-primary-1 mx-auto' style={{ color: "black" }}>
              Proceed to checkout
            </Button>
            <Link href={"/product/create"}>
              <p className='bg-yellow-500 text-center m-10 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full'>
                new 
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

const Product = ({ product, refetch }: any) => {
  const jwt = useJwt();

  const deletProductHandler = () => {
    const data = {
      products: [product.id],
    };
    const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/cart`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        refetch();
      });
  };
  return (
    <div className='w-full h-full flex   bg-black border-primary-1 border-[1px] rounded-lg text-primary-1  flex-col items-center gap-10'>
      <div className='w-full  flex items-center justify-start px-6 py-5 border-b-primary-1 border-b-[1px]'>
        <p className='font-bold flex flex-wrap break-all  text-2xl'>
          Product #{product.id}
        </p>
      </div>

      <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-5 lg:py-10 gap-20'>
        <div className='w-full h-max flex flex-col items-start justify-center gap-10 font-bold'>
          <span>
            Patch with
            {product.type
              ? " " + product.type[0]?.toUpperCase() + product.type?.slice(1)
              : ""}
          </span>
          <div className='w-full flex flex-row items-center justify-between gap-4'>
            <span>Backing Type: </span>
            <div className='bg-primary-1 w-max p-2 rounded-lg'>
              {product.backingType === "da_cucire" && (
                <Image
                  src={DaCucireImage.src}
                  width={52}
                  height={52}
                  alt='Backing Type Image'
                />
              )}
              {product.backingType === "termoadesiva" && (
                <Image
                  src={TermoadesivaImage.src}
                  width={52}
                  height={52}
                  alt='Backing Type Image'
                />
              )}
              {product.backingType === "velcro_a" && (
                <Image
                  src={VelcroAImage.src}
                  width={52}
                  height={52}
                  alt='Backing Type Image'
                />
              )}
              {product.backingType === "velcro_b" && (
                <Image
                  src={VelcroBImage.src}
                  width={52}
                  height={52}
                  alt='Backing Type Image'
                />
              )}
              {product.backingType === "velcro_a_b" && (
                <Image
                  src={VelcroABImage.src}
                  width={52}
                  height={52}
                  alt='Backing Type Image'
                />
              )}
            </div>
          </div>
          {product.patchType && product.patchType.image ? (
            <div className='w-full flex flex-row items-center justify-between gap-4'>
              <span>Patch Type: </span>
              <div className='bg-primary-1 w-max p-2 rounded-lg'>
                <Image
                  src={product.patchType.image}
                  width={52}
                  height={52}
                  alt='Patch Type Image'
                />
              </div>
            </div>
          ) : null}
        </div>
        {product.type === "image" ? (
          <div className='flex flex-col items-start justify-start gap-4'>
            <span className='font-bold'>Selected Image</span>
            <img
              src={process.env.NEXT_PUBLIC_BASE_URL + (product.image as any)}
              width={240}
              height={240}
              alt='Product Selected Image'
              className='rounded-lg border-primary-1 border-[1px]'
            />
          </div>
        ) : (
          <div className='w-full h-max flex flex-col items-start justify-center gap-10'>
            <ShoppingItem
              label='Text'
              value={product.text ?? "No text provided"}
            />
            <ShoppingItem
              label='Border Color'
              isColor
              value={product.borderColor}
            />
            <ShoppingItem
              label='Background Color'
              isColor
              value={product.backgroundColor}
            />
            <ShoppingItem
              label='Text Color'
              isColor
              value={product.textColor}
            />
            <div
              style={{
                fontFamily: product.font ? "CustomFont" : undefined,
              }}
              className='w-full flex flex-row data-[color=true]:items-start items-center gap-6 justify-between text-primary-1'>
              <p>previwe</p>
              <span
                style={{
                  color: product.textColor,
                  borderColor: product.borderColor,
                  backgroundColor: product.backgroundColor,
                }}
                className='font-bold border-4'>
                {product.text}
              </span>
            </div>
          </div>
        )}
        <div className='w-full h-max flex flex-col items-start justify-center gap-10'>
          <ShoppingItem label='Width' value={`${product.patchWidth} cm`} />
          <ShoppingItem label='Height' value={`${product.patchHeight} cm`} />
        </div>
        <div className='  w-full'>
          <ShoppingItem label='Note' value={`${product.note}`} />
        </div>
        <div className='w-full h-max flex flex-col items-center justify-center gap-4'>
          <ShoppingItem
            label={`${product.quantity} Items`}
            value={"€" + product.price.toString()}
          />
          <ShoppingItem
            label={`Per item`}
            value={"€" + product.price / product.quantity}
          />
        </div>
        <div className=' flex flex-col gap-4'>
          <p
            onClick={deletProductHandler}
            className=' rounded-2xl py-1 text-center bg-red-600 w-20 cursor-pointer text-white '>
            delet
          </p>
          <div>
            <Link href={`/product/editor/${product.id}`}>
              <p className=' rounded-2xl text-center py-1 w-20 bg-blue-600'>
                edit
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

type ShoppingItemProps = {
  label?: string;
  value?: string;
  isColor?: boolean;
};

const ShoppingItem = ({ label, value, isColor = false }: ShoppingItemProps) => {
  return (
    <div
      data-color={isColor}
      className='w-full flex flex-row data-[color=true]:items-start items-center gap-6 justify-between text-primary-1'>
      <span className='font-bold'>{label}</span>
      {isColor ? (
        <div
          className='w-10 h-10 rounded-lg border-primary-1 border-[1px]'
          style={{ backgroundColor: value }}
        />
      ) : (
        <span className='font-light break-all'>{value}</span>
      )}
    </div>
  );
};
