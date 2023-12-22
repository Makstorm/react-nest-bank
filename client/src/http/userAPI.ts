import { $host } from ".";
import { jwtDecode } from "jwt-decode";

interface ITokenRes {
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
  const { data } = await $host.post<ITokenRes>("/auth/sighIn", {
    email,
    password,
  });
  localStorage.setItem("token", data.accessToken);
  console.log(data.accessToken);
  const decode = jwtDecode(data.accessToken);
  console.log(decode);
  return decode;
};
