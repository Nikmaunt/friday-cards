import axios from 'axios'

export const instance = axios.create({
  // const
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL:
    // process.env.NODE_ENV === "development" ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
    'https://neko-back.herokuapp.com/2.0/', // для регистрации на сервере
  withCredentials: true,
})

type RecoveryResponseType = {
  info: string
  error: string
}

export const appAPI = {
  recoveryPassword(email: string) {
    const payload = {
      email: email,
      from: email,
      message: `<div style="background-color: lime; padding: 15px"> 
                password recovery link: <a href='http://localhost:3000/friday-cards/new-password/$token$'>link</a>
                </div>`,
    }
    // return instance.post<RecoveryResponseType>("auth/forgot", payload);
    return axios.post<RecoveryResponseType>('https://neko-back.herokuapp.com/2.0/auth/forgot', payload)
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    const payload = {
      password: password,
      resetPasswordToken: resetPasswordToken,
    }
    // return instance.post("auth/set-new-password", payload);
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password', payload)
  },
}
