"use client";

import { setProductType } from "@app/store/slices/createProduct";
import { useDispatch } from "react-redux";
import { FaImage, FaA } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function SelectProductType() {
  const dispatch = useDispatch();
  const t = useTranslations("components.select_product_type");
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
      <div className="w-full h-max flex flex-col items-center justify-center gap-8 md:flex-row">
        <div
          onClick={() => dispatch(setProductType("image"))}
          className="w-[300px] h-[300px] bg-black hover:bg-primary-1 rounded-xl transition-all duration-100 cursor-pointer text-primary-1 hover:text-white flex flex-col items-center justify-center gap-4 px-3 text-center"
        >
          <FaImage className="aspect-auto" size={96} />
          <span className="font-bold text-3xl">{t("types.image.title")}</span>
          <p className="font-medium text-lg">{t("types.image.description")}</p>
        </div>
        <div
          onClick={() => dispatch(setProductType("text"))}
          className="w-[300px] h-[300px] bg-black hover:bg-primary-1 rounded-xl transition-all duration-100 cursor-pointer text-primary-1 hover:text-white flex flex-col items-center justify-center gap-4 px-3 text-center"
        >
          <FaA className=" aspect-auto" size={96} />
          <span className="font-bold text-3xl">{t("types.text.title")}</span>
          <p className="font-medium text-lg">{t("types.text.description")}</p>
        </div>
      </div>
    </>
  );
}
