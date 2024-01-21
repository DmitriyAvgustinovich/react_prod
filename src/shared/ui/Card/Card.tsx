import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import cls from "./Card.module.scss";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
};
