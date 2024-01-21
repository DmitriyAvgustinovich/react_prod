import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { ArticleList, ArticleView } from "entities/Article";
import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList view={ArticleView.BIG} articles={[]} />
    </div>
  );
};

export default React.memo(ArticlesPage);
