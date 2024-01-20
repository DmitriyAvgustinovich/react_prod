import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { articleDetailsReducer } from "entities/Article/model/slice/ArticleDetailsSlice";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/AuthByUserName/model/slice/loginSlice";
import { addCommentFormReducer } from "features/addCommentForm/model/slices/addCommentFormSlice";
import { articleDetailsCommentReducer } from "pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentSlice";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsComments: articleDetailsCommentReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: Story) => {
      return (
        <StoreProvider
          initialState={state}
          asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
          <StoryComponent />
        </StoreProvider>
      );
    };
