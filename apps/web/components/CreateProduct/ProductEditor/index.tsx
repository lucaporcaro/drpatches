"use client";

import NumberInput from "@app/components/NumberInput";
import Select, {SelectItem} from "@app/components/Select";
import {RootState} from "@app/store";
import {CreateProductState, loadCreatedProduct, reset, updateCreatedProduct,} from "@app/store/slices/createProduct";
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import DaCucireImage from "@app/assets/images/backing/1.png";
import TermoadesivaImage from "@app/assets/images/backing/2.png";
import VelcroAImage from "@app/assets/images/backing/3.png";
import VelcroBImage from "@app/assets/images/backing/4.png";
import VelcroABImage from "@app/assets/images/backing/5.png";
import Input from "@app/components/Input";
import ColorSelector from "@app/components/ColorSelector";
import {useEffect, useMemo, useRef, useState} from "react";
import {FaArrowLeft, FaImage} from "react-icons/fa6";
import Button from "@app/components/Button";
import {toast} from "react-toastify";
import {httpClient} from "@app/lib/axios";
import {PatchTypeT} from "@app/actions/patch-type";
import Link from "next/link";
import useJwt from "@app/hooks/useJwt";
import {catchError, debounceTime, filter, from, lastValueFrom, map, Subject, throwError,} from "rxjs";
import {useRouter} from "next/navigation";
import Loading from "react-loading";
import {Font} from "@app/actions/font";
import useFontLoader from "@app/hooks/useFontLoader";
import RSelect from "react-select"

export const backingItems: SelectItem[] = [
    {id: "da_cucire", image: DaCucireImage.src},
    {id: "termoadesiva", image: TermoadesivaImage.src},
    {id: "velcro_a", image: VelcroAImage.src},
    {id: "velcro_b", image: VelcroBImage.src},
    {id: "velcro_a_b", image: VelcroABImage.src},
];

type Props = {
    initialProduct: CreateProductState;
    patchTypes: PatchTypeT[];
    fonts: Font[];
};

// Subjects
const productUpdateSubject = new Subject();

