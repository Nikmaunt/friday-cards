import { instance } from "../../app/appAPI";

export const authAPI = {
  registration(values: RegistrationRequestType) {
    return instance.post<RegistrationRequestType, ResponseRegistrationType>("/auth/register", values);
  },
  login(values: LoginRequestType) {
    return instance.post<LoginRequestType, ResponseLoginType>("/auth/login", values);
  },
  authMe() {
    return instance.post<ResponseLoginType>("/auth/me");
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

type ResponseLoginType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
};
