import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articlesDetailsPage/fetchArticleRecommendations", async (_, thinkAPI) => {
  const { rejectWithValue, extra } = thinkAPI;

  try {
    const res = await extra.api.get<Article[]>("/articles", {
      params: {
        _limit: 4,
      },
    });

    if (!res.data) throw new Error();

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
