import Button from "@app/components/Button";
import HeroImage from "@app/assets/images/hero.jpeg";
import Link from "@app/components/Link";
import { useTranslations } from "next-intl";
import {
  FaCompassDrafting,
  FaHandHoldingDollar,
  FaTruckMoving,
  FaShield,
} from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";

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
  {
    key: "fast_and_secure",
    Icon: FaShippingFast,
  },
];

export default function Page(): JSX.Element {
  const t = useTranslations("pages.home");
  return (
    <main className="w-full">
      <section className="w-full h-max flex flex-col items-center justify-center py-10 px-8 xl:flex-row-reverse xl:justify-between max-w-9xl">
        <div className="w-max h-max">
          <img
            src={HeroImage.src}
            alt="Hero Image"
            className="w-full max-w-[545px] aspect-auto rounded-3xl xl:max-w-[720px]"
          />
        </div>
        <div className="w-full max-w-[706px] px-8 py-4 text-black flex flex-col items-center justify-center gap-8 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold">
            {t("hero.title")}
          </h2>
          <p className="text-lg md:text-xl font-medium" style={{color: '#464853'}}>{t("hero.subtitle")}</p>
          <Link href="/product/create">
            <Button className="hoverButtonEffect">{t("why_us.customize_now")}</Button>
          </Link>
        </div>
      </section>
      <section className="w-full h-max flex flex-col items-center justify-center py-10 px-8 bg-primary-1 text-black gap-8 lg:gap-10 lg:py-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
          {t("why_us.title")}
        </h2>
        <p className="w-11/12 max-w-[1134px] text-justify text-base md:text-lg lg:text-2xl font-normal">
          {t("why_us.description")}
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:my-6 gap-y-10 place-items-start place-content-between">
          {items.map(({ key, Icon }, i) => {
            return (
              <div
                className="w-max h-max flex flex-col items-center justify-center gap-8 max-w-xs"
                key={`${i}_${key}`}
              >
                <Icon className="aspect-auto text-black" size={44} />
                <div className="w-full text-center min-w-full flex flex-col items-center justify-center gap-3.5">
                  <span className="text-2xl font-bold">
                    {t(`why_us.items.${key}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/product/create">
          <Button className="hoverButtonEffect">{t("why_us.customize_now")}</Button>
        </Link>
      </section>
    </main>
  );
}
