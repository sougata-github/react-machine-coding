import { useRef, useEffect } from "react";

export function useOutsideClick(handler) {
  const elementRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        handler();
      }
    }

    window.addEventListener("click", handleClick, true);

    return () => window.removeEventListener("click", handleClick, true);
  }, [handler]);

  return elementRef;
}
