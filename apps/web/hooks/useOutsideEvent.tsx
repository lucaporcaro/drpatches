import { useEffect } from "react";
import { filter, fromEvent } from "rxjs";

type Props = {
  ref: React.RefObject<HTMLElement>;
  callback(): void;
};

export default function useOutsideEvent({ ref, callback }: Props) {
  useEffect(() => {
    const subscription = fromEvent(document, "mousedown")
      .pipe(
        filter(
          (event) =>
            (ref.current &&
              !ref.current.contains((event as any).target)) as boolean
        )
      )
      .subscribe(() => {
        callback();
      });
    return () => {
      // Unbind the event listener on clean up
      subscription.unsubscribe();
    };
  }, [ref]);
}
