"use client";
import Link from "next/link";
import { FaLocationArrow, FaUser } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";
import { useMustLoggedIn } from "@app/hooks/useMustLoggedIn";

const sidebarItems = [
  {
    label: "Personal Information",
    Icon: FaUser,
    link: "/profile",
  },
  {
    label: "Addresses",
    Icon: FaLocationArrow,
    link: "/profile/addresses",
  },
  {
    label: "Products",
    Icon: CiShop,
    link: "/profile/products",
  },
];

export default function ProfilePage({ children }: { children: any }) {
  // Hooks
  useMustLoggedIn();

  return (
    <div className="w-full h-max min-h-full flex-auto grid grid-cols-1 grid-rows-4 lg:grid-rows-1 lg:grid-cols-6 p-4 gap-2 place-items-center place-content-center">
      <div className="w-full h-max p-4 lg:h-full lg:min-h-[484px] lg:col-span-2 xl:col-span-1 bg-primary-1 border-[1px] rounded-xl flex flex-row gap-10 lg:flex-col lg:py-10">
        {sidebarItems.map(({ Icon, label, link }) => (
          <Link href={link} key={`dashboard_sidebar_${link}`} prefetch>
            <div className="text-white flex flex-col items-center justify-start gap-4 lg:flex-row bg-black p-4 rounded-md">
              <Icon className="w-6 h-6" />
              <span className="font-semibold text-sm">{label}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full h-full bg-primary-1 rounded-md row-span-3 lg:col-span-4 xl:col-span-5">
        {children}
      </div>
    </div>
  );
}
