import { useTranslations } from "next-intl";

const items = [
  {
    key: "item_1",
  },
  {
    key: "item_2",
  }
];

export default function CondizioniGeneraliPage() {
  const t = useTranslations("pages.condizioni_generali");
  return (
    <div className="w-full h-max max-w-[1620px] mx-auto py-8 flex flex-col gap-8">
      {items.map(({ key }, i) => (
        <section
          className="w-full h-max p-8 flex flex-col items-center justify-end gap-8 text-justify font-montserrat"
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {t(`items.${key}.title`)}
          </div>
          <p className="font-small text-sm">
            {t(`items.${key}.description`)}
          </p>
        </section>
      ))}
    </div>
  );
}
