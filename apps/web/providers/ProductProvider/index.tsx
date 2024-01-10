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
  useEffect(() => {
    if (jwt && products.length !== 0)
      (async (jwt: string) => {
        await lastValueFrom(
          from(products).pipe(
            mergeMap((product) => {
              return from(
                httpClient.put(
                  `v1/product/assign/${product.id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${jwt}`,
                    },
                  }
                )
              );
            }),
            catchError((e) => throwError(() => e))
          )
        );
        dispatch(clearPersistedProducts());
      })(jwt);
  }, [jwt, products]);

  return children;
}
