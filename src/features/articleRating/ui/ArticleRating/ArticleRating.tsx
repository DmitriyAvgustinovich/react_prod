import { RatingCard } from "entities/Rating";
import React from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import {
  useGetArticleRating,
  useRateArticle,
} from "../../api/articleRatingApi";

interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = React.memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;

  const userData = useSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    userId: userData?.id ?? "",
    articleId,
  });

  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = React.useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? "",
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );

  const onAccept = React.useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle]
  );

  const onCancel = React.useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      className={className}
      title="Оцените статью"
      feedbackTitle="Оставьте свой отзыв"
      hasFeedback
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
});

export default ArticleRating;
