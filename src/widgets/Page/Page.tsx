import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useInfinityScroll } from "shared/lib/hooks/useInfinityScroll/useInfinityScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { uiActions } from "features/UI";
import { useLocation } from "react-router-dom";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useSelector } from "react-redux";
import { getUIScrollByPath } from "features/UI/model/selectors/ui";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
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

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const scrollPosition = useSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname));

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    dispatch(
      uiActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, 500);

  return (
    <section
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
      onScroll={onScroll}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
