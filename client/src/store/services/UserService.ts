import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "../../models/IUser";
import { UpdateUserDto } from "../../models/dto/update-user.dto";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchUserData: build.query<IUser, string>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    userPasswordRecover: build.mutation<void, string>({
      query: (email: string) => ({
        url: "/auth/recovery",
        method: "POST",
        body: { email },
      }),
    }),

    updateUserData: build.mutation<IUser, UpdateUserDto>({
      query: (dto: UpdateUserDto) => ({
        url: "/users",
        method: "PATCH",
        body: { ...dto },
      }),
    }),
  }),
});
