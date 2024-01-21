import React from "react";

interface UseHoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverBind];

export const useHover = () => {
  const [isHover, setIsHover] = React.useState(false);

  const onMouseEnter = React.useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = React.useCallback(() => {
    setIsHover(false);
  }, []);

  return React.useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseEnter, onMouseLeave]
  );
};
