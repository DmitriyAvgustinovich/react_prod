import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Card, CardTheme } from "shared/ui/Card/Card";
import { Text } from "shared/ui/Text/Text";
import { Notification } from "../../../Notification/model/types/notifications";
import cls from "./NotificationItem.module.scss";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = React.memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a className={cls.link} href={item.href} target="_blank" rel="noreferrer">
        {item.title}
      </a>
    );
  }

  return content;
});
