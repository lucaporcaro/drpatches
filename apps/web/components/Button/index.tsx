import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button({
  children,
  ...props
}: { children: React.ReactNode } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className="p-4 bg-black flex items-center justify-center rounded-xl font-semibold text-base text-white"
      {...props}
    >
      {children}
    </button>
  );
}
