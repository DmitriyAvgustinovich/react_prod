import MainIcon from "shared/assets/icons/main.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";
import ArticleIcon from "shared/assets/icons/article.svg";
import React from "react";
import { RouterPath } from "shared/config/routeConfig/routeConfig";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RouterPath.main,
    Icon: MainIcon,
    text: "Главная",
  },
  {
    path: RouterPath.about,
    Icon: AboutIcon,
    text: "О нас",
  },
  {
    path: RouterPath.profile,
    Icon: ProfileIcon,
    text: "Профиль",
    authOnly: true,
  },
  {
    path: RouterPath.articles,
    Icon: ArticleIcon,
    text: "Статьи",
    authOnly: true,
  },
];
