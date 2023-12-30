'use client'

import { deleteAddress, getAddress, updateAddress } from "@app/actions/addresses";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import PhoneInput from "@app/components/PhoneInput";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



export default function UpdateAddressPage({ params }: { params: { id: string } }) {
  // Hooks
  const router = useRouter();

  // Queries
  const { data: address } = useSuspenseQuery({
    queryKey: ['address', params.id],
    queryFn: async () => await getAddress(params.id),
  })

  // Functions
  async function updateAddressWithErrors(formData: FormData) {
    const toastId = toast.loading('Updating the address...', {
      autoClose: 25000
    })
    const payload: { [key: string]: any } = {};
    for (const key of formData.keys())
      payload[key] = formData.get(key);
    const result = await updateAddress(payload, params.id);
    if (typeof result !== 'string') {
      toast.update(toastId, {
        render: 'Address updated',
        type: 'success',
        autoClose: 3000,
        isLoading: false
      })
      setTimeout(() => router.refresh, 1000)
    }
    else toast.update(toastId, {
      render: result,
      type: 'error',
      autoClose: 3000,
      isLoading: false
    })
  }

  async function deleteAddressWithErrors() {
    if (!confirm('Are you sure?'))
      return;
    const toastId = toast.loading('Deleting the address...', {
      autoClose: 25000
    })
    const result = await deleteAddress(params.id);
    if (typeof result !== 'string') {
      toast.update(toastId, {
        render: 'Address deleted',
        type: 'success',
        autoClose: 3000,
        isLoading: false
      })
      setTimeout(() => window.location.href = '/profile/addresses', 1000)
    }
    else toast.update(toastId, {
      render: result,
      type: 'error',
      autoClose: 3000,
      isLoading: false
    })
  }
  return <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8 max-h-full overflow-y-scroll">
    <div className="w-full h-max flex flex-col lg:flex-row items-start justify-start lg:justify-between lg:items-center">
      <h2 className="font-bold text-2xl">Create Address</h2>
      <Button onClick={() => deleteAddressWithErrors()} className="bg-red-600">Delete</Button>
    </div>
    <form action={updateAddressWithErrors} className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <Input label="Receiver Name" name="receiverName" required defaultValue={address?.receiverName} />
      <PhoneInput label="Receiver Phone" name="receiverPhone" required value={address?.receiverPhone} />
      <Input label="Country" name="country" required defaultValue={address?.country} />
      <Input label="Province" name="province" required defaultValue={address?.province} />
      <Input label="City" name="city" required defaultValue={address?.city} />
      <Input label="Zip Code" name="zipCode" required defaultValue={address?.zipCode} />
      <Input label="Location" name="location" required containerClassName="lg:col-span-3" defaultValue={address?.location} />
      <Button className="col-span-1 md:col-span-2 lg:col-span-3" >Save</Button>
    </form>
  </div>

}
