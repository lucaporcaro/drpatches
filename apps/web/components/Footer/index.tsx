import { useTranslations } from "next-intl";
import { FaCcVisa, FaPaypal, FaCcMastercard } from "react-icons/fa6";

export default function Footer() {
  const t = useTranslations("components.footer");
  return (
    <footer className="w-full h-max py-10 px-8 gap-2.5 flex flex-col items-start justify-start text-white bg-black">
      <div className="w-max h-max flex flex-col items-start justify-start gap-6">
        <span className="text-4xl font-black">{t("title")}</span>
        <span className="text-2xl font-medium">{t("description")}</span>
        <div className="w-max flex flex-row items-center justify-center gap-6 flex-wrap">
          <FaCcVisa className="w-10 aspect-auto text-primary-1" size={40} />
          <FaPaypal className="w-10 aspect-auto text-primary-1" size={40} />
          <FaCcMastercard
            className="w-11 aspect-auto text-primary-1"
            size={40}
          />
        </div>
      </div>
      <div className="w-full h-max flex items-center justify-center">
        <span className="text-2xl font-medium">
          ©{new Date().getFullYear()} {t("copyright")}
        </span>
      </div>
    </footer>
  );
}
