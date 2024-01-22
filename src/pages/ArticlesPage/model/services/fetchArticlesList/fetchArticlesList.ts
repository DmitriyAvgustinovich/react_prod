import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (articleId, thinkAPI) => {
  const { rejectWithValue, extra } = thinkAPI;

  try {
    const res = await extra.api.get<Article[]>("/articles", {
      params: {
        _expand: "user",
      },
    });

    if (!res.data) throw new Error();

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
