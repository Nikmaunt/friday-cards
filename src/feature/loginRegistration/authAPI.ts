import { instance } from "../../app/appAPI";
import { UserDataType } from "./authReducer";

export const authAPI = {
  registration(values: RegistrationRequestType) {
    return instance.post<ResponseRegistrationType>("/auth/register", values);
  },
  login(values: LoginRequestType) {
    return instance.post<UserDataType>("/auth/login", values);
  },
  authMe() {
    return instance.post<UserDataType>("/auth/me");
  },
  logout() {
    return instance.delete<LogOutResponse>("/auth/me");
  },
};
////////////////////////// types /////////////////////////////

export type RegistrationRequestType = {
  email: string;
  password: string;
};
type ResponseRegistrationType = {
  addedUser: {};
  error?: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LogOutResponse = {
  info: string;
  error: string;
};
