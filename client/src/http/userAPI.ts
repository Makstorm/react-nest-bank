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
  username: string
) => {
  await $host.post<void>("/auth/signUp", { email, username, password });
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await $host.post<ITokenRes>("/auth/sighIn", {
      email,
      password,
    });
    localStorage.setItem("token", data.accessToken);

    const decode = jwtDecode<IUser>(data.accessToken);

    return decode;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
};
