import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Comment } from "../../model/types/comment";
import cls from "./CommentList.module.scss";
import { CommentCard } from "../CommentCard/CommentCard";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = React.memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            className={cls.comment}
            isLoading={isLoading}
          />
        ))
      ) : (
        <Text title={t("Комментарии отсутствуют")} />
      )}
    </div>
  );
});
