import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { updateProfileData } from "./updateProfileData";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";

const data = {
  username: "admin",
  age: 22,
  country: Country.Russia,
  lastname: "adv",
  first: "asd",
  city: "asf",
  currency: Currency.USD,
};

describe("updateProfileData.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    const res = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(res.meta.requestStatus).toBe("fulfilled");
    expect(res.payload).toEqual(data);
  });

  test("error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const res = await thunk.callThunk();

    expect(res.meta.requestStatus).toBe("rejected");
    expect(res.payload).toEqual([ValidateProfileErrors.SERVER_ERROR]);
  });

  test("validate error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: { ...data, lastname: "" } },
    });

    const res = await thunk.callThunk();

    expect(res.meta.requestStatus).toBe("rejected");
    expect(res.payload).toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
  });
});
