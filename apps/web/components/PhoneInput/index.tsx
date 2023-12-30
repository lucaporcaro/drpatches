'use client'

import { PhoneInput as Input, PhoneInputProps } from "react-international-phone"

type Props = {
  label?: string;
}

export default function PhoneInput({ label, ...props }: PhoneInputProps & Props) {
  return <div className="w-full h-max flex flex-col items-start justify-start gap-2">
    <span className="font-semibold text-black text-xl">{label}</span>
    <Input
      className="bg-white w-full rounded-md"
      inputClassName="w-full"
      {...props}
    />
  </div>
}
