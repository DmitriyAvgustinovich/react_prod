import { lazy } from "react";
import ArticleRating from "./ArticleRating";

export const ArticleRatingAsync = lazy(() => import("./ArticleRating").then(() => ({ default: ArticleRating })));
