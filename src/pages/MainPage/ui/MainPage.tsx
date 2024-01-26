import { BugButton } from "app/providers/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Page } from "widgets/Page/Page";

export const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <BugButton />
      {t("Главная")}

      <ListBox
        defaultValue="выберите значение"
        onChange={(value) => console.log(value)}
        value={undefined}
        items={[
          { value: "123", content: "123" },
          { value: "456", content: "456", disabled: true },
          { value: "789", content: "789" },
        ]}
      />
    </Page>
  );
};
