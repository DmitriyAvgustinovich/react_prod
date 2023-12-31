import { Button } from "shared/ui/Button/Button";
import React from "react";

export const BugButton = () => {
  const [error, setError] = React.useState(false);

  const onThrow = () => {
    setError(true);
  };

  React.useEffect(() => {
    if (error) throw new Error();
  }, [error]);

  return <Button onClick={onThrow}>Ошибка</Button>;
};
