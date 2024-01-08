import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMustLoggedIn() {
  // Hooks
  const router = useRouter();
  // States
  useEffect(() => {
    if (!window) return;
    if (!localStorage.getItem("SESSION_TOKEN")) {
      router.replace("/login");
    }
  }, []);
  return null;
}
