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
    <div className="w-full h-max max-w-[1620px] mx-auto py-8 flex flex-col gap-8">
      {items.map(({ key }, i) => (
        <section
          className="w-full h-max p-8 flex flex-col items-center justify-end gap-8 text-justify font-montserrat"
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {t(`items.${key}.title`)}
          </div>
          <p className="font-normal text-lg md:text-xl lg:text-2xl">
            {t(`items.${key}.description`)}
          </p>
        </section>
      ))}
    </div>
  );
}
