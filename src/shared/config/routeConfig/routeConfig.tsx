import { UserRole } from "entities/User";
import { AboutPage } from "pages/AboutPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticleEditPage } from "pages/ArticleEditPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",

  // last
  NOT_FOUND = "not_found",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile/",
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLE_DETAILS]: "/articles/",
  [AppRoutes.ARTICLE_CREATE]: "/articles/new",
  [AppRoutes.ARTICLE_EDIT]: "/articles/:id/edit",
  [AppRoutes.ADMIN_PANEL]: "/admin",
  [AppRoutes.FORBIDDEN]: "/forbidden",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RouterPath.about,
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: `${RouterPath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RouterPath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: `${RouterPath.article_details}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: RouterPath.article_create,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: RouterPath.article_edit,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: <ForbiddenPage />,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
