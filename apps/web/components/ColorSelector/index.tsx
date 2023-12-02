"use client";
import { useEffect, useRef, useState } from "react";
import { SwatchesPicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  label: string;
  value?: string;
  onChange(color: string): void;
};

export default function ColorSelector({
  label,
  value = "#111",
  onChange,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className="w-full h-max relative flex flex-col items-start justify-start gap-2 cursor-pointer"
      onClick={() => setOpen(true)}
      ref={ref}
    >
      <span className="font-semibold text-black text-xl">{label}</span>
      <div className="w-full flex items-center justify-center rounded-xl overflow-hidden">
        <div className="w-10 h-10" style={{ backgroundColor: value }}></div>
        <div className="w-full h-10 text-black outline-none bg-white flex items-center justify-start px-3">
          <span>{value}</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            className="absolute w-max h-max top-[120%] z-10"
            variants={{
              show: {
                opacity: 1,
                scale: 1,
              },
              hidden: {
                opacity: 0,
                scale: 0.9,
              },
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.1 }}
          >
            <SwatchesPicker
              onChangeComplete={({ hex }) => {
                onChange(hex);
                setOpen(false);
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
