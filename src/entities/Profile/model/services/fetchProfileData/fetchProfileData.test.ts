import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { fetchProfileData } from "./fetchProfileData";

const data = {
  username: "admin",
  age: 22,
  country: Country.Russia,
  lastname: "adv",
  first: "asd",
  city: "asf",
  currency: Currency.USD,
};

describe("fetchProfileData.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const res = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(res.meta.requestStatus).toBe("fulfilled");
    expect(res.payload).toEqual(data);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const res = await thunk.callThunk();

    expect(res.meta.requestStatus).toBe("rejected");
  });
});
