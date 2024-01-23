import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTranslation } from "react-i18next";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { SortOrder } from "shared/types";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import { ArticleType } from "entities/Article/model/types/article";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import cls from "./ArticlePageFilters.module.scss";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters = React.memo(
  (props: ArticlePageFiltersProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = React.useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = React.useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
        dispatch(articlesPageActions.setPage(1));
      },
      [dispatch]
    );

    const onChangeOrder = React.useCallback(
      (order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeSort = React.useCallback(
      (sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeSearch = React.useCallback(
      (value: string) => {
        dispatch(articlesPageActions.setSearch(value));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
      },
      [debouncedFetchData, dispatch]
    );

    const onChangeType = React.useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value as ArticleType));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    return (
      <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />

          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>

        <Card className={cls.search}>
          <Input
            placeholder={t("Поиск")}
            value={search}
            onChange={onChangeSearch}
          />
        </Card>

        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
      </div>
    );
  }
);
