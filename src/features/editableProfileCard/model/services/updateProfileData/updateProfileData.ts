import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "entities/Profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { ValidateProfileErrors } from "../../consts/consts";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileErrors[]>
>("profile/updateProfileData", async (_, thinkAPI) => {
  const { rejectWithValue, extra, getState } = thinkAPI;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);
  if (errors.length) return rejectWithValue(errors);

  try {
    const res = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData
    );

    if (!res.data) throw new Error();

    return res.data;
  } catch (error) {
    return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
  }
});
