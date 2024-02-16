/** @format */

"use client";
import {
  clearPersistedProducts,
  loadPersistedProducts,
} from "@app/store/slices/persistedProducts";
import { getPatchTypes } from "@app/actions/patch-type";
import { getProductinDB } from "@app/actions/product";
import Button from "@app/components/Button";
import { FaArrowLeft } from "react-icons/fa6";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { useTranslations } from "next-intl";
import { httpClient } from "@app/lib/axios";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { map, timer } from "rxjs";
import { getUnixTime } from "date-fns";
import { SelectItem } from "@app/components/Select";
import DaCucireImage from "@app/assets/images/backing/1.png";
import TermoadesivaImage from "@app/assets/images/backing/2.png";
import VelcroAImage from "@app/assets/images/backing/3.png";
import VelcroBImage from "@app/assets/images/backing/4.png";
import VelcroABImage from "@app/assets/images/backing/5.png";
import { RootState } from "@app/store";

type Props = {
  params: {
    id: string;
  };
};
const backingItems: SelectItem[] = [
  { id: "da_cucire", image: DaCucireImage.src },
  { id: "termoadesiva", image: TermoadesivaImage.src },
  { id: "velcro_a", image: VelcroAImage.src },
  { id: "velcro_b", image: VelcroBImage.src },
  { id: "velcro_a_b", image: VelcroABImage.src },
];
let toastShowed = false;

