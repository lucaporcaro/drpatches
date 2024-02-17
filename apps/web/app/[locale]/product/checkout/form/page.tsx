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

export default function Form() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fiscal, setFiscal] = useState("");

  const [password, setPassword] = useState("");
  const products = useSelector(
    (state: RootState) => state.persistedProducts.products
  );
  console.log("CheckoutProductPage  products:", products);

  const productsIdList = products.map((product) => {
    if (product?.id !== undefined) {
      return product.id;
    }
  });
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
  const formData = new FormData();
  const paymentWithForm = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/guest-user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fiscal:`${country} - ${city} - ${address} - ${fiscal}` ,
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
            formData.append("jwt", res.token);
            fetch(`/product/checkout/qwer/payment`, {
              method: "post",
              body: formData,
            });

            // router.push(`/product/checkout/qwer/payment`);
          });
      });
  };

  return (
    <div className='w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12'>
      <div className='w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10'>
        <h2 className='font-bold text-2xl lg:text-3xl'>guest</h2>
        <form action='' className=" w-full">
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
                htmlFor='country'>
                country
              </label>
              <input
                className='w-full  p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
                type='text'
                name='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className='flex  w-full items-center justify-center gap-3'>
              <label
                className='font-semibold text-white md:text-xl'
                htmlFor='city'>
                city
              </label>
              <input
                className='w-full  p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
                type='text'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='flex  w-full items-center justify-center gap-3'>
              <label
                className='font-semibold text-white md:text-xl'
                htmlFor='address'>
                address
              </label>
              <input
                className='w-full  p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
                type='text'
                name='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
    </div>
  );
}
