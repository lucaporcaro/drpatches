"use client";
import { useTranslations } from "next-intl";
import Link from "@app/components/Link";
import { useState, useRef } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaBasketShopping,
} from "react-icons/fa6";

import Logo from "@app/assets/images/logo.svg";
import Image from "next/image";
import LanguageSelector from "../LanguageSelector";
import useOutsideEvent from "@app/hooks/useOutsideEvent";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations("components.navbar");

  // Refs
  const ref = useRef<HTMLDivElement | null>(null);

  // Hooks
  useOutsideEvent({
    ref,
    callback() {
      setOpen(false);
    },
  });

  return (
    <nav className="w-full h-max bg-black py-4 px-8 flex flex-col gap-6">
      <div className="w-full h-max items-center justify-between hidden md:flex">
        <div className="w-max h-max flex flex-row items-center justify-center gap-10">
          <FaInstagram className="w-max h-max text-white" size={18} />
          <FaFacebookF className="w-max h-max text-white" size={18} />
          <FaWhatsapp className="w-max h-max text-white" size={18} />
        </div>
        <div className="w-max h-max flex items-center justify-center gap-6 text-white font-medium text-base">
          <Link href="/contact">{t("links.contact")}</Link>
          <Link href="/login">{t("links.login")}</Link>
          <LanguageSelector />
        </div>
      </div>
      <div className="w-full h-max flex items-center justify-between">
        <Link href="/">
          <Image
            width={175}
            height={46}
            alt="Logo"
            className="w-full aspect-auto max-w-[175px]"
            loading="eager"
            src={Logo}
          />
        </Link>
        <div className="w-max h-max items-center justify-center gap-6 text-white font-medium text-base hidden md:flex">
          <Link href="/product/create">{t("links.examples")}</Link>
          <Link href="/about">{t("links.aboutus")}</Link>
          <FaBasketShopping className="text-white w-8 aspect-auto" />
        </div>
        <div
          className="w-10 h-max flex md:hidden flex-col gap-2 cursor-pointer"
          onClick={!open ? () => setOpen(true) : undefined}
        >
          <div
            className="w-full h-0.5 bg-white transition-all duration-300 data-[open=true]:-rotate-45"
            data-open={open}
          ></div>
          <div
            className="w-full h-0.5 bg-white transition-all duration-300 data-[open=true]:hidden"
            data-open={open}
          ></div>
          <div
            className="w-full h-0.5 bg-white transition-all duration-300 data-[open=true]:rotate-45 data-[open=true]:-translate-y-[.56rem]"
            data-open={open}
          ></div>
        </div>
        {open ? (
          <div
            ref={ref}
            className="flex md:hidden flex-col items-center justify-start py-4 gap-4 fixed top-0 left-0 z-20 animate-show-navbar w-40 h-screen bg-black border-r-primary-1 border-r-[1px]"
          >
            <span className="font-bold text-xl text-white py-4">
              Dr.Patches
            </span>
            <div className="w-max h-max flex flex-col items-center justify-center gap-6 text-white font-medium text-base">
              <Link href="/login">{t("links.login")}</Link>
              <Link href="/product/create">{t("links.examples")}</Link>
              <Link href="/about">{t("links.aboutus")}</Link>
              <Link href="/contact">{t("links.contact")}</Link>
            </div>
            <div className="text-white font-bold text-xs flex items-center justify-center gap-2 mt-auto">
              <span>{t("language")}:</span>
              <span className="border-b-[.5px] border-b-white pb-1">EN</span>
            </div>
            <div className="w-max h-max flex flex-row items-center justify-center gap-5">
              <FaInstagram className="w-4 aspect-auto text-white" />
              <FaFacebookF className="w-3 aspect-auto text-white" />
              <FaWhatsapp className="w-4 aspect-auto text-white" />
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
