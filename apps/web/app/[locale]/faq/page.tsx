import { useTranslations } from "next-intl";

const items = [
  {
    key: "item_1",
  },
  {
    key: "item_2",
  },
  {
    key: "item_3",
  },
  {
    key: "item_4",
  },
  {
    key: "item_5",
  },
  {
    key: "item_6",
  },
  {
    key: "item_7",
  },
  {
    key: "item_8",
  },
  {
    key: "item_9",
  },
  {
    key: "item_10",
  },
];

export default function FAQPage() {
  const t = useTranslations("pages.faq");
  return (
    <div className="w-full h-max max-w-[1620px] mx-auto py-4 flex flex-col gap-4">
      {items.map(({ key }) => (
        <section className="w-full h-max p-4 flex flex-col items-start justify-start gap-4 text-left font-montserrat">
          <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-left">
            {t(`items.${key}.title`)}
          </div>
          <p className="font-normal text-left">
            {t(`items.${key}.description`)}
          </p>
        </section>
      ))}
    </div>
  );
}
