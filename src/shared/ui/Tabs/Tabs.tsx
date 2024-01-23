import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import cls from "./Tabs.module.scss";
import { Card, CardTheme } from "../Card/Card";

export interface TabItem {
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = React.memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const clickHandler = React.useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick]
  );

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          onClick={clickHandler(tab)}
          key={tab.value}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
