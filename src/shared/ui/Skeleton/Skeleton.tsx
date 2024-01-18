import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = React.memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const styles: React.CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
  );
});
