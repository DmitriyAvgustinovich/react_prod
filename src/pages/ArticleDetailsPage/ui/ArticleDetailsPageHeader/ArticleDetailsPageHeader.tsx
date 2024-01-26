import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "entities/Article";
import { HStack } from "shared/ui/Stack";
import { getCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = React.memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const navigate = useNavigate();

    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = React.useCallback(() => {
      navigate(RouterPath.articles);
    }, [navigate]);

    const onEditArticle = React.useCallback(() => {
      navigate(`${RouterPath.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <HStack className={classNames("", {}, [className])} justify="between" max>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>

        {canEdit && (
          <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
            {t("Редактировать")}
          </Button>
        )}
      </HStack>
    );
  }
);
