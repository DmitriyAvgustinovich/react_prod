import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddCommentFormSchema } from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
  text: "",
};

export const addCommentFormSlice = createSlice({
  name: "addCommentForm",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addCommentFormByUsername.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })

  //     .addCase(addCommentFormByUsername.fulfilled, (state) => {
  //       state.isLoading = false;
  //     })

  //     .addCase(addCommentFormByUsername.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
