import { lazy } from "react";

export const AdminPanelPageAsync = lazy(() => import("./AdminPanelPage").then((module) => ({ default: module.AdminPanelPage })));
