/** @format */
"use client";
import { useTranslations } from "next-intl";


export default function DownloadPDF() {
    const tr = useTranslations("pages.info");
  const downloadHandler = () => {
    
    window.open("colors.pdf", "_blank");
  };
  return (
    <div onClick={downloadHandler} className='mb-10'>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">{tr("Color")}</button>
    </div>
  );
}
