"use client";

import Loading from "@app/components/Loading";
import useNoLoginRequired from "@app/hooks/useNoLoginRequired";
import { useEffect } from "react";
import { tap, timer } from "rxjs";

export default function LogoutPage() {
  // Hooks
  useNoLoginRequired();

  // Effects
  useEffect(() => {
    if (!window) return;
    localStorage.clear();
    const subscription = timer(1500)
      .pipe(tap(() => (window.location.href = "/")))
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return <Loading />;
}
