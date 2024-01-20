import React from "react";

export const useInitialEffect = (callback: () => void) => {
  React.useEffect(() => {
    if (__PROJECT__ !== "storybook") callback();
    // eslint-disable-next-line
  }, []);
};
