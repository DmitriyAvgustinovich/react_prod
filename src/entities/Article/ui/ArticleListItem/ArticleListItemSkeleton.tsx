import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Card } from "shared/ui/Card/Card";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import cls from "./ArticleListItem.module.scss";
import { ArticleView } from "../../model/consts/articleConsts";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = React.memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view = ArticleView.SMALL } = props;

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleListItemSkeleton, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Skeleton border="50%" width={30} height={30} />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </div>

            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />

            <div className={cls.footer}>
              <Skeleton width={200} height={36} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.ArticleListItemSkeleton, {}, [
          className,
          cls[view],
        ])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton className={cls.img} width={200} height={200} />
          </div>

          <div className={cls.infoWrapper}>
            <Skeleton className={cls.title} width={130} height={16} />
          </div>

          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    );
  }
);
