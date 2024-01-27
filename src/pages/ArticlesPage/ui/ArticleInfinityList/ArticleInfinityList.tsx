import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useSelector } from "react-redux";
import { ArticleList } from "entities/Article";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { getArticles } from "../../model/slices/articlesPageSlice";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";

interface ArticleInfinityListProps {
  className?: string;
}

export const ArticleInfinityList = React.memo(
  (props: ArticleInfinityListProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    if (error) return <Text text={t("Ошибка при загрузке статей")} />;

    return (
      <div className={classNames("", {}, [className])}>
        <ArticleList view={view} articles={articles} isLoading={isLoading} />
      </div>
    );
  }
);
