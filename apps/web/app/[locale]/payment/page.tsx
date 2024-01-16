import { FaWindowClose } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

export default function PaymentStatusPage({
  searchParams = { success: "true", canceled: "false" },
}: any) {
  const canceled = detectBoolean(searchParams.canceled);
  return (
    <div className="w-full h-full flex-auto text-center flex flex-col gap-10 items-center justify-center my-10 lg:my-20 px-6 lg:px-12">
      {canceled ? (
        <>
          <h1 className="text-red-500 font-black text-2xl lg:text-4xl flex flex-row items-center justify-center gap-2">
            Payment failed
            <FaWindowClose className="text-2xl lg:text-4xl" />
          </h1>
          <p className="text-red-500 font-medium text-base lg:text-2xl">
            We're sorry, but there was an issue processing your payment. Please
            check your payment details and try again. If you continue to
            experience difficulties, please contact our support team for
            assistance. Thank you for your understanding.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-green-500 font-black text-2xl lg:text-4xl flex flex-row items-center justify-center gap-2">
            Payment confirmed
            <TiTick className="text-2xl lg:text-4xl" />
          </h1>
          <p className="text-green-500 font-medium text-base lg:text-2xl">
            Thank you, your payment has been successful and your product will be
            proceed as soon as possible.
          </p>
        </>
      )}
    </div>
  );
}

const detectBoolean = (value: string) => (value === "true" ? true : false);
