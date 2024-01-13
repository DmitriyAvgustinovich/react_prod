import { BugButton } from "app/providers/ErrorBoundary";
import { useTranslation } from "react-i18next";

export const MainPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <BugButton />
      {t("Главная")}
    </div>
  );
};
