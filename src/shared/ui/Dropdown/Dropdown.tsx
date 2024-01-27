import { Menu } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { DropdownDirection } from "shared/types/ui";
import cls from "./Dropdown.module.scss";
import { AppLink } from "../AppLink/AppLink";

export interface DropdownItem {
  content?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: React.ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  "top left": cls.optionsTopLeft,
  "top right": cls.optionsTopRight,
  "bottom left": cls.optionsBottomLeft,
  "bottom right": cls.optionsBottomRight,
};

export const Dropdown = (props: DropdownProps) => {
  const { className, trigger, items, direction = "bottom right" } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>{trigger}</Menu.Button>

      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={classNames(cls.item, { [cls.active]: active })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={React.Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
