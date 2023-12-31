"use client";

import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@app/actions/addresses";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import Loading from "@app/components/Loading";
import PhoneInput from "@app/components/PhoneInput";
import useJwt from "@app/hooks/useJwt";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  catchError,
  concatMap,
  from,
  lastValueFrom,
  of,
  tap,
  timer,
} from "rxjs";

export default function UpdateAddressPage({
  params,
}: {
  params: { id: string };
}) {
  // Hooks
  const router = useRouter();
  const jwt = useJwt();

  // Queries
  const { data: address } = useQuery({
    queryKey: ["address", params.id],
    queryFn: async () => await getAddress(params.id, jwt as string),
    enabled: Boolean(jwt),
  });

  // Functions
  async function updateAddressWithErrors(formData: FormData) {
    const toastId = toast.loading("Updating the address...", {
      autoClose: 25000,
    });

    const payload: Record<string, any> = Object.fromEntries(formData.entries());

    return lastValueFrom(
      from(updateAddress(payload, params.id, jwt as string)).pipe(
        concatMap((result) => {
          if (typeof result === "string") throw new Error(result);
          toast.update(toastId, {
            render: "Address updated",
            type: "success",
            autoClose: 3000,
            isLoading: false,
          });
          return timer(1000);
        }),
        tap(() => router.refresh()),
        catchError((e) => {
          toast.update(toastId, {
            render: e.message ?? "Faild to update address",
            type: "error",
            autoClose: 3000,
            isLoading: false,
          });
          return of(null);
        })
      )
    );
  }

  async function deleteAddressWithErrors() {
    if (!confirm("Are you sure?")) return;

    const toastId = toast.loading("Deleting the address...", {
      autoClose: 25000,
    });

    return lastValueFrom(
      from(deleteAddress(params.id, jwt as string)).pipe(
        concatMap((result) => {
          if (typeof result === "string") throw new Error(result);
          toast.update(toastId, {
            render: "Address deleted",
            type: "success",
            autoClose: 3000,
            isLoading: false,
          });
          return timer(1000);
        }),
        tap(() => (window.location.href = "/profile/addresses")),
        catchError((e) => {
          toast.update(toastId, {
            render: e.message ?? "Faild to delete the address",
            type: "error",
            autoClose: 3000,
            isLoading: false,
          });
          return of(null);
        })
      )
    );
  }

  if (!address) return <Loading />;

  return (
    <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8 max-h-full overflow-y-scroll">
      <div className="w-full h-max flex flex-col lg:flex-row items-start justify-start lg:justify-between lg:items-center">
        <h2 className="font-bold text-2xl">Create Address</h2>
        <Button
          onClick={() => deleteAddressWithErrors()}
          className="bg-red-600"
        >
          Delete
        </Button>
      </div>
      <form
        action={updateAddressWithErrors}
        className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <Input
          label="Receiver Name"
          name="receiverName"
          required
          defaultValue={address?.receiverName}
        />
        <PhoneInput
          label="Receiver Phone"
          name="receiverPhone"
          required
          value={address?.receiverPhone}
        />
        <Input
          label="Country"
          name="country"
          required
          defaultValue={address?.country}
        />
        <Input
          label="Province"
          name="province"
          required
          defaultValue={address?.province}
        />
        <Input label="City" name="city" required defaultValue={address?.city} />
        <Input
          label="Zip Code"
          name="zipCode"
          required
          defaultValue={address?.zipCode}
        />
        <Input
          label="Location"
          name="location"
          required
          containerClassName="lg:col-span-3"
          defaultValue={address?.location}
        />
        <Button className="col-span-1 md:col-span-2 lg:col-span-3">Save</Button>
      </form>
    </div>
  );
}
