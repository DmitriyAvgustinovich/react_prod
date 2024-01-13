import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { User, userActions } from "entities/User";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async (authData, thinkAPI) => {
  const { rejectWithValue, extra, dispatch } = thinkAPI;

  try {
    const res = await extra.api.post<User>("/login", authData);
    if (!res.data) throw new Error();

    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(res.data));
    dispatch(userActions.setAuthData(res.data));

    extra.navigate("/about");

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