export default function ProductEditor({
                                          initialProduct,
                                          patchTypes,
                                          fonts,
                                      }: Props) {
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
        note,
        font,
    } = product;
    const [updatedPrice, setUpdatedPrice] = useState(price);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const [pricePerOne, setPricePerOne] = useState<string>("0");

    // Memos
    const fontUrl = useMemo(() => {
        const fontUrlPath$ = from(fonts).pipe(
            filter(({id}) => font === id),
            map((font) => font.file)
        );
        let url;

        fontUrlPath$.subscribe((font) => (url = font));

        return url;
    }, [font]);
    const selectedFont = useMemo(() => {
        const selectedFont$ = from(fonts).pipe(
            filter(({id}) => id === font),
            map((font) => font)
        );
        let fontSelected;
        selectedFont$.subscribe(
            (font) =>
                (fontSelected = {
                    label: font.name,
                    value: font.id,
                    preview: font.image,
                })
        );
        return fontSelected;
    }, [font]);

    // Hooks
    const jwt = useJwt();
    const router = useRouter();
    const t = useTranslations("components.product_editor");
    const tr = useTranslations("pages.shared");
    const dispatch = useDispatch();
    const fontLoaded = useFontLoader(fontUrl);

    // Refs
    const imageRef = useRef<HTMLInputElement>(null);

    // Functions
    const update =
        (key: string, isSelect = false) =>
            (value: any) => {
                dispatch(
                    updateCreatedProduct({key, value: isSelect ? value.value : value})
                );
            };

    async function updateProductWithErrors(product: any, jwt: string) {
        const id = product.id;

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
        return lastValueFrom(
            from(
                httpClient.patch(`/v1/product/${id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${jwt}`,
                    },
                })
            ).pipe(
                map(({data: {price, quantity}}) => {
                    setUpdatedPrice(price);
                    setPricePerOne((price / quantity).toFixed(2));
                }),
                catchError((e) => {
                    toast.error("Faild to sync", {autoClose: 2000});
                    return throwError(() => e);
                })
            )
        );
    }

    // Effects
    useEffect(() => {
        dispatch(loadCreatedProduct(initialProduct));
    }, [initialProduct]);

    useEffect(() => {
        productUpdateSubject.next({...product});
    }, [product]);

    useEffect(() => {
        const subscription = productUpdateSubject
            .pipe(debounceTime(1000))
            .subscribe(async (product) => {
                setIsSyncing(true);
                await updateProductWithErrors(product, jwt as any);
                setIsSyncing(false);
            });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return (
        <>
            <div className="w-11/12 h-max flex items-center justify-between max-w-[1620px] mx-auto p-2 mb-2">
                <button
                    onClick={() => {
                        dispatch(reset());
                        router.replace("/product/create");
                    }}
                    className="w-max h-max px-6 py-3 bg-black rounded-lg"
                    title="Reset"
                >
                    <FaArrowLeft size={20} className="text-white"/>
                </button>
                <h2 className="font-bold text-2xl md:text-4xl text-black">
                    {type ? tr('create_text_patch') : tr('create_image_patch')}
                </h2>
                <div className="hidden lg:block w-[68px] h-[44px]"/>
            </div>
            <div
                className={`w-11/12 mx-auto h-max max-w-[1620px] bg-black border-primary-1 border-2 py-10 px-8 rounded-xl grid grid-cols-1 grid-cols-4 gap-10`}>
                <div
                    className="bg-primary-1 text-black relative flex flex-col items-start justify-start gap-6 py-10 px-6 rounded-xl lg:col-span-2">
                    {type === "image" ? (
                        <>
                            <span className="font-bold text-3xl">Image</span>
                            <div
                                onClick={() => imageRef.current?.click()}
                                className="w-full relative h-[40rem] border-black border-2 rounded-xl flex flex-col items-center justify-center gap-6 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer overflow-hidden"
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
                                        <FaImage className="w-10 h-10"/>
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
                                onChange={({currentTarget: {files}}) =>
                                    update("image")(files ? files[0] : undefined)
                                }
                            />
                        </>
                    ) : (
                        <>
                            <span className="font-bold text-3xl">{t("titels.text")}</span>
                            <div style={{
                                fontFamily: fontLoaded ? 'CustomFont' : undefined,
                            }} className="w-full">
                                <Input value={text} onChange={update("text")}/>
                            </div>
                            <div className="w-full flex flex-row items-center justify-start gap-4">
                                <span className="font-semibold text-xl">Font</span>
                                <RSelect
                                    className="w-full"
                                    value={selectedFont}
                                    options={
                                        fonts.map((font) => ({
                                            label: font.name,
                                            value: font.id,
                                            preview: font.image,
                                        })) as any
                                    }
                                    onChange={update("font", true)}
                                    components={{
                                        Option({data, innerProps, innerRef}) {
                                            return (
                                                <img
                                                    height={100}
                                                    width={200}
                                                    {...innerProps}
                                                    ref={innerRef}
                                                    src={(data as any).preview}
                                                />
                                            );
                                        },
                                    }}
                                />
                            </div>
                            <>
                                <div className="w-max ">
                                    <Select
                                        value={patchType}
                                        items={patchTypes}
                                        label={t("select_type")}
                                        onChange={update("patchType")}
                                    />
                                </div>
                            </>
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
                <div
                    className="bg-primary-1 text-black relative flex flex-col items-start justify-start gap-6 py-10 px-6 rounded-xl lg:col-span-2 overflow-hidden">
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
                    <div className="w-max flex flex-col items-end justify-start gap-6 mb-0 mt-2">
                        <Select
                            value={backingType}
                            items={backingItems}
                            label={t("select_backing_type")}
                            onChange={update("backingType")}
                        />
                    </div>
                    <div className="w-full h-max md:col-span-2">
                        <Input
                            label={tr('note')}
                            placeholder="Write your note here..."
                            type="textarea"
                            onChange={update("note")}
                            value={note}
                        />
                    </div>
                </div>


                <div
                    className="bg-primary-1 text-black relative flex flex-col lg:flex-row items-center justify-between gap-6 py-10 px-6 rounded-xl lg:col-span-4 overflow-hidden"
                >
                    <div className="w-max">
            <span className="font-bold text-3xl">
              {type === "image" ? t("image_patch") : t("text_patch")}
            </span>
                    </div>
                    <div className="w-max h-max flex flex-col items-center justify-center gap-6 lg:flex-row">
                        <div className="min-w-[240px] h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="font-semibold text-2xl">
              {tr('item_per_patch')}: {pricePerOne}€
              </span>
                        </div>
                        <div className="min-w-[240px] h-12 bg-white rounded-xl flex items-center justify-center">
                            {isSyncing ? (
                                <Loading
                                    type="spin"
                                    color="rgb(243, 204, 16)"
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <span className="font-semibold text-2xl">
                  {tr('total')}: {updatedPrice || price}€
                </span>
                            )}
                        </div>

                        <div className="w-max h-max">
                            <Link href={`/product/checkout/${product.id}`}>
                                <Button>{t("add_to_cart")}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
