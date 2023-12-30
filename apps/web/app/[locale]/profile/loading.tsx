'use client'

import Loading from "react-loading";

export default function ProfileLoading() {
  return <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
    <Loading type="spin" width={24} height={24} color="white" />
  </div>
}
