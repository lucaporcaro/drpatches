import { type IconType } from "react-icons";
import { FaMarker, FaEnvelope, FaFax } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { useTranslations } from "next-intl";

const contactItems: {
  Icon: IconType;
  key: string;
}[] = [
  {
    Icon: FaMarker,
    key: "location",
  },
  {
    Icon: BsTelephoneFill,
    key: "phone",
  },
  {
    Icon: FaFax,
    key: "fax",
  },
  {
    Icon: FaEnvelope,
    key: "email",
  },
];

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  return (
    <div className="w-full h-max flex flex-col gap-8 items-center justify-center">
      <div className="w-full h-max flex place-items-center place-content-center gap-2 py-8 min-h-[59vh]">
        {contactItems.map(({ key, Icon }, i) => (
          <div
            className="w-[320px] h-[320px] flex flex-col items-center justify-center bg-primary-1 px-4 py-6 gap-5 rounded-sm"
            key={`contact_${i}_${key}`}
          >
            <Icon size={52} />
            <div className="w-full h-max flex flex-col items-center justify-center gap-4">
              <span className="font-black text-3xl">
                {t(`items.${key}.title`)}
              </span>
              <span className="font-normal text-xl">
                {t(`items.${key}.content`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
