import React from "react";
import classes from "./Counter.module.scss";

export const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <button className={classes.btn} onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
};
