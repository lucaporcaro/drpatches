"use client";

import { createProduct } from "@app/actions/product";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { addToPersistedProduct } from "@app/store/slices/persistedProducts";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaImage, FaA } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  catchError,
  concatMap,
  from,
  lastValueFrom,
  switchMap,
  tap,
  throwError,
  timer,
} from "rxjs";

export default function SelectProductType() {
  // States
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Hooks
  const t = useTranslations("components.select_product_type");
  const router = useRouter();
  const jwt = useJwt();

  // Functions
  async function createAndNavigateProduct(type: "text" | "image") {
    setIsCreating(true);
    return await lastValueFrom(
      from(createProduct(type, jwt as string)).pipe(
        concatMap((result) => {
          dispatch(addToPersistedProduct(result));
          return timer(1000).pipe(
            tap(() => router.push(`/product/editor/${result.id}`))
          );
        }),
        catchError((e) => throwError(() => e))
      )
    ).then(() => setIsCreating(true));
  }

  if (isCreating) return <Loading />;

  return (
    <>
      <div className="w-full h-max flex flex-col items-center justify-center py-10 gap-6 px-8 text-center">
        <h1 className="text-black font-bold text-2xl md:text-3xl lg:text-4xl">
          {t("title")}
        </h1>
        <p className="text-black font-medium text-xl md:text-2xl">
          {t("description")}
        </p>
      </div>
      <div
        data-creating={isCreating}
        className="group w-full h-max flex flex-col items-center justify-center gap-8 md:flex-row"
      >
        <div
          onClick={
            isCreating ? undefined : () => createAndNavigateProduct("image")
          }
          className="w-[300px] h-[300px] bg-black group-data-[creating=false]:hover:bg-primary-1 rounded-xl transition-all duration-100 cursor-pointer group-data-[creating=true]:cursor-wait text-primary-1 group-data-[creating=false]:hover:text-white flex flex-col items-center justify-center gap-4 px-3 text-center"
        >
          <FaImage className="aspect-auto" size={96} />
          <span className="font-bold text-3xl">{t("types.image.title")}</span>
          <p className="font-medium text-lg">{t("types.image.description")}</p>
        </div>
        <div
          onClick={
            isCreating ? undefined : () => createAndNavigateProduct("text")
          }
          className="w-[300px] h-[300px] bg-black group-data-[creating=false]:hover:bg-primary-1 rounded-xl transition-all duration-100 cursor-pointer group-data-[creating=true]:cursor-wait text-primary-1 group-data-[creating=false]:hover:text-white flex flex-col items-center justify-center gap-4 px-3 text-center"
        >
          <FaA className=" aspect-auto" size={96} />
          <span className="font-bold text-3xl">{t("types.text.title")}</span>
          <p className="font-medium text-lg">{t("types.text.description")}</p>
        </div>
      </div>
    </>
  );
}
