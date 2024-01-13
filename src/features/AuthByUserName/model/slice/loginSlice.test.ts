import { DeepPartial } from "@reduxjs/toolkit";
import { loginActions, loginReducer } from "./loginSlice";
import { LoginSchema } from "../types/loginSchema";

describe("loginSlice.test", () => {
  test("setUsername", () => {
    const state: DeepPartial<LoginSchema> = { username: "123" };

    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername("123"))
    ).toEqual({ username: "123" });
  });

  test("setPassword", () => {
    const state: DeepPartial<LoginSchema> = { password: "123" };

    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword("123"))
    ).toEqual({ password: "123" });
  });
});
