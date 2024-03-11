/** @format */

"use client";

import { getPatchTypes } from "@app/actions/patch-type";
import { getProductinDB } from "@app/actions/product";
import {
  clearPersistedProducts,
  loadPersistedProducts,
} from "@app/store/slices/persistedProducts";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { useTranslations } from "next-intl";

import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function CheckoutProductPage({ params: { id } }: Props) {
  // Hooks
  const [totalPrice, setTotalPrice] = useState(0);

  const [productincart, setproductincart] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const products = useSelector(
    (state: RootState) => state.persistedProducts.products
  );

  const productsIdList = products.map((product) => {
    if (product?.id !== undefined) {
      return product.id;
    }
  });

  const jwt = useJwt();
  const router = useRouter();
  const t = useTranslations("components.fillInformation");
  const tr = useTranslations("pages.checkout");
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
  const dispatch = useDispatch();

  useEffect(() => {
    refetchProduct();
  }, [productsIdList]);

  useEffect(() => {
    if (productfromserver && !jwt) {
      setTotalPrice(0);
      productfromserver.map((product: any) => {
        if (product.isReadyForPayment) {
          console.log(product.price);

          setTotalPrice((prevstate) => prevstate + product.price);
        }
      });
      console.log("+++++++++++++++++++++++++++++++");
      console.log("total price", totalPrice);
    }
  }, [productfromserver]);

  const formData = new FormData();

  useEffect(() => {
    setIsDelete(false);

    if (jwt) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((result) => {
          console.log("res4444444ult0,", result);

          return result.json();
        })
        .then((res) => {
          console.log("res 444444add to cart", res);
          setproductincart(res.products);
          setTotalPrice(res.totalPrice);
        });
    }
  }, [jwt, isDelete]);
  const submitform = () => {
    if (jwt) {
      formData.append("jwt", jwt);
      fetch(`/product/checkout/qwer/payment`, {
        method: "post",
        body: formData,
      })
        .then((ressss) => {
          return ressss.json();
        })
        .then((ress) => {
          router.push(ress);
        });
    } else {
      localStorage.setItem(
        "REDIRECT_AFTER_LOGIN",
        " /product/checkout/01HPWFPT68S4XXCDCP1NC2BP"
      );
      router.push("/login");
    }
  };

  const deleteAllProduct = () => {
    if (jwt) {
      const productsIdListForDelet = productincart.map((product: any) => {
        if (product?.id !== undefined) {
          return product.id;
        }
      });
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: productsIdListForDelet,
        }),
      })
        .then((ressss) => {
          return ressss.json();
        })
        .then((ress) => {
          setIsDelete(true);
        });
    }

    dispatch(clearPersistedProducts());
  };
  console.log(productincart);
  console.log(productfromserver);
  // Conditions
  if (!productfromserver || !patchTypes || !productincart) return <Loading />;

  return (
    <div className='w-full'>
      <form className='w-full flex-auto p-6 flex flex-col lg:flex-row  items-start justify-center gap-6'>
        <div className='w-full flex-auto p-6 flex flex-col  items-start justify-center gap-6'>
          {!jwt &&
            productfromserver.map((product: any) => {
              return (
                <>
                  <p>loooooo</p>
                  <ProductContaner
                    key={product.id}
                    patchTypes={patchTypes}
                    setIsDelete={setIsDelete}
                    product={product}></ProductContaner>

                  <p>joooooo</p>
                </>
              );
            })}

          {jwt &&
            productincart.map((product: any) => {
              return (
                <>
                  <p>kooooooooo</p>{" "}
                  <ProductContaner
                    key={product.id}
                    setIsDelete={setIsDelete}
                    patchTypes={patchTypes}
                    product={product}></ProductContaner>
                  <p>fooooooo</p>
                </>
              );
            })}
          {productfromserver.length === 0 && productincart.length === 0 && (
            <h2 className=' text-5xl text-center w-full my-32 py-32'>
              {tr("empty")}
            </h2>
          )}
        </div>
        <div className=' hidden lg:block w-[750px] h-4'></div>

        <div
          className='w-full min-w-[220px] lg:w-[350px] p-28  lg:fixed   lg:right-3 top-[375px]  h-max bg-black border-[1px] border-primary-1 rounded-lg py-6 px-4
                        flex flex-col  items-center justify-center gap-10'>
          <div className='w-full h-max flex flex-col items-center justify-center gap-4'>
            <ShoppingItem
              label={tr("Total_Price")}
              value={"€" + `${(totalPrice as number).toFixed(2)} `}
            />
          </div>
          <div className='flex flex-col  justify-center items-center gap-3 mb-7 '>
            <div
              onClick={submitform}
              className='px-6 w-full text-center py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-2 rounded-lg'>
              {tr("payment")}
            </div>
            <div
              onClick={deleteAllProduct}
              className='px-6 w-full text-center py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-2 rounded-lg'>
              {tr("delet_all_product")}
            </div>
            <div
              onClick={() => router.push("/product/create")}
              className='px-6 w-full text-center py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-2 rounded-lg'>
              {tr("Add_New_Item")}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const ProductContaner = ({ product, patchTypes, setIsDelete }: any) => {
  const router = useRouter();
  const tr = useTranslations("pages.checkout");
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
  const jwt = useJwt();
  const onDeleteProduct = () => {
    if (jwt) {
      console.log("mow");

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: [product.id],
        }),
      })
        .then((result) => {
          console.log("res4444444ult0,", result);

          return result.json();
        })
        .then((res) => {
          console.log("res 444444add to cart", res);
          console.log("type    ", typeof setIsDelete);
          setIsDelete(true);
        });
    } else {
      const filterProduct = allProduct.map((item) => {
        if (item?.id !== product.id) {
          return item;
        }
      });

      if (filterProduct.length !== 0)
        localStorage.setItem(
          "created_products",
          JSON.stringify([...filterProduct])
        );

      const productsFromLocalStorage = localStorage.getItem("created_products");
      if (productsFromLocalStorage)
        dispatch(loadPersistedProducts(JSON.parse(productsFromLocalStorage)));
    }
  };
  return (
    <div className='w-full h-full flex bg-black border-primary-1 border-[1px] rounded-lg text-primary-1  flex-col items-center gap-10'>
      <div className='w-full  flex items-center justify-start px-6 py-5 border-b-primary-1 border-b-[1px]'>
        <p className='font-bold flex flex-wrap break-all  text-2xl'>
          {tr("Product")} #{product.id}
        </p>
      </div>
      <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-5 lg:py-10 gap-20'>
        <div className='w-full h-max flex flex-col items-start justify-center gap-10 font-bold'>
          <span>
            {tr("Patch_with")}
            {product.type
              ? " " + product.type[0]?.toUpperCase() + product.type?.slice(1)
              : ""}
          </span>
          <div className='w-full flex flex-row items-center justify-between gap-4'>
            <span>{tr("Backing_Type")}: </span>
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
              <span>{tr("Patch_Type")}: </span>
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
            <span className='font-bold'>{tr("Selected_Image")}</span>
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
              label={tr("Text")}
              value={product.text ?? "No text provided"}
            />
            <ShoppingItem
              label={tr("Border_Color")}
              isColor
              value={product.borderColor}
            />
            <ShoppingItem
              label={tr("Background_Color")}
              isColor
              value={product.backgroundColor}
            />
            <ShoppingItem
              label={tr("Text_Color")}
              isColor
              value={product.textColor}
            />
            <div
              style={{
                fontFamily: product.font ? "CustomFont" : undefined,
              }}
              className='w-full flex flex-row data-[color=true]:items-start items-center gap-6 justify-between text-primary-1'>
              <span className='font-bold'>{tr("preview")}</span>

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
          <ShoppingItem
            label={tr("Width")}
            value={`${product.patchWidth} cm`}
          />
          <ShoppingItem
            label={tr("Height")}
            value={`${product.patchHeight} cm`}
          />
        </div>
        <div className='  w-full'>
          <ShoppingItem label={tr("Note")} value={`${product.note}`} />
        </div>{" "}
        <div className='w-full min-w-[220px]  lg:w-max h-max bg-black border-[1px] border-primary-1 rounded-lg py-6 px-4 flex flex-col lg:flex-row items-center justify-center gap-10'>
          <div className='w-full h-max flex flex-col items-center justify-center gap-4'>
            <ShoppingItem
              label={`${product.quantity} ${tr("Items")}`}
              value={"€" + product.price.toString()}
            />
            <ShoppingItem label={tr("Per_item")} value={"€" + perItemPrice} />
          </div>
          <div className='flex flex-col justify-center items-center gap-3 mb-7 '>
            <div
              onClick={() => {
                router.push(`/product/editor/${product.id}`);
              }}
              className='px-6 w-48 text-center py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-6 rounded-lg'
              title='Reset'>
              {tr("Edit")}
            </div>
            <div
              onClick={onDeleteProduct}
              className='px-6 w-48 text-center py-3 mt-5 cursor-pointer bg-primary-1 text-black mx-6 rounded-lg'
              title='Reset'>
              {tr("Delete")}
            </div>
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
