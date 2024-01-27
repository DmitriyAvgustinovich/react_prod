import { StateSchema } from "app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";

describe("getProfileValidateErrors.test", () => {
  test("should work with normal case", () => {
    const validateErrorsArray = [
      ValidateProfileErrors.SERVER_ERROR,
      ValidateProfileErrors.INCORRECT_AGE,
    ];

    const state: DeepPartial<StateSchema> = {
      profile: { validateErrors: validateErrorsArray },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(
      validateErrorsArray
    );
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
