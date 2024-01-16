import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/fetchProfileData", async (_, thinkAPI) => {
  const { rejectWithValue, extra } = thinkAPI;

  try {
    const res = await extra.api.get<Profile>("/profile");
    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
