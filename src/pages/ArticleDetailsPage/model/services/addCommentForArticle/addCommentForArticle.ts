import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getArticleDetailsData } from "entities/Article";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thinkAPI) => {
  const { rejectWithValue, extra, getState, dispatch } = thinkAPI;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article) return rejectWithValue("error");

  try {
    const res = await extra.api.post<Comment>("/comments", {
      articleId: article.id,
      userId: userData.id,
      text,
    });

    if (!res.data) throw new Error();
    dispatch(fetchCommentsByArticleId(article.id));

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
