import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_, thinkAPI) => {
  const { rejectWithValue, extra, getState } = thinkAPI;

  const page = getArticlesPageNum(getState());
  const limit = getArticlesPageLimit(getState());
  const order = getArticlesPageOrder(getState());
  const sort = getArticlesPageSort(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    });

    const res = await extra.api.get<Article[]>("/articles", {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    if (!res.data) throw new Error();

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
