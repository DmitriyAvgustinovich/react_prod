import { Rating } from "entities/Rating";
import { rtkApi } from "shared/api/rtkApi";

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}

interface RateArticleArg {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ userId, articleId }) => ({
        url: "/article-ratings",
        params: {
          userId,
          articleId,
        },
      }),
    }),

    rateArticle: build.mutation<void, RateArticleArg>({
      query: (data) => ({
        url: "/article-ratings",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
