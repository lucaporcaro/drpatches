/** @format */

import { useTranslations } from "next-intl";
import { FaCcVisa, FaPaypal, FaCcMastercard } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("components.footer");
  const tr = useTranslations("pages.shared");
  return (
    <footer className='w-full h-max py-10 px-8 gap-2.5 flex flex-col items-start justify-start text-white bg-black'>
      <div className='w-max h-max flex flex-col items-start justify-start gap-6'>
        <span className='text-4xl font-black'>{t("title")}</span>
        <span className='text-2xl font-medium'>{t("description")}</span>
        <div className='w-max flex flex-row items-center justify-center gap-6 flex-wrap'>
          <FaCcVisa className='w-10 aspect-auto text-primary-1' size={40} />
          <FaCcMastercard
            className='w-11 aspect-auto text-primary-1'
            size={40}
          />
          <FaPaypal className='w-10 aspect-auto text-primary-1' size={40} />
        </div>
      </div>
      <div className='flex  w-full items-center justify-center'>
        <div className='w-fit h-max flex-col  md:flex-row flex justify-between items-center '>
          <Link
            href='/privacy'
            className='px-2 link'
            style={{ color: "#FFCC10", cursor: "pointer" }}>
            <span className='hoverEffect uppercase'>{t("privacy")}</span>
          </Link>
          <Link
            href='/condizioni_generali'
            className='px-2 link'
            style={{ color: "#FFCC10", cursor: "pointer" }}>
            <span className='hoverEffect uppercase'>
              {" "}
              {t("condizioni_generali")}
            </span>
          </Link>
          <Link
            href='/spedizioni'
            className='px-2 link'
            style={{ color: "#FFCC10", cursor: "pointer" }}>
            <span className='hoverEffect uppercase'>{t("spedizioni")}</span>
          </Link>
          <Link
            href='/contact'
            className='px-2 link'
            style={{ color: "#FFCC10", cursor: "pointer" }}>
            <span className='hoverEffect uppercase'>{t("contact")}</span>
          </Link>

          <Link
            href='/info'
            className='px-2 link'
            style={{ color: "#FFCC10", cursor: "pointer" }}>
            <span className='hoverEffect uppercase'>{tr("info")}</span>
          </Link>

          
        </div>
      </div>

      <div className='w-full h-max flex items-center justify-center'>
        <span className='font-medium'>
          ©{new Date().getFullYear()} Dr. Patches di Chierchia Vincenzo - P.IVA
          02971270653 - All right reserved
        </span>
      </div>
    </footer>
  );
}
