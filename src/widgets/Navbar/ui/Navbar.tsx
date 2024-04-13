import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getUserAuthData } from "entities/User";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { LoginModal } from "features/authByUserName";
import { HStack } from "shared/ui/Stack";
import { NotificationButton } from "features/notificationButton";
import { AvatarDropdown } from "features/avatarDropdown";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = React.memo((props: NavbarProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

  const [isAuthModal, setIsAuthModal] = React.useState(false);

  const onShowModal = React.useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onCloseModal = React.useCallback(() => {
    setIsAuthModal(false);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title="react_prod"
          theme={TextTheme.INVERTED}
        />

        <AppLink to={RouterPath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t("Создать статью")}
        </AppLink>

        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
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
