"use client";

import { getPatchTypes } from "@app/actions/patch-type";
import { getProduct } from "@app/actions/product";
import ProductEditor from "@app/components/CreateProduct/ProductEditor";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { useQueries, useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function ProductEidtorPage({
  params,
}: {
  params: { id: string };
}) {
  // Hooks
  const jwt = useJwt();

  // Queries
  const [{ data: product }, { data: patchTypes }] = useQueries({
    queries: [
      {
        queryKey: ["product", params.id],
        queryFn: () => getProduct(params.id, jwt as string),
      },
      {
        queryKey: ["patch_types"],
        queryFn: () => getPatchTypes(),
      },
    ],
  });

  // Conditions
  if (!product || !patchTypes) return <Loading />;

  if (product && product.status !== "created")
    return redirect("/product/create");
  return (
    <div className="w-full h-max py-10 flex-auto flex flex-col items-center justify-center">
      <ProductEditor initialProduct={product} patchTypes={patchTypes} />
    </div>
  );
}
