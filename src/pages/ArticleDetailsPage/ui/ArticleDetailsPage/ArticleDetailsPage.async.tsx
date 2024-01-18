import { lazy } from "react";

export const ArticleDetailsPageAsync = lazy(() => import("./ArticleDetailsPage").then((module) => ({ default: module.default })));
