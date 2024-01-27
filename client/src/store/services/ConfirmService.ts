import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const confirmAPI = createApi({
  reducerPath: "confirmAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL + "email",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    confirmPasswordChange: build.mutation<
      void,
      { token: string; password: string }
    >({
      query: ({ token, password }) => ({
        url: "/recover",
        method: "POST",
        body: { token, password },
      }),
    }),
    confirmSignUp: build.mutation<void, { token: string }>({
      query: ({ token }) => ({
        url: "/confirm",
        method: "POST",
        body: { token },
      }),
    }),
  }),
});
