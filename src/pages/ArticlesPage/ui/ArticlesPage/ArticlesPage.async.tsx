import { lazy } from "react";

export const ArticlesPageAsync = lazy(() => import("./ArticlesPage").then((module) => ({ default: module.default })));
