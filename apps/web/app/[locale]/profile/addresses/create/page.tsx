"use client";

import { createAddress } from "@app/actions/addresses";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import PhoneInput from "@app/components/PhoneInput";
import useJwt from "@app/hooks/useJwt";
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

export default function CreateAddressPage() {
  // Hooks
  const router = useRouter();
  const jwt = useJwt();

  // Functions
  async function createAddressWithErrors(formData: FormData) {
    const toastId = toast.loading("Creating the address...", {
      autoClose: 25000,
    });

    const payload: Record<string, any> = Object.fromEntries(formData.entries());
    return lastValueFrom(
      from(createAddress(payload, jwt as string)).pipe(
        concatMap((result) => {
          if (typeof result == "string") throw new Error(result);
          toast.update(toastId, {
            render: "Address created",
            type: "success",
            autoClose: 3000,
            isLoading: false,
          });
          return timer(1000);
        }),
        tap(() => (window.location.href = "/profile/addresses")),
        catchError((e) => {
          toast.update(toastId, {
            render: e?.message ?? "Faild to create address",
            type: "error",
            autoClose: 3000,
            isLoading: false,
          });
          return of(null);
        })
      )
    );
  }
  return (
    <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8 max-h-full overflow-y-scroll">
      <h2 className="font-bold text-2xl">Create Address</h2>
      <form
        action={createAddressWithErrors}
        className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <Input label="Receiver Name" name="receiverName" required />
        <PhoneInput label="Receiver Phone" name="receiverPhone" required />
        <Input label="Country" name="country" required />
        <Input label="Province" name="province" required />
        <Input label="City" name="city" required />
        <Input label="Zip Code" name="zipCode" required />
        <Input
          label="Location"
          name="location"
          required
          containerClassName="lg:col-span-3"
        />
        <Button className="col-span-1 md:col-span-2 lg:col-span-3">
          Create
        </Button>
      </form>
    </div>
  );
}
