/** @format */
"Client Component";
import level1 from "./../../../assets/images/info/level1.jpg";
import level2 from "./../../../assets/images/info/level2.jpg";
import level3 from "./../../../assets/images/info/level3.jpg";
import level4 from "./../../../assets/images/info/level4.jpg";
import { useTranslations } from "next-intl";

import DownloadPDF from "@app/components/DownloadPDF/DownloadPDF";
export default function Info() {
  const t = useTranslations("pages.info");

  return (
    <div className='  flex flex-col items-center justify-center'>
      <h1 className=' text-2xl md:text-7xl my-9'>{t(`titel`)}</h1>
      <div className='flex   flex-col  items-start  w-full md:w-8/12 md:flex-row'>
        <img className='   w-[400px]' src={level1.src} alt='' />
        <p className=' text-3xl  w-8/12'>{t(`level1`)}</p>
      </div>

      <div className='flex     flex-col    w-full md:w-8/12 md:flex-row'>
        <img className='   w-[400px]' src={level2.src} alt='' />
        <p className=' text-3xl  w-8/12'>{t(`level2`)}</p>
      </div>

      <div className='flex   flex-col    w-full md:w-8/12 md:flex-row'>
        <img className='   w-[400px]' src={level3.src} alt='' />
        <p className=' text-3xl  w-8/12'>{t(`level3`)}</p>
      </div>

      <div className='flex   flex-col    w-full md:w-8/12 md:flex-row'>
        <img className='   w-[400px]' src={level4.src} alt='' />
        <p className='  text-3xl  w-8/12'>{t(`level4`)}</p>
      </div>
      <DownloadPDF></DownloadPDF>

      <div className='flex flex-col  gap-5  w-full md:w-8/12  mb-12'>
        <h1 className='  text-3xl  w-8/12'>{t(`SELECTED_SUPPORT`)}</h1>

        <h2 className='  text-3xl  w-8/12'>{t(`TO_SEW`)}</h2>

        <p className='  text-3xl  w-8/12'>{t(`TO_SEW_text`)}</p>

        <h2 className='  text-3xl  w-8/12'>{t(`THERMO_ADHESIVE`)}</h2>

        <p className='  text-3xl  w-8/12'>{t(`THERMO_ADHESIVE_text`)}</p>

        <h2 className='  text-3xl  w-8/12'>{t(`VELCRO`)}</h2>

        <p className='  text-3xl  w-8/12'>{t(`VELCRO_text`)}</p>
      </div>
    </div>
  );
}
