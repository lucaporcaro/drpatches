import JourneyImage from "@app/assets/images/about/journey.jpg";
import AimImage from "@app/assets/images/about/aim.jpg";
import CustomizationImage from "@app/assets/images/about/customization.jpg";
import FamilyImage from "@app/assets/images/about/family.jpg";
import ForYouImage from "@app/assets/images/about/for_you.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const items = [
  {
    image: {
      src: JourneyImage.src,
      blur: "LBDS8jNd00ni~BNbMdsnMxNHx^%1",
    },
    key: "journey",
  },
  {
    image: {
      src: AimImage.src,
      blur: "L7G+5WDN?wImT|xHVZngK4RjIUS}",
    },
    key: "aim",
  },
  {
    image: {
      src: CustomizationImage.src,
      blur: "LSL47}*J-:Q-tm=_IpR-E5$fWCTJ",
    },
    key: "customization",
  },
  {
    image: {
      src: FamilyImage.src,
      blur: "LAH.TpRQORD*?b9Y_4-;%fNb4T-;",
    },
    key: "family",
  },
  {
    image: {
      src: ForYouImage.src,
      blur: "LTEVpft.%%s;RhITRjRj9Y-nn3oc",
    },
    key: "for_you",
  },
] satisfies {
  image: {
    src: string;
    blur?: string;
  };
  key: string;
}[];

export default function AboutPage() {
  const t = useTranslations("pages.about_us");
  return (
<div className="w-full h-max mx-auto py-8 flex flex-col gap-8">
  {items.map(({ image: { src, blur }, key }, i) => (
    <section
      key={`image_about_${i}_${key}`}
      className="flex items-center px-10 gap-4 font-montserrat"
    >
      <figure className="m-0 max-w-sm w-full h-[20rem] overflow-hidden flex items-center justify-end">
        <Image
          src={src}
          blurDataURL={blur}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: 458,
            borderRadius: '1rem'
          }}
          width={1556}
          height={458}
          alt={key}
        />
      </figure>
      <div className="flex-grow">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {t(`items.${key}.title`)}
          </h3>
          <p className="font-normal text-lg md:text-xl lg:text-2xl">
            {t(`items.${key}.description`)}
          </p>
        </div>
    </section>
  ))}
</div>
  );
}
