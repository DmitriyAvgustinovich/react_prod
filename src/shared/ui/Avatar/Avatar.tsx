import { Mods, classNames } from "shared/lib/classNames/classNames";
import React from "react";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = React.memo((props: AvatarProps) => {
  const { className, src, alt, size } = props;

  const mods: Mods = {};
  const style = React.useMemo<React.CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size]
  );

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
});
