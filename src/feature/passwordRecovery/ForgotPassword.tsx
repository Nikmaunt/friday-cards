import React, { ChangeEvent, useState } from 'react'
import { Button, Input, TextField } from '@mui/material'
import './forgotPassword.css'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootReducerType, useAppDispatch, useAppSelector } from '../../app/store'
import { Action } from 'redux'
import { recoveryPasswordTC } from '../../state/forgotPassword-reducer'
import { Navigate, NavLink } from 'react-router-dom'
import { SuperButton } from '../../common/superButton/superButton'

export type AppThunkType = ThunkDispatch<RootReducerType, void, Action>

//восстановление пароля
export const ForgotPassword = () => {
  const [emailError, setEmailError] = useState('')
  let dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const isLogin = useAppSelector<boolean>((state) => state.recoveryPassword.isLogin)

  //ввод email
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    if (e.currentTarget.value) {
      setEmailError('')
    }
  }

  //отправка инструкции восстановления пароля на email
  const sendRecoveryPasswordInstructions = () => {
    //проверка корректности email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Incorrect password')
    } else {
      setEmailError('')
      dispatch(recoveryPasswordTC(email))
    }
  }
  if (isLogin) {
    return <Navigate to={'/friday-cards/check-email'} />
  }
  return (
    <div className={'forgotPassword'}>
      <div className={'title'}>Forgot your password?</div>
      <TextField
        error={emailError !== ''}
        label='Email'
        variant='standard'
        className={'textField'}
        onChange={onChangeHandler}
        helperText={emailError ? emailError : ''}
      />
      <div className={'description'}>Enter your email address and we will send you further instructions</div>
      <NavLink to='/friday-cards/check-email' />
      <SuperButton name={'Send Instructions'} callback={sendRecoveryPasswordInstructions} />

      <Button className={'button'} variant={'contained'} onClick={sendRecoveryPasswordInstructions}>
        Send Instructions
      </Button>
      <div className={'rememberPassword'}>Did you remember your password?</div>
      <div className={'link'}>Try logging in</div>
    </div>
  )
}
