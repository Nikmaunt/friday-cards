import React, { Dispatch } from 'react'
import { AppThunkDispatch } from '../app/store'
import { appAPI } from '../app/appAPI'

type RecoveryPasswordActionType = {
  type: 'PASSWORD-RECOVERY'
  message: string
}

type ChangePasswordActionType = {
  type: 'PASSWORD-CHANGE'
  message: string
}

type LoginActionType = {
  type: 'PASSWORD-CHANGE'
  message: string
}

type forgotPasswordResponseType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}
const initialState = { isLogin: false }
type initialForgotPasswordStateType = typeof initialState

export type ForgotPasswordActionsType = RecoveryPasswordActionType | ChangePasswordActionType | isLoginACType

export const forgotPasswordReducer = (
  state: initialForgotPasswordStateType = initialState,
  action: ForgotPasswordActionsType,
): initialForgotPasswordStateType => {
  switch (action.type) {
    case 'PASSWORD-RECOVERY': {
      console.log(action.message)
      alert(action.message)

      //redirect на checkEmail
      // setTimeout(function () {
      //   // @ts-ignore
      //   window.location = '/friday-cards/check-email'
      // }, 500)
      return { ...state }
    }

    case 'PASSWORD-CHANGE': {
      alert('!New password has been applied')
      return state
    }
    case 'PASSWORD-LOGIN': {
      return { ...state, isLogin: action.value }
    }
    default:
      return state
  }
}

export const recoveryPasswordAC = (message: string): RecoveryPasswordActionType => {
  return { type: 'PASSWORD-RECOVERY', message }
}

export const changePasswordAC = (message: string): ChangePasswordActionType => {
  return { type: 'PASSWORD-CHANGE', message }
}

export const isLoginAC = (value: boolean) => {
  return { type: 'PASSWORD-LOGIN', value } as const
}

type isLoginACType = ReturnType<typeof isLoginAC>

export const recoveryPasswordTC = (email: string) => async (dispatch: AppThunkDispatch) => {
  const res = await appAPI.recoveryPassword(email)
  if (!res.data.error) {
    // dispatch(recoveryPasswordAC(res.data.info))
    dispatch(isLoginAC(true))
  } else {
    // dispatch(recoveryPasswordAC(res.data.error))
    throw new Error(res.data.error)
  }
  alert(res.data)
}
// const { token } = uxeParams<{ token: string }>()
export const changePasswordTC = (password: string) => async (dispatch: AppThunkDispatch) => {
  //url из строки браузера
  const URL = window.location.href
  //токен
  const resetPasswordToken = URL.replace(/^.*[\\\/]/, '')
  //установить новый пароль с использованием токена
  try {
    const res = await appAPI.setNewPassword(password, resetPasswordToken)
    //проверка ошибки запроса
    if (!res.data.error) {
      dispatch(changePasswordAC(res.data.info))
    } else {
      dispatch(changePasswordAC(res.data.error))
      throw new Error(res.data.error)
    }
  } catch (e) {}
}
