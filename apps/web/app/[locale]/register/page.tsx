"use client";

import { register } from "@app/actions/auth";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import Link from "@app/components/Link";
import PhoneInput from "@app/components/PhoneInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  // Hooks
  const router = useRouter();

  // Functions
  async function registerWithErrors(formData: FormData) {
    const payload: Record<string, string> = Object.fromEntries(
      formData.entries()
    ) as any;

    const result = await register(payload);

    if (result === true) {
      toast.success("You registered successfully");
      router.replace("/");
      setTimeout(router.refresh, 1000);
    } else toast.error(result);
  }
  return (
    <div className="w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12">
      <div className="w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10">
        <h2 className="font-bold text-2xl lg:text-3xl">Register</h2>
        <form
          action={registerWithErrors}
          className="w-full h-max flex flex-col gap-6 bg-primary-1 p-6 rounded-md"
        >
          <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" name="firstName" type="text" required />
            <Input label="Last Name" name="lastName" type="text" required />
          </div>
          <Input label="Email" name="email" type="email" required />
          <Input label="Password" name="password" type="password" required />
          <PhoneInput required name="phone" label="Phone" />
          <Input
            placeholder="Gender"
            label="Gender"
            name="gender"
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
            required
          />
          <Button>Register</Button>
          <div className="w-max mx-auto font-semibold underline text-black">
            <Link href="/login">Already have one?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
