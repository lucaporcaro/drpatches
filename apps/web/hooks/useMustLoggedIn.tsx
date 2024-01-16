import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMustLoggedIn(redirectAfterLogin = false) {
  // Hooks
  const router = useRouter();
  // States
  useEffect(() => {
    if (!window) return;
    if (!localStorage.getItem("SESSION_TOKEN")) {
      if (redirectAfterLogin)
        localStorage.setItem("REDIRECT_AFTER_LOGIN", window.location.href);
      router.replace("/login");
    }
  }, []);
  return null;
}
