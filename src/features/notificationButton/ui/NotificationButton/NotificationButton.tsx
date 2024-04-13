import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Popover } from "shared/ui/Popups";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { NotificationList } from "entities/Notification";
import NotificationsIcon from "shared/assets/icons/notifications.svg";
import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = React.memo(
  (props: NotificationButtonProps) => {
    const { className } = props;

    return (
      <Popover
        className={classNames(cls.NotificationButton, {}, [className])}
        direction="bottom left"
        trigger={(
          <Button theme={ButtonTheme.CLEAR_INVERTED}>
            <Icon Svg={NotificationsIcon} inverted />
          </Button>
        )}
      >
        <NotificationList className={cls.notifications} />
      </Popover>
    );
  }
);
