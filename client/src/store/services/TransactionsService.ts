import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITransaction } from "../../models/ITransaction";
import { CreateTransactionDto } from "../../models/dto/create-transaction.dto";
import { AccountRemplenishmentDto } from "../../models/dto/account-replenishment.dto";

export const transactionsAPI = createApi({
  reducerPath: "transactionsAPI",
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
    fetchUserTransactions: build.query<ITransaction[], string>({
      query: () => ({
        url: "/transaction",
        method: "GET",
      }),
    }),
    fetchOneTransaction: build.query<ITransaction, string>({
      query: (id: string) => ({
        url: `/transaction/${id}`,
        method: "GET",
      }),
    }),

    createTransaction: build.mutation<ITransaction, CreateTransactionDto>({
      query: (dto: CreateTransactionDto) => ({
        url: "/transaction",
        method: "POST",
        body: { ...dto },
      }),
    }),

    createAccountReplenishment: build.mutation<
      ITransaction,
      AccountRemplenishmentDto
    >({
      query: (dto: AccountRemplenishmentDto) => ({
        url: "/transaction/replenishment",
        method: "POST",
        body: { ...dto },
      }),
    }),
  }),
});
