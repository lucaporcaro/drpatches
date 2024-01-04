"use client";

import NumberInput from "@app/components/NumberInput";
import Select, { SelectItem } from "@app/components/Select";
import { RootState } from "@app/store";
import {
  CreateProductState,
  loadCreatedProduct,
  reset,
  updateCreatedProduct,
} from "@app/store/slices/createProduct";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import TypeImage from "@app/assets/images/select.png";
import DaCucireImage from "@app/assets/images/backing/1.png";
import TermoadesivaImage from "@app/assets/images/backing/2.png";
import VelcroAImage from "@app/assets/images/backing/3.png";
import VelcroBImage from "@app/assets/images/backing/4.png";
import VelcroABImage from "@app/assets/images/backing/5.png";
import Input from "@app/components/Input";
import ColorSelector from "@app/components/ColorSelector";
import { useEffect, useRef, useState, useTransition } from "react";
import { FaImage, FaArrowLeft } from "react-icons/fa6";
import Button from "@app/components/Button";
import { toast } from "react-toastify";
import { httpClient } from "@app/lib/axios";
import { useRouter } from "next/navigation";

const typeItems: SelectItem[] = [
  {
    id: "01HGFKAJNMAG04APFXFBACA48E",
    image: TypeImage.src,
  },
  {
    id: "01HGFKB1SX51SD4D8HM98BH895",
    image: TypeImage.src,
  },
  {
    id: "01HGFKBBNB82NBQ3APGZJZSRKS",
    image: TypeImage.src,
  },
  {
    id: "01HGFKBTQMRCSFTJR61MEMV0QG",
    image: TypeImage.src,
  },
  {
    id: "01HGFKC57NEKR39ET0JAG68AEA",
    image: TypeImage.src,
  },
  {
    id: "01HGFKV6TCBAFVZQ9A6DN63TR7",
    image: TypeImage.src,
  },
  {
    id: "01HGFKVHDWJTPWH1SWCSQDGQ9W",
    image: TypeImage.src,
  },
  {
    id: "01HGFKVNW447HGPKBYD1H1MWYN",
    image: TypeImage.src,
  },
];

const backingItems: SelectItem[] = [
  { id: "da_cucire", image: DaCucireImage.src },
  { id: "termoadesiva", image: TermoadesivaImage.src },
  { id: "velcro_a", image: VelcroAImage.src },
  { id: "velcro_b", image: VelcroBImage.src },
  { id: "velcro_a_b", image: VelcroABImage.src },
];

type Props = {
  initialProduct: CreateProductState;
};

let updaterTimeout: NodeJS.Timeout;

