import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useMustLoggedIn(redirectAfterLogin = false) {
    // Hooks
    const router = useRouter();
    // States
    useEffect(() => {
        mustLoggedIn(redirectAfterLogin, router)
    }, []);
    return null;
}

export const mustLoggedIn = (redirectAfterLogin: boolean = false, router: AppRouterInstance): void => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("SESSION_TOKEN")) {
        toast.warn('Login required', {autoClose: 3000})
        if (redirectAfterLogin) {
            localStorage.setItem("REDIRECT_AFTER_LOGIN", window.location.href);
        }
        router.replace('/login')
    }
};


