"use client";
import ProductEditor from "@app/components/CreateProduct/ProductEditor";
import SelectProductType from "@app/components/CreateProduct/SelectProductType";
import { RootState } from "@app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  calculateProductPrice,
  restoreCreateProduct,
} from "@app/store/slices/createProduct";

export default function CreateProduct() {
  const product = useSelector((state: RootState) => state.createProduct);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  let routerTimeout: any;

  useEffect(() => {
    dispatch(calculateProductPrice(Object.assign({}, product)));
    if (routerTimeout) clearTimeout(routerTimeout);
    routerTimeout = setTimeout(() =>
      router.replace(
        pathname +
          `?${queryString.stringify({
            ...product,
            image: undefined,
            price: 0,
          })}`
      )
    );
  }, [product]);

  useEffect(() => {
    dispatch(restoreCreateProduct(queryString.parse(params.toString())));
  }, []);

  return (
    <div className="py-10 flex flex-col items-center justify-center">
      {product.type ? <ProductEditor /> : <SelectProductType />}
    </div>
  );
}
