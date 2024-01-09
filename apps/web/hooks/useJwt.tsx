import { useEffect, useState } from "react";
import { filter, fromEvent, map, startWith, takeUntil } from "rxjs";

export default function useJwt() {
  // States
  const [jwt, setJwt] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    const destroy$ = fromEvent(window, "beforeunload");

    const KEY = "SESSION_TOKEN";

    const subscription = fromEvent<StorageEvent>(window, "storage")
      .pipe(
        filter((event) => event.key === KEY),
        map((event) => event.newValue),
        startWith(localStorage.getItem(KEY)),
        takeUntil(destroy$)
      )
      .subscribe((newJwt) => setJwt(newJwt));

    return () => {
      subscription.unsubscribe();
      setJwt(null);
    };
  }, []);

  return jwt;
}
