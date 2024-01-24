import { ArticleDetailsCommentSchema } from "./ArticleDetailsCommentSchema";
import { ArticleDetailsPageRecommendationsSchema } from "./articleDetailsPageRecommendationSchema";

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailsPageRecommendationsSchema;
}
