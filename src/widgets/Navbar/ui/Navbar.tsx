import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Avatar } from "shared/ui/Avatar/Avatar";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = React.memo((props: NavbarProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);

  const [isAuthModal, setIsAuthModal] = React.useState(false);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onShowModal = React.useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onCloseModal = React.useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onLogout = React.useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t("react_prod")}
          theme={TextTheme.INVERTED}
        />

        <AppLink to={RouterPath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t("Создать статью")}
        </AppLink>

        <Dropdown
          className={cls.dropdown}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction="bottom left"
          items={[
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
          ]}
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
