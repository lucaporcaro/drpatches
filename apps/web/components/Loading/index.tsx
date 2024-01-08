import LoadingR from "react-loading";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-auto flex-col items-center justify-center gap-4 p-8">
      <LoadingR type="spin" width={24} height={24} color="black" />
    </div>
  );
}