export default function ProductEditor({ initialProduct }: Props) {
  // States
  const product = useSelector((state: RootState) => state.createProduct);
  const {
    type,
    text,
    patchType,
    backingType,
    patchWidth,
    patchHeight,
    quantity,
    borderColor,
    textColor,
    backgroundColor,
    image,
    price,
  } = product;
  const dispatch = useDispatch();
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const t = useTranslations("components.product_editor");
  const [updated, setUpdated] = useState<boolean>(false);

  // Refs
  const imageRef = useRef<HTMLInputElement>(null);

  // Functions
  const update = (key: string) => (value: any) =>
    dispatch(updateCreatedProduct({ key, value }));
  async function updateProductWithErrors(product: any) {
    const id = product.id;

    if (updaterTimeout) clearTimeout(updaterTimeout);

    updaterTimeout = setTimeout(async () => {
      Object.assign(product, {
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        price: undefined,
        user: undefined,
        status: undefined,
      });

      const payload = new FormData();
      for (const key of Object.keys(product))
        if (typeof product[key] !== "undefined")
          payload.append(key, product[key]);

      try {
        const { data }: any = await toast.promise(
          httpClient.patchForm(`/v1/product/${id}`, payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            pending: {
              render: "Syncing the product...",
              autoClose: 25000,
            },
            error: {
              render: "Syncing failed",
              autoClose: 3000,
            },
            success: {
              render: "Synced successfully",
              autoClose: 3000,
            },
          }
        );
        setUpdatedPrice(data.price);
      } catch (e: any) {
        console.dir(e.response.data);
        throw new Error();
      }
    }, 2000);
  }

  // Effects
  useEffect(() => {
    if (updated) updateProductWithErrors({ ...product });
  }, [product]);
  useEffect(() => {
    dispatch(loadCreatedProduct(initialProduct));
    setTimeout(() => setUpdated(true), 1000);
  }, [initialProduct]);

  return (
    <>
      <div className="w-full h-max flex items-center justify-start max-w-[1620px] mx-auto p-2">
        <button
          onClick={() => dispatch(reset())}
          className="w-max h-max px-6 py-3 bg-black rounded-lg"
          title="Reset"
        >
          <FaArrowLeft size={20} className="text-white" />
        </button>
      </div>
      <div className="w-11/12 mx-auto h-max max-w-[1620px] bg-black border-primary-1 border-2 py-10 px-8 rounded-xl grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="bg-primary-1 text-black relative flex flex-col items-start justify-start gap-6 py-10 px-6 rounded-xl lg:col-span-2">
          {type === "image" ? (
            <>
              <span className="font-bold text-3xl">Image</span>
              <div
                onClick={() => imageRef.current?.click()}
                className="w-full relative h-[300px] border-black border-2 rounded-xl flex flex-col items-center justify-center gap-6 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer overflow-hidden"
              >
                {image ? (
                  <img
                    className="w-full h-full absolute inset-0"
                    src={
                      typeof image === "string"
                        ? `${httpClient.defaults.baseURL}/${image}`
                        : URL.createObjectURL(image)
                    }
                  />
                ) : (
                  <>
                    <FaImage className="w-10 h-10" />
                    <span className="font-medium text-xl">
                      {t("select_image")}
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imageRef}
                onChange={({ currentTarget: { files } }) =>
                  update("image")(files ? files[0] : undefined)
                }
              />
            </>
          ) : (
            <>
              <span className="font-bold text-3xl">{t("titels.text")}</span>
              <Input value={text} onChange={update("text")} />
              <span className="font-bold text-3xl">{t("titels.colors")}</span>

              <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <ColorSelector
                  label={t("border")}
                  onChange={update("borderColor")}
                  value={borderColor}
                />
                <ColorSelector
                  label={t("text")}
                  onChange={update("textColor")}
                  value={textColor}
                />
                <div className="w-full h-max md:col-span-2">
                  <ColorSelector
                    label={t("background")}
                    onChange={update("backgroundColor")}
                    value={backgroundColor}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="bg-primary-1 text-black relative flex flex-col items-start justify-start gap-6 py-10 px-6 rounded-xl lg:col-span-2 overflow-hidden">
          <span className="font-bold text-3xl">{t("titels.patching")}</span>
          <NumberInput
            value={parseFloat(patchWidth as any)}
            onUpdate={update("patchWidth")}
            label={t("patch_width")}
            unit="CM"
            step={0.5}
            // disabled
          />
          <NumberInput
            value={parseFloat(patchHeight as any)}
            onUpdate={update("patchHeight")}
            label={t("patch_height")}
            unit="CM"
            step={0.5}
            // disabled
          />
          <NumberInput
            value={parseFloat(quantity as any)}
            onUpdate={update("quantity")}
            label={t("quantity")}
            min={1}
            max={50000}
          />

          <div className="w-max flex flex-col items-end justify-start gap-6">
            <div className="w-max">
              <Select
                value={patchType}
                items={typeItems}
                label={t("select_type")}
                onChange={update("patchType")}
              />
            </div>
            <Select
              value={backingType}
              items={backingItems}
              label={t("select_backing_type")}
              onChange={update("backingType")}
            />
          </div>
        </div>
        {type === "text" ? (
          <div className="bg-primary-1 text-black relative flex flex-col items-center justify-center gap-6 py-10 px-6 rounded-xl lg:col-span-1 overflow-hidden">
            <span className="font-bold text-3xl">{t("preview")}</span>
            <div className="w-max h-max relative" style={{ backgroundColor }}>
              {patchType ? (
                <img
                  className="w-32 aspect-auto"
                  src={
                    (typeItems.filter(({ id }) => id === patchType)[0] as any)
                      .image
                  }
                />
              ) : null}
              <div className="w-max h-max  absolute inset-0 m-auto">
                <span className="" style={{ color: textColor }}>
                  {text}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div
          data-alone={type === "image"}
          className="bg-primary-1 text-black relative flex flex-col lg:flex-row items-center justify-between gap-6 py-10 px-6 rounded-xl data-[alone=true]:lg:col-span-4 lg:col-span-3 overflow-hidden"
        >
          <span className="font-bold text-3xl">
            {type === "image" ? t("image_patch") : t("text_patch")}
          </span>
          <div className="w-full h-max flex flex-col items-center justify-center gap-6 lg:flex-row lg:max-w-[500px]">
            <div className="min-w-[240px] h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="font-semibold text-2xl">
                {updatedPrice || price}€
              </span>
            </div>
            <div className="w-[249px] h-max">
              <Button>{t("add_to_cart")}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
