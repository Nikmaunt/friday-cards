import { instance } from "../../app/appAPI";

export const authAPI = {
  registration(values: RegistrationRequestType) {
    return instance.post("/auth/register", values);
  },
  login(values: LoginRequestType) {
    return instance.post("/auth/login", values);
  },
  logout() {
    return instance.delete("/auth/me",{});
  }
};
/////////// types /////////////
export type RegistrationRequestType = {
  email: string;
  password: string;
};
export type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
