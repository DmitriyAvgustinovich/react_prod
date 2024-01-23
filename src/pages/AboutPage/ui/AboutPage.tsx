import { useTranslation } from "react-i18next";
import { Page } from "shared/ui/Page/Page";

export const AboutPage = () => {
  const { t } = useTranslation();

  return <Page>{t("О нас")}</Page>;
};
