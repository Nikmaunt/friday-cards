import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const instanceHeroku = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const appAPI = {
  recoveryPassword(payload: ForgotRequestType) {
    // return instance.post<RecoveryResponseType>("auth/forgot", payload);
    return instanceHeroku.post<RecoveryResponseType>("auth/forgot", payload);
  },
  setNewPassword(newPassword: NewPasswordRequestType) {
    // return instance.post("auth/set-new-password", payload);
    return instanceHeroku.post<RecoveryResponseType>("auth/set-new-password", newPassword);
  },
};

/////////////////// types ////////////////////
type ForgotRequestType = {
  email: string;
  from: string;
  message: string;
};

type RecoveryResponseType = {
  info: string;
  error: string;
};

type NewPasswordRequestType = {
  password: string;
  resetPasswordToken: string;
};