export default function CheckoutProductPage({ params: { id } }: Props) {
  // Hooks
  const products = useSelector(
    (state: RootState) => state.persistedProducts.products
  );
  console.log("CheckoutProductPage  products:", products);

  const productsIdList = products.map((product) => {
    if (product?.id !== undefined) {
      return product.id;
    }
  });
  console.log(productsIdList);

  const jwt = useJwt();
  const router = useRouter();
  const t = useTranslations("components.fillInformation");

  const [email, setEmail] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [password, setPassword] = useState("");

  // Queries
  const [
    { data: productfromserver, refetch: refetchProduct },
    { data: patchTypes },
  ] = useQueries({
    queries: [
      {
        queryKey: ["product"],
        queryFn: () => getProductinDB(productsIdList),
      },
      {
        queryKey: ["patch_types"],
        queryFn: () => getPatchTypes(),
      },
    ],
  });

  useEffect(() => {
    refetchProduct();
  }, [productsIdList]);
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

  // // Memos
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

  // Conditions
  if (!productfromserver || !patchTypes) return <Loading />;

  const paymentWithForm = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/guest-user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fiscal,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 500) {
          toast.error("dublicate information");
        }
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("SESSION_TOKEN", res.token);

        //-----
        const productlistforaddtocart = productfromserver.map(
          (product: any) => {
            if (product.isReadyForPayment) {
              return product.id;
            }
          }
        );

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${res.token}`,
          },
          body: JSON.stringify({
            products: productlistforaddtocart,
          }),
        })
          .then((result) => {
            return result.json();
          })
          .then((result) => {
            console.log(result);
            fetch(`${process.env.FRONTEND_URL}/product/checkout/qwer/payment`, {
              method: "post",
            });

            // router.push(`/product/checkout/qwer/payment`);
          });
      });
  };

  return (
    <div className='w-full'>
      <form
        action={`/product/checkout/qwer/payment`}
        method='POST'
        className='w-full flex-auto p-6 flex flex-col  items-start justify-center gap-6'>
        {productfromserver.map((product: any) => {
          return (
            <ProductContaner
              key={product.id}
              patchTypes={patchTypes}
              product={product}></ProductContaner>
          );
        })}

        {/* <div className='w-full h-full flex bg-black border-primary-1 border-[1px] rounded-lg text-primary-1  flex-col items-center gap-10'>
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
                  ? " " +
                    product.type[0]?.toUpperCase() +
                    product.type?.slice(1)
                  : ""}
              </span>
              <div className='w-full flex flex-row items-center justify-between gap-4'>
                <span>Backing Type: </span>
                <div className='bg-primary-1 w-max p-2 rounded-lg'>
                  <Image
                    src={backingType?.image || ""}
                    width={52}
                    height={52}
                    alt='Backing Type Image'
                  />
                </div>
              </div>
              {selectedPatchType && selectedPatchType.image ? (
                <div className='w-full flex flex-row items-center justify-between gap-4'>
                  <span>Patch Type: </span>
                  <div className='bg-primary-1 w-max p-2 rounded-lg'>
                    <Image
                      src={selectedPatchType?.image || ""}
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
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL + (product.image as any)
                  }
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
                  <span
                    style={{
                      color: product.textColor,
                      borderColor: product.borderColor,
                      backgroundColor: product.backgroundColor,
                    }}
                    className='font-bold border-4'>
                    {" "}
                    {product.text}
                  </span>
                </div>
              </div>
            )}
            <div className='w-full h-max flex flex-col items-start justify-center gap-10'>
              <ShoppingItem label='Width' value={`${product.patchWidth} cm`} />
              <ShoppingItem
                label='Height'
                value={`${product.patchHeight} cm`}
              />
            </div>
            <div className='  w-full'>
              <ShoppingItem label='Note' value={`${product.note}`} />
            </div>
          </div>
        </div> */}

        {/* <div className='w-full min-w-[220px] lg:w-max h-max bg-black border-[1px] border-primary-1 rounded-lg py-6 px-4 flex flex-col items-center justify-center gap-10'>
         <div className='w-full h-max flex flex-col items-center justify-center gap-4'>
            <ShoppingItem
              label={`${product.quantity} Items`}
              value={"€" + product.price.toString()}
            />
             <ShoppingItem label={`Per item`} value={"€" + perItemPrice} />
          </div>
          <div className='w-full h-0.5 bg-primary-1' />
          <Button className='bg-primary-1 mx-auto' style={{ color: "black" }}>
            Proceed to checkout
          </Button>
        </div> */}

        <div className='w-full flex-col  min-w-[220px] lg:w-max h-max bg-black border-[1px] border-primary-1 rounded-lg py-6 px-4 flex  items-center justify-center gap-10'>
          <div className='flex  w-full items-center justify-center gap-3'>
            <label
              className='font-semibold text-white md:text-xl'
              htmlFor='email'>
              email
            </label>
            <input
              className='w-full p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex  w-full items-center justify-center gap-3'>
            <label
              className='font-semibold text-white md:text-xl'
              htmlFor='fiscal'>
              fiscal
            </label>
            <input
              className='w-full  p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
              type='text'
              name='fiscal'
              value={fiscal}
              onChange={(e) => setFiscal(e.target.value)}
            />
          </div>
          <div className='flex  w-full items-center justify-center gap-3'>
            <label
              className='font-semibold text-white md:text-xl'
              htmlFor='password'>
              password
            </label>
            <input
              className='w-full  p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>{" "}
          <p
            onClick={paymentWithForm}
            className='bg-primary-1 mx-auto p-4  flex items-center justify-center rounded-xl font-semibold text-base text-white'
            style={{ color: "black" }}>
            payment
          </p>
        </div>

        {/* <input hidden name='jwt' value={jwt || undefined} /> */}
      </form>
    </div>
  );
}

const ProductContaner = ({ product, patchTypes }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Memos
  const perItemPrice = useMemo(() => {
    if (!product) return "0";
    return (parseFloat(product.price as string) / product.quantity).toFixed(2);
  }, [product]);

  const backingType = useMemo(() => {
    if (!product) return null;
    return backingItems.filter(({ id }: any) => id === product.backingType)[0];
  }, [product]);

  const selectedPatchType = useMemo(() => {
    if (!patchTypes || !product || !product.patchType) return null;
    return patchTypes.filter(({ id }: any) => id === product.patchType)[0];
  }, [patchTypes, product]);

  if (!product.isReadyForPayment) {
    return <p></p>;
  }
  const allProduct = useSelector(
    (state: RootState) => state.persistedProducts.products
  );

  const onDeleteProduct = () => {
    const filterProduct = allProduct.map((item) => {
      if (item?.id !== product.id) {
        return item;
      }
    });

    console.log("onDeleteProduct  products:", filterProduct);
    if (filterProduct.length !== 0)
      localStorage.setItem(
        "created_products",
        JSON.stringify([...filterProduct])
      );

    const productsFromLocalStorage = localStorage.getItem("created_products");
    if (productsFromLocalStorage)
      dispatch(loadPersistedProducts(JSON.parse(productsFromLocalStorage)));

    // useEffect(() => {

    //   if (products.length !== 0)
    //     localStorage.setItem("created_products", JSON.stringify([...products]));
    // }, [products]);
    // useEffect(() => {

    // }, []);
  };
  return (
    <div className='w-full h-full flex bg-black border-primary-1 border-[1px] rounded-lg text-primary-1  flex-col items-center gap-10'>
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
              <Image
                src={backingType?.image || ""}
                width={52}
                height={52}
                alt='Backing Type Image'
              />
            </div>
          </div>
          {selectedPatchType && selectedPatchType.image ? (
            <div className='w-full flex flex-row items-center justify-between gap-4'>
              <span>Patch Type: </span>
              <div className='bg-primary-1 w-max p-2 rounded-lg'>
                <Image
                  src={selectedPatchType?.image || ""}
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
            <Image
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
              <span
                style={{
                  color: product.textColor,
                  borderColor: product.borderColor,
                  backgroundColor: product.backgroundColor,
                }}
                className='font-bold border-4'>
                {" "}
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
      </div>
      <div
        onClick={() => {
          router.push(`/product/editor/${product.id}`);
        }}
        className='px-6 py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-6 rounded-lg'
        title='Reset'>
        edit
      </div>
      <div
        onClick={onDeleteProduct}
        className='px-6 py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-6 rounded-lg'
        title='Reset'>
        delete
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
