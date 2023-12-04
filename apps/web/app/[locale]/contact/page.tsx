import { type IconType } from "react-icons";
import { FaMarker, FaEnvelope, FaFax } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";

const contactItems: {
  Icon: IconType;
  title: string;
  content: string;
}[] = [
  {
    Icon: FaMarker,
    title: "Address",
    content: "Via Generale Luigi Parisi, 104/F, 84013 Cava de' Tirreni SA",
  },
  {
    Icon: BsTelephoneFill,
    title: "Telephone",
    content: "+39 3297175501",
  },
  {
    Icon: FaEnvelope,
    title: "Email",
    content: "info@drpatches.com",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full h-max flex flex-col gap-8 items-center justify-center">
      <div className="w-full h-max flex place-items-center place-content-center gap-2 py-8 min-h-[59vh]">
        {contactItems.map(({ title, content, Icon }, i) => (
          <div
            className="w-[320px] h-[320px] flex flex-col items-center justify-center bg-primary-1 px-4 py-6 gap-5 rounded-sm"
            key={`contact_${i}_${title}`}
          >
            <Icon size={52} />
            <div className="w-full h-max flex flex-col items-center justify-center gap-4">
              <span className="font-black text-3xl">{title}</span>
              <span className="font-normal text-xl">{content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
