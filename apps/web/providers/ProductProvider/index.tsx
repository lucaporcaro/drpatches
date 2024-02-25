/** @format */

"use client";

import useJwt from "@app/hooks/useJwt";
import { httpClient } from "@app/lib/axios";
import { RootState } from "@app/store";
import {
  clearPersistedProducts,
  loadPersistedProducts,
} from "@app/store/slices/persistedProducts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catchError, from, lastValueFrom, mergeMap, throwError } from "rxjs";

import { getProductinDB } from "@app/actions/product";

import { useQueries } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductProvider({ children }: any) {
  // States
  const products = useSelector(
    (state: RootState) => state.persistedProducts.products
  );
  const jwt = useJwt();

  // Hooks
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    if (products.length !== 0)
      localStorage.setItem("created_products", JSON.stringify([...products]));
  }, [products]);
  useEffect(() => {
    const productsFromLocalStorage = localStorage.getItem("created_products");
    if (productsFromLocalStorage)
      dispatch(loadPersistedProducts(JSON.parse(productsFromLocalStorage)));
  }, []);
  
  // const productsIdList = products.map((product) => {
  //     if (product?.id !== undefined) {
  //       return product.id;
  //     }
  //   });
    // const [{ data: productfromserver, refetch: refetchProduct }] = useQueries({
    //   queries: [
    //     {
    //       queryKey: ["product"],
    //       queryFn: () => getProductinDB(productsIdList),
    //     },
    //   ],
    // });
    // useEffect(() => {
    //   refetchProduct();
    // }, [productsIdList]);
  useEffect(() => {
    // if (jwt && products.length !== 0)
    //   (async (jwt: string) => {
    //     await lastValueFrom(
    //       from(products).pipe(
    //         mergeMap((product) => {
    //           return from(
    //             httpClient.put(
    //               `v1/product/assign/${product.id}`,
    //               {},
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${jwt}`,
    //                 },
    //               }
    //             )
    //           );
    //         }),
    //         catchError((e) => throwError(() => e))
    //       )
    //     );
    //     dispatch(clearPersistedProducts());
    //   })(jwt);
 
    if (jwt && products.length !== 0) {
      console.log("add con to cart");
      console.log("product in local", products);

      const productlistforaddtocart = products.map((product: any) => {
        // if (product.isReadyForPayment) {
          return product.id;
        // }
      });

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          products: productlistforaddtocart,
        }),
      }).then((result) => {
        console.log("result0,",result);
        
        return result.json();
      }).then((res)=>{
        console.log("res add to cart",res);

        dispatch(clearPersistedProducts());

      })
    }
  }, [jwt, products]);

  return children;
}
