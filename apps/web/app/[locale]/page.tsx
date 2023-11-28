import Button from "@app/components/Button";
import HeroImage from "@app/assets/images/hero.jpeg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  FaCompassDrafting,
  FaHandHoldingDollar,
  FaTruckMoving,
  FaShield,
} from "react-icons/fa6";

const items = [
  {
    key: "free_design",
    Icon: FaCompassDrafting,
  },
  {
    key: "fair_price",
    Icon: FaHandHoldingDollar,
  },
  {
    key: "fast_turnaround",
    Icon: FaTruckMoving,
  },
  {
    key: "guarantee",
    Icon: FaShield,
  },
];

export default function Page(): JSX.Element {
  const t = useTranslations("pages.home");
  return (
    <main>
      <section className="w-full h-max flex flex-col items-center justify-center py-10 px-8 xl:flex-row-reverse xl:justify-between max-w-9xl">
        <div className="w-max h-max">
          <img
            src={HeroImage.src}
            alt="Hero Image"
            className="w-full max-w-[545px] aspect-auto rounded-3xl xl:max-w-[720px]"
          />
        </div>
        <div className="w-full max-w-[706px] px-8 py-4 text-black flex flex-col items-center justify-center gap-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
            {t("hero.title")}
          </h2>
          <p className="text-lg md:text-xl font-medium">{t("hero.subtitle")}</p>
          <Link href="/create">
            <Button>{t("hero.order_now")}</Button>
          </Link>
        </div>
      </section>
      <section className="w-full h-max flex flex-col items-center justify-center py-10 px-8 bg-primary-1 text-black gap-8 lg:gap-10 lg:py-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
          {t("why_us.title")}
        </h2>
        <p className="w-11/12 max-w-[1134px] text-center text-base md:text-lg lg:text-2xl font-medium">
          {t("why_us.description")}
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 place-items-center place-content-between">
          {items.map(({ key, Icon }, i) => {
            return (
              <div className="w-max h-max flex flex-col items-center justify-center gap-8">
                <Icon className="aspect-auto text-black" size={44} />
                <div className="w-max min-w-full flex flex-col items-center justify-center gap-3.5">
                  <span className="text-2xl font-bold">
                    {t(`why_us.items.${key}.title`)}
                  </span>
                  <span className="text-xl font-medium">
                    {t(`why_us.items.${key}.description`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/create">
          <Button>{t("why_us.customize_now")}</Button>
        </Link>
      </section>
    </main>
  );
}
