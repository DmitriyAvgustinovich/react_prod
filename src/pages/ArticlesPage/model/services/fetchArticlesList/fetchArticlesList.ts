import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (props, thinkAPI) => {
  const { rejectWithValue, extra, getState } = thinkAPI;

  const { page = 1 } = props;
  const limit = getArticlesPageLimit(getState());

  try {
    const res = await extra.api.get<Article[]>("/articles", {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
      },
    });

    if (!res.data) throw new Error();

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
