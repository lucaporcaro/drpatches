import { useParams } from "next/navigation";

export default function PaymentStatusPage() {
  const {} = useParams();
  return (
    <div className="w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12">
      Hello World
    </div>
  );
}
