import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { VStack } from "shared/ui/Stack";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import cls from "./NotificationList.module.scss";
import { useNotifications } from "../../../Notification/api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";

interface NotificationProps {
  className?: string;
}

export const NotificationList = React.memo((props: NotificationProps) => {
  const { className } = props;

  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        max
        gap="16"
        className={classNames(cls.Notification, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      max
      gap="16"
      className={classNames(cls.Notification, {}, [className])}
    >
      {data?.map((notification) => (
        <NotificationItem key={notification.id} item={notification} />
      ))}
    </VStack>
  );
});
