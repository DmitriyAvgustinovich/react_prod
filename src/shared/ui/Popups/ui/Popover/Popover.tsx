import { Popover as HPopover } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { mapDirectionClass } from "../../styles/consts";
import { DropdownDirection } from "../../../../types/ui";
import cls from "./Popover.module.scss";
import popupCls from "../../styles/Popup.module.scss";

interface PopoverProps {
  className?: string;
  trigger: React.ReactNode;
  direction?: DropdownDirection;
  children: React.ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const { className, trigger, direction = "bottom right", children } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      as="div"
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button className={popupCls.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
