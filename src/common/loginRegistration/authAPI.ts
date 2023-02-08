import { instance } from "../../app/appAPI";

export const authAPI = {
  registration(values: RegistrationRequestType) {
    return instance.post("/auth/register", values);
  },
  login(values: LoginRequestType) {
    return instance.post("/auth/login", values);
  },
  authMe() {
    return instance.post<UserType>("/auth/me");
  },
  logout() {
    return instance.delete("/auth/me",{});
  }
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

export type UserType = {
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
