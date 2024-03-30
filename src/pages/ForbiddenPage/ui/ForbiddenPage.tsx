import { BugButton } from "app/providers/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

export const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <BugButton />
      {t("У вас нет доступа к этой странице")}
    </Page>
  );
};