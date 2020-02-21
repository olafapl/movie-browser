import { useEffect, RefObject } from "react";

const useOnClickOutside = (
  handler: () => void,
  refs: RefObject<HTMLElement>[]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        refs.every(
          ref => !ref.current || !ref.current.contains(event.target as Node)
        )
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
};

export default useOnClickOutside;
