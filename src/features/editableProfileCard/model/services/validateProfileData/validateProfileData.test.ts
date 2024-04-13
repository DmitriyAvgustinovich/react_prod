import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { validateProfileData } from "./validateProfileData";
import { ValidateProfileErrors } from "../../consts/consts";

const data = {
  username: "admin",
  age: 22,
  country: Country.Russia,
  lastname: "adv",
  first: "asd",
  city: "asf",
  currency: Currency.USD,
};

describe("validateProfileData.test", () => {
  test("success", async () => {
    const res = validateProfileData(data);
    expect(res).toEqual([]);
  });

  test("without first and lastname", async () => {
    const res = validateProfileData({ ...data, first: "", lastname: "" });
    expect(res).toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
  });

  test("incorrect age", async () => {
    const res = validateProfileData({ ...data, age: undefined });
    expect(res).toEqual([ValidateProfileErrors.INCORRECT_AGE]);
  });

  test("incorrect country", async () => {
    const res = validateProfileData({ ...data, country: undefined });
    expect(res).toEqual([ValidateProfileErrors.INCORRECT_COUNTRY]);
  });

  test("incorrect all", async () => {
    const res = validateProfileData({});

    expect(res).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
      ValidateProfileErrors.INCORRECT_AGE,
      ValidateProfileErrors.INCORRECT_COUNTRY,
    ]);
  });
});
