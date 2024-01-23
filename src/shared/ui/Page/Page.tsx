import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useInfinityScroll } from "shared/lib/hooks/useInfinityScroll/useInfinityScroll";
import cls from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page = React.memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const wrapperRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const triggerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section className={classNames(cls.Page, {}, [className])} ref={wrapperRef}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
