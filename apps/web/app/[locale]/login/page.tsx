"use client";

import { login } from "@app/actions/auth";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import Link from "@app/components/Link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  // Functions
  async function loginWithErrors(formData: FormData) {
    const result = await login(
      formData.get("email") as string,
      formData.get("password") as string
    );
    if (result) {
      toast.success("You logged in successfully");
      router.replace("/");
      setTimeout(router.refresh, 1000);
    } else toast.error("Your email or password is incorrect");
  }
  return (
    <div className="w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12">
      <div className="w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10">
        <h2 className="font-bold text-2xl lg:text-3xl">Login</h2>
        <form
          action={loginWithErrors}
          className="w-full h-max flex flex-col gap-6 bg-primary-1 p-6 rounded-md"
        >
          <Input label="Email" name="email" type="email" required />
          <Input label="Password" name="password" type="password" required />
          <Button>Login</Button>
          <div className="w-max mx-auto font-semibold underline text-black">
            <Link href="/register">Need an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
