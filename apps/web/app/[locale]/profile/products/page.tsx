import { getAllAddresses } from "@app/actions/addresses"
import { getAllProducts } from "@app/actions/product";
import Button from "@app/components/Button";
import Link from "@app/components/Link";

export default async function AddressesProfilePage() {
  const addresses = await getAllProducts();
  return <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8 max-h-full overflow-y-scroll">
    <div className="w-full h-max flex flex-col lg:flex-row items-start justify-start lg:justify-between lg:items-center">
      <h2 className="font-bold text-2xl">Addresses</h2>
      <Link passHref href="/product/create" replace>
        <Button>Create</Button>
      </Link>
    </div>
    <div className="w-full flex flex-col gap-10">
      {addresses.map((product, i) => <Link key={`address_${i}_${product.id}`} href={`/product/editor/${product.id}`} replace><div
        className="w-full h-full overflow-y-scroll p-4 rounded-md bg-black text-white transition-colors hover:bg-black/80 cursor-pointer grid place-items-center place-content-center grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">ID: </span>
          <span className="font-normal text-base">{product.id}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Quantity: </span>
          <span className="font-normal text-base">{product.quantity}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Patch: </span>
          <span className="font-normal text-base">Width: {product.patchWidth} Height: {product.patchHeight}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Bacing Type: </span>
          <span className="font-normal text-base">{product.backingType}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Price: </span>
          <span className="font-normal text-base">{product.price}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Status: </span>
          <span className="font-normal text-base">{product.status[0].toUpperCase() + product.status.slice(1)}</span>
        </div>
      </div></Link>)}
    </div>
  </div >
}
