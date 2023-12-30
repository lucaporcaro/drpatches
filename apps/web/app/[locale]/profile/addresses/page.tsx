import { getAllAddresses } from "@app/actions/addresses"
import Button from "@app/components/Button";
import Link from "@app/components/Link";

export default async function AddressesProfilePage() {
  const addresses = await getAllAddresses();
  return <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8 max-h-full overflow-y-scroll">
    <div className="w-full h-max flex flex-col lg:flex-row items-start justify-start lg:justify-between lg:items-center">
      <h2 className="font-bold text-2xl">Addresses</h2>
      <Link passHref href="/profile/addresses/create">
        <Button>Create</Button>
      </Link>
    </div>
    <div className="w-full flex flex-col gap-10">
      {addresses.map((address, i) => <Link key={`address_${i}_${address.id}`} href={`/profile/addresses/${address.id}`}><div
        className="w-full h-max p-4 rounded-md bg-black text-white transition-colors hover:bg-black/80 cursor-pointer grid place-items-center place-content-center grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Receiver name: </span>
          <span className="font-normal text-base">{address.receiverName}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Receiver phone: </span>
          <span className="font-normal text-base">{address.receiverPhone}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Location information: </span>
          <span className="font-normal text-base">City: {address.country} - Province: {address.province} - City: {address.city}</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="font-bold text-xl">Location: </span>
          <span className="font-normal text-base">Address: {address.location}</span>
          <span className="font-normal text-base">Zip Code: {address.zipCode}</span>
        </div>
      </div></Link>)}
    </div>
  </div >
}
