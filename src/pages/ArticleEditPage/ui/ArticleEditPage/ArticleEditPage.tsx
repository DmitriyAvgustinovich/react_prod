import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Page } from "widgets/Page/Page";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cls from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit
        ? t("Редактирование статьи с ID = ") + id
        : t("Создание новой статьи")}
    </Page>
  );
};

export default React.memo(ArticleEditPage);
