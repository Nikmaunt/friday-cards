import axios from "axios";

export const instance = axios.create({
  // const
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

type RecoveryResponseType = {
  info: string;
  error: string;
};

export const appAPI = {
  recoveryPassword(email: string) {
    const payload = {
      // кому восстанавливать пароль
      email: email,
      // можно указать разработчика фронта
      from: "test-front-admin <vladimir817vk@gmail.com>",
      // хтмп-письмо, вместо $token$ бэк вставит токен
      message: `<div style="background-color: lime; padding: 15px"> 
                password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
                </div>`,
    };
    return instance.post<RecoveryResponseType>("auth/forgot", payload);
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    const payload = {
      password: password,
      resetPasswordToken: resetPasswordToken,
    };
    return instance.post("auth/set-new-password", payload);
  },
};
