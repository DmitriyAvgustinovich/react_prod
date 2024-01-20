import { lazy } from "react";

export const AddCommentFormAsync = lazy(() => import("./AddCommentForm").then((module) => ({ default: module.default })));
