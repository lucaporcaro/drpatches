"use client";

import { updateUser } from "@app/actions/user";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import PhoneInput from "@app/components/PhoneInput";
import { AppDispatch, RootState } from "@app/store";
import { persistUser } from "@app/store/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  // States
  const user: any = useSelector((state: RootState) => state.user);

  // Hooks
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // Actions
  async function updatePersonalInformationWithErrors(formData: FormData) {
    const toastId = toast.loading("Updating Information...", {
      autoClose: 1000 * 25,
    });
    const payload: { [key: string]: any } = {};
    for (const key of formData.keys()) payload[key] = formData.get(key);
    const result = await updateUser(payload);
    if (typeof result === "string") {
      toast.update(toastId, {
        render: result,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      dispatch(persistUser(result));
      toast.update(toastId, {
        render: "Information updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.refresh();
    }
  }

  return (
    <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8">
      <h2 className="font-bold text-2xl">Personal Information</h2>
      <form
        action={updatePersonalInformationWithErrors}
        className="w-full h-max grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <Input
          label="First Name"
          name="firstName"
          defaultValue={user.firstName}
        />
        <Input label="Last Name" name="lastName" defaultValue={user.lastName} />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={user.email}
        />
        <PhoneInput name="phone" label="Phone" value={user.phone} />
        <Input
          label="Gender"
          options={[
            {
              label: "Male",
              value: "m",
            },
            {
              label: "Female",
              value: "f",
            },
          ]}
          type="select"
          containerClassName="md:col-span-2"
        />
        <Button className="md:col-span-2">Save</Button>
      </form>
    </div>
  );
}
