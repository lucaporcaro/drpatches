/** @format */

import { FaWindowClose } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useTranslations } from "next-intl";
export default function PaymentStatusPage({
  searchParams = { success: "true", canceled: "false" },
}: any) {
  const t = useTranslations("pages.payment");
  const success = detectBoolean(searchParams.success);
  return (
    <div className='w-full h-full flex-auto text-center flex flex-col gap-10 items-center justify-center my-10 lg:my-20 px-6 lg:px-12'>
      {success ? (
        <>
          <h1 className='text-green-500 font-black text-2xl lg:text-4xl flex flex-row items-center justify-center gap-2'>
            {t("success")}
            <TiTick className='text-2xl lg:text-4xl' />
          </h1>
          <p className='text-green-500 font-medium text-base lg:text-2xl'>
          {t("successMsg")}
          </p>
        </>
      ) : (
        <>
          <h1 className='text-red-500 font-black text-2xl lg:text-4xl flex flex-row items-center justify-center gap-2'>
          {t("error")}
            <FaWindowClose className='text-2xl lg:text-4xl' />
          </h1>
          <p className='text-red-500 font-medium text-base lg:text-2xl'>
          {t("errorMsg")}
          </p>
        </>
      )}
    </div>
  );
}

const detectBoolean = (value: string) => (value === "true" ? true : false);
