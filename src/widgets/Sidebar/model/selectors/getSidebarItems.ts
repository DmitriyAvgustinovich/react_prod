import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import MainIcon from "shared/assets/icons/main.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";
import ArticleIcon from "shared/assets/icons/article.svg";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { SidebarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
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
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: RouterPath.profile + userData.id,
        Icon: ProfileIcon,
        text: "Профиль",
        authOnly: true,
      },
      {
        path: RouterPath.articles,
        Icon: ArticleIcon,
        text: "Статьи",
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
