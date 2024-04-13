import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Popups";
import { Avatar } from "shared/ui/Avatar/Avatar";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = React.memo((props: AvatarDropdownProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogout = React.useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  const dropdownItems = [
    ...(isAdminPanelAvailable
      ? [
        {
          content: t("Админка"),
          href: RouterPath.admin_panel,
        },
      ]
      : []),
    {
      content: t("Профиль"),
      href: RouterPath.profile + authData.id,
    },
    {
      content: t("Выйти"),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      className={classNames("", {}, [className])}
      trigger={<Avatar size={30} src={authData.avatar} />}
      direction="bottom left"
      items={dropdownItems}
    />
  );
});
