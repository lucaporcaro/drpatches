import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useNoLoginRequired() {
  // Hooks
  const router = useRouter();
  // States
  useEffect(() => {
    if (!window) return;
    if (localStorage.getItem("SESSION_TOKEN")) {
      router.replace("/");
    }
  }, []);
}
