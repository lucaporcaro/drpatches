"use client";

import { login } from "@app/actions/auth";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import Link from "@app/components/Link";
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

export default function LoginPage() {
  // Hooks
  const router = useRouter();
  const t = useTranslations("pages.login");
  useNoLoginRequired();

  // Functions
  async function loginWithErrors(formData: FormData) {
    return await lastValueFrom(
      from(
        login(
          formData.get("email") as string,
          formData.get("password") as string
        )
      ).pipe(
        concatMap((result) => {
          if (typeof result === "string") {
            localStorage.setItem("SESSION_TOKEN", result);
            toast.success("You logged in successfully");
            const REDIRECT_AFTER_LOGIN = localStorage.getItem(
              "REDIRECT_AFTER_LOGIN"
            );
            if (REDIRECT_AFTER_LOGIN)
              localStorage.removeItem("REDIRECT_AFTER_LOGIN");
            router.replace(REDIRECT_AFTER_LOGIN ?? "/");
            return timer(1000);
          } else {
            throw new Error("Your email or password is incorrect");
          }
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
    <div className="w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12">
      <div className="w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10">
        <h2 className="font-bold text-2xl lg:text-3xl">{t(`login`)}</h2>
        <form
          action={loginWithErrors}
          className="w-full h-max flex flex-col gap-6 bg-primary-1 p-6 rounded-md"
        >
          <Input label={t('email')} name="email" type="email" required />
          <Input label={t('password')} name="password" type="password" required />
          <Button>{t(`login`)}</Button>
          <div className="w-max mx-auto font-semibold underline text-black">
            <Link href="/register">{t(`need_account`)}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
