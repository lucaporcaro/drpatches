import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function ButtonCustom({
  children,
  className,
  ...props
}: { children: React.ReactNode } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={["bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full", className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
