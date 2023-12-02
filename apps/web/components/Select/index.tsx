"use client";
import { useState } from "react";

export type SelectItem = {
  id: string;
  image: string;
};

type Props = {
  value?: string;
  label: string;
  items: SelectItem[];
  onChange(v: string): void;
};

export default function Select({ value, label, items, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen((open) => !open);
  return (
    <div className="w-full h-max">
      <div className="w-max flex flex-row items-center justify-start gap-4">
        <span className="font-semibold text-xl">{label}</span>
        <div
          className="bg-white w-max h-max rounded-md overflow-hidden cursor-pointer p-2"
          onClick={toggle}
        >
          {value ? (
            <img
              src={(items.filter(({ id }) => id === value)[0] as any).image}
              className="w-10 aspect-auto"
            />
          ) : (
            <span className="font-semibold text-sm">Choose</span>
          )}
        </div>
      </div>
      {open ? (
        <div
          className="w-screen h-screen fixed z-20 top-0 left-0 bg-black/30 flex items-center justify-center"
          onClick={toggle}
        >
          <div className="w-11/12 h-max max-w-[600px] py-10 px-6 bg-black rounded-lg grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 border-primary-1 border-2">
            {items.map((item, i) => (
              <div
                key={`select_item_${item.id}_${i}`}
                className="w-max h-max bg-white p-3 rounded-lg hover:bg-primary-1 transition-all duration-200 cursor-pointer"
                onClick={() => onChange(item.id)}
              >
                <img className="w-16 aspect-auto" src={item.image} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
