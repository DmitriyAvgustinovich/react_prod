import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/updateProfileData", async (_, thinkAPI) => {
  const { rejectWithValue, extra, getState } = thinkAPI;

  const formData = getProfileForm(getState());

  try {
    const res = await extra.api.put<Profile>("/profile", formData);
    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
