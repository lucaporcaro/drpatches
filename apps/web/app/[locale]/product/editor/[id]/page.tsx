import { getPatchTypes } from "@app/actions/patch-type";
import { getProduct } from "@app/actions/product";
import ProductEditor from "@app/components/CreateProduct/ProductEditor";
import { redirect } from "next/navigation";

export default async function ProductEidtorPage({
  params,
}: {
  params: { id: string };
}) {
  // Data Fetching
  const product = await getProduct(params.id);
  const patchTypes = await getPatchTypes();
  // Conditions
  if (product.status !== "created") return redirect("/product/create");
  return (
    <div className="w-full h-max py-10 flex-auto flex flex-col items-center justify-center">
      <ProductEditor initialProduct={product} patchTypes={patchTypes} />
    </div>
  );
}
