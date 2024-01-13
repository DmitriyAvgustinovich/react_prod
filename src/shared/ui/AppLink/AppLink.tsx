import { classNames } from "shared/lib/classNames/classNames";
import { Link, LinkProps } from "react-router-dom";
import React from "react";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  RED = "red",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: React.ReactNode;
}

export const AppLink = React.memo((props: AppLinkProps) => {
  const {
    to,
    children,
    className,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
