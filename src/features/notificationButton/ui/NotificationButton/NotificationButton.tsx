import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Popover } from "shared/ui/Popups";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { NotificationList } from "entities/Notification";
import NotificationsIcon from "shared/assets/icons/notifications.svg";
import { Drawer } from "shared/ui/Drawer/Drawer";
import { BrowserView, MobileView } from "react-device-detect";
import { AnimationProvider } from "shared/lib/components/AnimationProvider";
import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = React.memo(
  (props: NotificationButtonProps) => {
    const { className } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const onOpenDrawer = React.useCallback(() => {
      setIsOpen(true);
    }, []);

    const onCloseDrawer = React.useCallback(() => {
      setIsOpen(false);
    }, []);

    const trigger = (
      <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onOpenDrawer}>
        <Icon Svg={NotificationsIcon} inverted />
      </Button>
    );

    return (
      <>
        <BrowserView>
          <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
            trigger={trigger}
          >
            <NotificationList className={cls.notifications} />
          </Popover>
        </BrowserView>

        <MobileView>
          {trigger}
          <AnimationProvider>
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
              <NotificationList />
            </Drawer>
          </AnimationProvider>
        </MobileView>
      </>
    );
  }
);
