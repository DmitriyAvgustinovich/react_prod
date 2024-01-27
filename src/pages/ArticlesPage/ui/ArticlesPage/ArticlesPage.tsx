import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "widgets/Page/Page";
import { articlesPageReducer } from "../../model/slices/articlesPageSlice";
import cls from "./ArticlesPage.module.scss";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";
import { ArticleInfinityList } from "../ArticleInfinityList/ArticleInfinityList";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const onLoadNextPart = React.useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlePageFilters />
        <ArticleInfinityList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default React.memo(ArticlesPage);
