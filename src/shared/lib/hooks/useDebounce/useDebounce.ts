import React from "react";

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = React.useRef(null) as React.MutableRefObject<any>;

  return React.useCallback(
    (...args: any[]) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
