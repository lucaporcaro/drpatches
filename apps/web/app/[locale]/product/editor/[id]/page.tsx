import { getProduct } from "@app/actions/product";
import ProductEditor from "@app/components/CreateProduct/ProductEditor";

export default async function ProductEidtorPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  return <div className="w-full h-max py-10 flex-auto flex flex-col items-center justify-center">
    <ProductEditor initialProduct={product} />
  </div>
}
