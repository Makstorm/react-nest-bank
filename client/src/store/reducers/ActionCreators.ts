import { createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../http/userAPI";

interface IUserLoginParams {
  email: string;
  password: string;
}

export const fetchUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: IUserLoginParams) => {
    return await login(email, password);
  }
);
