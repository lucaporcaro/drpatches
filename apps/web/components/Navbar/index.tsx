"use client";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {useMemo, useRef, useState} from "react";
import {FaBasketShopping, FaFacebookF, FaInstagram, FaWhatsapp,} from "react-icons/fa6";

import Logo from "@app/assets/images/logo.svg";
import Image from "next/image";
import LanguageSelector from "../LanguageSelector";
import useOutsideEvent from "@app/hooks/useOutsideEvent";
import {useSelector} from "react-redux";
import {RootState} from "@app/store";
import ButtonCustom from "../ButtonCustom";
import MobileLanguageSelector from "@app/components/MobileLanguageSelector";

const Navbar = () => {
    // States
    const [open, setOpen] = useState<boolean>(false);
    const t = useTranslations("components.navbar");
    const user: any = useSelector((state: RootState) => state.user);

    // Memo
    const isLoggedIn = useMemo(() => Object.keys(user).length !== 0, [user]);

    // Refs
    const ref = useRef<HTMLDivElement | null>(null);

    // Hooks
    useOutsideEvent({
        ref,
        callback() {

            setOpen(false)

        },
    });

    return (
        <nav className="w-full h-max bg-black py-4 px-8 flex flex-col gap-6 font-bold">
            <div className="w-full h-max items-center justify-between hidden md:flex">
                <div className="w-max h-max flex flex-row items-center justify-center gap-10">
                    <FaInstagram className="w-max h-max text-white" size={18}/>
                    <FaFacebookF className="w-max h-max text-white" size={18}/>
                    <FaWhatsapp className="w-max h-max text-white" size={18}/>
                </div>
                <div className="w-max h-max flex items-center justify-center gap-6 text-white font-bold text-base">
                    <Link href="/about" className="link">
                        <span className="hoverEffect"> {t("links.aboutus")}</span>
                    </Link>
                    <Link href="/faq" className="link">
                        <span className="hoverEffect">{t("links.faq")}</span>
                    </Link>
                    {/* <Link href="/contact" className="link">
              <span className="hoverEffect"> {t("links.contact")}</span>
          </Link> */}
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/profile"
                                className="border-white border-b-[1px] pb-1"
                            >{`${user.firstName} ${user.lastName}`}</Link>{" "}
                            <Link href="/logout" className="link w-max max-w-[160px] text-center">
                                <span className="hoverEffect">Logout</span>
                            </Link>
                        </>
                    ) : (
                        <Link href="/login" className="link">
                            <span className="hoverEffect"> {t("links.login")}</span>
                        </Link>
                    )}
                    <LanguageSelector/>
                </div>
            </div>
            <div className="w-full h-max flex items-center justify-between">
                <Link href="/">
                    <Image
                        width={175}
                        height={46}
                        alt="Logo"
                        className="w-full aspect-auto max-w-[175px] bg-black"
                        loading="eager"
                        src={Logo}
                    />
                </Link>
                <div
                    className="w-max h-max items-center justify-center gap-6 text-white font-bold text-base hidden md:flex">
                    <Link href="/product/create" className="link">
                        {/* <span className="hoverEffect"> {t("links.examples")}</span> */}
                        <ButtonCustom className="hoverButtonEffect">{t("links.examples")}</ButtonCustom>
                    </Link>

                    <Link href="/profile/products" passHref className="link">
                        <FaBasketShopping className="text-white w-8 aspect-auto hoverEffect"/>
                    </Link>
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
                        className="flex w-[240px] z-40 md:hidden flex-col items-center justify-start py-4 gap-4 fixed top-0 left-0 z-20 animate-show-navbar w-40 h-screen bg-black border-r-primary-1 border-r-[1px]"
                    >
            <span className="font-bold text-xl text-white py-4">
              Dr.Patches
            </span>
                        <div
                            className="w-max h-max flex flex-col items-center justify-center gap-6 text-white font-bold text-base">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="w-full max-w-[160px] text-center"
                                    >
                                        {`${user.firstName} ${user.lastName}`}
                                    </Link>
                                    <Link
                                        href="/logout"
                                        className="w-full max-w-[160px] text-center"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link href="/login">{t("links.login")}</Link>
                            )}
                            <Link href="/product/create" className="link">
                                <span className="hoverEffect"> {t("links.examples")}</span>
                            </Link>
                            <Link href="/about" className="link">
                                <span className="hoverEffect"> {t("links.aboutus")}</span>
                            </Link>
                            {/* <Link href="/contact" className="link">
                <span className="hoverEffect">{t("links.contact")}</span>
              </Link> */}
                            <Link href="/faq" className="link">
                                <span className="hoverEffect">{t("links.faq")}</span>
                            </Link>
                        </div>
                        <MobileLanguageSelector/>
                        {/* <div className="w-max h-max flex flex-row items-center justify-center gap-5">
              <FaInstagram className="w-4 aspect-auto text-white" />
              <FaFacebookF className="w-3 aspect-auto text-white" />
              <FaWhatsapp className="w-4 aspect-auto text-white" />
            </div> */}
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
