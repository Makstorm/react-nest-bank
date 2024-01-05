import { $host } from ".";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../models/IUser";
import { AxiosError } from "axios";

export interface ITokenRes {
  accessToken: string;
}

export const registration = async (
  email: string,
  password: string,
  userName: string
) => {
  await $host.post<void>("/auth/signUp", { email, userName, password });
};

export const login = async (email: string, password: string) => {
  // console.log("login credentials", email, password);
  try {
    const { data } = await $host.post<ITokenRes>("/auth/sighIn", {
      email,
      password,
    });
    localStorage.setItem("token", data.accessToken);

    const decode = jwtDecode<IUser>(data.accessToken);
    console.log("login response", decode);

    return decode;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
};
