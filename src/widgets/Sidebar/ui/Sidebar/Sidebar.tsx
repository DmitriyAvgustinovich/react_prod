import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { SidebarItemsList } from "../../model/items";
import cls from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string;
}

export const Sidebar = React.memo((props: SidebarProps) => {
  const { className } = props;

  const [collapsed, setCollapsed] = React.useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = SidebarItemsList.map((item) => (
    <SidebarItem key={item.path} item={item} collapsed={collapsed} />
  ));

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? ">" : "<"}
      </Button>

      <div className={cls.items}>{itemsList}</div>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
});
