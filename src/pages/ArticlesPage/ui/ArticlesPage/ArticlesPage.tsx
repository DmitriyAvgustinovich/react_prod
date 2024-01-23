import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { ArticleList } from "entities/Article";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import { useSearchParams } from "react-router-dom";
import {
  articlesPageReducer,
  getArticles,
} from "../../model/slices/articlesPageSlice";
import cls from "./ArticlesPage.module.scss";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
  };

  const onLoadNextPart = React.useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlePageFilters />

        <ArticleList
          view={view}
          articles={articles}
          isLoading={isLoading}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default React.memo(ArticlesPage);
