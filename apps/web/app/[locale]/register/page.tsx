/** @format */

"use client";

import { register } from "@app/actions/auth";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import Link from "@app/components/Link";
import PhoneInput from "@app/components/PhoneInput";
import useNoLoginRequired from "@app/hooks/useNoLoginRequired";
import { useTranslations } from "next-intl";
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

export default function RegisterPage() {
  // Hooks
  const router = useRouter();
  const t = useTranslations("pages.login");
  const tr = useTranslations("pages.shared");
  useNoLoginRequired();

  // Functions
  async function registerWithErrors(formData: FormData) {
    const payload: Record<string, string> = Object.fromEntries(
      formData.entries()
    ) as any;
    return lastValueFrom(
      from(register(payload)).pipe(
        concatMap((result) => {
          if (typeof result !== "string") throw new Error(result.error);
          localStorage.setItem("SESSION_TOKEN", result);
          toast.success("You registered successfully");
          const REDIRECT_AFTER_LOGIN = localStorage.getItem(
            "REDIRECT_AFTER_LOGIN"
          );
          if (REDIRECT_AFTER_LOGIN)
            localStorage.removeItem("REDIRECT_AFTER_LOGIN");
          router.replace(REDIRECT_AFTER_LOGIN ?? "/");
          return timer(1000);
        }),
        tap(() => window.location.reload()),
        catchError((e) => {
          toast.error(e.message);
          return of(null);
        })
      )
    );
  }
  return (
    <div className='w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-2 lg:px-12'>
      <div className='w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10'>
        <h2 className='font-bold text-2xl lg:text-3xl'>Register</h2>
        <form
          action={registerWithErrors}
          className='w-full h-max flex flex-col gap-2 bg-primary-1 p-2 md:p-6 md:gap-6 rounded-md'>
          <div className='w-full h-max grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              label={t("first_name")}
              name='firstName'
              type='text'
              required
            />
            <Input
              label={t("last_name")}
              name='lastName'
              type='text'
              required
            />
          </div>
          <Input label={t("email")} name='email' type='email' required />
          <Input
            label={t("password")}
            name='password'
            type='password'
            required
          />
          <PhoneInput required name='phone' label={tr("telephone")} />
          <Input label={t("fiscal_code")} name='fiscal' type='text' required />
          <Button>{tr("register")}</Button>
          <div className='w-max mx-auto font-semibold underline text-black'>
            <Link href='/login'>{tr("have_accont")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
