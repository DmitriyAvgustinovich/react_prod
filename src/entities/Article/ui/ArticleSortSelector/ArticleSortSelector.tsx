import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { SortOrder } from "shared/types";
import { ArticleSortField } from "../../model/types/article";
import cls from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = React.memo(
  (props: ArticleSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;

    const { t } = useTranslation();

    const orderOptions = React.useMemo<SelectOption[]>(
      () => [
        {
          value: "asc",
          content: t("возрастанию"),
        },
        {
          value: "desc",
          content: t("убыванию"),
        },
      ],
      [t]
    );

    const sortFieldOptions = React.useMemo<SelectOption[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t("дате создания"),
        },
        {
          value: ArticleSortField.TITLE,
          content: t("названию"),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t("просмотам"),
        },
      ],
      [t]
    );

    const changeSortHandler = React.useCallback(
      (sort: string) => {
        onChangeSort(sort as ArticleSortField);
      },
      [onChangeSort]
    );

    const changeOrderHandler = React.useCallback(
      (order: string) => {
        onChangeOrder(order as SortOrder);
      },
      [onChangeOrder]
    );

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          label={t("Сортировать по")}
          options={sortFieldOptions}
          value={sort}
          onChange={changeSortHandler}
        />

        <Select
          label={t("по")}
          options={orderOptions}
          value={order}
          onChange={changeOrderHandler}
          className={cls.order}
        />
      </div>
    );
  }
);
